const assert = require("node:assert/strict");
const test = require("node:test");

const {
  consumeLeadReceiptForSession,
  createLeadCaptureController,
  persistLeadCaptureSuccess,
  readLeadCaptureState,
  shouldBypassLeadForm,
} = require("../assets/js/lead-capture.js");

const memoryStorage = () => {
  const values = new Map();
  return {
    getItem: (key) => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
};

const receiptKey = "rr.lead.receipt.v1";
const validSubmissionId = "123e4567-e89b-42d3-a456-426614174000";
const now = new Date("2026-09-03T00:00:00.000Z");

const readStateWithReceipt = (storedValue, options = {}) => {
  const localStorage = memoryStorage();
  localStorage.setItem(receiptKey, storedValue);
  return readLeadCaptureState({
    localStorage,
    sessionStorage: memoryStorage(),
    now: options.now || now,
  });
};

test("initial lead-capture state uses the receipt and session storage contracts", () => {
  const state = readLeadCaptureState({
    localStorage: memoryStorage(),
    sessionStorage: memoryStorage(),
  });

  assert.deepEqual(state, {
    receipt: null,
    session: {
      capturedSubmissionId: null,
      receiptShownSubmissionId: null,
    },
  });
});

test("valid receipts are restored from localStorage", () => {
  const state = readStateWithReceipt(
    JSON.stringify({ submissionId: validSubmissionId, submittedAt: "2026-09-02T00:00:00.000Z" }),
  );

  assert.deepEqual(state.receipt, {
    submissionId: validSubmissionId,
    submittedAt: "2026-09-02T00:00:00.000Z",
  });
});

test("a receipt at the exact 30-day boundary is expired", () => {
  const state = readStateWithReceipt(
    JSON.stringify({ submissionId: validSubmissionId, submittedAt: "2026-08-04T00:00:00.000Z" }),
  );

  assert.equal(state.receipt, null);
});

test("future receipts are discarded", () => {
  const state = readStateWithReceipt(
    JSON.stringify({ submissionId: validSubmissionId, submittedAt: "2026-09-04T00:00:00.000Z" }),
  );

  assert.equal(state.receipt, null);
});

test("malformed receipt JSON is discarded", () => {
  const state = readStateWithReceipt("{not-json");

  assert.equal(state.receipt, null);
});

test("receipts stored under the wrong key are ignored", () => {
  const localStorage = memoryStorage();
  localStorage.setItem("rr.lead.receipt", JSON.stringify({ submissionId: validSubmissionId, submittedAt: "2026-09-02T00:00:00.000Z" }));

  const state = readLeadCaptureState({ localStorage, sessionStorage: memoryStorage(), now });

  assert.equal(state.receipt, null);
});

test("receipts with an invalid UUID are discarded", () => {
  const state = readStateWithReceipt(
    JSON.stringify({ submissionId: "not-a-uuid", submittedAt: "2026-09-02T00:00:00.000Z" }),
  );

  assert.equal(state.receipt, null);
});

test("a valid session record is restored from sessionStorage", () => {
  const sessionStorage = memoryStorage();
  sessionStorage.setItem(
    "rr.lead.session.v1",
    JSON.stringify({ capturedSubmissionId: validSubmissionId, receiptShownSubmissionId: null }),
  );

  const state = readLeadCaptureState({ localStorage: memoryStorage(), sessionStorage, now });

  assert.deepEqual(state.session, {
    capturedSubmissionId: validSubmissionId,
    receiptShownSubmissionId: null,
  });
});

test("malformed and wrong-shaped session records are cleaned up", () => {
  for (const storedValue of ["{not-json", JSON.stringify({ capturedSubmissionId: validSubmissionId })]) {
    const sessionStorage = memoryStorage();
    sessionStorage.setItem("rr.lead.session.v1", storedValue);

    const state = readLeadCaptureState({ localStorage: memoryStorage(), sessionStorage, now });

    assert.deepEqual(state.session, {
      capturedSubmissionId: null,
      receiptShownSubmissionId: null,
    });
    assert.equal(sessionStorage.getItem("rr.lead.session.v1"), null);
  }
});

test("session state preserves a captured submission id", () => {
  const sessionStorage = memoryStorage();
  sessionStorage.setItem(
    "rr.lead.session.v1",
    JSON.stringify({ capturedSubmissionId: validSubmissionId, receiptShownSubmissionId: null }),
  );

  assert.equal(
    readLeadCaptureState({ localStorage: memoryStorage(), sessionStorage, now }).session.capturedSubmissionId,
    validSubmissionId,
  );
});

test("session state preserves the receipt-shown submission id", () => {
  const sessionStorage = memoryStorage();
  sessionStorage.setItem(
    "rr.lead.session.v1",
    JSON.stringify({ capturedSubmissionId: null, receiptShownSubmissionId: validSubmissionId }),
  );

  assert.equal(
    readLeadCaptureState({ localStorage: memoryStorage(), sessionStorage, now }).session.receiptShownSubmissionId,
    validSubmissionId,
  );
});

test("a captured submission makes later CTAs bypass the form in the current session", () => {
  assert.equal(
    shouldBypassLeadForm({
      receipt: { submissionId: validSubmissionId, submittedAt: "2026-09-02T00:00:00.000Z" },
      session: { capturedSubmissionId: validSubmissionId, receiptShownSubmissionId: null },
    }),
    true,
  );
});

test("a new session shows a receipt once, then asks for details on the next CTA", () => {
  const initialState = {
    receipt: { submissionId: validSubmissionId, submittedAt: "2026-09-02T00:00:00.000Z" },
    session: { capturedSubmissionId: null, receiptShownSubmissionId: null },
  };

  const consumed = consumeLeadReceiptForSession(initialState);
  assert.equal(consumed.showReceipt, true);
  assert.equal(consumed.state.session.receiptShownSubmissionId, validSubmissionId);
  assert.equal(shouldBypassLeadForm(consumed.state), false);

  const alreadyShown = consumeLeadReceiptForSession(consumed.state);
  assert.equal(alreadyShown.showReceipt, false);
  assert.deepEqual(alreadyShown.state, consumed.state);
});

test("successful persistence stores only IDs and timestamps, never lead PII or WhatsApp data", () => {
  const localStorage = memoryStorage();
  const sessionStorage = memoryStorage();

  persistLeadCaptureSuccess({
    localStorage,
    sessionStorage,
    submissionId: validSubmissionId,
    submittedAt: "2026-09-03T00:00:00.000Z",
    firstName: "Kelly",
    lastName: "Serna",
    companyName: "Ranking Rebels",
    email: "kelly@example.com",
    phone: "+61400000000",
    services: ["Google SEO"],
    market: "Australia",
    whatsappMessage: "Hi Ranking Rebels",
    whatsappUrl: "https://wa.me/61439499441",
  });

  const receipt = JSON.parse(localStorage.getItem("rr.lead.receipt.v1"));
  const session = JSON.parse(sessionStorage.getItem("rr.lead.session.v1"));
  assert.deepEqual(Object.keys(receipt).sort(), ["submissionId", "submittedAt"]);
  assert.deepEqual(Object.keys(session).sort(), ["capturedSubmissionId", "receiptShownSubmissionId"]);
  assert.equal(receipt.submissionId, validSubmissionId);
  assert.equal(receipt.submittedAt, "2026-09-03T00:00:00.000Z");
  assert.equal(session.capturedSubmissionId, validSubmissionId);
  assert.equal(session.receiptShownSubmissionId, null);

  const serialized = JSON.stringify({ receipt, session });
  for (const personalValue of [
    "Kelly",
    "Serna",
    "Ranking Rebels",
    "kelly@example.com",
    "+61400000000",
    "Google SEO",
    "Australia",
    "Hi Ranking Rebels",
    "https://wa.me/61439499441",
  ]) {
    assert.doesNotMatch(serialized, new RegExp(personalValue.replace(/[.+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("a new capture creates one submissionId that all retries reuse", () => {
  const generatedIds = [
    "123e4567-e89b-42d3-a456-426614174001",
    "123e4567-e89b-42d3-a456-426614174002",
  ];
  let generatorCalls = 0;
  const controller = createLeadCaptureController({
    generateSubmissionId: () => generatedIds[generatorCalls++],
  });

  const firstAttempt = controller.beginCapture();
  const retryAttempt = controller.retryCapture();
  const secondRetry = controller.retryCapture();

  assert.equal(firstAttempt.submissionId, generatedIds[0]);
  assert.equal(retryAttempt.submissionId, firstAttempt.submissionId);
  assert.equal(secondRetry.submissionId, firstAttempt.submissionId);
  assert.equal(generatorCalls, 1);
});

test("resetting a capture allows a later opening to receive a new submissionId", () => {
  const generatedIds = [
    "123e4567-e89b-42d3-a456-426614174003",
    "123e4567-e89b-42d3-a456-426614174004",
  ];
  let generatorCalls = 0;
  const controller = createLeadCaptureController({
    generateSubmissionId: () => generatedIds[generatorCalls++],
  });

  const firstCapture = controller.beginCapture();
  controller.resetCapture();
  const nextCapture = controller.beginCapture();

  assert.notEqual(nextCapture.submissionId, firstCapture.submissionId);
  assert.equal(nextCapture.submissionId, generatedIds[1]);
  assert.equal(generatorCalls, 2);
});
