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

  dispatch(type, target = this) {
    for (const listener of this.listeners.get(type) || []) listener({ type, target });
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

const createNavigationFixture = () => {
  const body = new FakeElement("body");
  const siteHeader = new FakeElement("header");
  const mobileNav = new FakeElement("nav");
  const menuToggle = new FakeElement("button");
  const documentListeners = new Map();
  const windowListeners = new Map();

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");

  const document = {
    body,
    createElement: (tagName) => new FakeElement(tagName),
    querySelector: (selector) => ({
      ".site-header": siteHeader,
      ".desktop-nav": null,
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

  const script = fs.readFileSync(path.resolve(__dirname, "../script.js"), "utf8");
  vm.runInNewContext(script, { document, window });

  return { body, dispatchDocument, menuToggle, mobileNav };
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
