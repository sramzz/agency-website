const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

class FakeClassList {
  constructor() {
    this.values = new Set();
  }

  add(name) {
    this.values.add(name);
  }

  remove(name) {
    this.values.delete(name);
  }

  contains(name) {
    return this.values.has(name);
  }
}

class FakeMarker {
  constructor() {
    this.classList = new FakeClassList();
    this.listeners = new Map();
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  dispatch(type) {
    this.listeners.get(type)?.({ currentTarget: this });
  }
}

const createFixture = () => {
  const markers = [new FakeMarker(), new FakeMarker(), new FakeMarker()];
  const map = {
    querySelectorAll: () => markers,
  };
  const listeners = new Map();
  const document = {
    activeElement: null,
    querySelector: () => map,
    addEventListener: (type, listener) => listeners.set(type, listener),
  };

  const script = fs.readFileSync(path.resolve(__dirname, "../assets/js/australia-map.js"), "utf8");
  vm.runInNewContext(script, { document });

  const dispatchDocument = (type, target, key) => listeners.get(type)?.({ target, key });
  return { dispatchDocument, map, markers };
};

test("Australia map touch labels switch and dismiss without leaving stale markers", () => {
  const { dispatchDocument, markers } = createFixture();

  markers[0].dispatch("click");
  assert.equal(markers[0].classList.contains("is-active"), true);

  markers[1].dispatch("pointerenter");
  assert.equal(markers[0].classList.contains("is-active"), false, "hover should clear a stale tapped label");

  markers[0].dispatch("click");
  markers[1].dispatch("focus");
  assert.equal(markers[0].classList.contains("is-active"), false, "focus should clear a stale tapped label");

  markers[1].dispatch("click");
  assert.equal(markers[0].classList.contains("is-active"), false);
  assert.equal(markers[1].classList.contains("is-active"), true);

  dispatchDocument("pointerdown", { closest: () => null });
  assert.equal(markers[1].classList.contains("is-active"), false);

  markers[2].dispatch("click");
  dispatchDocument("keydown", null, "Escape");
  assert.equal(markers[2].classList.contains("is-active"), false);
});
