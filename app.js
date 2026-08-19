import {
  MODULES, WAYPOINTS, byId, TOTAL_PTS, TOTAL_WAYPOINTS,
  metres, SUMMIT_M, PTS,
} from "./data/curriculum.js";
import { PyRunner } from "./runner.js";

/* ----------------------------------------------------------------
   Storage. localStorage when available, memory when it is blocked.
   ---------------------------------------------------------------- */
const KEY = "pyascent.v1";
const blank = () => ({ p: {}, streak: { n: 0, last: null } });
let state = blank();
let memoryOnly = false;

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = Object.assign(blank(), JSON.parse(raw));
  } catch (_) {
    memoryOnly = true;
  }
}
function save() {
  if (memoryOnly) return;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) { memoryOnly = true; }
}
function rec(id) {
  if (!state.p[id]) state.p[id] = { brief: false, drills: {}, quiz: {}, challenge: false, code: {} };
  return state.p[id];
}

/* ----------------------------------------------------------------
   Scoring
   ---------------------------------------------------------------- */
function wpPoints(wp) {
  const r = state.p[wp.id];
  if (!r) return 0;
  let n = r.brief ? PTS.brief : 0;
  wp.drills.forEach((_, i) => { if (r.drills[i]) n += PTS.drill; });
  wp.quiz.forEach((_, i) => { if (r.quiz[i] === true) n += PTS.quiz; });
  if (r.challenge) n += PTS.challenge;
  return n;
}
const wpDone = (wp) => wpPoints(wp) >= wp.max;
const wpStarted = (wp) => wpPoints(wp) > 0;
const modPoints = (m) => m.waypoints.reduce((n, wp) => n + wpPoints(wp), 0);
const modMax = (m) => m.waypoints.reduce((n, wp) => n + wp.max, 0);
const modDone = (m) => modPoints(m) >= modMax(m);
const totalPoints = () => WAYPOINTS.reduce((n, wp) => n + wpPoints(wp), 0);
const doneCount = () => WAYPOINTS.filter(wpDone).length;

function touchStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const s = state.streak;
  if (s.last === today) return;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  s.n = s.last === y ? s.n + 1 : 1;
  s.last = today;
}

/* ----------------------------------------------------------------
   Small helpers
   ---------------------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Inline formatting only: **bold** and `code`.
function md(s) {
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.dataset.show = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.dataset.show = "0"; }, 2600);
}

/* ----------------------------------------------------------------
   Python runtime
   ---------------------------------------------------------------- */
const runner = new PyRunner((stateName, text) => {
  const pill = $("#runtime");
  pill.dataset.state = stateName;
  $("#runtimeText").textContent = text;
});

/* ----------------------------------------------------------------
   Chrome: gauge, profile, rail, badges
   ---------------------------------------------------------------- */
function renderChrome() {
  const pts = totalPoints();
  const m = metres(pts);
  $("#gaugeMeters").textContent = m.toLocaleString();
  $("#gaugeFill").style.width = (pts / TOTAL_PTS) * 100 + "%";
  $("#streakN").textContent = state.streak.n || 0;
  $("#profileStat").textContent = `${doneCount()} / ${TOTAL_WAYPOINTS} waypoints`;
  renderProfile();
  renderRail();
  renderBadges();
}

function renderProfile() {
  const W = 320, H = 96, pad = 6, N = TOTAL_WAYPOINTS;
  const pts = WAYPOINTS.map((wp, i) => {
    const x = pad + (i / (N - 1)) * (W - pad * 2);
    const climb = (i + 1) / N;
    const jitter = Math.sin(i * 1.9) * 0.045 + Math.sin(i * 0.63) * 0.03;
    let y = H - 4 - (climb * 0.84 + jitter) * (H - 18);
    y = Math.max(7, Math.min(H - 5, y));
    return [x, y];
  });

  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `M${pad},${H} ` + line.slice(1) + ` L${W - pad},${H} Z`;

  // How far along the fill goes: the last waypoint with any progress.
  let last = -1;
  WAYPOINTS.forEach((wp, i) => { if (wpPoints(wp) > 0) last = i; });
  const k = Math.max(0, last);
  const donePts = pts.slice(0, k + 1);
  const doneLine = donePts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const doneArea = donePts.length > 1
    ? `M${pad},${H} ` + doneLine.slice(1) + ` L${donePts[donePts.length - 1][0].toFixed(1)},${H} Z`
    : "";

  const ticks = MODULES.map((mod) => {
    const first = mod.waypoints[0].order;
    const x = pad + (first / (N - 1)) * (W - pad * 2);
    return `<line class="prof-tick" x1="${x.toFixed(1)}" y1="6" x2="${x.toFixed(1)}" y2="${H}"/>`;
  }).join("");

  const here = last >= 0 ? pts[k] : null;

  $("#profileSvg").innerHTML =
    `<path class="prof-base" d="${area}"/>` +
    (doneArea ? `<path class="prof-done" d="${doneArea}"/>` : "") +
    ticks +
    `<path class="prof-line" d="${line}"/>` +
    (donePts.length > 1 ? `<path class="prof-line-done" d="${doneLine}"/>` : "") +
    (here ? `<circle class="prof-here" cx="${here[0].toFixed(1)}" cy="${here[1].toFixed(1)}" r="3.4"/>` : "");
}

function renderRail() {
  const current = location.hash.startsWith("#/w/") ? location.hash.split("/")[2] : null;
  $("#route").innerHTML = MODULES.map((mod, mi) => {
    const items = mod.waypoints.map((wp) => {
      const status = wpDone(wp) ? "done" : wpStarted(wp) ? "started" : "new";
      const pin = status === "done" ? "&#10003;" : wp.indexInModule + 1;
      return `<button class="wp" data-status="${status}" data-go="${wp.id}"
        ${current === wp.id ? 'aria-current="true"' : ""}>
        <span class="wp__pin">${pin}</span>
        <span class="wp__t">${esc(wp.title)}${wp.bonus ? '<span class="wp__bonus">bonus</span>' : ""}</span>
      </button>`;
    }).join("");
    return `<div class="mod">
      <div class="mod__head" data-done="${modDone(mod) ? 1 : 0}">
        <span>M${mi + 1} &middot; ${esc(mod.title)}</span>
        <span class="mod__elev">${metres(modPoints(mod))} m</span>
      </div>${items}
    </div>`;
  }).join("");
}

function renderBadges() {
  $("#badges").innerHTML = MODULES.map((mod, i) =>
    `<span class="badge" data-earned="${modDone(mod) ? 1 : 0}" title="${esc(mod.title)}">${i + 1}</span>`
  ).join("");
}

/* ----------------------------------------------------------------
   Contour texture
   ---------------------------------------------------------------- */
function drawContours() {
  const base = "M-60,430 C90,330 170,470 300,380 C430,290 540,410 690,330 C800,272 880,318 980,286";
  const layers = [];
  for (let i = 0; i < 11; i++) {
    const dy = i * 30 - 40;
    const sx = 1 + i * 0.012;
    layers.push(`<path d="${base}" transform="translate(0,${dy}) scale(${sx.toFixed(3)},1)" opacity="${(0.9 - i * 0.06).toFixed(2)}"/>`);
  }
  $(".contours").innerHTML = layers.join("");
}

/* ----------------------------------------------------------------
   Brief blocks
   ---------------------------------------------------------------- */
const DATASET_HEAD = ["name", "region", "province", "elevation_m", "difficulty", "days", "climbers"];
const DATASET_ROWS = [
  ["Apo", "Mindanao", "Davao del Sur", 2954, 9, 4, 320],
  ["Dulang-dulang", "Mindanao", "Bukidnon", 2938, 8, 3, 210],
  ["Pulag", "Luzon", "Benguet", 2926, 4, 2, 1480],
  ["Kitanglad", "Mindanao", "Bukidnon", 2899, 7, 3, 190],
  ["Tabayoc", "Luzon", "Benguet", 2842, 6, 2, 140],
  ["Timbak", "Luzon", "Benguet", 2717, 3, 1, 260],
  ["Kalawitan", "Luzon", "Mountain Province", 2714, 7, 3, 95],
  ["Amuyao", "Luzon", "Mountain Province", 2702, 8, 3, 110],
  ["...", "", "", "", "", "", ""],
  ["Batulao", "Luzon", "Batangas", 811, 3, 1, 1620],
];

function datasetTable() {
  return `<div class="dataset">
    <div class="dataset__bar"><span>trails.csv</span><span>&middot;</span><span>20 rows, 7 columns</span></div>
    <div class="dataset__scroll"><table>
      <thead><tr>${DATASET_HEAD.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
      <tbody>${DATASET_ROWS.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>
  </div>`;
}

function briefBlock(b, i) {
  if (b.t === "p") return `<p>${md(b.x)}</p>`;
  if (b.t === "h") return `<h3>${md(b.x)}</h3>`;
  if (b.t === "ul") return `<ul>${b.x.map((li) => `<li>${md(li)}</li>`).join("")}</ul>`;
  if (b.t === "note") return `<div class="note">${md(b.x)}</div>`;
  if (b.t === "data") return datasetTable();
  if (b.t === "code") {
    return `<div class="snippet">
      <pre class="snippet__code">${esc(b.x)}</pre>
      <div class="snippet__foot">
        <span class="snippet__cap">${b.cap ? esc(b.cap).replace(/\n/g, " &middot; ") : "Example"}</span>
        <button class="mini-btn" data-try="${i}">Try in editor</button>
      </div>
    </div>`;
  }
  return "";
}

/* ----------------------------------------------------------------
   Editor (CodeMirror when it loaded, textarea otherwise)
   ---------------------------------------------------------------- */
let activeEditor = null;
let activeKeyHandler = null;

function mountEditor(host, value) {
  if (window.CodeMirror) {
    const cm = window.CodeMirror(host, {
      value,
      mode: "python",
      lineNumbers: true,
      indentUnit: 4,
      autoCloseBrackets: true,
      lineWrapping: true,
      extraKeys: { Tab: (c) => c.replace(" ".repeat(4)) },
    });
    activeEditor = { get: () => cm.getValue(), set: (v) => cm.setValue(v), focus: () => cm.focus() };
  } else {
    const ta = document.createElement("textarea");
    ta.spellcheck = false;
    ta.value = value;
    ta.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      e.preventDefault();
      const s = ta.selectionStart;
      ta.value = ta.value.slice(0, s) + "    " + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = s + 4;
    });
    host.appendChild(ta);
    activeEditor = { get: () => ta.value, set: (v) => { ta.value = v; }, focus: () => ta.focus() };
  }
  return activeEditor;
}

function labMarkup(task, opts) {
  const n = opts.label;
  return `<div class="lab">
    <div class="task">
      <div class="task__n">${esc(n)}</div>
      <p class="task__prompt">${md(task.prompt)}</p>
      <div class="task__actions">
        <button class="btn" id="runBtn">Run and check</button>
        <button class="btn btn--quiet" id="hintBtn">Hint</button>
        <button class="btn btn--quiet" id="resetCodeBtn">Reset</button>
        <button class="btn btn--quiet" id="solBtn">Solution</button>
      </div>
      <div id="hintSlot"></div>
    </div>
    <div>
      <div class="editor">
        <div class="editor__bar">
          <span class="editor__file">waypoint.py</span>
          <span class="editor__tools"><span class="editor__file">Ctrl+Enter to run</span></span>
        </div>
        <div class="editor__host" id="editorHost"></div>
        <div class="console">
          <div class="console__bar">Output</div>
          <pre class="console__body" id="consoleBody"></pre>
          <ul class="checks" id="checksList"></ul>
        </div>
      </div>
      <div id="verdictSlot"></div>
    </div>
  </div>`;
}

function wireLab(wp, task, slotKey, opts) {
  const r = rec(wp.id);
  const saved = r.code[slotKey];
  const ed = mountEditor($("#editorHost"), saved !== undefined ? saved : task.starter || "");

  const persist = () => { r.code[slotKey] = ed.get(); save(); };

  const runIt = async () => {
    const btn = $("#runBtn");
    btn.disabled = true;
    btn.textContent = runner.ready ? "Running" : "Starting Python";
    persist();
    const src = ed.get();
    const res = await runner.run(src, task.checks || [], { needsPandas: wp.needsPandas });
    btn.disabled = false;
    btn.textContent = "Run and check";

    const out = $("#consoleBody");
    if (res.err) {
      out.innerHTML = (res.out ? esc(res.out) : "") + `<span class="c-err">${esc(res.err)}</span>`;
    } else {
      out.textContent = res.out || "(no output)";
    }

    const list = $("#checksList");
    list.innerHTML = (res.checks || []).map((c) =>
      `<li data-ok="${c.ok ? 1 : 0}"><span class="checks__mark">${c.ok ? "&#10003;" : "&#10007;"}</span><span>${esc(c.msg)}</span></li>`
    ).join("");

    const passed = !res.err && (res.checks || []).length > 0 && res.checks.every((c) => c.ok);

    // Only talk about tracebacks when Python actually produced one. A timeout
    // or a startup problem is not the user's code being wrong.
    let failMsg;
    if (!res.err) failMsg = "Not there yet. The failed checks above tell you what is missing.";
    else if (res.noTraceback || !/Traceback \(most recent call last\)/.test(res.err))
      failMsg = "The run could not finish. The message in the console explains why.";
    else failMsg = "Python raised an error. Read the last line of the traceback first.";

    $("#verdictSlot").innerHTML = passed
      ? `<div class="verdict" data-kind="pass">All checks passed. ${opts.award} m of elevation gained.</div>`
      : `<div class="verdict" data-kind="fail">${failMsg}</div>`;

    if (passed && !opts.isDone()) {
      opts.markDone();
      touchStreak();
      save();
      renderChrome();
      toast(`+${opts.award} m gained`);
      checkMilestones(wp);
    }
  };

  $("#runBtn").addEventListener("click", runIt);

  // Exactly one Ctrl+Enter handler at a time, always the currently mounted lab.
  if (activeKeyHandler) document.removeEventListener("keydown", activeKeyHandler);
  activeKeyHandler = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); runIt(); }
  };
  document.addEventListener("keydown", activeKeyHandler);
  $("#hintBtn").addEventListener("click", () => {
    $("#hintSlot").innerHTML = `<div class="hintbox">${md(task.hint || "Re-read the brief for this waypoint, the pattern is in there.")}</div>`;
  });
  $("#resetCodeBtn").addEventListener("click", () => { ed.set(task.starter || ""); persist(); ed.focus(); });
  $("#solBtn").addEventListener("click", () => {
    if (!confirm("Show the worked solution? Try the hint first, you learn more from the struggle.")) return;
    ed.set(task.solution || "");
    persist();
  });
}

function checkMilestones(wp) {
  if (modDone(wp.module)) toast(`Module ${wp.moduleIndex + 1} cleared. Badge earned.`);
  if (totalPoints() >= TOTAL_PTS) toast(`Summit. ${SUMMIT_M} m. Every waypoint cleared.`);
}

/* ----------------------------------------------------------------
   Views
   ---------------------------------------------------------------- */
function viewHome() {
  const pts = totalPoints();
  const done = doneCount();
  const next = WAYPOINTS.find((wp) => !wpDone(wp)) || WAYPOINTS[0];

  $("#stageInner").innerHTML = `
    <section class="home__hero">
      <span class="eyebrow home__eyebrow">Route 2926 &middot; Benguet &middot; ${TOTAL_WAYPOINTS} waypoints</span>
      <h1 class="home__title">Learn Python by <span>climbing</span> it.</h1>
      <p class="home__lede">Seven modules, thirty waypoints, from your first <code>print()</code> to grouping a table in pandas. Every waypoint has a brief to read, two drills to code, and a checkpoint to clear. Real Python runs in your browser, so nothing here is a simulation.</p>
      <div class="home__facts">
        <div class="fact"><span class="fact__n">${metres(pts).toLocaleString()} m</span><span class="fact__l">gained of ${SUMMIT_M}</span></div>
        <div class="fact"><span class="fact__n">${done}</span><span class="fact__l">of ${TOTAL_WAYPOINTS} cleared</span></div>
        <div class="fact"><span class="fact__n">${state.streak.n || 0}</span><span class="fact__l">day streak</span></div>
      </div>
      <div class="readdone">
        <button class="btn" data-go="${next.id}">${pts ? "Continue at" : "Start at"} ${esc(next.title)}</button>
      </div>
    </section>

    <div class="home__grid">
      ${MODULES.map((mod, i) => {
        const p = modPoints(mod), mx = modMax(mod);
        return `<button class="mcard" data-go="${mod.waypoints[0].id}">
          <div class="mcard__n">Module ${i + 1}${modDone(mod) ? " &middot; cleared" : ""}</div>
          <div class="mcard__t">${esc(mod.title)}</div>
          <div class="mcard__meta">${mod.waypoints.length} waypoints &middot; ${metres(p)} / ${metres(mx)} m</div>
          <div class="mcard__bar"><i style="width:${(p / mx) * 100}%"></i></div>
        </button>`;
      }).join("")}
    </div>

    ${pts >= TOTAL_PTS ? `<div class="summit" style="margin-top:30px"><h2>Summit reached</h2><p>All ${TOTAL_WAYPOINTS} waypoints cleared. ${SUMMIT_M} m.</p></div>` : ""}
  `;
}

function viewWaypoint(wp, tab) {
  const r = rec(wp.id);
  const drillsDone = wp.drills.every((_, i) => r.drills[i]);
  const testDone = wp.quiz.every((_, i) => r.quiz[i] === true) && r.challenge;

  $("#stageInner").innerHTML = `
    <header class="wphead">
      <div class="wphead__crumb">
        <button data-home>Route</button><span class="wphead__sep">/</span>
        <button data-go="${wp.module.waypoints[0].id}">Module ${wp.moduleIndex + 1} &middot; ${esc(wp.module.title)}</button>
        ${wp.bonus ? '<span class="wp__bonus">bonus waypoint</span>' : ""}
      </div>
      <h1 class="wphead__title">${esc(wp.title)}</h1>
      <div class="wphead__bar">
        <button class="tab" data-tab="brief" aria-selected="${tab === "brief"}">Brief${r.brief ? '<span class="tab__mark">&#10003;</span>' : ""}</button>
        <button class="tab" data-tab="drills" aria-selected="${tab === "drills"}">Drills${drillsDone ? '<span class="tab__mark">&#10003;</span>' : ""}</button>
        <button class="tab" data-tab="test" aria-selected="${tab === "test"}">Checkpoint${testDone ? '<span class="tab__mark">&#10003;</span>' : ""}</button>
        <div class="wpnav">
          ${wp.order > 0 ? `<button class="tab" data-go="${WAYPOINTS[wp.order - 1].id}">&larr; Prev</button>` : ""}
          ${wp.order < TOTAL_WAYPOINTS - 1 ? `<button class="tab" data-go="${WAYPOINTS[wp.order + 1].id}">Next &rarr;</button>` : ""}
        </div>
      </div>
    </header>
    <div id="panel"></div>
  `;

  if (tab === "brief") panelBrief(wp);
  else if (tab === "drills") panelDrills(wp);
  else panelTest(wp);
}

function panelBrief(wp) {
  const r = rec(wp.id);
  $("#panel").innerHTML = `
    <div class="prose">${wp.brief.map(briefBlock).join("")}</div>
    <div class="readdone">
      <button class="btn" id="markRead" ${r.brief ? "disabled" : ""}>${r.brief ? "Brief logged" : `Mark as read (+${PTS.brief} m)`}</button>
      <button class="btn btn--quiet" data-tab="drills">Go to drills</button>
    </div>`;

  const btn = $("#markRead");
  btn.addEventListener("click", () => {
    r.brief = true; touchStreak(); save();
    btn.disabled = true; btn.textContent = "Brief logged";
    renderChrome(); toast(`+${PTS.brief} m gained`);
  });

  $("#panel").querySelectorAll("[data-try]").forEach((b) => {
    b.addEventListener("click", () => {
      const block = wp.brief[Number(b.dataset.try)];
      rec(wp.id).code.d0 = block.x;
      save();
      go(`#/w/${wp.id}/drills`);
    });
  });
}

function panelDrills(wp) {
  const r = rec(wp.id);
  const sub = Number(sessionStorage.getItem("drill:" + wp.id) || 0) || 0;
  const idx = Math.min(sub, wp.drills.length - 1);
  const task = wp.drills[idx];

  $("#panel").innerHTML = `
    <div class="wphead__bar" style="margin-bottom:18px">
      ${wp.drills.map((_, i) =>
        `<button class="tab" data-drill="${i}" aria-selected="${i === idx}">Drill ${i + 1}${r.drills[i] ? '<span class="tab__mark">&#10003;</span>' : ""}</button>`
      ).join("")}
    </div>
    ${labMarkup(task, { label: `Drill ${idx + 1} of ${wp.drills.length}` })}`;

  $("#panel").querySelectorAll("[data-drill]").forEach((b) => {
    b.addEventListener("click", () => {
      try { sessionStorage.setItem("drill:" + wp.id, b.dataset.drill); } catch (_) {}
      panelDrills(wp);
    });
  });

  wireLab(wp, task, "d" + idx, {
    label: `Drill ${idx + 1}`,
    award: PTS.drill,
    isDone: () => !!r.drills[idx],
    markDone: () => { r.drills[idx] = true; },
  });
}

function panelTest(wp) {
  const r = rec(wp.id);
  $("#panel").innerHTML = `
    <div class="quiz">
      <h3 style="font-family:var(--font-display);font-size:20px;margin:0 0 14px">Knowledge check</h3>
      ${wp.quiz.map((q, qi) => {
        const answered = r.quiz[qi] !== undefined;
        return `<div class="q" data-q="${qi}">
          <div class="q__n">Question ${qi + 1} of ${wp.quiz.length} &middot; ${PTS.quiz} m</div>
          <p class="q__text">${md(q.q)}</p>
          ${q.code ? `<pre class="q__code">${esc(q.code)}</pre>` : ""}
          ${q.options.map((o, oi) => {
            let st = "";
            if (answered) {
              if (oi === q.answer) st = "right";
              else if (r.quizPick && r.quizPick[qi] === oi) st = "wrong";
            }
            return `<button class="opt" data-opt="${oi}" data-state="${st}" ${answered ? "disabled" : ""}>${md(o)}</button>`;
          }).join("")}
          <div class="q__why" ${answered ? "" : 'hidden'}>${md(q.why)}</div>
        </div>`;
      }).join("")}
    </div>
    <h3 style="font-family:var(--font-display);font-size:20px;margin:30px 0 14px">Coding checkpoint</h3>
    ${labMarkup(wp.challenge, { label: `Checkpoint &middot; ${PTS.challenge} m` })}`;

  $("#panel").querySelectorAll(".q").forEach((qEl) => {
    const qi = Number(qEl.dataset.q);
    const q = wp.quiz[qi];
    qEl.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pick = Number(btn.dataset.opt);
        const right = pick === q.answer;
        if (!r.quizPick) r.quizPick = {};
        r.quizPick[qi] = pick;
        r.quiz[qi] = right;
        touchStreak(); save();
        qEl.querySelectorAll(".opt").forEach((b, oi) => {
          b.disabled = true;
          if (oi === q.answer) b.dataset.state = "right";
          else if (oi === pick) b.dataset.state = "wrong";
        });
        qEl.querySelector(".q__why").hidden = false;
        renderChrome();
        toast(right ? `Correct. +${PTS.quiz} m` : "Not quite. The explanation is below.");
        if (right) checkMilestones(wp);
      });
    });
  });

  wireLab(wp, wp.challenge, "ch", {
    label: "Checkpoint",
    award: PTS.challenge,
    isDone: () => !!r.challenge,
    markDone: () => { r.challenge = true; },
  });
}

/* ----------------------------------------------------------------
   Router
   ---------------------------------------------------------------- */
function go(hash) {
  if (location.hash === hash) route();
  else location.hash = hash;
}

function route() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (activeKeyHandler) {
    document.removeEventListener("keydown", activeKeyHandler);
    activeKeyHandler = null;
  }
  window.scrollTo(0, 0);
  $("#rail").dataset.open = "0";
  $("#railToggle").setAttribute("aria-expanded", "false");

  if (parts[0] === "w" && byId(parts[1])) {
    viewWaypoint(byId(parts[1]), parts[2] || "brief");
  } else {
    viewHome();
  }
  renderRail();
}

/* ----------------------------------------------------------------
   Global wiring
   ---------------------------------------------------------------- */
document.addEventListener("click", (e) => {
  const goEl = e.target.closest("[data-go]");
  if (goEl) { e.preventDefault(); go(`#/w/${goEl.dataset.go}`); return; }

  const homeEl = e.target.closest("[data-home], #brandHome");
  if (homeEl) { e.preventDefault(); go("#/"); return; }

  const tabEl = e.target.closest("[data-tab]");
  if (tabEl) {
    const id = location.hash.split("/")[2];
    if (id) go(`#/w/${id}/${tabEl.dataset.tab}`);
    return;
  }
});

$("#railToggle").addEventListener("click", () => {
  const rail = $("#rail");
  const open = rail.dataset.open === "1";
  rail.dataset.open = open ? "0" : "1";
  $("#railToggle").setAttribute("aria-expanded", String(!open));
});

$("#resetBtn").addEventListener("click", () => {
  if (!confirm("Clear all progress and start the route from the trailhead?")) return;
  state = blank();
  save();
  renderChrome();
  go("#/");
  toast("Route reset.");
});

window.addEventListener("hashchange", route);

/* ---------------------------------------------------------------- */
load();
drawContours();
renderChrome();
route();
if (memoryOnly) toast("Storage is blocked here, so progress lasts for this session only.");
