import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../components/mission-report-sequence.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

// Test sequence timing and cancellation without WebGL, a browser or real delays.
function fixture() {
  let time = 0;
  let nextId = 0;
  let queryCount = 0;
  const pending = new Map();
  const animations = [];
  const schedule = (callback, delay = 0) => {
    const id = ++nextId;
    pending.set(id, { at: time + delay, callback });
    return id;
  };
  const cancel = (id) => pending.delete(id);

  class Element {
    constructor(rect = { left: 0, top: 0, width: 456, height: 464 }) {
      this.rect = rect;
      this.style = {};
      this.dataset = {};
      this.value = "";
      this.children = [];
      this.selectors = new Map();
      const classes = new Set();
      this.classList = { add: (...items) => items.forEach(item => classes.add(item)), remove: (...items) => items.forEach(item => classes.delete(item)) };
    }
    querySelector(selector) {
      queryCount++;
      if (!this.selectors.has(selector)) this.selectors.set(selector, new Element());
      return this.selectors.get(selector);
    }
    querySelectorAll() { return inputs; }
    getBoundingClientRect() { return this.rect; }
    setAttribute() {}
    blur() {}
    replaceChildren() { this.children = []; }
    appendChild(child) { this.children.push(child); }
    getAnimations() { return animations; }
    animate() {
      const animation = { cancelled: false, cancel() { this.cancelled = true; } };
      animations.push(animation);
      return animation;
    }
  }

  const card = new Element();
  const inputs = Array.from({ length: 4 }, (_, index) => new Element({ left: 45 + index * 70, top: 220, width: 57, height: 66 }));
  const exports = {};
  const styles = { orbitDigit: "orbitDigit", active: "active", filled: "filled", isSuccess: "isSuccess", particle: "particle" };
  runInNewContext(compiled, {
    exports,
    require: (name) => {
      assert.ok(name.endsWith(".module.css"));
      return { default: styles };
    },
    document: { createElement: () => new Element() },
    performance: { now: () => time },
    setTimeout: schedule,
    clearTimeout: cancel,
    requestAnimationFrame: (callback) => schedule(() => callback(time), 16),
    cancelAnimationFrame: cancel,
  });

  return {
    card, inputs, animations, pending,
    run: exports.runMissionReportSequence,
    get queryCount() { return queryCount; },
    advance(duration) {
      const end = time + duration;
      let steps = 0;
      while (pending.size) {
        const [id, task] = [...pending].sort((a, b) => a[1].at - b[1].at)[0];
        if (task.at > end) break;
        assert.ok(++steps < 10000, "Animation must not leave an unbounded render loop");
        time = task.at;
        pending.delete(id);
        task.callback();
      }
      time = end;
    },
  };
}

test("normal mission sequence retains 2003 and completes exactly once", () => {
  const f = fixture();
  let completed = 0;
  const cleanup = f.run(f.card, () => completed++);
  f.advance(10000);
  assert.deepEqual(f.inputs.map(input => input.value), ["2", "0", "0", "3"]);
  assert.equal(completed, 1);
  assert.ok(f.animations.length > 0);
  assert.equal(f.pending.size, 0);
  cleanup();
  assert.ok(f.animations.every(animation => animation.cancelled));
});

test("closing during the spiral cancels frames, timers and completion", () => {
  const f = fixture();
  let completed = 0;
  const cleanup = f.run(f.card, () => completed++);
  f.advance(2200);
  assert.ok(f.animations.length > 0);
  cleanup();
  f.advance(10000);
  assert.equal(completed, 0);
  assert.equal(f.pending.size, 0);
  assert.ok(f.animations.every(animation => animation.cancelled));
});

test("reduced motion skips decorative DOM animation", () => {
  const f = fixture();
  let completed = 0;
  f.run(f.card, () => completed++, { reducedMotion: true });
  f.advance(179);
  assert.equal(completed, 0);
  f.advance(1);
  assert.equal(completed, 1);
  assert.equal(f.queryCount, 0);
  assert.equal(f.animations.length, 0);
});

test("reduced-motion completion is also cancelled when the dialog closes", () => {
  const f = fixture();
  let completed = 0;
  const cleanup = f.run(f.card, () => completed++, { reducedMotion: true });
  cleanup();
  f.advance(1000);
  assert.equal(completed, 0);
  assert.equal(f.pending.size, 0);
});

