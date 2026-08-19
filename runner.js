/* Thin wrapper around worker.js.
   Owns the worker lifecycle, matches replies to requests, and enforces a
   wall-clock limit so a runaway loop costs you one worker, not your tab. */

const TIMEOUT_MS = 12000;
const PANDAS_TIMEOUT_MS = 60000;
const BOOT_LIMIT_MS = 180000;

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
    try {
      // Must be a module worker. Pyodide 314 removed classic worker support
      // because pyodide.asm.mjs is an ES module.
      this.worker = new Worker("./worker.js", { type: "module" });
    } catch (e) {
      this.worker = null;
      this.onStatus("error", "This browser does not support module workers, which Python needs here. Try a current Chrome, Edge, Firefox or Safari.");
      return;
    }
    this.worker.onmessage = (ev) => this.receive(ev.data || {});
    this.worker.onerror = (ev) => {
      const detail = ev && ev.message ? " (" + ev.message + ")" : "";
      this.onStatus("error", "Python failed to start. Check your connection and reload." + detail);
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
    if (msg.type === "started") {
      // Execution has begun. Only now does the wall clock make sense: booting
      // Python or downloading pandas should never count against a run.
      const entry = this.pending.get(msg.id);
      if (!entry) return;
      this.onStatus("busy", "Running...");
      entry.timer = setTimeout(() => entry.giveUp(), entry.limit);
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
    if (!this.worker) {
      return Promise.resolve({
        out: "",
        err: "Python is not running in this browser. Reload the page, and if it keeps failing try a current Chrome, Edge, Firefox or Safari.",
        checks: [],
        noTraceback: true,
      });
    }
    const id = ++this.seq;
    const limit = opts.needsPandas ? PANDAS_TIMEOUT_MS : TIMEOUT_MS;
    this.onStatus(
      "busy",
      this.ready
        ? opts.needsPandas ? "Running with pandas..." : "Running..."
        : "Waiting for Python to finish starting..."
    );

    return new Promise((resolve) => {
      const giveUp = () => {
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
          noTraceback: true,
        });
      };

      // No timer yet. It is armed when the worker reports that it has started,
      // with a long backstop in case the worker never gets that far at all.
      const entry = { resolve, limit, giveUp, timer: null };
      entry.bootTimer = setTimeout(() => {
        if (!this.pending.has(id)) return;
        this.pending.delete(id);
        this.spawn();
        resolve({
          out: "",
          err: "Python did not finish starting up. Check your connection and reload the page.",
          checks: [],
          timedOut: true,
          noTraceback: true,
        });
      }, BOOT_LIMIT_MS);

      const originalResolve = entry.resolve;
      entry.resolve = (payload) => {
        clearTimeout(entry.bootTimer);
        originalResolve(payload);
      };

      this.pending.set(id, entry);
      this.worker.postMessage({ type: "run", id, src, checks, needsPandas: !!opts.needsPandas });
    });
  }
}
