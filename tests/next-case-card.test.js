const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'assets/js/next-case-card.js'), 'utf8');

function setup({ opens = true, missing = false } = {}) {
  let close;
  let calls = 0;
  let focus = 0;
  const listeners = new Map();
  const classes = new Set();
  const media = new Map();
  const listen = (target, type, handler) => {
    if (!target.has(type)) target.set(type, []);
    target.get(type).push(handler);
  };
  const emit = (target, type, event = {}) => (target.get(type) || []).forEach(handler => handler(event));
  const layer = { hidden: false, replaceChildren() {}, append() {} };
  const shell = {};
  const card = {
    addEventListener: (type, handler) => listen(listeners, type, handler),
    querySelector: selector => selector === '.next-case-particles' ? layer : null,
    querySelectorAll: () => [],
    closest: selector => selector === '.next-case-card-shell' ? shell : null,
    classList: { toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name) },
    matches: () => false,
    focus: () => focus++,
  };
  const dialog = { open: false, addEventListener: (type, handler, options) => { assert.equal(type, 'close'); assert.equal(options.once, true); close = handler; } };
  const contact = { href: 'https://wa.me/61439499441', click: () => { calls++; dialog.open = opens; } };
  const document = {
    querySelector: selector => missing ? null : selector === '[data-next-case-card]' ? card : contact,
    getElementById: id => { assert.equal(id, 'rr-lead-capture-dialog'); return dialog; },
    addEventListener() {},
    hidden: false,
    fonts: { ready: new Promise(() => {}) },
  };
  const matchMedia = query => {
    if (!media.has(query)) media.set(query, { matches: false, addEventListener() {} });
    return media.get(query);
  };
  vm.runInNewContext(script, {
    document,
    URL,
    matchMedia,
    setTimeout,
    clearTimeout,
    requestAnimationFrame: () => 1,
    cancelAnimationFrame() {},
    window: { RankingRebelsLead: require('../assets/js/service-lead.js') },
  });
  const destination = new URL(contact.href);
  assert.equal(destination.pathname, '/61439499441');
  if (!missing) assert.equal(destination.searchParams.get('text'), require('../assets/js/service-lead.js').buildWhatsAppMessage([]));
  return {
    activate: () => emit(listeners, 'click'),
    emitCard: (type, event) => emit(listeners, type, event),
    close: () => close?.(),
    calls: () => calls,
    focus: () => focus,
    hasClose: () => !!close,
    isLit: () => classes.has('is-lit'),
  };
}

test('card delegates once to the existing contact flow and restores keyboard focus', () => {
  const view = setup();
  view.activate();
  assert.equal(view.calls(), 1);
  assert.equal(view.focus(), 0);
  view.close();
  assert.equal(view.focus(), 1);
});
test('card preserves the existing captured-session bypass without a second action', () => {
  const view = setup({ opens: false });
  view.activate();
  assert.equal(view.calls(), 1);
  assert.equal(view.hasClose(), false);
});
test('card lights the approved red halo for pointer and keyboard interaction', () => {
  const view = setup();
  view.emitCard('pointerenter', { pointerType: 'mouse' });
  assert.equal(view.isLit(), true);
  view.emitCard('pointerleave');
  assert.equal(view.isLit(), false);
  view.emitCard('focus');
  assert.equal(view.isLit(), true);
  view.emitCard('blur');
  assert.equal(view.isLit(), false);
});
test('card script safely ignores pages without the component', () => assert.doesNotThrow(() => setup({ missing: true })));
test('card is one named button, with no nested controls or duplicate lead capture hook', () => {
  const html = fs.readFileSync(path.join(root, 'case-studies/index.html'), 'utf8');
  const card = html.match(/<button class="next-case-card"[\s\S]*?<\/button>/)?.[0];
  assert.ok(card);
  assert.ok(card.includes('aria-label="Start a conversation about your business"'));
  assert.equal((card.match(/<button\b/g) || []).length, 1);
  assert.equal(/<a\b|data-lead-capture/.test(card), false);
  assert.ok(card.includes('class="next-case-particles" aria-hidden="true"></span>'));
  assert.ok(card.includes('data-next-case-protected'));
  assert.ok(card.includes('class="next-case-you" data-next-case-protected>YOU</span>'));
  assert.equal(card.includes('next-case-wordmark'), false);
  assert.equal(html.includes('next-case-pause'), false);
  assert.ok(html.includes('<a class="button button-primary" href="https://wa.me/61439499441" data-lead-capture target="_blank" rel="noreferrer">Start the conversation</a>'));
});

test('particles keep their original timing, fade early and hide unusable paths', () => {
  assert.match(script, /: bottom\s*\? 3200/);
  assert.match(script, /: corner\s*\? 4200/);
  assert.match(script, /: 6000/);
  assert.match(script, /element\.hidden = length < 24/);
  assert.match(script, /const fadeBeforeContent = phase < 0\.68/);
  assert.match(script, /target = \{ x: start\.x \+ inward, y: rect\.height \* 0\.62 \}/);
});

test('both original upper corners use direct mirrored diagonals', () => {
  assert.doesNotMatch(script, /waypoints = \[\{ x: 11, y: rect\.height \* 0\.22 \}\]/);
  assert.match(script, /cornerIndex === 0[\s\S]*?x: start\.x \+ 84 \+ 12 \* cornerPair,[\s\S]*?y: start\.y \+ 72 \+ 10 \* cornerPair/);
  assert.match(script, /x: start\.x - 84 - 12 \* cornerPair,[\s\S]*?y: start\.y \+ 72 \+ 10 \* cornerPair/);
});
