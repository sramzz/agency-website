(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.RankingRebelsLeadCapture = factory();
    const safeDocument = root.document || null;
    const safeStorage = (name) => { try { return root[name] || null; } catch (_error) { return null; } };
    root.RankingRebelsLeadCapture.init({ ...(root.RankingRebelsLeadCaptureConfig || {}), target: safeDocument, document: safeDocument, window: root, localStorage: safeStorage("localStorage"), sessionStorage: safeStorage("sessionStorage") });
  }
})(typeof self !== "undefined" ? self : this, function () {
  const RECEIPT_KEY = "rr.lead.receipt.v1";
  const SESSION_KEY = "rr.lead.session.v1";
  const RECEIPT_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
  const DEFAULT_NOTICE_VERSION = "2026-09-05";
  const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const ISO_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  const COUNTRY_CALLING_CODES = "AC:247,AD:376,AE:971,AF:93,AG:1,AI:1,AL:355,AM:374,AO:244,AR:54,AS:1,AT:43,AU:61,AW:297,AX:358,AZ:994,BA:387,BB:1,BD:880,BE:32,BF:226,BG:359,BH:973,BI:257,BJ:229,BL:590,BM:1,BN:673,BO:591,BQ:599,BR:55,BS:1,BT:975,BW:267,BY:375,BZ:501,CA:1,CC:61,CD:243,CF:236,CG:242,CH:41,CI:225,CK:682,CL:56,CM:237,CN:86,CO:57,CR:506,CU:53,CV:238,CW:599,CX:61,CY:357,CZ:420,DE:49,DJ:253,DK:45,DM:1,DO:1,DZ:213,EC:593,EE:372,EG:20,EH:212,ER:291,ES:34,ET:251,FI:358,FJ:679,FK:500,FM:691,FO:298,FR:33,GA:241,GB:44,GD:1,GE:995,GF:594,GG:44,GH:233,GI:350,GL:299,GM:220,GN:224,GP:590,GQ:240,GR:30,GT:502,GU:1,GW:245,GY:592,HK:852,HN:504,HR:385,HT:509,HU:36,ID:62,IE:353,IL:972,IM:44,IN:91,IO:246,IQ:964,IR:98,IS:354,IT:39,JE:44,JM:1,JO:962,JP:81,KE:254,KG:996,KH:855,KI:686,KM:269,KN:1,KP:850,KR:82,KW:965,KY:1,KZ:7,LA:856,LB:961,LC:1,LI:423,LK:94,LR:231,LS:266,LT:370,LU:352,LV:371,LY:218,MA:212,MC:377,MD:373,ME:382,MF:590,MG:261,MH:692,MK:389,ML:223,MM:95,MN:976,MO:853,MP:1,MQ:596,MR:222,MS:1,MT:356,MU:230,MV:960,MW:265,MX:52,MY:60,MZ:258,NA:264,NC:687,NE:227,NF:672,NG:234,NI:505,NL:31,NO:47,NP:977,NR:674,NU:683,NZ:64,OM:968,PA:507,PE:51,PF:689,PG:675,PH:63,PK:92,PL:48,PM:508,PR:1,PS:970,PT:351,PW:680,PY:595,QA:974,RE:262,RO:40,RS:381,RU:7,RW:250,SA:966,SB:677,SC:248,SD:249,SE:46,SG:65,SH:290,SI:386,SJ:47,SK:421,SL:232,SM:378,SN:221,SO:252,SR:597,SS:211,ST:239,SV:503,SX:1,SY:963,SZ:268,TA:290,TC:1,TD:235,TG:228,TH:66,TJ:992,TK:690,TL:670,TM:993,TN:216,TO:676,TR:90,TT:1,TV:688,TW:886,TZ:255,UA:380,UG:256,US:1,UY:598,UZ:998,VA:39,VC:1,VE:58,VG:1,VI:1,VN:84,VU:678,WF:681,WS:685,XK:383,YE:967,YT:262,ZA:27,ZM:260,ZW:263";
  const callingCodes = Object.fromEntries(COUNTRY_CALLING_CODES.split(",").map((entry) => entry.split(":")));
  const countryName = (iso) => {
    try {
      return new Intl.DisplayNames(["en"], { type: "region" }).of(iso) || iso;
    } catch (_error) {
      return iso;
    }
  };
  const countryCallingCodeEntries = () => Object.entries(callingCodes)
    .map(([iso, callingCode]) => ({ iso, callingCode, name: countryName(iso) }))
    .sort((left, right) => left.name.localeCompare(right.name, "en"));
  const escapeHtml = (value) => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  const renderCountryCallingCodeOptions = (selectedIso = "AU") => countryCallingCodeEntries()
    .map(({ iso, callingCode, name }) => `<option value="${iso}"${iso === selectedIso ? " selected" : ""}>${escapeHtml(name)} (+${callingCode})</option>`)
    .join("");
  const renderCountryPickerOptions = (selectedIso = "AU") => countryCallingCodeEntries()
    .map(({ iso, callingCode, name }) => `<li><button type="button" class="rr-lead-capture-country-option" data-country-option="${iso}"${iso === selectedIso ? " aria-current=\"true\"" : ""}><span class="rr-lead-capture-country-option-flag flag:${iso}" aria-hidden="true"></span><span class="rr-lead-capture-country-option-name">${escapeHtml(name)}</span><span class="rr-lead-capture-country-option-code">+${callingCode}</span></button></li>`)
    .join("");
  const getPhoneCountryDisplay = (countryIso = "AU") => {
    const iso = String(countryIso || "AU").toUpperCase();
    const fallbackIso = callingCodes[iso] ? iso : "AU";
    return { iso: fallbackIso, flagClass: `flag:${fallbackIso}`, dialCode: `+${callingCodes[fallbackIso]}` };
  };
  const syncPhoneCountryDisplay = (select, root) => {
    const display = getPhoneCountryDisplay(select && select.value);
    const scope = root || (select && typeof select.closest === "function" ? select.closest("form") : null);
    const flag = scope && typeof scope.querySelector === "function" ? scope.querySelector("[data-country-flag]") : null;
    const dialCode = scope && typeof scope.querySelector === "function" ? scope.querySelector("[data-country-dial-code]") : null;
    const trigger = scope && typeof scope.querySelector === "function" ? scope.querySelector("[data-country-trigger]") : null;
    if (flag) flag.className = `rr-lead-capture-country-flag ${display.flagClass}`;
    if (dialCode) dialCode.textContent = display.dialCode;
    if (trigger && typeof trigger.setAttribute === "function") {
      trigger.setAttribute("aria-label", `Choose country calling code. ${countryName(display.iso)} ${display.dialCode} selected.`);
    }
    if (scope && typeof scope.querySelectorAll === "function") {
      scope.querySelectorAll("[data-country-option]").forEach((option) => {
        if (typeof option.setAttribute === "function") option.setAttribute("aria-current", option.dataset?.countryOption === display.iso ? "true" : "false");
      });
    }
    return display;
  };
  const selectPhoneCountry = (select, root, countryIso) => {
    if (!select) return getPhoneCountryDisplay(countryIso);
    const next = getPhoneCountryDisplay(countryIso);
    select.value = next.iso;
    const display = syncPhoneCountryDisplay(select, root);
    if (typeof select.dispatchEvent === "function") {
      const changeEvent = typeof Event === "function" ? new Event("change", { bubbles: true }) : { type: "change" };
      select.dispatchEvent(changeEvent);
    }
    return display;
  };

  const isCountryPickerOpen = (menu) => {
    try {
      if (typeof menu?.matches === "function" && menu.matches(":popover-open")) return true;
    } catch (_error) {
      // Older browsers do not understand the :popover-open selector.
    }
    return menu?.getAttribute?.("data-fallback-open") === "true";
  };

  const closeCountryPicker = (root, { restoreFocus = false } = {}) => {
    const menu = root && typeof root.querySelector === "function" ? root.querySelector("[data-country-menu]") : null;
    const trigger = root && typeof root.querySelector === "function" ? root.querySelector("[data-country-trigger]") : null;
    if (!menu) return;
    if (typeof menu.hidePopover === "function" && isCountryPickerOpen(menu)) menu.hidePopover();
    menu.removeAttribute?.("data-fallback-open");
    trigger?.setAttribute?.("aria-expanded", "false");
    if (restoreFocus) trigger?.focus?.();
  };

  const positionCountryPicker = (root, windowObject) => {
    const menu = root?.querySelector?.("[data-country-menu]");
    const phoneRow = root?.querySelector?.(".rr-lead-capture-phone-row");
    if (!menu || !phoneRow || typeof phoneRow.getBoundingClientRect !== "function") return;
    const rect = phoneRow.getBoundingClientRect();
    const viewportWidth = windowObject?.innerWidth || 1024;
    const viewportHeight = windowObject?.innerHeight || 768;
    const edge = 12;
    const width = Math.min(380, Math.max(280, rect.width), viewportWidth - edge * 2);
    const estimatedHeight = Math.min(360, viewportHeight - edge * 2);
    const left = Math.min(Math.max(edge, rect.left), Math.max(edge, viewportWidth - width - edge));
    const belowTop = rect.bottom + 8;
    const top = belowTop + estimatedHeight <= viewportHeight - edge
      ? belowTop
      : Math.max(edge, rect.top - estimatedHeight - 8);
    menu.style?.setProperty?.("--rr-country-menu-left", `${Math.round(left)}px`);
    menu.style?.setProperty?.("--rr-country-menu-top", `${Math.round(top)}px`);
    menu.style?.setProperty?.("--rr-country-menu-width", `${Math.round(width)}px`);
    menu.style?.setProperty?.("--rr-country-menu-max-height", `${Math.round(estimatedHeight)}px`);
  };

  const bindPhoneCountryPicker = (select, root, windowObject) => {
    if (!select || !root || select._leadCapturePickerBound) return;
    const trigger = root.querySelector?.("[data-country-trigger]");
    const menu = root.querySelector?.("[data-country-menu]");
    const options = Array.from(root.querySelectorAll?.("[data-country-option]") || []);
    if (!trigger || !menu || !options.length) return;
    const selectedOption = () => options.find((option) => option.dataset?.countryOption === select.value) || options[0];
    const openPicker = () => {
      positionCountryPicker(root, windowObject);
      trigger.setAttribute?.("aria-expanded", "true");
      if (typeof menu.showPopover === "function") menu.showPopover();
      else menu.setAttribute?.("data-fallback-open", "true");
      selectedOption()?.scrollIntoView?.({ block: "nearest" });
      selectedOption()?.focus?.({ preventScroll: true });
    };
    const isOpen = () => isCountryPickerOpen(menu);
    trigger.addEventListener?.("click", () => isOpen() ? closeCountryPicker(root) : openPicker());
    trigger.addEventListener?.("keydown", (event) => {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault?.();
        if (!isOpen()) openPicker();
      }
    });
    options.forEach((option, index) => {
      option.addEventListener?.("click", () => {
        selectPhoneCountry(select, root, option.dataset.countryOption);
        closeCountryPicker(root, { restoreFocus: true });
      });
      option.addEventListener?.("keydown", (event) => {
        if (event.key === "Escape") {
          event.preventDefault?.();
          closeCountryPicker(root, { restoreFocus: true });
          return;
        }
        const offset = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
        if (offset) {
          event.preventDefault?.();
          options[(index + offset + options.length) % options.length]?.focus?.();
        }
      });
    });
    menu.addEventListener?.("toggle", (event) => trigger.setAttribute?.("aria-expanded", event.newState === "open" ? "true" : "false"));
    select.addEventListener?.("change", () => syncPhoneCountryDisplay(select, root));
    select._leadCapturePickerBound = true;
  };
  const combinePhoneNumber = (countryIso, input) => {
    const value = typeof input === "string" ? input.trim() : "";
    if (!value) return "";
    if (value.startsWith("+")) return `+${value.slice(1).replace(/\D/g, "")}`;
    const callingCode = callingCodes[String(countryIso || "").toUpperCase()];
    if (!callingCode) return value;
    let nationalNumber = value.replace(/\D/g, "");
    if (nationalNumber.startsWith("0") && !["IT", "SM", "VA"].includes(String(countryIso).toUpperCase())) nationalNumber = nationalNumber.slice(1);
    return `+${callingCode}${nationalNumber}`;
  };
  const normalizeBusinessWebsite = (input) => {
    const value = typeof input === "string" ? input.trim() : "";
    if (!value) return "";
    if (value.length > 2048 || /\s/.test(value)) return null;
    try {
      const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
      if (!/^https?:$/.test(url.protocol) || !url.hostname || url.username || url.password || url.href.length > 2048) return null;
      return url.href;
    } catch (_error) {
      return null;
    }
  };

  const emptySession = () => ({
    capturedSubmissionId: null,
    receiptShownSubmissionId: null,
  });

  const getStorage = (provided, name) => {
    if (provided) return provided;
    try {
      return typeof window !== "undefined" ? window[name] : null;
    } catch (_error) {
      return null;
    }
  };

  const safelyRead = (storage, key) => {
    try {
      return storage && typeof storage.getItem === "function" ? storage.getItem(key) : null;
    } catch (_error) {
      return null;
    }
  };

  const safelyRemove = (storage, key) => {
    try {
      if (storage && typeof storage.removeItem === "function") storage.removeItem(key);
    } catch (_error) {
      // Storage can be unavailable (for example, in private browsing).
    }
  };

  const safelyWrite = (storage, key, value) => {
    try {
      if (storage && typeof storage.setItem === "function") storage.setItem(key, JSON.stringify(value));
    } catch (_error) {
      // Storage can be unavailable (for example, in private browsing).
    }
  };

  const isValidTimestamp = (value) => {
    if (typeof value !== "string" || !ISO_TIMESTAMP.test(value)) return false;
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) && new Date(parsed).toISOString() === value;
  };

  const isValidReceipt = (value, now) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const keys = Object.keys(value).sort();
    if (keys.length !== 2 || keys[0] !== "submissionId" || keys[1] !== "submittedAt") return false;
    if (!UUID_V4.test(value.submissionId) || !isValidTimestamp(value.submittedAt)) return false;
    const submittedAt = Date.parse(value.submittedAt);
    return submittedAt < now && now - submittedAt < RECEIPT_MAX_AGE_MS;
  };

  const isValidSession = (value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const keys = Object.keys(value).sort();
    if (keys.length !== 2 || keys[0] !== "capturedSubmissionId" || keys[1] !== "receiptShownSubmissionId") return false;
    return [value.capturedSubmissionId, value.receiptShownSubmissionId].every(
      (id) => id === null || (typeof id === "string" && UUID_V4.test(id)),
    );
  };

  const readLeadCaptureState = (options = {}) => {
    const localStorage = getStorage(options.localStorage, "localStorage");
    const sessionStorage = getStorage(options.sessionStorage, "sessionStorage");
    const nowValue = options.now instanceof Date ? options.now.getTime() : Date.parse(options.now || new Date().toISOString());
    const now = Number.isFinite(nowValue) ? nowValue : Date.now();

    let receipt = null;
    const rawReceipt = safelyRead(localStorage, RECEIPT_KEY);
    if (rawReceipt !== null) {
      try {
        const parsed = JSON.parse(rawReceipt);
        if (isValidReceipt(parsed, now)) receipt = parsed;
        else safelyRemove(localStorage, RECEIPT_KEY);
      } catch (_error) {
        safelyRemove(localStorage, RECEIPT_KEY);
      }
    }

    let session = emptySession();
    const rawSession = safelyRead(sessionStorage, SESSION_KEY);
    if (rawSession !== null) {
      try {
        const parsed = JSON.parse(rawSession);
        if (isValidSession(parsed)) session = parsed;
        else safelyRemove(sessionStorage, SESSION_KEY);
      } catch (_error) {
        safelyRemove(sessionStorage, SESSION_KEY);
      }
    }

    return { receipt, session };
  };

  const shouldBypassLeadForm = (state) =>
    Boolean(state && state.session && typeof state.session.capturedSubmissionId === "string" && UUID_V4.test(state.session.capturedSubmissionId));

  const consumeLeadReceiptForSession = (state) => {
    const current = state && typeof state === "object" ? state : {};
    const receipt = current.receipt && typeof current.receipt === "object" ? current.receipt : null;
    const session = current.session && typeof current.session === "object" ? current.session : emptySession();
    if (!receipt || !UUID_V4.test(receipt.submissionId) || session.receiptShownSubmissionId === receipt.submissionId) {
      return { showReceipt: false, state: current };
    }
    return {
      showReceipt: true,
      state: {
        ...current,
        session: { ...session, receiptShownSubmissionId: receipt.submissionId },
      },
    };
  };

  const defaultGenerateSubmissionId = () => {
    const cryptoObject = typeof globalThis !== "undefined" ? globalThis.crypto : null;
    if (!cryptoObject || typeof cryptoObject.randomUUID !== "function") {
      throw new Error("crypto.randomUUID is required to create a submission");
    }
    return cryptoObject.randomUUID();
  };

  const persistLeadCaptureSuccess = (options = {}) => {
    const localStorage = getStorage(options.localStorage, "localStorage");
    const sessionStorage = getStorage(options.sessionStorage, "sessionStorage");
    const submissionId = options.submissionId;
    const submittedAt = options.submittedAt || new Date().toISOString();
    safelyWrite(localStorage, RECEIPT_KEY, { submissionId, submittedAt });
    safelyWrite(sessionStorage, SESSION_KEY, {
      capturedSubmissionId: submissionId,
      receiptShownSubmissionId: null,
    });
  };

  const createLeadCaptureController = ({ generateSubmissionId = defaultGenerateSubmissionId } = {}) => {
    let submissionId = null;
    const beginCapture = () => {
      if (!submissionId) submissionId = generateSubmissionId();
      return { submissionId };
    };
    const retryCapture = () => beginCapture();
    const resetCapture = () => {
      submissionId = null;
    };
    return { beginCapture, retryCapture, resetCapture };
  };

  const renderLeadCaptureDialog = () => `
    <dialog id="rr-lead-capture-dialog" class="rr-lead-capture-dialog" aria-labelledby="lead-dialog-title" aria-describedby="lead-dialog-description">
      <form method="dialog" novalidate class="rr-lead-capture-form">
        <button type="button" class="rr-lead-capture-close" data-dialog-close aria-label="Close"><span aria-hidden="true">×</span></button>
        <h2 id="lead-dialog-title">Let's talk about better results</h2>
        <p id="lead-dialog-description">If you are ready to grow your business, we are ready to be your partner.</p>
        <div class="rr-lead-capture-field-group rr-lead-capture-field-group--full">
          <label class="rr-lead-capture-field rr-lead-capture-field--sr" for="lead-first-name">First Name</label>
          <input id="lead-first-name" name="firstName" autocomplete="given-name" placeholder="First Name">
          <span class="rr-lead-capture-error" data-error-for="firstName" id="error-first-name" aria-live="polite"></span>
        </div>
        <div class="rr-lead-capture-field-group rr-lead-capture-field-group--full">
          <label class="rr-lead-capture-field rr-lead-capture-field--sr" for="lead-last-name">Last Name</label>
          <input id="lead-last-name" name="lastName" autocomplete="family-name" placeholder="Last Name">
          <span class="rr-lead-capture-error" data-error-for="lastName" id="error-last-name" aria-live="polite"></span>
        </div>
        <div class="rr-lead-capture-field-group rr-lead-capture-field-group--full">
          <label class="rr-lead-capture-field rr-lead-capture-field--sr" for="lead-company-name">Company Name</label>
          <input id="lead-company-name" name="companyName" autocomplete="organization" placeholder="Company Name">
          <span class="rr-lead-capture-error" data-error-for="companyName" id="error-company-name" aria-live="polite"></span>
        </div>
        <div class="rr-lead-capture-field-group rr-lead-capture-field-group--full">
          <label class="rr-lead-capture-field rr-lead-capture-field--sr" for="lead-email">Email</label>
          <input id="lead-email" name="email" type="email" autocomplete="email" placeholder="Email">
          <span class="rr-lead-capture-error" data-error-for="email" id="error-email" aria-live="polite"></span>
        </div>
        <div class="rr-lead-capture-field-group rr-lead-capture-field-group--full">
          <label class="rr-lead-capture-field rr-lead-capture-field--sr" for="lead-business-website">Website URL?</label>
          <input id="lead-business-website" name="businessWebsite" type="url" inputmode="url" autocomplete="url" placeholder="Website URL?">
          <span class="rr-lead-capture-error" data-error-for="businessWebsite" id="error-business-website" aria-live="polite"></span>
        </div>
        <div class="rr-lead-capture-field-group rr-lead-capture-field-group--full">
          <label class="rr-lead-capture-field rr-lead-capture-field--sr" for="lead-phone">Phone number</label>
          <div class="rr-lead-capture-phone-row">
            <span class="rr-lead-capture-country-picker">
              <button type="button" class="rr-lead-capture-country-trigger" data-country-trigger aria-expanded="false" aria-controls="lead-phone-country-menu" aria-haspopup="dialog" aria-label="Choose country calling code. Australia +61 selected.">
                <span class="rr-lead-capture-country-flag flag:AU" data-country-flag aria-hidden="true"></span>
              </button>
              <input class="rr-lead-capture-country-value" id="lead-phone-country" name="phoneCountry" type="hidden" value="AU">
            </span>
            <span class="rr-lead-capture-dial-code" data-country-dial-code aria-hidden="true">+61</span>
            <input id="lead-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="Phone number" required>
          </div>
          <div id="lead-phone-country-menu" class="rr-lead-capture-country-menu" popover="auto" data-country-menu role="dialog" aria-label="Choose country calling code">
            <ul class="rr-lead-capture-country-options">${renderCountryPickerOptions("AU")}</ul>
          </div>
          <span class="rr-lead-capture-error" data-error-for="phone" id="error-phone" aria-live="polite"></span>
        </div>
        <label class="rr-lead-capture-field rr-lead-capture-honeypot" for="lead-contact-reference" aria-hidden="true" hidden>Leave this field empty</label>
        <input class="rr-lead-capture-honeypot" id="lead-contact-reference" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" hidden>
        <div data-turnstile aria-label="Security verification"></div>
        <div id="lead-dialog-status" class="rr-lead-capture-toast" aria-live="polite"></div>
        <a href="/privacy/">Privacy Policy</a>
        <button type="submit"><span class="rr-lead-capture-spinner" aria-hidden="true"></span><span data-submit-label>Book a call</span></button>
      </form>
    </dialog>
  `.trim();

  let sharedDialog = null;
  const getSharedDialog = (documentObject) => {
    const documentRef = documentObject || (typeof document !== "undefined" ? document : null);
    if (!documentRef) return null;
    if (sharedDialog && sharedDialog.isConnected) return sharedDialog;
    sharedDialog = documentRef.getElementById("rr-lead-capture-dialog");
    if (sharedDialog) return sharedDialog;
    const parser = typeof DOMParser !== "undefined" ? new DOMParser() : null;
    if (!parser) return null;
    const parsed = parser.parseFromString(renderLeadCaptureDialog(), "text/html");
    sharedDialog = parsed.body.firstElementChild;
    if (typeof documentRef.importNode === "function") sharedDialog = documentRef.importNode(sharedDialog, true);
    documentRef.body.appendChild(sharedDialog);
    return sharedDialog;
  };

  const turnstileLoads = typeof WeakMap !== "undefined" ? new WeakMap() : new Map();
  const loadTurnstileScript = (options = {}) => {
    const documentRef = options.document || (typeof document !== "undefined" ? document : null);
    const windowRef = options.window || (typeof window !== "undefined" ? window : globalThis);
    if (!documentRef || !windowRef) return Promise.reject(new Error("Turnstile requires a document"));
    if (turnstileLoads.has(windowRef)) return turnstileLoads.get(windowRef);
    const promise = new Promise((resolve, reject) => {
      const script = documentRef.createElement("script");
      script.async = true;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.onload = () => resolve(windowRef.turnstile || null);
      script.onerror = () => {
        turnstileLoads.delete(windowRef);
        reject(new Error("Turnstile failed to load"));
      };
      (documentRef.head || documentRef.body).appendChild(script);
    });
    turnstileLoads.set(windowRef, promise);
    return promise;
  };

  let leadCaptureConfig = {};
  const listenerTargets = typeof WeakSet !== "undefined" ? new WeakSet() : new Set();
  const defaultShowToast = (text, documentObject) => {
    const documentRef = documentObject || (typeof document !== "undefined" ? document : null);
    if (!documentRef || !documentRef.body) return;
    const toast = documentRef.createElement("div");
    toast.textContent = text;
    toast.className = "rr-lead-capture-notice";
    toast.setAttribute("role", "status");
    documentRef.body.appendChild(toast);
      if (typeof setTimeout === "function") setTimeout(() => toast.remove(), 4000);
  };
  const init = (config = {}) => {
    leadCaptureConfig = { noticeVersion: DEFAULT_NOTICE_VERSION, ...config };
    if (typeof leadCaptureConfig.noticeVersion !== "string" || !leadCaptureConfig.noticeVersion.trim()) leadCaptureConfig.noticeVersion = DEFAULT_NOTICE_VERSION;
    const target = config.target || config.document;
    if (target && typeof target.addEventListener === "function" && !listenerTargets.has(target)) {
      listenerTargets.add(target);
      target.addEventListener("click", (event) => {
        const source = event.target && typeof event.target.closest === "function" ? event.target.closest("[data-lead-capture]") : null;
        if (!source) return;
        if (typeof event.preventDefault === "function") event.preventDefault();
        const documentRef = config.document || (typeof document !== "undefined" ? document : null);
        const bodyMarket = documentRef && documentRef.body && documentRef.body.dataset ? documentRef.body.dataset.market : "Not specified";
        open({
          trigger: source,
          href: source.getAttribute("href"),
          ctaLabel: source.textContent.trim(),
          market: source.dataset.market || bodyMarket,
          sourcePath: source.dataset.sourcePath || (typeof location !== "undefined" ? location.pathname : ""),
          whatsappUrl: source.getAttribute("href"),
          state: readLeadCaptureState({ localStorage: config.localStorage, sessionStorage: config.sessionStorage }),
          document: documentRef,
          openWindow: config.openWindow || (config.window && typeof config.window.open === "function" ? config.window.open.bind(config.window) : null),
          window: config.window || (typeof window !== "undefined" ? window : null),
          noticeVersion: config.noticeVersion || DEFAULT_NOTICE_VERSION,
          fetchImpl: config.fetchImpl,
          localStorage: config.localStorage,
          sessionStorage: config.sessionStorage,
          wait: config.wait,
          show: config.show || ((text) => defaultShowToast(text, config.document || (typeof document !== "undefined" ? document : null))),
          services: [],
        });
      });
    }
    if (target) {
      const documentRef = config.document || (target && target.nodeType === 9 ? target : null);
      const returnTarget = config.window || (typeof window !== "undefined" ? window : target);
      createLeadReturnWatcher({ target: returnTarget, document: documentRef, localStorage: config.localStorage, sessionStorage: config.sessionStorage, now: config.now, show: config.show || ((text) => defaultShowToast(text, documentRef)) }).start();
    }
    return leadCaptureConfig;
  };

  const resolveTurnstileSitekey = (locationObject) => {
    const hostname = typeof locationObject === "string" ? locationObject : locationObject && locationObject.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") return "1x00000000000000000000AA";
    if (typeof leadCaptureConfig.turnstileSitekey !== "string" || !leadCaptureConfig.turnstileSitekey.trim()) {
      throw new Error("Turnstile sitekey is required outside localhost");
    }
    return leadCaptureConfig.turnstileSitekey;
  };

  const renderTurnstile = ({ window: windowObject, container, hostname, callbacks, action = "lead_capture" } = {}) => {
    const turnstile = windowObject && windowObject.turnstile;
    if (!turnstile || typeof turnstile.render !== "function") throw new Error("Turnstile is not loaded");
    return turnstile.render(container, { sitekey: resolveTurnstileSitekey({ hostname }), action, ...(callbacks || {}) });
  };

  const createTurnstileLifecycle = ({ turnstile, widgetId, statusRegion } = {}) => {
    let currentWidgetId = widgetId;
    let token = null;
    const message = (text) => {
      if (statusRegion) statusRegion.textContent = text;
    };
    const onSuccess = (value) => {
      if (typeof value === "string" && value) {
        token = value;
        message("");
      } else {
        token = null;
        message("Verification failed. Please try again.");
      }
    };
    const clear = (text) => {
      token = null;
      message(text);
    };
    const consumeToken = () => {
      const consumed = token;
      token = null;
      return consumed;
    };
    const retry = () => {
      token = null;
      if (turnstile && typeof turnstile.reset === "function") turnstile.reset(currentWidgetId);
    };
    return {
      consumeToken,
      getToken: () => token,
      onError: () => clear("Verification error. Please try again."),
      onExpired: () => clear("Verification expired. Please try again."),
      onSuccess,
      retry,
      setWidgetId: (value) => { currentWidgetId = value; },
    };
  };

  const validateLeadFields = (fields = {}) => {
    const errors = {};
    const value = (name) => (typeof fields[name] === "string" ? fields[name].trim() : "");
    for (const [name, limit] of [["firstName", 80], ["lastName", 80], ["companyName", 120]]) {
      const field = value(name);
      if (field.length > limit) errors[name] = `Must be ${limit} characters or fewer.`;
    }
    const email = value("email");
    if (email.length > 254) errors.email = "Email must be 254 characters or fewer.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
    if (!email) delete errors.email;
    const businessWebsite = normalizeBusinessWebsite(value("businessWebsite"));
    if (businessWebsite === null) errors.businessWebsite = "Enter a valid website address.";
    const phone = value("phone");
    const phoneDigits = phone.replace(/[\s().-]/g, "");
    if (!phone) errors.phone = "This field is required.";
    else if (!phone.startsWith("+") || !/^\+[0-9]+$/.test(phoneDigits) || phoneDigits.length < 9 || phoneDigits.length > 16) {
      errors.phone = "Enter an international phone number with + and 8–15 digits.";
    }
    return errors;
  };

  const applyLeadFieldErrors = (form, errors = {}) => {
    let firstInvalid = null;
    if (form && form.classList && typeof form.classList.add === "function" && Object.keys(errors).length) form.classList.add("has-error");
    for (const [name, message] of Object.entries(errors)) {
      const field = form && typeof form.querySelector === "function" ? form.querySelector(`input[name="${name}"], select[name="${name}"], textarea[name="${name}"]`) : null;
      const errorNode = form && typeof form.querySelector === "function" ? form.querySelector(`[data-error-for="${name}"]`) : null;
      if (errorNode) errorNode.textContent = message || "";
      if (field && typeof field.setAttribute === "function") {
        field.setAttribute("aria-invalid", "true");
        if (errorNode && errorNode.id) field.setAttribute("aria-describedby", errorNode.id);
      }
      if (!firstInvalid && field) firstInvalid = field;
    }
    if (firstInvalid && typeof firstInvalid.focus === "function") firstInvalid.focus();
    return firstInvalid;
  };

  const clearLeadFieldErrors = (form) => {
    for (const name of ["firstName", "lastName", "companyName", "businessWebsite", "email", "phone"]) {
      const field = form && typeof form.querySelector === "function" ? form.querySelector(`[name="${name}"]`) : null;
      const errorNode = form && typeof form.querySelector === "function" ? form.querySelector(`[data-error-for="${name}"]`) : null;
      if (errorNode) errorNode.textContent = "";
      if (field && typeof field.removeAttribute === "function") {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
      }
    }
    if (form && form.classList && typeof form.classList.remove === "function") form.classList.remove("has-error");
  };

  const setLeadFormPending = (form, pending) => {
    const submit = form && typeof form.querySelector === "function" ? form.querySelector('button[type="submit"]') : null;
    if (submit) submit.disabled = Boolean(pending);
    if (form && typeof form.setAttribute === "function" && pending) form.setAttribute("aria-busy", "true");
    if (form && typeof form.removeAttribute === "function" && !pending) form.removeAttribute("aria-busy");
    if (form && form.classList && typeof form.classList.toggle === "function") form.classList.toggle("is-pending", Boolean(pending));
  };

  const getLeadStatusRegion = (formOrDialog) => {
    if (!formOrDialog || typeof formOrDialog.querySelector !== "function") return null;
    return formOrDialog.querySelector("#lead-dialog-status, .rr-lead-capture-toast") || formOrDialog.querySelector("[aria-live]");
  };

  const submissionGuards = typeof WeakMap !== "undefined" ? new WeakMap() : new Map();
  const submitLeadCapture = ({ form, save } = {}) => {
    if (!form || typeof save !== "function") return Promise.reject(new Error("A form and save function are required"));
    if (submissionGuards.has(form)) return submissionGuards.get(form);
    const status = getLeadStatusRegion(form);
    if (status) status.textContent = "Saving your details…";
    setLeadFormPending(form, true);
    let result;
    try {
      result = save();
    } catch (error) {
      result = Promise.reject(error);
    }
    const promise = Promise.resolve(result).finally(() => {
      submissionGuards.delete(form);
      setLeadFormPending(form, false);
    });
    submissionGuards.set(form, promise);
    return promise;
  };

  const submitLeadCaptureRequest = async ({ payload, fetchImpl, reservedWindow, openWindow, statusRegion, turnstile } = {}) => {
    const reserved = reservedWindow || (typeof openWindow === "function" ? openWindow("/assets/whatsapp-redirect.html", "_blank") : null);
    try {
      if (reserved && "opener" in reserved) reserved.opener = null;
    } catch (_error) {
      // Some window-like objects expose a read-only opener.
    }
    try {
      const request = fetchImpl || (typeof fetch === "function" ? fetch : null);
      if (!request) throw new Error("Request unavailable");
      const response = await request("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload || {}),
      });
      if (!response || !response.ok) throw new Error("Lead request failed");
      return { ok: true, reservedWindow: reserved };
    } catch (_error) {
      if (reserved && typeof reserved.close === "function") reserved.close();
      if (turnstile && typeof turnstile.reset === "function") turnstile.reset();
      if (statusRegion) statusRegion.textContent = "We couldn’t save your details. Please try again.";
      return { ok: false, error: "request_failed", reservedWindow: reserved };
    }
  };

  const completeLeadCaptureSuccess = async (options = {}) => {
    const { response, submissionId, submittedAt, localStorage, sessionStorage } = options;
    if (!response || response.ok !== true || typeof submissionId !== "string") throw new Error("Invalid lead response");
    persistLeadCaptureSuccess({ localStorage, sessionStorage, submissionId, submittedAt });
    if (options.form && typeof options.form.reset === "function") {
      options.form.reset();
      const phoneCountry = typeof options.form.querySelector === "function" ? options.form.querySelector('[name="phoneCountry"]') : null;
      if (phoneCountry) syncPhoneCountryDisplay(phoneCountry, options.form);
    }
    if (options.controller && typeof options.controller.resetCapture === "function") options.controller.resetCapture();
    if (options.turnstile && typeof options.turnstile.reset === "function") options.turnstile.reset();
    if (options.dialog && typeof options.dialog.close === "function") options.dialog.close();
    if (options.statusRegion) options.statusRegion.textContent = "Details saved — opening WhatsApp…";
    if (typeof options.show === "function") options.show("Details saved — opening WhatsApp…");
    const wait = options.wait || ((duration) => new Promise((resolve) => setTimeout(resolve, duration)));
    await wait(600);
    const destination = options.reservedWindow || options.currentWindow;
    if (destination && options.whatsappUrl) {
      if (destination.location) destination.location.href = options.whatsappUrl;
      else destination.location = options.whatsappUrl;
    }
    return { ok: true };
  };

  const createLeadReturnWatcher = (options = {}) => {
    const target = options.target || (typeof window !== "undefined" ? window : null);
    let started = false;
    const check = (event) => {
      if (event && event.type === "visibilitychange" && (event.visibilityState || (options.document && options.document.visibilityState)) !== "visible") return false;
      const state = readLeadCaptureState({ localStorage: options.localStorage, sessionStorage: options.sessionStorage, now: options.now });
      if (!state.receipt || state.session.receiptShownSubmissionId === state.receipt.submissionId) return false;
      safelyWrite(getStorage(options.sessionStorage, "sessionStorage"), SESSION_KEY, {
        capturedSubmissionId: state.session.capturedSubmissionId,
        receiptShownSubmissionId: state.receipt.submissionId,
      });
      if (typeof options.show === "function") options.show("Your details were saved successfully.");
      return true;
    };
    const start = () => {
      if (started) return;
      started = true;
      check({ type: "load" });
      if (!target || typeof target.addEventListener !== "function") return;
      target.addEventListener("pageshow", check);
      target.addEventListener("focus", check);
      const visibilityTarget = options.document || target;
      if (visibilityTarget && typeof visibilityTarget.addEventListener === "function") visibilityTarget.addEventListener("visibilitychange", check);
    };
    return { check, start };
  };

  let activeDialog = null;
  let activeTrigger = null;
  let activeContext = null;
  const close = (context = {}) => {
    const dialog = context.dialog || activeDialog;
    if (!dialog) return;
    closeCountryPicker(dialog);
    const turnstileContext = activeContext || context;
    if (turnstileContext.turnstile && typeof turnstileContext.turnstile.remove === "function" && turnstileContext.turnstileWidgetId !== undefined) {
      try { turnstileContext.turnstile.remove(turnstileContext.turnstileWidgetId); } catch (_error) { /* Widget may already be gone. */ }
    }
    if (typeof dialog.close === "function") dialog.close();
    if (activeTrigger && typeof activeTrigger.focus === "function") activeTrigger.focus();
    activeDialog = null;
    activeTrigger = null;
    activeContext = null;
  };

  const open = (context = {}) => {
    if (typeof context.noticeVersion !== "string" || !context.noticeVersion.trim()) {
      context.noticeVersion = leadCaptureConfig.noticeVersion || DEFAULT_NOTICE_VERSION;
    }
    const windowRef = context.window || (typeof window !== "undefined" ? window : null);
    const windowStorage = (name) => {
      try { return windowRef ? windowRef[name] : null; } catch (_error) { return null; }
    };
    const state = context.state || readLeadCaptureState({
      localStorage: context.localStorage || windowStorage("localStorage"),
      sessionStorage: context.sessionStorage || windowStorage("sessionStorage"),
    });
    if (shouldBypassLeadForm(state)) {
      const openWindow = context.openWindow || (windowRef && typeof windowRef.open === "function" ? windowRef.open.bind(windowRef) : null);
      if (typeof openWindow === "function") openWindow(context.whatsappUrl || context.href, "_blank", "noopener,noreferrer");
      return null;
    }
    const dialog = context.dialog || getSharedDialog(context.document);
    if (!dialog) return null;
    activeDialog = dialog;
    activeTrigger = context.trigger || null;
    activeContext = context;
    if (!context.controller) context.controller = createLeadCaptureController();
    if (!context.submissionId) context.submissionId = context.controller.beginCapture().submissionId;
    const form = typeof dialog.querySelector === "function" ? dialog.querySelector("form") : null;
    const phoneCountry = form && typeof form.querySelector === "function" ? form.querySelector('[name="phoneCountry"]') : null;
    if (phoneCountry) {
      syncPhoneCountryDisplay(phoneCountry, form);
      bindPhoneCountryPicker(phoneCountry, form, windowRef);
    }
    if (form && !form._leadCaptureBound && typeof form.addEventListener === "function") {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = {};
        for (const name of ["firstName", "lastName", "companyName", "businessWebsite", "email", "phone", "phoneCountry", "website"]) {
          const field = typeof form.querySelector === "function" ? form.querySelector(`[name="${name}"]`) : null;
          values[name] = field ? field.value || "" : "";
        }
        clearLeadFieldErrors(form);
        values.phone = combinePhoneNumber(values.phoneCountry, values.phone);
        delete values.phoneCountry;
        const errors = validateLeadFields(values);
        if (Object.keys(errors).length) { applyLeadFieldErrors(form, errors); return; }
        values.businessWebsite = normalizeBusinessWebsite(values.businessWebsite);
        // The CTA context is intentionally resolved at submit time: one shared
        // dialog can be opened from many CTAs during a page lifetime.
        const submissionContext = activeContext || context;
        const token = submissionContext.turnstileLifecycle && submissionContext.turnstileLifecycle.consumeToken();
        if (!token) { const status = getLeadStatusRegion(form); if (status) status.textContent = "Please complete verification and try again."; return; }
        submitLeadCapture({ form, save: () => submitLeadCaptureRequest({ payload: { ...values, submissionId: submissionContext.submissionId, services: Array.isArray(submissionContext.services) ? submissionContext.services : [], noticeVersion: submissionContext.noticeVersion, turnstileToken: token, sourcePath: submissionContext.sourcePath, ctaLabel: submissionContext.ctaLabel, market: submissionContext.market }, fetchImpl: submissionContext.fetchImpl, openWindow: submissionContext.openWindow, statusRegion: getLeadStatusRegion(form), turnstile: submissionContext.turnstile }) }).then((result) => {
          if (result.ok) return completeLeadCaptureSuccess({ ...submissionContext, response: result, reservedWindow: result.reservedWindow, currentWindow: submissionContext.window, submissionId: submissionContext.submissionId, localStorage: submissionContext.localStorage, sessionStorage: submissionContext.sessionStorage, form, dialog, statusRegion: getLeadStatusRegion(form), whatsappUrl: submissionContext.whatsappUrl });
          if (form.classList && typeof form.classList.add === "function") form.classList.add("has-error");
        });
      });
      form._leadCaptureBound = true;
    }
    const closeButton = typeof dialog.querySelector === "function" ? dialog.querySelector("[data-dialog-close]") : null;
    if (closeButton && typeof closeButton.addEventListener === "function" && !closeButton._leadCaptureBound) { closeButton.addEventListener("click", () => close({ dialog })); closeButton._leadCaptureBound = true; }
    if (!dialog._leadCaptureCancelBound && typeof dialog.addEventListener === "function") {
      dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        close({ dialog });
      });
      dialog._leadCaptureCancelBound = true;
    }
    if (typeof dialog.showModal === "function") dialog.showModal();
    const firstField = typeof dialog.querySelector === "function" ? dialog.querySelector("input:not([name=website])") : null;
    if (firstField && typeof firstField.focus === "function") firstField.focus();
    if (context.document && context.window) {
      loadTurnstileScript({ document: context.document, window: context.window })
        .then(() => {
          const container = typeof dialog.querySelector === "function" ? dialog.querySelector("[data-turnstile]") : null;
          if (container) {
            const lifecycle = context.turnstileLifecycle || createTurnstileLifecycle({ turnstile: context.window.turnstile, statusRegion: getLeadStatusRegion(dialog) });
            const widgetId = renderTurnstile({ window: context.window, container, hostname: context.hostname || context.window.location?.hostname, action: "lead_capture", callbacks: {
              ...(context.turnstileCallbacks || {}),
              callback: lifecycle.onSuccess,
              "expired-callback": lifecycle.onExpired,
              "error-callback": lifecycle.onError,
            } });
            if (!context.turnstileLifecycle) context.turnstileLifecycle = lifecycle;
            context.turnstileWidgetId = widgetId;
            if (lifecycle && typeof lifecycle.setWidgetId === "function") lifecycle.setWidgetId(widgetId);
            else if (lifecycle) lifecycle.widgetId = widgetId;
            context.turnstile = context.turnstile || context.window.turnstile;
          }
        })
        .catch(() => {
          const status = getLeadStatusRegion(dialog);
          if (status) status.textContent = "Security verification could not load. Please refresh and try again.";
          if (form && form.classList && typeof form.classList.add === "function") form.classList.add("has-error");
        });
    }
    return dialog;
  };

  return {
    RECEIPT_KEY,
    SESSION_KEY,
    consumeLeadReceiptForSession,
    completeLeadCaptureSuccess,
    createTurnstileLifecycle,
    createLeadReturnWatcher,
    applyLeadFieldErrors,
    clearLeadFieldErrors,
    close,
    createLeadCaptureController,
    open,
    persistLeadCaptureSuccess,
    readLeadCaptureState,
    renderLeadCaptureDialog,
    renderCountryCallingCodeOptions,
    renderCountryPickerOptions,
    getPhoneCountryDisplay,
    selectPhoneCountry,
    syncPhoneCountryDisplay,
    combinePhoneNumber,
    normalizeBusinessWebsite,
    shouldBypassLeadForm,
    getSharedDialog,
    init,
    loadTurnstileScript,
    renderTurnstile,
    resolveTurnstileSitekey,
    validateLeadFields,
    setLeadFormPending,
    submitLeadCapture,
    submitLeadCaptureRequest,
  };
});
