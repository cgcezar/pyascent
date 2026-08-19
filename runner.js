/* Thin wrapper around worker.js.
   Owns the worker lifecycle, matches replies to requests, and enforces a
   wall-clock limit so a runaway loop costs you one worker, not your tab. */

const TIMEOUT_MS = 12000;
const PANDAS_TIMEOUT_MS = 60000;

export class PyRunner {
  constructor(onStatus) {
    this.onStatus = onStatus || (() => {});
    this.pending = new Map();
    this.seq = 0;
    this.ready = false;
    this.spawn();
  }

  spawn() {
    if (this.worker) {
      try { this.worker.terminate(); } catch (_) {}
    }
    this.ready = false;
    this.onStatus("boot", "Starting Python...");
    this.worker = new Worker("./worker.js");
    this.worker.onmessage = (ev) => this.receive(ev.data || {});
    this.worker.onerror = () => {
      this.onStatus("error", "Python failed to start. Check your connection and reload.");
    };
    this.worker.postMessage({ type: "boot" });
  }

  receive(msg) {
    if (msg.type === "ready") {
      this.ready = true;
      this.onStatus("ready", "Python 3.14 ready");
      return;
    }
    if (msg.type === "boot-error") {
      this.onStatus("error", "Python failed to load: " + msg.message);
      return;
    }
    if (msg.type === "note") {
      this.onStatus("busy", msg.message);
      return;
    }
    if (msg.type === "result") {
      const entry = this.pending.get(msg.id);
      if (!entry) return;
      clearTimeout(entry.timer);
      this.pending.delete(msg.id);
      this.onStatus("ready", "Python 3.14 ready");
      entry.resolve(msg.payload);
    }
  }

  run(src, checks, opts = {}) {
    const id = ++this.seq;
    const limit = opts.needsPandas ? PANDAS_TIMEOUT_MS : TIMEOUT_MS;
    this.onStatus("busy", opts.needsPandas ? "Running with pandas..." : "Running...");

    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        this.spawn();
        resolve({
          out: "",
          err:
            "Timed out after " +
            Math.round(limit / 1000) +
            " seconds. This usually means a loop never reaches its stopping condition. " +
            "Check that something inside the loop actually changes the value the condition tests.",
          checks: [],
          timedOut: true,
        });
      }, limit);

      this.pending.set(id, { resolve, timer });
      this.worker.postMessage({ type: "run", id, src, checks, needsPandas: !!opts.needsPandas });
    });
  }
}
