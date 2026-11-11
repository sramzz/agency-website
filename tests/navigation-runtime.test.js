const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

class FakeClassList {
  constructor() {
    this.values = new Set();
  }

  add(...names) {
    names.forEach((name) => this.values.add(name));
  }

  remove(...names) {
    names.forEach((name) => this.values.delete(name));
  }

  contains(name) {
    return this.values.has(name);
  }

  toggle(name, force) {
    const enabled = force === undefined ? !this.contains(name) : force;
    if (enabled) this.add(name);
    else this.remove(name);
    return enabled;
  }
}

class FakeElement {
  constructor(tagName = "div") {
    this.tagName = tagName.toLowerCase();
    this.attributes = new Map();
    this.children = [];
    this.classList = new FakeClassList();
    this.dataset = {};
    this.listeners = new Map();
    this.hidden = false;
  }

  append(...children) {
    this.children.push(...children);
  }

  replaceChildren(...children) {
    this.children = children;
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  dispatch(type, target = this, details = {}) {
    for (const listener of this.listeners.get(type) || []) listener({ type, target, ...details });
  }

  contains(target) {
    return target === this || this.children.some((child) => child.contains?.(target));
  }

  descendants(tagName) {
    return this.children.flatMap((child) => [child, ...(child.descendants?.(tagName) || [])]).filter((child) => child.tagName === tagName);
  }

  querySelector(selector) {
    return selector === "a" ? this.descendants("a")[0] || null : null;
  }

  querySelectorAll(selector) {
    return selector === "a" ? this.descendants("a") : [];
  }

  cloneNode() {
    const clone = new FakeElement(this.tagName);
    clone.className = this.className;
    for (const [name, value] of this.attributes) clone.setAttribute(name, value);
    return clone;
  }

  focus() {}

  get childElementCount() {
    return this.children.length;
  }
}

const createNavigationFixture = ({ desktop = false, canHover = true } = {}) => {
  const body = new FakeElement("body");
  const siteHeader = new FakeElement("header");
  const mobileNav = new FakeElement("nav");
  const menuToggle = new FakeElement("button");
  const documentListeners = new Map();
  const windowListeners = new Map();
  const desktopNav = desktop ? new FakeElement("nav") : null;
  const timers = new Map();
  let timerId = 0;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");

  const document = {
    body,
    createElement: (tagName) => new FakeElement(tagName),
    querySelector: (selector) => ({
      ".site-header": siteHeader,
      ".desktop-nav": desktopNav,
      "#mobile-nav": mobileNav,
      ".menu-toggle": menuToggle,
    })[selector] ?? null,
    addEventListener: (type, listener) => {
      const listeners = documentListeners.get(type) || [];
      listeners.push(listener);
      documentListeners.set(type, listeners);
    },
  };

  const window = {
    matchMedia: () => ({ matches: canHover }),
    location: { pathname: "/", hash: "" },
    addEventListener: (type, listener) => {
      const listeners = windowListeners.get(type) || [];
      listeners.push(listener);
      windowListeners.set(type, listeners);
    },
  };

  siteHeader.querySelector = () => null;
  siteHeader.querySelectorAll = () => [];

  const dispatchDocument = (type, target) => {
    for (const listener of documentListeners.get(type) || []) listener({ type, target });
  };

  const script = fs.readFileSync(path.resolve(__dirname, "../assets/js/script.js"), "utf8");
  vm.runInNewContext(script, { document, window, setTimeout: (callback) => { timers.set(++timerId, callback); return timerId; }, clearTimeout: (id) => timers.delete(id) });

  const flushTimers = () => { const pending = [...timers.values()]; timers.clear(); pending.forEach((callback) => callback()); };
  const dispatchWindow = (type, event) => { for (const listener of windowListeners.get(type) || []) listener(event); };
  return { body, dispatchDocument, dispatchWindow, document, desktopNav, menuToggle, mobileNav, flushTimers };
};

test("mobile navigation responds to real outside and inside interaction events", () => {
  const { body, dispatchDocument, menuToggle, mobileNav } = createNavigationFixture();
  const solutionsTrigger = mobileNav.children[0].children[0];
  const insideTarget = mobileNav.children[1];
  const outsideTarget = new FakeElement("main");

  menuToggle.dispatch("click");
  dispatchDocument("click", menuToggle);
  assert.equal(mobileNav.classList.contains("is-open"), true);
  assert.equal(body.classList.contains("nav-open"), true);
  assert.equal(menuToggle.getAttribute("aria-expanded"), "true");
  assert.equal(menuToggle.getAttribute("aria-label"), "Close navigation");

  solutionsTrigger.dispatch("click");
  assert.equal(solutionsTrigger.getAttribute("aria-expanded"), "true");
  dispatchDocument("wheel", insideTarget);
  assert.equal(mobileNav.classList.contains("is-open"), true, "inside scrolling should keep the menu open");

  dispatchDocument("touchmove", outsideTarget);
  assert.equal(mobileNav.classList.contains("is-open"), false);
  assert.equal(body.classList.contains("nav-open"), false);
  assert.equal(menuToggle.getAttribute("aria-expanded"), "false");
  assert.equal(menuToggle.getAttribute("aria-label"), "Open navigation");
  assert.equal(solutionsTrigger.getAttribute("aria-expanded"), "false", "closing should reset nested navigation");

  menuToggle.dispatch("click");
  dispatchDocument("click", menuToggle);
  dispatchDocument("click", outsideTarget);
  assert.equal(mobileNav.classList.contains("is-open"), false, "outside clicks should close the menu");
});

test("desktop Solutions opens on hover, allows re-entry and closes after leaving", () => {
  const f = createNavigationFixture({ desktop: true });
  const menu = f.desktopNav.children[0];
  const [trigger, panel] = menu.children;
  menu.dispatch("pointerenter", menu, { pointerType: "mouse" });
  assert.equal(panel.hidden, false);
  assert.equal(trigger.getAttribute("aria-expanded"), "true");
  menu.dispatch("pointerleave", menu, { pointerType: "mouse" });
  assert.equal(panel.hidden, false, "the exit grace period keeps the menu reachable");
  menu.dispatch("pointerenter", menu, { pointerType: "mouse" });
  f.flushTimers();
  assert.equal(panel.hidden, false, "re-entering cancels the pending close");
  menu.dispatch("pointerleave", menu, { pointerType: "mouse" });
  f.flushTimers();
  assert.equal(panel.hidden, true);
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
});

test("hover ignores touch and coarse pointers while click still works", () => {
  for (const canHover of [true, false]) {
    const f = createNavigationFixture({ desktop: true, canHover });
    const menu = f.desktopNav.children[0];
    const [trigger, panel] = menu.children;
    menu.dispatch("pointerenter", menu, { pointerType: "touch" });
    assert.equal(panel.hidden, true);
    if (!canHover) {
      menu.dispatch("pointerenter", menu, { pointerType: "mouse" });
      assert.equal(panel.hidden, true);
    }
    trigger.dispatch("click");
    assert.equal(panel.hidden, false);
  }
});

test("keyboard navigation retains focused menu links and Escape dismisses pending hover", () => {
  const f = createNavigationFixture({ desktop: true });
  const menu = f.desktopNav.children[0];
  const [trigger, panel] = menu.children;
  trigger.dispatch("keydown", trigger, { key: "ArrowDown", preventDefault() {} });
  assert.equal(panel.hidden, false);
  f.document.activeElement = panel.querySelector("a");
  menu.dispatch("pointerleave", menu, { pointerType: "mouse" });
  f.flushTimers();
  assert.equal(panel.hidden, false, "the pointer cannot close a keyboard-focused menu");
  menu.dispatch("focusout", panel, { relatedTarget: new FakeElement("a") });
  assert.equal(panel.hidden, true);
  menu.dispatch("pointerenter", menu, { pointerType: "mouse" });
  menu.dispatch("pointerleave", menu, { pointerType: "mouse" });
  f.dispatchWindow("keydown", { key: "Escape" });
  f.flushTimers();
  assert.equal(panel.hidden, true);
});
