/* Generates STUDY-GUIDE.md from the same curriculum the app uses,
   so the written guide can never drift out of sync with the exercises.
   Run: node scripts/build-study-guide.mjs */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MODULES, WAYPOINTS, TOTAL_WAYPOINTS, SUMMIT_M } from "../data/curriculum.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = [];
const w = (s = "") => out.push(s);

const LETTERS = ["A", "B", "C", "D", "E"];

function brief(blocks) {
  for (const b of blocks) {
    if (b.t === "p") w(b.x + "\n");
    else if (b.t === "h") w("#### " + b.x + "\n");
    else if (b.t === "ul") { b.x.forEach((li) => w("- " + li)); w(""); }
    else if (b.t === "note") { w("> " + b.x.replace(/\n/g, "\n> ") + "\n"); }
    else if (b.t === "data") {
      w("The sample dataset `trails.csv` has 20 rows and 7 columns: `name`, `region`, `province`, `elevation_m`, `difficulty`, `days`, `climbers`.\n");
    } else if (b.t === "code") {
      w("```python");
      w(b.x);
      w("```");
      if (b.cap) w("*" + b.cap.replace(/\n/g, " ") + "*\n");
      else w("");
    }
  }
}

function task(t, heading) {
  w(`**${heading}**\n`);
  w(t.prompt + "\n");
  if (t.starter && t.starter.trim()) {
    w("Starting point:\n");
    w("```python");
    w(t.starter.replace(/\n+$/, ""));
    w("```\n");
  }
  if (t.hint) w("*Hint: " + t.hint + "*\n");
  w("<details><summary>Worked solution</summary>\n");
  w("```python");
  w(t.solution);
  w("```");
  w("");
  w("</details>\n");
}

w("# PyAscent Study Guide");
w("");
w(`A complete written companion to the PyAscent app. ${TOTAL_WAYPOINTS} waypoints across ${MODULES.length} modules, from your first \`print()\` to grouping a table in pandas.`);
w("");
w("Every waypoint has the same shape: a **brief** explaining the idea, two **drills** to write yourself, a short **knowledge check**, and one **coding checkpoint**. Solutions are folded away so you can try first.");
w("");
w(`Clearing everything is worth ${SUMMIT_M} metres of elevation in the app, which is the height of Mount Pulag in Benguet.`);
w("");

w("## Contents\n");
MODULES.forEach((m, i) => {
  w(`**Module ${i + 1}: ${m.title}** ${m.blurb}`);
  m.waypoints.forEach((wp, j) => {
    w(`- ${i + 1}.${j + 1} ${wp.title}${wp.bonus ? " *(bonus)*" : ""}`);
  });
  w("");
});

w("---\n");

MODULES.forEach((mod, mi) => {
  w(`# Module ${mi + 1}: ${mod.title}`);
  w("");
  w(`*${mod.blurb}*`);
  w("");

  mod.waypoints.forEach((wp, wi) => {
    w(`## ${mi + 1}.${wi + 1} ${wp.title}${wp.bonus ? " (bonus waypoint)" : ""}`);
    w("");
    w("### Brief\n");
    brief(wp.brief);

    w("### Drills\n");
    wp.drills.forEach((d, i) => task(d, `Drill ${i + 1}`));

    w("### Knowledge check\n");
    wp.quiz.forEach((q, i) => {
      w(`**${i + 1}. ${q.q}**\n`);
      if (q.code) { w("```python"); w(q.code); w("```\n"); }
      q.options.forEach((o, oi) => w(`- ${LETTERS[oi]}. ${o}`));
      w("");
      w(`<details><summary>Answer</summary>\n\n**${LETTERS[q.answer]}.** ${q.why}\n\n</details>\n`);
    });

    w("### Checkpoint\n");
    task(wp.challenge, "Coding checkpoint");
    w("---\n");
  });
});

w("## Where to go next\n");
w("Once every waypoint is cleared, the natural next steps are:");
w("");
w("- **Virtual environments and pip.** Everything here ran in the browser. On your own machine you will want `python -m venv .venv` and `pip install pandas` per project.");
w("- **Jupyter or marimo notebooks.** The pandas work in Module 7 is far more pleasant in a notebook where each cell keeps its result.");
w("- **matplotlib or plotly.** Grouping data is only half the job. Plotting the result is the other half.");
w("- **Reading real CSVs.** Grab an open dataset and run Module 7 on it. Messy real data teaches things clean sample data cannot.");
w("");

const target = path.join(here, "..", "STUDY-GUIDE.md");
fs.writeFileSync(target, out.join("\n"));
const words = out.join(" ").split(/\s+/).length;
console.log(`Wrote ${path.relative(process.cwd(), target)} (${out.length} lines, roughly ${words} words)`);
