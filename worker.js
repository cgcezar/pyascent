/* PyAscent Python worker.
   Runs Pyodide off the main thread. If a drill contains a runaway loop the
   main thread terminates this worker and spawns a fresh one, so the page
   never locks up. */

const PYODIDE_VERSION = "v314.0.5";
const CDN = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;

let pyodide = null;
let pandasReady = false;

// Sample data written into Pyodide's virtual filesystem so the file and
// pandas waypoints have something real to read.
const TRAILS_CSV = `name,region,province,elevation_m,difficulty,days,climbers
Apo,Mindanao,Davao del Sur,2954,9,4,320
Dulang-dulang,Mindanao,Bukidnon,2938,8,3,210
Pulag,Luzon,Benguet,2926,4,2,1480
Kitanglad,Mindanao,Bukidnon,2899,7,3,190
Tabayoc,Luzon,Benguet,2842,6,2,140
Timbak,Luzon,Benguet,2717,3,1,260
Kalawitan,Luzon,Mountain Province,2714,7,3,95
Amuyao,Luzon,Mountain Province,2702,8,3,110
Napulauan,Luzon,Ifugao,2642,8,3,80
Halcon,Mindoro,Oriental Mindoro,2586,9,4,150
Kanlaon,Visayas,Negros Occidental,2465,7,3,240
Mayon,Luzon,Albay,2463,8,3,175
Sicapoo,Luzon,Ilocos Norte,2354,9,4,60
Banahaw,Luzon,Quezon,2158,5,2,410
Ugo,Luzon,Benguet,2150,5,2,530
Madjaas,Visayas,Antique,2117,8,4,70
Guiting-Guiting,Visayas,Romblon,2058,9,3,230
Talinis,Visayas,Negros Oriental,1903,6,2,260
Makiling,Luzon,Laguna,1090,4,1,980
Batulao,Luzon,Batangas,811,3,1,1620
`;

const PACKLIST_TXT = `headlamp
water filter
rain shell
trail map
first aid kit
`;

// The grading harness. Everything runs inside a fresh namespace per attempt.
const HARNESS = `
import io, sys, json, traceback, builtins

def _pq_input(*a, **k):
    raise RuntimeError("input() is not available here. Set the value in a variable instead, like name = 'Clif'")
builtins.input = _pq_input

def _pq_lit(v):
    return v

def _pq_one(c, ns, out, src):
    kind = c.get("k")
    msg = c.get("msg")
    ok = False
    try:
        if kind == "out_has":
            hay = out.lower() if c.get("ci") else out
            need = c["v"].lower() if c.get("ci") else c["v"]
            ok = need in hay
            msg = msg or ("Output contains " + repr(c["v"]))
        elif kind == "out_is":
            ok = out.strip() == str(c["v"]).strip()
            msg = msg or ("Output is exactly " + repr(c["v"]))
        elif kind == "out_lines":
            got = [l.rstrip() for l in out.strip().splitlines() if l.strip() != ""]
            want = [str(x).rstrip() for x in c["v"]]
            ok = got == want
            msg = msg or ("Output has " + str(len(want)) + " line(s) in the right order")
        elif kind == "out_n_lines":
            got = [l for l in out.strip().splitlines() if l.strip() != ""]
            ok = len(got) == int(c["v"])
            msg = msg or ("Output has " + str(c["v"]) + " line(s)")
        elif kind == "src_has":
            hay = src.replace(" ", "") if c.get("tight") else src
            need = c["v"].replace(" ", "") if c.get("tight") else c["v"]
            ok = need in hay
            msg = msg or ("Your code uses " + repr(c["v"]))
        elif kind == "src_hasnt":
            ok = c["v"] not in src
            msg = msg or ("Your code avoids " + repr(c["v"]))
        elif kind == "src_lines_min":
            n = len([l for l in src.splitlines() if l.strip() and not l.strip().startswith("#")])
            ok = n >= int(c["v"])
            msg = msg or ("Code is spread over at least " + str(c["v"]) + " statements")
        elif kind == "var_is":
            ok = c["n"] in ns and ns[c["n"]] == _pq_lit(c["v"])
            msg = msg or (c["n"] + " equals " + repr(c["v"]))
        elif kind == "var_set":
            ok = c["n"] in ns and set(ns[c["n"]]) == set(c["v"])
            msg = msg or (c["n"] + " holds the right values")
        elif kind == "type_is":
            ok = c["n"] in ns and type(ns[c["n"]]).__name__ == c["v"]
            msg = msg or (c["n"] + " is a " + c["v"])
        elif kind == "expr":
            ok = bool(eval(c["v"], dict(ns)))
            msg = msg or ("Check: " + c["v"])
        else:
            msg = msg or ("Unknown check: " + str(kind))
    except Exception as e:
        ok = False
        msg = (msg or "Check failed") + " (" + type(e).__name__ + ")"
    return {"ok": bool(ok), "msg": msg}

def _pq_run(src, checks_json):
    checks = json.loads(checks_json)
    ns = {"__name__": "__main__"}
    buf = io.StringIO()
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout = buf
    sys.stderr = buf
    err = None
    try:
        exec(compile(src, "waypoint.py", "exec"), ns)
    except BaseException:
        et, ev, tb = sys.exc_info()
        err = "".join(traceback.format_exception(et, ev, tb.tb_next if tb else tb))
    finally:
        sys.stdout = old_out
        sys.stderr = old_err
    out = buf.getvalue()
    results = []
    if err is None:
        for c in checks:
            results.append(_pq_one(c, ns, out, src))
    return json.dumps({"out": out, "err": err, "checks": results})
`;

async function boot() {
  try {
    importScripts(CDN + "pyodide.js");
    pyodide = await loadPyodide({ indexURL: CDN });
    pyodide.FS.writeFile("trails.csv", TRAILS_CSV);
    pyodide.FS.writeFile("packlist.txt", PACKLIST_TXT);
    pyodide.runPython(HARNESS);
    postMessage({ type: "ready" });
  } catch (e) {
    postMessage({ type: "boot-error", message: String(e && e.message ? e.message : e) });
  }
}

self.onmessage = async (ev) => {
  const msg = ev.data || {};

  if (msg.type === "boot") {
    await boot();
    return;
  }

  if (msg.type === "run") {
    const { id, src, checks, needsPandas } = msg;
    if (!pyodide) {
      postMessage({ type: "result", id, payload: { out: "", err: "Python is still starting up. Give it a second and run again.", checks: [] } });
      return;
    }
    try {
      if (needsPandas && !pandasReady) {
        postMessage({ type: "note", id, message: "Loading pandas, this happens once..." });
        await pyodide.loadPackage("pandas");
        pandasReady = true;
      }
      const runner = pyodide.globals.get("_pq_run");
      const raw = runner(src, JSON.stringify(checks || []));
      runner.destroy();
      postMessage({ type: "result", id, payload: JSON.parse(raw) });
    } catch (e) {
      postMessage({
        type: "result",
        id,
        payload: { out: "", err: String(e && e.message ? e.message : e), checks: [] },
      });
    }
  }
};
