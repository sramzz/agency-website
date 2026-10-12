const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../assets/js/automation-conversation.js'), 'utf8');
function setup(reduced = false) {
  let time = 0, id = 0;
  const timers = new Map(), elements = new Map(), events = {};
  const find = selector => {
    if (!elements.has(selector)) elements.set(selector, { textContent: '', hidden: true, handlers: {}, setAttribute() {}, addEventListener(type, handler) { this.handlers[type] = handler; } });
    return elements.get(selector);
  };
  const root = { dataset: {}, querySelector: find };
  const media = { matches: reduced, addEventListener() {} };
  let intersection;
  const document = { hidden: false, querySelector: () => root, addEventListener(type, handler) { events[type] = handler; } };
  class IntersectionObserver { constructor(callback) { intersection = callback; } observe() {} }
  vm.runInNewContext(source, { document, window: { matchMedia: () => media, IntersectionObserver }, IntersectionObserver, performance: { now: () => time }, setTimeout(callback, duration) { timers.set(++id, { callback, at: time + duration }); return id; }, clearTimeout: key => timers.delete(key) });
  const advance = milliseconds => {
    const end = time + milliseconds;
    while (true) {
      const next = [...timers].sort((a, b) => a[1].at - b[1].at)[0];
      if (!next || next[1].at > end) break;
      time = next[1].at; timers.delete(next[0]); next[1].callback();
    }
    time = end;
  };
  return { root, find, document, events, advance, view: visible => intersection([{ isIntersecting: visible }]) };
}
test('conversation plays in order only while visible and stops after sending', () => {
  const f = setup();
  f.advance(10000); assert.equal(f.root.dataset.phase, 'received');
  f.view(true); f.advance(3200); assert.equal(f.root.dataset.phase, 'draft');
  f.advance(3800); assert.equal(f.root.dataset.phase, 'review');
  assert.equal(f.find('[data-conversation-sender]').textContent, 'Prepared reply · not sent');
  f.advance(2200); assert.equal(f.root.dataset.phase, 'sent');
  f.advance(3600); assert.equal(f.find('[data-conversation-toggle]').textContent, 'Play again');
});
test('pause and offscreen suspension preserve the remaining reading time', () => {
  const f = setup(); f.view(true); f.advance(1000);
  f.find('[data-conversation-toggle]').handlers.click(); f.advance(9000);
  assert.equal(f.root.dataset.phase, 'received');
  f.find('[data-conversation-toggle]').handlers.click(); f.advance(2199);
  assert.equal(f.root.dataset.phase, 'received');
  f.advance(1); assert.equal(f.root.dataset.phase, 'draft');
  f.advance(800); f.view(false); f.advance(9000); assert.equal(f.root.dataset.phase, 'draft');
  f.view(true); f.advance(3000); assert.equal(f.root.dataset.phase, 'review');
});
test('reduced motion starts with the complete example and replay is an explicit choice', () => {
  const f = setup(true); f.view(true); f.advance(20000);
  assert.equal(f.root.dataset.phase, 'sent');
  assert.equal(f.find('[data-conversation-toggle]').textContent, 'Play again');
  f.find('[data-conversation-replay]').handlers.click();
  assert.equal(f.root.dataset.phase, 'received');
  f.advance(3200); assert.equal(f.root.dataset.phase, 'draft');
});
test('background tabs suspend playback and replay cancels the old schedule', () => {
  const f = setup(); f.view(true); f.advance(1000);
  f.document.hidden = true; f.events.visibilitychange(); f.advance(9000);
  assert.equal(f.root.dataset.phase, 'received');
  f.document.hidden = false; f.events.visibilitychange(); f.advance(2200);
  assert.equal(f.root.dataset.phase, 'draft');
  f.find('[data-conversation-replay]').handlers.click(); f.advance(3200);
  assert.equal(f.root.dataset.phase, 'draft');
  f.advance(3800); assert.equal(f.root.dataset.phase, 'review');
});
