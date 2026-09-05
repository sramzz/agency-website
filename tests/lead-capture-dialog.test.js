const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const vm = require("node:vm");

const {
  close,
  completeLeadCaptureSuccess,
  createLeadReturnWatcher,
  createTurnstileLifecycle,
  init,
  applyLeadFieldErrors,
  loadTurnstileScript,
  open,
  renderTurnstile,
  renderLeadCaptureDialog,
  renderCountryCallingCodeOptions,
  combinePhoneNumber,
  normalizeBusinessWebsite,
  resolveTurnstileSitekey,
  validateLeadFields,
  setLeadFormPending,
  submitLeadCaptureRequest,
  submitLeadCapture,
} = require("../assets/js/lead-capture.js");

const memoryStorage = () => {
  const values = new Map();
  return {
    getItem: (key) => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
};
const validSubmissionId = "123e4567-e89b-42d3-a456-426614174000";

test("the dynamic lead dialog renders the accessible capture contract", () => {
  const template = renderLeadCaptureDialog();

  assert.match(template, /<dialog\b[^>]*>/i);
  assert.match(template, /<dialog\b[^>]*aria-describedby=["']lead-dialog-description["'][^>]*>/i);
  assert.match(template, /<h2[^>]*>Let's talk about better results<\/h2>/i);
  assert.match(template, /<p[^>]*id=["']lead-dialog-description["'][^>]*>[^<]+<\/p>/i);
  assert.equal((template.match(/class="rr-lead-capture-field-group/g) || []).length, 6);

  for (const field of ["firstName", "lastName", "companyName", "email", "phone"]) {
    assert.match(template, new RegExp(`<label\\b[^>]*for=["'][^"']+["'][^>]*>[^<]*${field.replace(/[A-Z]/g, (letter) => `\\s*${letter}`)}[^<]*<\\/label>`, "i"));
    assert.match(template, new RegExp(`<input\\b[^>]*name=["']${field}["']`, "i"));
  }

  assert.match(template, /<label\b[^>]*for=["']lead-business-website["'][^>]*>\s*Website/i);
  assert.match(template, /<input\b[^>]*name=["']businessWebsite["'][^>]*autocomplete=["']url["']/i);
  assert.match(template, /<input\b[^>]*name=["']website["'][^>]*(?:hidden|aria-hidden=["']true["']|style=["'][^"']*(?:display|visibility)\s*:\s*(?:none|hidden))/i);
  assert.match(template, /<select\b[^>]*name=["']phoneCountry["'][^>]*aria-label=["'][^"']*(?:country|calling code)[^"']*["']/i);
  assert.match(template, /<(?:div|p|output)\b[^>]*aria-live=["'](?:polite|assertive)["'][^>]*>/i);
  assert.match(template, /<a\b[^>]*href=["']\/privacy\/["'][^>]*>[^<]*Privacy[^<]*<\/a>/i);
  assert.match(template, /<button\b[^>]*class=["'][^"']*rr-lead-capture-close[^"']*["'][^>]*data-dialog-close[^>]*aria-label=["']Close["'][^>]*>\s*<span[^>]*aria-hidden=["']true["'][^>]*>×<\/span>\s*<\/button>/i);
  assert.doesNotMatch(template, /<button[^>]*data-dialog-close[^>]*>\s*Close\s*<\/button>/i);
  assert.match(template, /class=["'][^"']*rr-lead-capture-spinner[^"']*["'][^>]*aria-hidden=["']true["']/i);
  assert.match(template, /If you are ready to grow your business, we are ready to be your partner\./i);
  assert.match(template, /<button\b[^>]*type=["']submit["'][^>]*>[\s\S]*Book a call[\s\S]*<\/button>/);
  for (const optionalField of ["firstName", "lastName", "companyName", "businessWebsite", "email"]) {
    const input = template.match(new RegExp(`<input\\b[^>]*name=["']${optionalField}["'][^>]*>`, "i"))?.[0] || "";
    assert.doesNotMatch(input, /\brequired\b/i, `${optionalField} should be optional`);
  }
  assert.equal((template.match(/\(optional\)<\/label>/gi) || []).length, 5);
  assert.match(template.match(/<input\b[^>]*name=["']phone["'][^>]*>/i)?.[0] || "", /\brequired\b/i);
});

test("country selector covers the international calling-code list with flags", () => {
  const options = renderCountryCallingCodeOptions("AU");
  assert.ok((options.match(/<option\b/g) || []).length >= 240);
  assert.match(options, /value="AU"[^>]*selected[^>]*>🇦🇺 Australia \(\+61\)<\/option>/);
  assert.match(options, /value="NL"[^>]*>🇳🇱 Netherlands \(\+31\)<\/option>/);
  assert.match(options, /value="CO"[^>]*>🇨🇴 Colombia \(\+57\)<\/option>/);
});

test("phone helper combines a national number with its country code and preserves pasted international numbers", () => {
  assert.equal(combinePhoneNumber("AU", "0412 345 678"), "+61412345678");
  assert.equal(combinePhoneNumber("CO", "300 123 4567"), "+573001234567");
  assert.equal(combinePhoneNumber("NL", "+31 6 1234 5678"), "+31612345678");
});

test("optional business website is normalized safely", () => {
  assert.equal(normalizeBusinessWebsite(""), "");
  assert.equal(normalizeBusinessWebsite(" rankingrebels.com "), "https://rankingrebels.com/");
  assert.equal(normalizeBusinessWebsite("https://example.com/about"), "https://example.com/about");
  for (const invalid of ["javascript:alert(1)", "https://user:pass@example.com", "not a website", `https://example.com/${"a".repeat(2048)}`]) {
    assert.equal(normalizeBusinessWebsite(invalid), null, invalid);
  }
});

test("client validation reports an invalid optional business website", () => {
  const errors = validateLeadFields({
    firstName: "Kelly", lastName: "Serna", companyName: "Ranking Rebels",
    businessWebsite: "javascript:alert(1)", email: "kelly@example.com", phone: "+61400000000",
  });
  assert.match(errors.businessWebsite, /valid website/i);
});

const dialogFixture = () => {
  const firstField = { focusCalled: false, focus() { this.focusCalled = true; } };
  const listeners = {};
  return {
    firstField,
    dialog: {
      open: false,
      showModal() { this.open = true; },
      close() { this.open = false; },
      querySelector() { return firstField; },
      addEventListener(type, listener) { listeners[type] = listener; },
      dispatch(type, event = {}) { listeners[type]?.(event); },
    },
  };
};

test("open shows the shared dialog and focuses its first field", () => {
  const fixture = dialogFixture();
  const trigger = { focusCalled: false, focus() { this.focusCalled = true; } };

  const result = open({ dialog: fixture.dialog, trigger });

  assert.equal(result, fixture.dialog);
  assert.equal(fixture.dialog.open, true);
  assert.equal(fixture.firstField.focusCalled, true);
});

test("Escape closes the dialog and returns focus to the original CTA", () => {
  const fixture = dialogFixture();
  const trigger = { focusCalled: false, focus() { this.focusCalled = true; } };
  open({ dialog: fixture.dialog, trigger });

  const event = { defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
  fixture.dialog.dispatch("cancel", event);

  assert.equal(event.defaultPrevented, true);
  assert.equal(fixture.dialog.open, false);
  assert.equal(trigger.focusCalled, true);
});

test("close is safe when no dialog is open", () => {
  assert.doesNotThrow(() => close());
});

test("Turnstile loads lazily once with explicit rendering and can recover after failure", async () => {
  const scripts = [];
  const documentObject = {
    createElement(tagName) {
      assert.equal(tagName, "script");
      return { set async(value) { this.asyncValue = value; }, set src(value) { this.srcValue = value; } };
    },
    head: { appendChild(script) { scripts.push(script); } },
  };
  const windowObject = {};

  const first = loadTurnstileScript({ document: documentObject, window: windowObject });
  const concurrent = loadTurnstileScript({ document: documentObject, window: windowObject });
  assert.strictEqual(first, concurrent);
  assert.equal(scripts.length, 1);
  assert.match(scripts[0].srcValue, /^https:\/\/challenges\.cloudflare\.com\/turnstile\/v0\/api\.js\?render=explicit$/);
  scripts[0].onload();
  await first;

  const failedDocument = {
    createElement: documentObject.createElement,
    head: { appendChild(script) { scripts.push(script); } },
  };
  const failed = loadTurnstileScript({ document: failedDocument, window: {} });
  scripts[1].onerror(new Error("network"));
  await assert.rejects(failed);
  const retry = loadTurnstileScript({ document: failedDocument, window: {} });
  assert.equal(scripts.length, 3);
  scripts[2].onload();
  await retry;
});

test("Turnstile uses the fixed localhost key and configured production key", () => {
  init({ turnstileSitekey: "0x4AAAAAAA-production-public-key" });
  assert.equal(resolveTurnstileSitekey({ hostname: "localhost" }), "1x00000000000000000000AA");
  assert.equal(resolveTurnstileSitekey({ hostname: "127.0.0.1" }), "1x00000000000000000000AA");
  assert.equal(resolveTurnstileSitekey({ hostname: "rankingrebels.com" }), "0x4AAAAAAA-production-public-key");
  init({});
  assert.throws(() => resolveTurnstileSitekey({ hostname: "rankingrebels.com" }), /sitekey/i);
});

test("init defaults noticeVersion when no global configuration is supplied", () => {
  const target = { addEventListener() {} };
  assert.equal(init({ target }).noticeVersion, "2026-09-05");
});

test("default return toast appends to the injected document body", () => {
  const appended = [];
  const documentObject = {
    body: { dataset: {}, appendChild(node) { appended.push(node); } },
    createElement() { return { textContent: "", setAttribute() {}, remove() {} }; },
    addEventListener() {},
  };
  const target = { addEventListener() {} };
  const oldDocument = global.document;
  try {
    global.document = undefined;
    init({ target, document: documentObject, localStorage: memoryStorage(), sessionStorage: memoryStorage() });
    // The default toast is exercised by the return watcher; this call is
    // intentionally driven through the injected document rather than globals.
    const storage = memoryStorage();
    storage.setItem("rr.lead.receipt.v1", JSON.stringify({ submissionId: validSubmissionId, submittedAt: "2026-09-02T00:00:00.000Z" }));
    init({ target: documentObject, document: documentObject, localStorage: storage, sessionStorage: memoryStorage(), now: new Date("2026-09-03T00:00:00.000Z") });
    assert.equal(appended.length, 1);
    assert.equal(appended[0].className, "rr-lead-capture-notice");
  } finally { global.document = oldDocument; }
});

test("browser auto-init tolerates storage getters that throw", () => {
  const documentObject = {
    body: { dataset: {}, appendChild() {} },
    addEventListener() {},
    getElementById() { return null; },
  };
  const browser = { document: documentObject, self: null, crypto: { randomUUID: () => validSubmissionId } };
  browser.self = browser;
  Object.defineProperty(browser, "localStorage", { get() { throw new Error("denied"); } });
  Object.defineProperty(browser, "sessionStorage", { get() { throw new Error("denied"); } });
  assert.doesNotThrow(() => vm.runInNewContext(fs.readFileSync(require.resolve("../assets/js/lead-capture.js"), "utf8"), browser));
});

test("localhost uses the official Cloudflare Turnstile test sitekey", () => {
  assert.equal(resolveTurnstileSitekey({ hostname: "localhost" }), "1x00000000000000000000AA");
});

test("Turnstile renders explicitly into the dialog container", () => {
  const calls = [];
  const windowObject = { turnstile: { render: (container, config) => { calls.push({ container, config }); return "widget-1"; } } };
  const container = {};
  const widgetId = renderTurnstile({ window: windowObject, container, hostname: "localhost" });

  assert.equal(widgetId, "widget-1");
  assert.deepEqual(calls, [{ container, config: { sitekey: "1x00000000000000000000AA", action: "lead_capture" } }]);
});

test("Turnstile lifecycle accepts only successful tokens and clears expired/error/consumed tokens", () => {
  const resets = [];
  const status = { textContent: "" };
  const lifecycle = createTurnstileLifecycle({
    turnstile: { reset: (widgetId) => resets.push(widgetId) },
    widgetId: "widget-1",
    statusRegion: status,
  });

  lifecycle.onSuccess("token-one");
  assert.equal(lifecycle.getToken(), "token-one");
  assert.equal(lifecycle.consumeToken(), "token-one");
  assert.equal(lifecycle.getToken(), null);
  lifecycle.onExpired();
  assert.equal(lifecycle.getToken(), null);
  assert.match(status.textContent, /expired|again|retry/i);
  lifecycle.onError();
  assert.equal(lifecycle.getToken(), null);
  assert.match(status.textContent, /error|again|retry/i);
  lifecycle.retry();
  assert.deepEqual(resets, ["widget-1"]);
});

test("client validation requires only phone and allows all other personal fields to be blank", () => {
  const errors = validateLeadFields({
    firstName: "",
    lastName: " ",
    companyName: "",
    email: "",
    businessWebsite: "",
    phone: "",
  });

  assert.deepEqual(Object.keys(errors), ["phone"]);
  assert.match(errors.phone, /required/i);
});

test("optional personal fields are validated when supplied", () => {
  const errors = validateLeadFields({
    firstName: "a".repeat(81), lastName: "Valid", companyName: "Business",
    businessWebsite: "javascript:alert(1)", email: "not-an-email", phone: "+61412345678",
  });
  assert.deepEqual(Object.keys(errors).sort(), ["businessWebsite", "email", "firstName"]);
});

test("client validation accepts human phone separators and enforces shared field limits", () => {
  assert.deepEqual(
    validateLeadFields({
      firstName: "Kelly",
      lastName: "Serna",
      companyName: "Ranking Rebels",
      email: "kelly@example.com",
      phone: "+61 (400) 000-000",
    }),
    {},
  );

  const tooLong = validateLeadFields({
    firstName: "a".repeat(81),
    lastName: "Valid",
    companyName: "b".repeat(121),
    email: `${"a".repeat(250)}@x.com`,
    phone: "+12345678",
  });
  assert.match(tooLong.firstName, /80/);
  assert.match(tooLong.companyName, /120/);
  assert.match(tooLong.email, /254/);
});

test("field errors are visible, associated accessibly, and focus the first invalid field", () => {
  const attributes = {};
  const classes = new Set();
  const fields = {
    firstName: { setAttribute: (key, value) => { attributes.firstName = { ...(attributes.firstName || {}), [key]: value }; }, focus() { this.focused = true; } },
    email: { setAttribute: (key, value) => { attributes.email = { ...(attributes.email || {}), [key]: value }; }, focus() { this.focused = true; } },
  };
  const messages = { firstName: { id: "error-first-name", textContent: "" }, email: { id: "error-email", textContent: "" } };
  const form = {
    classList: { add: (name) => classes.add(name) },
    querySelector(selector) {
      const field = selector.match(/name="([^"]+)"/)?.[1];
      if (field) return fields[field];
      const message = selector.match(/data-error-for="([^"]+)"/)?.[1];
      return message ? messages[message] : null;
    },
  };

  applyLeadFieldErrors(form, { firstName: "First name is required.", email: "Enter a valid email address." });

  assert.equal(messages.firstName.textContent, "First name is required.");
  assert.equal(attributes.firstName["aria-invalid"], "true");
  assert.equal(attributes.firstName["aria-describedby"], "error-first-name");
  assert.equal(fields.firstName.focused, true);
  assert.equal(classes.has("has-error"), true);
});

test("pending state disables submit and exposes aria-busy until cleared", () => {
  const submit = { disabled: false };
  const attributes = {};
  const classes = new Set();
  const form = { classList: { toggle: (name, active) => active ? classes.add(name) : classes.delete(name) }, querySelector: () => submit, setAttribute: (key, value) => { attributes[key] = value; }, removeAttribute: (key) => { delete attributes[key]; } };

  setLeadFormPending(form, true);
  assert.equal(submit.disabled, true);
  assert.equal(attributes["aria-busy"], "true");
  assert.equal(classes.has("is-pending"), true);
  setLeadFormPending(form, false);
  assert.equal(submit.disabled, false);
  assert.equal(attributes["aria-busy"], undefined);
  assert.equal(classes.has("is-pending"), false);
});

test("submission shows the exact pending message and blocks functional double-submit", async () => {
  let resolveSave;
  let saveCalls = 0;
  const savePromise = new Promise((resolve) => { resolveSave = resolve; });
  const submit = { disabled: false };
  const status = { textContent: "" };
  const attributes = {};
  const form = {
    querySelector(selector) {
      if (selector === 'button[type="submit"]') return submit;
      if (selector === '[aria-live]') return status;
      return null;
    },
    setAttribute: (key, value) => { attributes[key] = value; },
    removeAttribute: (key) => { delete attributes[key]; },
  };
  const save = () => { saveCalls += 1; return savePromise; };

  const first = submitLeadCapture({ form, save });
  const duplicate = submitLeadCapture({ form, save });
  assert.strictEqual(first, duplicate);
  assert.equal(saveCalls, 1);
  assert.equal(status.textContent, "Saving your details…");
  assert.equal(attributes["aria-busy"], "true");
  assert.equal(submit.disabled, true);

  resolveSave({ ok: true });
  await first;
  assert.equal(attributes["aria-busy"], undefined);
  assert.equal(submit.disabled, false);
});

test("request failures close a reserved tab, preserve fields, and expose only a retryable safe error", async () => {
  for (const failure of [
    { fetchImpl: async () => { throw new Error("network internals"); } },
    { fetchImpl: async () => ({ ok: false, status: 413 }) },
    { fetchImpl: async () => ({ ok: false, status: 422 }) },
    { fetchImpl: async () => ({ ok: false, status: 500 }) },
  ]) {
    const fields = { firstName: "Kelly", email: "kelly@example.com", phone: "+61400000000" };
    const original = JSON.stringify(fields);
    const status = { textContent: "" };
    const reservedWindow = { closed: false, close() { this.closed = true; } };
    let turnstileReset = 0;
    const result = await submitLeadCaptureRequest({
      payload: fields,
      fetchImpl: failure.fetchImpl,
      reservedWindow,
      statusRegion: status,
      turnstile: { reset() { turnstileReset += 1; } },
    });

    assert.equal(result.ok, false);
    assert.equal(reservedWindow.closed, true);
    assert.equal(JSON.stringify(fields), original);
    assert.match(status.textContent, /try again|again/i);
    assert.doesNotMatch(status.textContent, /network internals|kelly|61400000000|500|413|422/i);
    assert.equal(turnstileReset, 1);
  }
});

test("submission reserves the WhatsApp transition page synchronously before invoking fetch", async () => {
  const events = [];
  const reservedWindow = { close() {} };
  const request = submitLeadCaptureRequest({
    payload: { firstName: "Kelly" },
    openWindow: () => { events.push("open"); return reservedWindow; },
    fetchImpl: async () => { events.push("fetch"); return { ok: false, status: 500 }; },
    statusRegion: { textContent: "" },
  });

  assert.deepEqual(events, ["open", "fetch"]);
  await request;
});

test("temporary tab uses a safe holding page, is opener-free, and carries no lead data", async () => {
  let openArgs;
  const temporaryTab = { opener: { personal: "PII" }, close() {} };
  const request = submitLeadCaptureRequest({
    payload: { email: "kelly@example.com", message: "private details" },
    openWindow: (...args) => { openArgs = args; return temporaryTab; },
    fetchImpl: async () => ({ ok: false, status: 500 }),
    statusRegion: { textContent: "" },
  });
  await request;

  assert.deepEqual(openArgs, ["/assets/whatsapp-redirect.html", "_blank"]);
  assert.equal(temporaryTab.opener, null);
  assert.equal(openArgs.some((value) => /kelly|private|email|\?|#/.test(String(value))), false);
});

test("valid success persists safe state, resets controls, waits 600ms, then navigates WhatsApp", async () => {
  const localStorage = { ...memoryStorage() };
  const sessionStorage = { ...memoryStorage() };
  const events = [];
  const reservedWindow = { location: { href: "about:blank" }, close() {} };
  const form = { reset() { events.push("form-reset"); } };
  const controller = { resetCapture() { events.push("controller-reset"); } };
  const turnstile = { reset() { events.push("turnstile-reset"); } };
  const dialog = { close() { events.push("dialog-close"); } };
  const statusRegion = { textContent: "" };
  const waits = [];
  const whatsappUrl = "https://wa.me/61439499441?text=hello";

  await completeLeadCaptureSuccess({
    response: { ok: true, submissionId: validSubmissionId },
    localStorage,
    sessionStorage,
    submissionId: validSubmissionId,
    submittedAt: "2026-09-03T00:00:00.000Z",
    firstName: "Kelly",
    email: "kelly@example.com",
    form,
    controller,
    turnstile,
    dialog,
    statusRegion,
    reservedWindow,
    whatsappUrl,
    wait: (duration) => { waits.push(duration); return Promise.resolve(); },
  });

  assert.equal(statusRegion.textContent, "Details saved — opening WhatsApp…");
  assert.deepEqual(waits, [600]);
  assert.deepEqual(events, ["form-reset", "controller-reset", "turnstile-reset", "dialog-close"]);
  assert.equal(reservedWindow.location.href, whatsappUrl);
  assert.doesNotMatch(localStorage.getItem("rr.lead.receipt.v1"), /Kelly|kelly|email/i);
});

test("success shows external status before waiting and navigating after 600ms", async () => {
  const events = [];
  const dialog = { close() { events.push("close"); } };
  const reservedWindow = { location: { href: "about:blank" } };
  await completeLeadCaptureSuccess({
    response: { ok: true }, submissionId: validSubmissionId,
    localStorage: memoryStorage(), sessionStorage: memoryStorage(), dialog, reservedWindow,
    whatsappUrl: "https://wa.me/example", show: (message) => events.push(`show:${message}`),
    wait: async (duration) => { events.push(`wait:${duration}`); },
  });
  events.push(`navigate:${reservedWindow.location.href}`);
  assert.deepEqual(events, [
    "close",
    "show:Details saved — opening WhatsApp…",
    "wait:600",
    "navigate:https://wa.me/example",
  ]);
});

test("blocked popup falls back to the current window only after persistence and the 600ms wait", async () => {
  const events = [];
  const localStorage = memoryStorage();
  const sessionStorage = memoryStorage();
  const currentWindow = { location: { set href(value) { events.push(`navigate:${value}`); } } };
  const wait = async () => {
    assert.notEqual(localStorage.getItem("rr.lead.receipt.v1"), null);
    events.push("wait");
  };

  await completeLeadCaptureSuccess({
    response: { ok: true, submissionId: validSubmissionId },
    localStorage,
    sessionStorage,
    submissionId: validSubmissionId,
    submittedAt: "2026-09-03T00:00:00.000Z",
    currentWindow,
    whatsappUrl: "https://wa.me/61439499441?text=hello",
    wait,
  });

  assert.deepEqual(events, ["wait", "navigate:https://wa.me/61439499441?text=hello"]);
});

test("return detection handles load/pageshow/visible-change/focus once per receipt", () => {
  const listeners = {};
  const target = {
    addEventListener(type, listener) { listeners[type] = listener; },
    dispatch(type, event = {}) { listeners[type]?.(event); },
  };
  const localStorage = memoryStorage();
  const sessionStorage = memoryStorage();
  localStorage.setItem("rr.lead.receipt.v1", JSON.stringify({ submissionId: validSubmissionId, submittedAt: "2026-09-02T00:00:00.000Z" }));
  const statusRegion = { textContent: "" };
  let shown = 0;
  const watcher = createLeadReturnWatcher({
    target,
    localStorage,
    sessionStorage,
    now: new Date("2026-09-03T00:00:00.000Z"),
    show: (message) => { shown += 1; statusRegion.textContent = message; },
  });

  watcher.start();
  target.dispatch("pageshow");
  target.dispatch("visibilitychange", { visibilityState: "hidden" });
  target.dispatch("visibilitychange", { visibilityState: "visible" });
  target.dispatch("focus");

  assert.equal(shown, 1);
  assert.equal(statusRegion.textContent, "Your details were saved successfully.");
  assert.deepEqual(JSON.parse(sessionStorage.getItem("rr.lead.session.v1")), {
    capturedSubmissionId: null,
    receiptShownSubmissionId: validSubmissionId,
  });
});

test("return watcher listens for pageshow/focus on window and visibilitychange on document", () => {
  const windowListeners = {};
  const documentListeners = {};
  const target = { addEventListener(type, listener) { windowListeners[type] = listener; } };
  const documentObject = { visibilityState: "hidden", addEventListener(type, listener) { documentListeners[type] = listener; } };
  const localStorage = memoryStorage();
  const sessionStorage = memoryStorage();
  localStorage.setItem("rr.lead.receipt.v1", JSON.stringify({ submissionId: validSubmissionId, submittedAt: "2026-09-02T00:00:00.000Z" }));
  let shown = 0;
  createLeadReturnWatcher({ target, document: documentObject, localStorage, sessionStorage, now: new Date("2026-09-03T00:00:00.000Z"), show: () => { shown += 1; } }).start();
  shown = 0;
  sessionStorage.setItem("rr.lead.session.v1", JSON.stringify({ capturedSubmissionId: null, receiptShownSubmissionId: null }));
  assert.equal(typeof windowListeners.pageshow, "function");
  assert.equal(typeof windowListeners.focus, "function");
  assert.equal(typeof documentListeners.visibilitychange, "function");
  documentListeners.visibilitychange({ type: "visibilitychange" });
  assert.equal(shown, 0);
  documentObject.visibilityState = "visible";
  documentListeners.visibilitychange({ type: "visibilitychange" });
  assert.equal(shown, 1);
});

test("a captured session bypasses the dialog and opens the CTA WhatsApp URL", () => {
  const opened = [];
  const dialog = { showModal() { throw new Error("dialog should not open"); } };
  const result = open({
    dialog,
    state: { session: { capturedSubmissionId: validSubmissionId } },
    whatsappUrl: "https://wa.me/61439499441?text=hello",
    openWindow: (...args) => { opened.push(args); },
  });
  assert.equal(result, null);
  assert.deepEqual(opened, [["https://wa.me/61439499441?text=hello", "_blank", "noopener,noreferrer"]]);
});

test("selector context without state reads captured session storage and opens WhatsApp directly", () => {
  const opened = [];
  const dialog = { showModal() { throw new Error("dialog should not open"); } };
  const localStorage = memoryStorage();
  const sessionStorage = memoryStorage();
  sessionStorage.setItem("rr.lead.session.v1", JSON.stringify({
    capturedSubmissionId: validSubmissionId,
    receiptShownSubmissionId: null,
  }));

  const result = open({
    dialog,
    window: { localStorage, sessionStorage },
    whatsappUrl: "https://wa.me/61439499441?text=selector",
    openWindow: (...args) => opened.push(args),
  });

  assert.equal(result, null);
  assert.deepEqual(opened, [["https://wa.me/61439499441?text=selector", "_blank", "noopener,noreferrer"]]);
});

test("a new session with only a local receipt does not bypass the form", () => {
  let shown = 0;
  const dialog = { showModal() { shown += 1; } };
  open({ dialog, state: { receipt: { submissionId: validSubmissionId }, session: { capturedSubmissionId: null } } });
  assert.equal(shown, 1);
});

test("init starts return toast handling without capturing the new session", () => {
  const listeners = {};
  const target = { addEventListener(type, listener) { listeners[type] = listener; } };
  const localStorage = memoryStorage();
  const sessionStorage = memoryStorage();
  localStorage.setItem("rr.lead.receipt.v1", JSON.stringify({ submissionId: validSubmissionId, submittedAt: "2026-09-02T00:00:00.000Z" }));
  let toastCount = 0;
  let toastText = "";
  init({ target, localStorage, sessionStorage, now: new Date("2026-09-03T00:00:00.000Z"), show: (text) => { toastCount += 1; toastText = text; } });
  assert.equal(toastCount, 1);
  assert.equal(toastText, "Your details were saved successfully.");
  assert.equal(JSON.parse(sessionStorage.getItem("rr.lead.session.v1")).capturedSubmissionId, null);
  listeners.focus();
  assert.equal(toastCount, 1);
});
