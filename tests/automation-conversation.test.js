const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../assets/js/automation-conversation.js'), 'utf8');
function setup(reduced = false) {
  let time = 0, id = 0;
  const timers = new Map(), elements = new Map(), events = {};
  const find = selector => {
    if (!elements.has(selector)) elements.set(selector, { textContent: '', hidden: true, handlers: {}, attributes: {}, setAttribute(name, value) { this.attributes[name] = value; }, addEventListener(type, handler) { this.handlers[type] = handler; } });
    return elements.get(selector);
  };
  const root = { dataset: {}, querySelector: find };
  const mediaEvents = {};
  const media = { matches: reduced, addEventListener(type, handler) { mediaEvents[type] = handler; } };
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
  return { root, find, document, events, advance, motion: reduced => { media.matches = reduced; mediaEvents.change(); }, view: visible => intersection([{ isIntersecting: visible }]) };
}
test('conversation plays in order while visible and repeats after the final reading pause', () => {
  const f = setup();
  f.advance(10000); assert.equal(f.root.dataset.phase, 'received');
  f.view(true); f.advance(3200); assert.equal(f.root.dataset.phase, 'draft');
  f.advance(3800); assert.equal(f.root.dataset.phase, 'review');
  assert.equal(f.find('[data-conversation-sender]').textContent, 'Prepared reply · not sent');
  f.advance(2200); assert.equal(f.root.dataset.phase, 'sent');
  f.advance(3599); assert.equal(f.root.dataset.phase, 'sent');
  f.advance(1); assert.equal(f.root.dataset.phase, 'received');
  f.advance(3200); assert.equal(f.root.dataset.phase, 'draft');
  f.advance(3800 + 2200); assert.equal(f.root.dataset.phase, 'sent');
  f.advance(3600); assert.equal(f.root.dataset.phase, 'received');
});
test('offscreen suspension preserves the remaining reading time', () => {
  const f = setup(); f.view(true); f.advance(1000);
  f.view(false); f.advance(9000);
  assert.equal(f.root.dataset.phase, 'received');
  f.view(true); f.advance(2199);
  assert.equal(f.root.dataset.phase, 'received');
  f.advance(1); assert.equal(f.root.dataset.phase, 'draft');
  f.advance(800); f.view(false); f.advance(9000); assert.equal(f.root.dataset.phase, 'draft');
  f.view(true); f.advance(3000); assert.equal(f.root.dataset.phase, 'review');
});
test('reduced motion shows the complete example and changing the preference resumes autoplay', () => {
  const f = setup(true); f.view(true); f.advance(20000);
  assert.equal(f.root.dataset.phase, 'sent');
  f.motion(false);
  assert.equal(f.root.dataset.phase, 'received');
  f.advance(3200); assert.equal(f.root.dataset.phase, 'draft');
});
test('background tabs suspend playback and the next loop keeps its full reading time', () => {
  const f = setup(); f.view(true); f.advance(1000);
  f.document.hidden = true; f.events.visibilitychange(); f.advance(9000);
  assert.equal(f.root.dataset.phase, 'received');
  f.document.hidden = false; f.events.visibilitychange(); f.advance(2200);
  assert.equal(f.root.dataset.phase, 'draft');
  f.advance(3800 + 2200 + 3600);
  assert.equal(f.root.dataset.phase, 'received');
  f.advance(3199); assert.equal(f.root.dataset.phase, 'received');
  f.advance(1); assert.equal(f.root.dataset.phase, 'draft');
  f.advance(3800); assert.equal(f.root.dataset.phase, 'review');
});
