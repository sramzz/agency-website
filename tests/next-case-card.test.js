const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'assets/js/next-case-card.js'), 'utf8');

function setup({ opens = true, missing = false } = {}) {
  let activate;
  let close;
  let calls = 0;
  let focus = 0;
  const card = { addEventListener: (type, handler) => { assert.equal(type, 'click'); activate = handler; }, focus: () => focus++ };
  const dialog = { open: false, addEventListener: (type, handler, options) => { assert.equal(type, 'close'); assert.equal(options.once, true); close = handler; } };
  const contact = { href: 'https://wa.me/61439499441', click: () => { calls++; dialog.open = opens; } };
  const document = {
    querySelector: selector => missing ? null : selector === '[data-next-case-card]' ? card : contact,
    getElementById: id => { assert.equal(id, 'rr-lead-capture-dialog'); return dialog; },
  };
  vm.runInNewContext(script, { document, URL, window: { RankingRebelsLead: require('../assets/js/service-lead.js') } });
  const destination = new URL(contact.href);
  assert.equal(destination.pathname, '/61439499441');
  if (!missing) assert.equal(destination.searchParams.get('text'), require('../assets/js/service-lead.js').buildWhatsAppMessage([]));
  return { activate: () => activate(), close: () => close?.(), calls: () => calls, focus: () => focus, hasClose: () => !!close };
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
test('card script safely ignores pages without the component', () => assert.doesNotThrow(() => setup({ missing: true })));
test('card is one named button, with no nested controls or duplicate lead capture hook', () => {
  const html = fs.readFileSync(path.join(root, 'case-studies/index.html'), 'utf8');
  const card = html.match(/<button class="next-case-card"[\s\S]*?<\/button>/)?.[0];
  assert.ok(card);
  assert.ok(card.includes('aria-label="Start a conversation about your business"'));
  assert.equal((card.match(/<button\b/g) || []).length, 1);
  assert.equal(/<a\b|data-lead-capture/.test(card), false);
  assert.ok(card.includes('class="next-case-particles" aria-hidden="true"'));
  assert.ok(html.includes('<a class="button button-primary" href="https://wa.me/61439499441" data-lead-capture target="_blank" rel="noreferrer">Start the conversation</a>'));
});
