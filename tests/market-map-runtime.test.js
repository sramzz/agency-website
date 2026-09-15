const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

class FakeClassList {
  constructor() { this.values = new Set(); }
  add(name) { this.values.add(name); }
  remove(name) { this.values.delete(name); }
  contains(name) { return this.values.has(name); }
}

class FakeMarker {
  constructor() { this.classList = new FakeClassList(); this.listeners = new Map(); }
  addEventListener(type, listener) { this.listeners.set(type, listener); }
  dispatch(type) { this.listeners.get(type)?.({ currentTarget: this }); }
}

const createFixture = () => {
  const markers = [new FakeMarker(), new FakeMarker(), new FakeMarker()];
  const listeners = new Map();
  const document = {
    querySelector: () => ({ querySelectorAll: () => markers }),
    addEventListener: (type, listener) => listeners.set(type, listener),
  };
  vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, "../assets/js/market-map.js"), "utf8"), { document });
  return { markers, dispatch: (type, target, key) => listeners.get(type)?.({ target, key }) };
};

test("market coverage labels switch and dismiss for touch, pointer and keyboard", () => {
  const { markers, dispatch } = createFixture();
  markers[0].dispatch("click");
  assert.equal(markers[0].classList.contains("is-active"), true);
  markers[1].dispatch("pointerenter");
  assert.equal(markers[0].classList.contains("is-active"), false);
  markers[1].dispatch("click");
  markers[2].dispatch("focus");
  assert.equal(markers[1].classList.contains("is-active"), false);
  markers[2].dispatch("click");
  dispatch("pointerdown", { closest: () => null });
  assert.equal(markers[2].classList.contains("is-active"), false);
  markers[0].dispatch("click");
  dispatch("keydown", null, "Escape");
  assert.equal(markers[0].classList.contains("is-active"), false);
});
