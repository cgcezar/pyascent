# PyAscent

A Python study app you actually code in. Thirty waypoints across seven modules, from your first `print()` to grouping a table in pandas.

Real CPython runs in the browser through [Pyodide](https://pyodide.org), so every drill is executed and graded for real. Nothing is sent to a server and there is no backend to run.

**Route 2926.** Progress is measured in metres gained rather than generic points. Clearing all thirty waypoints puts you at 2,926 m, the height of Mount Pulag in Benguet.

---

## What is in here

| Path | What it is |
|---|---|
| `index.html` | The app shell |
| `styles.css` | All styling, no framework |
| `app.js` | Routing, rendering, progress, grading |
| `runner.js` | Wrapper around the Python worker, with timeouts |
| `worker.js` | Pyodide plus the grading harness, off the main thread |
| `data/module1.js` … `module67.js` | The curriculum: briefs, drills, quizzes, checkpoints |
| `data/curriculum.js` | Combines the modules and computes the route metadata |
| `scripts/build-study-guide.mjs` | Regenerates `STUDY-GUIDE.md` from the curriculum |
| `STUDY-GUIDE.md` | The whole course as a readable document |

No build step, no dependencies, no `package.json` needed to deploy. It is static files plus two CDN scripts.

---

## Run it locally

ES modules and web workers need a real HTTP server. Opening `index.html` straight from the file system will not work.

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open the address it prints.

---

## How the grading works

Each drill and checkpoint carries a list of declarative checks. The worker runs your code in a fresh namespace, captures stdout, then evaluates each check against the namespace, the output and your source.

```js
checks: [
  { k: "out_is",   v: "Pulag is 2926 m" },        // stdout, trimmed, exact
  { k: "out_lines", v: ["Ugo", "Pulag"] },        // non-blank lines in order
  { k: "var_is",   n: "total", v: 1650 },         // a variable's value
  { k: "type_is",  n: "days", v: "float" },       // a variable's type
  { k: "src_has",  v: "enumerate" },              // your source contains this
  { k: "src_hasnt", v: "sum(" },                  // and does not contain this
  { k: "expr", v: "len(high) == 10" },            // any Python expression
]
```

Every one of the 90 reference solutions passes its own checks, and every starter is rejected by them, so the checks grade something real rather than waving code through.

### Safety on runaway loops

Module 4 teaches `while` loops, which means infinite loops are going to happen. Python runs in a web worker, and `runner.js` enforces a 12 second wall clock. On a timeout the worker is terminated, a fresh one is spawned, and you get a message explaining what an infinite loop is. The tab never freezes.

---

## Adding your own waypoints

Open any file in `data/` and copy the shape of an existing waypoint:

```js
{
  id: "m3-w6",
  title: "Your topic",
  brief: [
    { t: "p", x: "Plain paragraph. **Bold** and `code` work." },
    { t: "code", x: "print('hi')", cap: "Caption under the snippet" },
    { t: "ul", x: ["Bullet one", "Bullet two"] },
    { t: "note", x: "Callout box." },
  ],
  drills: [{ prompt, hint, starter, solution, checks }],
  quiz: [{ q, options: [], answer: 0, why, code }],
  challenge: { prompt, hint, starter, solution, checks },
}
```

Points are computed from what is there, so adding a drill or a quiz question automatically rebalances the elevation. Then regenerate the written guide:

```bash
node scripts/build-study-guide.mjs
```

---

## Notes and limits

- **`input()` is switched off.** There is no terminal to type into, so it raises a message telling you to use a variable instead. Every exercise is written to avoid it.
- **pandas downloads once.** The first run in Module 7 pulls roughly 10 MB and can take up to a minute on a slow connection. After that it is cached.
- **Progress lives in `localStorage`.** It is per browser and per device. If storage is blocked, the app falls back to memory for the session and says so.
- **`trails.csv` and `packlist.txt`** live in Pyodide's virtual filesystem, created fresh on every page load. Writing to them is safe and touches nothing on your machine.
- **The bonus waypoint.** Module 4 in the source outline goes straight to while loops. For loops and `range()` were added as waypoint 4.1 because everything after it assumes them.

## Sample data

`trails.csv` holds 20 Philippine peaks with region, province, elevation, a difficulty rating, typical days and a climber count. Elevations are the commonly cited figures. The climber counts are made up, so treat the file as teaching material rather than a source.

## Bumping Pyodide

The version is set once at the top of `worker.js`:

```js
const PYODIDE_VERSION = "v314.0.5";
```

Check [pyodide.org](https://pyodide.org/en/stable/usage/quickstart.html) for the current release and change that one line.
