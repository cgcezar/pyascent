#!/usr/bin/env python3
"""Builds STUDY-GUIDE.pdf from the same curriculum files the app reads.

The curriculum lives in ES modules, so Node is used to dump it to JSON, then
this script lays it out as paged HTML and hands it to WeasyPrint.

    pip install weasyprint pygments
    python3 scripts/build-pdf.py
"""

import html
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import PythonLexer
from weasyprint import HTML

ROOT = Path(__file__).resolve().parent.parent
PRINT = ROOT / "print"
LETTERS = "ABCDE"

FORMATTER = HtmlFormatter(nowrap=True)
LEXER = PythonLexer()


# ---------------------------------------------------------------- data

def load_curriculum():
    """Ask Node for the curriculum as JSON so this file never duplicates it."""
    script = """
import { MODULES, TOTAL_WAYPOINTS, TOTAL_PTS, SUMMIT_M } from './data/curriculum.js';
const plain = MODULES.map(m => ({
  title: m.title, blurb: m.blurb,
  waypoints: m.waypoints.map(w => ({
    id: w.id, title: w.title, bonus: !!w.bonus,
    brief: w.brief, drills: w.drills, quiz: w.quiz, challenge: w.challenge,
  })),
}));
process.stdout.write(JSON.stringify({
  modules: plain, totalWaypoints: TOTAL_WAYPOINTS, totalPts: TOTAL_PTS, summit: SUMMIT_M,
}));
"""
    out = subprocess.run(
        ["node", "--input-type=module", "-e", script],
        cwd=ROOT, capture_output=True, text=True,
    )
    if out.returncode:
        sys.exit("Could not read the curriculum:\n" + out.stderr)
    return json.loads(out.stdout)


def load_dataset():
    """Pull trails.csv straight out of the worker so the table cannot drift."""
    src = (ROOT / "worker.js").read_text()
    body = re.search(r"const TRAILS_CSV = `(.*?)`;", src, re.S).group(1)
    rows = [r.split(",") for r in body.strip().splitlines()]
    return rows[0], rows[1:]


# ---------------------------------------------------------------- helpers

def md(s):
    """Same inline rules the app uses: **bold** and `code`."""
    s = html.escape(s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    return s


def py(code):
    return highlight(code, LEXER, FORMATTER).rstrip("\n")


def snippet(code, cap=None):
    if cap:
        return (f'<div class="snip"><pre>{py(code)}</pre>'
                f'<div class="snip__cap">{html.escape(cap.replace(chr(10), " · ").replace("`", ""))}</div></div>')
    return f'<div class="snip"><pre class="solo">{py(code)}</pre></div>'


def dataset_table():
    head, rows = load_dataset()
    ths = "".join(f"<th>{html.escape(h)}</th>" for h in head)
    trs = "".join(
        "<tr>" + "".join(f"<td>{html.escape(c)}</td>" for c in r) + "</tr>" for r in rows
    )
    return (f'<div class="data"><div class="data__bar">trails.csv &middot; '
            f'{len(rows)} rows &middot; {len(head)} columns</div>'
            f"<table><thead><tr>{ths}</tr></thead><tbody>{trs}</tbody></table></div>")


def brief_html(blocks):
    out = []
    for b in blocks:
        t = b.get("t")
        if t == "p":
            out.append(f"<p>{md(b['x'])}</p>")
        elif t == "h":
            out.append(f"<h3 class=\"sub\">{md(b['x'])}</h3>")
        elif t == "ul":
            lis = "".join(f"<li>{md(li)}</li>" for li in b["x"])
            out.append(f'<ul class="brief">{lis}</ul>')
        elif t == "note":
            out.append(f"<div class=\"note\">{md(b['x'])}</div>")
        elif t == "code":
            out.append(snippet(b["x"], b.get("cap")))
        elif t == "data":
            out.append(dataset_table())
    return "".join(out)


def task_html(task, label, kind=""):
    bits = [f'<div class="task {kind}">',
            f'<div class="task__lab"><span>{label}</span><span>write it yourself</span></div>',
            f"<div class=\"task__prompt\">{md(task['prompt'])}</div>"]
    starter = (task.get("starter") or "").rstrip()
    if starter:
        bits.append('<div class="starter__lab">Starting point</div>')
        bits.append(f'<div class="starter">{html.escape(starter)}</div>')
    if task.get("hint"):
        bits.append(f"<div class=\"hint\"><b>Hint</b>{md(task['hint'])}</div>")
    bits.append("</div>")
    return "".join(bits)


def ridgeline(width=560, height=330):
    """Layered elevation profile: a hazy far ridge, then the route itself."""
    pts = [0.02, 0.05, 0.04, 0.09, 0.13, 0.11, 0.18, 0.23, 0.20, 0.29,
           0.34, 0.31, 0.41, 0.48, 0.44, 0.54, 0.60, 0.57, 0.68, 0.76,
           0.72, 0.86, 1.0]
    span = width - 34            # room so the summit marker is not clipped
    step = span / (len(pts) - 1)
    top, base = 18, height - 4

    def path(points, close_at):
        d = " ".join(("M" if i == 0 else "L") + f"{x:.1f} {y:.1f}"
                     for i, (x, y) in enumerate(points))
        return d, d + f" L{close_at} {height} L0 {height} Z"

    front = [(i * step, base - v * (base - top)) for i, v in enumerate(pts)]
    # The far ridge sits higher and offset, so it reads as distance rather than
    # a second copy of the same line.
    far = [(x - step * 0.45, y - 34 - (i % 4) * 11) for i, (x, y) in enumerate(front)]

    fline, farea = path(front, span)
    _, bgarea = path(far, span)

    ticks = "".join(
        f'<circle cx="{x:.1f}" cy="{y:.1f}" r="2.6" fill="#F0B429"/>'
        for i, (x, y) in enumerate(front) if i in (0, 5, 9, 13, 17, 20, 22)
    )
    sx, sy = front[-1]
    return (f'<svg viewBox="0 0 {width} {height}" preserveAspectRatio="none" '
            f'xmlns="http://www.w3.org/2000/svg" class="cover__ridge">'
            f'<path d="{bgarea}" fill="#1C3143"/>'
            f'<path d="{farea}" fill="#0A141C"/>'
            f'<path d="{fline}" fill="none" stroke="#F0B429" stroke-width="1.8" '
            f'stroke-linejoin="round"/>{ticks}'
            f'<circle cx="{sx:.1f}" cy="{sy:.1f}" r="6.5" fill="none" '
            f'stroke="#F0B429" stroke-width="1.3"/></svg>')


def contours(width=210, height=297):
    """Faint topographic texture behind the cover."""
    out = []
    for i in range(20):
        y = 8 + i * 15
        amp = 5 + (i % 5) * 2.5
        d = f"M-10 {y}"
        for x in range(0, width + 30, 10):
            d += f" q5 {amp if (x // 10) % 2 == 0 else -amp} 10 0"
        out.append(f'<path d="{d}" fill="none" stroke="#3E6076" stroke-width="0.45"/>')
    return (f'<svg viewBox="0 0 {width} {height}" preserveAspectRatio="none" '
            f'width="{width}mm" height="{height}mm" '
            f'xmlns="http://www.w3.org/2000/svg" class="cover__contours">'
            + "".join(out) + "</svg>")


def build(data):
    mods = data["modules"]
    n_wp = data["totalWaypoints"]
    n_tasks = sum(len(w["drills"]) + 1 for m in mods for w in m["waypoints"])
    n_quiz = sum(len(w["quiz"]) for m in mods for w in m["waypoints"])
    h = []

    # --- cover
    h.append(f"""<section class="cover">
      <div class="cover__inner">
        <div class="cover__kicker">Route {data['summit']} &nbsp;&middot;&nbsp; print() to pandas</div>
        <h1 class="cover__title">PyAscent</h1>
        <p class="cover__sub">A complete Python course you work through by writing code,
          from your first printed line to grouping a table with pandas.</p>
        <div class="cover__stats">
          <div><div class="cover__stat-n">{len(mods)}</div><div class="cover__stat-l">Modules</div></div>
          <div><div class="cover__stat-n">{n_wp}</div><div class="cover__stat-l">Waypoints</div></div>
          <div><div class="cover__stat-n">{n_tasks}</div><div class="cover__stat-l">Coding tasks</div></div>
          <div><div class="cover__stat-n">{n_quiz}</div><div class="cover__stat-l">Questions</div></div>
        </div>
        <div class="cover__meta"><span>Study guide</span><span>{date.today():%B %Y}</span></div>
      </div>
      {ridgeline()}
    </section>""")

    # --- how to use
    h.append(f"""<section class="front">
      <h2 class="front__title">How to use this guide</h2>
      <p>Every waypoint has the same four parts. Read the brief, then do the work before you
        look anything up. The answers all live at the back on purpose, because flipping to them
        should take enough effort that you try first.</p>
      <div class="howto">
        <div class="howto__card"><div class="howto__n">Part one</div>
          <div class="howto__h">Brief</div>
          <p>The idea explained in plain language, with short examples you can type out and run.</p></div>
        <div class="howto__card"><div class="howto__n">Part two</div>
          <div class="howto__h">Drills</div>
          <p>Two small problems. Narrow on purpose, so a wrong answer points at one specific gap.</p></div>
        <div class="howto__card"><div class="howto__n">Part three</div>
          <div class="howto__h">Knowledge check</div>
          <p>Three questions on the things that are easy to nod along to and still get wrong.</p></div>
        <div class="howto__card"><div class="howto__n">Part four</div>
          <div class="howto__h">Checkpoint</div>
          <p>One longer problem that puts the whole waypoint together before you move on.</p></div>
      </div>
      <h3 class="sub">Running the code</h3>
      <p>Every task here is graded automatically in the PyAscent app, which runs real Python in your
        browser. If you are working from paper instead, any Python 3 setup will do. The exercises
        from Module 6 onward read <code>trails.csv</code> and <code>packlist.txt</code>, both of which
        ship with the app.</p>
      <h3 class="sub">One waypoint is not from your course</h3>
      <p>Waypoint 4.1, For Loops and <code>range()</code>, was added. The source outline goes straight
        to while loops, but nearly everything after it assumes for loops already exist. It is marked
        as a bonus wherever it appears, so you can skip it if you are following the original
        outline exactly.</p>
      <h3 class="sub">About the sample data</h3>
      <p>The dataset is 20 Philippine peaks with region, province, elevation, difficulty, typical trip
        length and a climber count. Elevations are the commonly cited figures. The climber counts are
        invented, so treat the file as practice material rather than a source.</p>
    </section>""")

    # --- contents
    rows = []
    for mi, m in enumerate(mods):
        wps = []
        for wi, w in enumerate(m["waypoints"]):
            bonus = '<span class="toc__bonus">bonus</span>' if w["bonus"] else ""
            wps.append(
                f'<div class="toc__row"><span class="toc__row-t">{mi+1}.{wi+1} &nbsp; '
                f'{html.escape(w["title"])}</span>{bonus}<span class="toc__dots"></span>'
                f'<a class="toc__row-p" href="#{w["id"]}"></a></div>'
            )
        rows.append(
            f'<div class="toc__mod"><div class="toc__mod-head">'
            f'<span class="toc__mod-n">M{mi+1}</span>'
            f'<span class="toc__mod-t">{html.escape(m["title"])}</span>'
            f'<a class="toc__mod-p" href="#mod{mi+1}"></a></div>' + "".join(wps) + "</div>"
        )
    rows.append(
        '<div class="toc__mod"><div class="toc__mod-head">'
        '<span class="toc__mod-n">A</span><span class="toc__mod-t">Answer key</span>'
        '<a class="toc__mod-p" href="#answerkey"></a></div></div>'
    )
    h.append(f'<section class="toc"><h2 class="front__title">Contents</h2>{"".join(rows)}</section>')

    # --- modules and waypoints
    for mi, m in enumerate(mods):
        run = f'Module {mi+1} · {m["title"]}'
        items = "".join(
            f'<div class="modop__li"><span class="modop__li-n">{mi+1}.{wi+1}</span>'
            f'<span>{html.escape(w["title"])}'
            f'{" (bonus)" if w["bonus"] else ""}</span></div>'
            for wi, w in enumerate(m["waypoints"])
        )
        h.append(f"""<section class="modop" id="mod{mi+1}" data-running="{html.escape(run)}">
          <div class="modop__n">Module {mi+1} of {len(mods)}</div>
          <h2 class="modop__t" data-bm="Module {mi+1}. {html.escape(m['title'])}">{html.escape(m['title'])}</h2>
          <p class="modop__blurb">{html.escape(m['blurb'])}</p>
          <div class="modop__list">{items}</div>
        </section>""")

        for wi, w in enumerate(m["waypoints"]):
            num = f"{mi+1}.{wi+1}"
            bonus = '<span class="wp__bonus">bonus</span>' if w["bonus"] else ""
            drills = "".join(
                task_html(d, f"Drill {i+1} of {len(w['drills'])}")
                for i, d in enumerate(w["drills"])
            )
            quiz = []
            for qi, q in enumerate(w["quiz"]):
                opts = "".join(f"<li>{md(o)}</li>" for o in q["options"])
                code = snippet(q["code"]) if q.get("code") else ""
                quiz.append(
                    f'<div class="q"><div class="q__q"><span class="q__n">{qi+1}</span>'
                    f'{md(q["q"])}</div>{code}<ul class="q__opts">{opts}</ul></div>'
                )
            h.append(f"""<section class="wp" id="{w['id']}" data-running="{num} {html.escape(w['title'])}">
              <div class="wp__head">
                <div class="wp__n">Waypoint {num}</div>
                <h2 class="wp__t" data-bm="{num} {html.escape(w['title'])}">{html.escape(w['title'])}{bonus}</h2>
              </div>
              {brief_html(w['brief'])}
              <div class="sect">Drills</div>{drills}
              <div class="sect">Knowledge check</div>{"".join(quiz)}
              <div class="sect">Checkpoint</div>
              {task_html(w['challenge'], 'Coding checkpoint', 'task--challenge')}
              <div class="keyptr">Answers and worked solutions on page
                <a href="#key-{w['id']}"></a></div>
            </section>""")

    # --- answer key
    h.append("""<section class="keyop" id="answerkey">
      <h2 class="front__title">Answer key</h2>
      <p>Worked solutions for every drill and checkpoint, plus the reasoning behind each
        knowledge check. More than one solution is usually valid. If yours passes and reads
        clearly, it is fine, even where it differs from what is printed here.</p>
    </section>""")

    key = []
    for mi, m in enumerate(mods):
        for wi, w in enumerate(m["waypoints"]):
            num = f"{mi+1}.{wi+1}"
            parts = [f'<div class="keywp" id="key-{w["id"]}" data-running="{num} {html.escape(w["title"])}">'
                     f'<h3 class="keywp__h" data-bm="{num} {html.escape(w["title"])}"><span>{num}</span>{html.escape(w["title"])}</h3>']
            for i, d in enumerate(w["drills"]):
                parts.append(f'<div class="keysol"><div class="keysol__lab">Drill {i+1}</div>'
                             f"{snippet(d['solution'])}</div>")
            parts.append('<div class="keysol"><div class="keysol__lab">Checkpoint</div>'
                         f"{snippet(w['challenge']['solution'])}</div>")
            parts.append('<div class="keysol"><div class="keysol__lab">Knowledge check</div>')
            for qi, q in enumerate(w["quiz"]):
                parts.append(f'<div class="keyq"><b>{qi+1}{LETTERS[q["answer"]]}</b>'
                             f'<i>{md(q["why"])}</i></div>')
            parts.append("</div></div>")
            key.append("".join(parts))
    h.append('<section class="keybody">' + "".join(key) + "</section>")

    # --- closing
    nexts = [
        ("Virtual environments", "Everything here ran in the browser. On your own machine you will "
         "want <code>python -m venv .venv</code> and <code>pip install pandas</code> per project, so "
         "one project's packages never break another's."),
        ("Notebooks", "The pandas work in Module 7 is far more pleasant in Jupyter or marimo, where "
         "each cell keeps its result and you can poke at a dataframe without rerunning everything."),
        ("Plotting", "Grouping data is half the job. matplotlib or plotly turns those grouped numbers "
         "into something you can actually show someone."),
        ("Real data", "Grab an open dataset and run Module 7 against it. Missing values, inconsistent "
         "spellings and stray whitespace teach things that clean sample data never will."),
        ("Reading errors", "The fastest skill to build is reading a traceback from the bottom up. The "
         "last line names the problem, the line above it points at your code."),
    ]
    rows = "".join(
        f'<div class="next__row"><div class="next__h">{t}</div><p class="next__p">{p}</p></div>'
        for t, p in nexts
    )
    h.append(f"""<section class="outro">
      <h2 class="outro__t">Where to go next</h2>
      <div class="next">{rows}</div>
      <div class="colophon">Generated from the PyAscent curriculum on {date.today():%d %B %Y}.
        {n_wp} waypoints, {n_tasks} coding tasks, {n_quiz} questions. Rebuild this document with
        <code>python3 scripts/build-pdf.py</code> after editing anything under <code>data/</code>.</div>
    </section>""")

    return (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
            f"<title>PyAscent Study Guide</title>"
            f'<meta name="author" content="PyAscent">'
            f'<meta name="description" content="A complete Python course worked through by writing code, from print() to pandas.">'
            f'<meta name="keywords" content="Python, pandas, study guide, exercises">'
            f'<link rel="stylesheet" href="print.css"></head><body>{"".join(h)}</body></html>')


def main():
    data = load_curriculum()
    doc = build(data)
    (PRINT / "study-guide.html").write_text(doc)
    pdf = ROOT / "STUDY-GUIDE.pdf"
    HTML(string=doc, base_url=str(PRINT)).write_pdf(pdf)
    kb = pdf.stat().st_size / 1024
    print(f"Wrote {pdf.relative_to(ROOT)} ({kb:.0f} KB)")


if __name__ == "__main__":
    main()
