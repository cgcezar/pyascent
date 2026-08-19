export default {
  id: "m4",
  title: "Loops",
  blurb: "Doing the same work many times without writing it many times.",
  waypoints: [

    {
      id: "m4-w0",
      title: "For Loops and range()",
      bonus: true,
      brief: [
        { t: "note", x: "**Bonus waypoint.** This one was not in your course outline, but the outline jumps straight to while loops. For loops come first almost everywhere else, and the rest of Module 4 assumes them, so this fills the gap." },
        { t: "p", x: "A `for` loop walks through a collection and runs its block once per item. The loop variable takes each value in turn." },
        { t: "code", x: "peaks = [\"Pulag\", \"Apo\", \"Ugo\"]\n\nfor peak in peaks:\n    print(peak)\n\n# Pulag\n# Apo\n# Ugo", cap: "Read it as: for each peak in peaks, do this." },
        { t: "p", x: "The name after `for` is yours to choose. It is created fresh on each pass and holds one item at a time. Singular names read best: `for peak in peaks`, `for row in rows`." },
        { t: "h", x: "range()" },
        { t: "p", x: "When you need to repeat a fixed number of times rather than walk a collection, use `range()`. It produces numbers on demand." },
        { t: "code", x: "for i in range(3):\n    print(i)          # 0, 1, 2\n\nfor i in range(1, 4):\n    print(i)          # 1, 2, 3\n\nfor i in range(0, 10, 2):\n    print(i)          # 0, 2, 4, 6, 8", cap: "range(stop), range(start, stop), range(start, stop, step). Stop is always excluded." },
        { t: "h", x: "Accumulating" },
        { t: "p", x: "The most common loop pattern is starting with an empty total and adding to it each pass." },
        { t: "code", x: "elevations = [811, 1090, 2926]\ntotal = 0\nfor e in elevations:\n    total = total + e     # or total += e\nprint(total)              # 4827", cap: "Set up the accumulator before the loop, not inside it." },
        { t: "note", x: "**enumerate.** When you need both the position and the item, `for i, peak in enumerate(peaks):` gives you the index alongside the value, which is cleaner than managing a counter yourself." },
      ],
      drills: [
        {
          prompt: "Print each peak in `peaks` on its own line using a for loop.",
          hint: "for peak in peaks: then an indented print(peak).",
          starter: "peaks = [\"Pulag\", \"Apo\", \"Ugo\"]\n",
          solution: "peaks = [\"Pulag\", \"Apo\", \"Ugo\"]\nfor peak in peaks:\n    print(peak)",
          checks: [
            { k: "out_lines", v: ["Pulag", "Apo", "Ugo"], msg: "Three names on three lines" },
            { k: "src_has", v: "for ", msg: "Uses a for loop" },
          ],
        },
        {
          prompt: "Add up every value in `elevations` into a variable `total` using a for loop, then print it. Do not use the built-in `sum()`.",
          hint: "Start total at 0 before the loop, then total += e inside it.",
          starter: "elevations = [811, 1090, 2926, 2150]\n",
          solution: "elevations = [811, 1090, 2926, 2150]\ntotal = 0\nfor e in elevations:\n    total += e\nprint(total)",
          checks: [
            { k: "var_is", n: "total", v: 6977, msg: "total equals 6977" },
            { k: "src_hasnt", v: "sum(", msg: "Written with a loop, not sum()" },
            { k: "out_has", v: "6977", msg: "Prints the total" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does `for i in range(3)` produce?",
          options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3, 2, 1"],
          answer: 1,
          why: "range starts at 0 by default and stops before the number you give, so you get 0, 1 and 2.",
        },
        {
          q: "Where should an accumulator like `total = 0` be placed?",
          options: ["Inside the loop body", "Before the loop", "After the loop", "It does not matter"],
          answer: 1,
          why: "Inside the loop it would reset to zero on every pass, so the final value would only reflect the last item.",
        },
        {
          q: "What does `enumerate(items)` give you on each pass?",
          options: ["Just the item", "Just the index", "A pair of index and item", "The length"],
          answer: 2,
          why: "enumerate yields (index, item) pairs, which you usually unpack as `for i, item in enumerate(items):`.",
        },
      ],
      challenge: {
        prompt: "Loop over `elevations` with `enumerate` and print one line per peak in the form `1. 811 m`, `2. 1090 m` and so on, numbering from 1 rather than 0.",
        hint: "enumerate(elevations, start=1) begins the counter at 1.",
        starter: "elevations = [811, 1090, 2926]\n",
        solution: "elevations = [811, 1090, 2926]\nfor i, e in enumerate(elevations, start=1):\n    print(f\"{i}. {e} m\")",
        checks: [
          { k: "out_lines", v: ["1. 811 m", "2. 1090 m", "3. 2926 m"], msg: "Three numbered lines, exact" },
          { k: "src_has", v: "enumerate", msg: "Uses enumerate" },
        ],
      },
    },

    {
      id: "m4-w1",
      title: "While Loops",
      brief: [
        { t: "p", x: "A `while` loop repeats as long as its condition stays True. It checks the condition before every pass, including the first." },
        { t: "code", x: "altitude = 2400\nwhile altitude < 2926:\n    altitude += 150\n    print(altitude)\n\nprint(\"Summit reached\")", cap: "The condition is re-tested at the top of every pass." },
        { t: "p", x: "Use `for` when you know the collection or the count. Use `while` when you are waiting for a condition to change and you do not know how many passes that will take." },
        { t: "h", x: "The three parts you must not forget" },
        { t: "ul", x: [
          "**Set up** the variable the condition tests, before the loop.",
          "**Test** it in the condition.",
          "**Change** it inside the body, in a way that moves toward making the condition False.",
        ]},
        { t: "p", x: "Miss the third and you have an **infinite loop**. The condition never becomes False, so the loop never ends." },
        { t: "code", x: "# infinite, altitude never changes\naltitude = 2400\nwhile altitude < 2926:\n    print(\"climbing\")", cap: "Nothing inside the loop moves altitude toward 2926." },
        { t: "note", x: "**Safe to experiment here.** Python runs in a background worker in this app, so an infinite loop is stopped after 12 seconds and you get a clear message instead of a frozen tab. Go ahead and try breaking one on purpose." },
      ],
      drills: [
        {
          prompt: "Starting at `altitude = 2400`, gain 150 m per pass until you reach at least 2926. Print the altitude after each gain, then print `Summit reached` once the loop finishes.",
          hint: "while altitude < 2926: then altitude += 150 and a print inside. The final print goes outside the loop.",
          starter: "altitude = 2400\n",
          solution: "altitude = 2400\nwhile altitude < 2926:\n    altitude += 150\n    print(altitude)\nprint(\"Summit reached\")",
          checks: [
            { k: "expr", v: "altitude >= 2926", msg: "Loop ran until the target" },
            { k: "out_has", v: "Summit reached", msg: "Prints the closing line" },
            { k: "src_has", v: "while", msg: "Uses a while loop" },
          ],
        },
        {
          prompt: "Count down from 5 to 1, printing each number on its own line, then print `Go`. Use a while loop, not a for loop.",
          hint: "Start n at 5, loop while n > 0, print n, then decrease n by 1.",
          starter: "",
          solution: "n = 5\nwhile n > 0:\n    print(n)\n    n -= 1\nprint(\"Go\")",
          checks: [
            { k: "out_lines", v: ["5", "4", "3", "2", "1", "Go"], msg: "Counts down then prints Go" },
            { k: "src_has", v: "while", msg: "Uses while" },
            { k: "src_hasnt", v: "for ", msg: "Does not use a for loop" },
          ],
        },
      ],
      quiz: [
        {
          q: "When is a while loop's condition checked?",
          options: ["Only once at the start", "Before every pass, including the first", "Only after the first pass", "At the end of each pass"],
          answer: 1,
          why: "The condition is tested at the top. If it is False on the very first check, the body never runs at all.",
        },
        {
          q: "What causes an infinite loop?",
          options: ["Using while instead of for", "Nothing in the body changes what the condition tests", "Forgetting the colon", "Printing inside the loop"],
          answer: 1,
          why: "The loop only ends when the condition becomes False. If no code moves the tested value toward that, it never ends.",
        },
        {
          q: "Which situation suits a while loop better than a for loop?",
          options: ["Printing every item in a list", "Repeating exactly 10 times", "Reading until a running total passes a threshold", "Looping over a dictionary"],
          answer: 2,
          why: "You do not know in advance how many passes it takes to cross the threshold, which is exactly what while is for.",
        },
      ],
      challenge: {
        prompt: "You start at 0 m and gain a fixed 320 m per day. Using a while loop, count how many whole days it takes to reach or pass 2926 m. Store the count in `days` and print it in the form `10 days`.",
        hint: "Track altitude and days together. Loop while altitude < 2926, adding 320 and 1 each pass.",
        starter: "altitude = 0\ndays = 0\n",
        solution: "altitude = 0\ndays = 0\nwhile altitude < 2926:\n    altitude += 320\n    days += 1\nprint(f\"{days} days\")",
        checks: [
          { k: "var_is", n: "days", v: 10, msg: "days is 10" },
          { k: "out_is", v: "10 days", msg: "Prints the day count" },
          { k: "src_has", v: "while", msg: "Uses a while loop" },
        ],
      },
    },

    {
      id: "m4-w2",
      title: "Loop Control: break and continue",
      brief: [
        { t: "p", x: "Two keywords change the normal flow of a loop from the inside." },
        { t: "ul", x: [
          "`break` exits the loop immediately. Nothing else in the body runs and no further passes happen.",
          "`continue` skips the rest of this pass and jumps straight to the next one. The loop keeps going.",
        ]},
        { t: "code", x: "peaks = [\"Ugo\", \"Pulag\", \"Apo\", \"Halcon\"]\n\nfor peak in peaks:\n    if peak == \"Apo\":\n        break\n    print(peak)\n\n# Ugo\n# Pulag", cap: "break stops the whole loop at Apo, so Halcon is never reached." },
        { t: "code", x: "for n in [1, 2, 3, 4, 5, 6]:\n    if n % 2 != 0:\n        continue\n    print(n)\n\n# 2\n# 4\n# 6", cap: "continue skips the odd numbers and carries on." },
        { t: "p", x: "`break` is the natural tool for a search: walk through until you find what you want, then stop, because carrying on is wasted work." },
        { t: "code", x: "target = \"Pulag\"\nfound = False\nfor peak in peaks:\n    if peak == target:\n        found = True\n        break\nprint(found)", cap: "A flag variable plus break is the classic search shape." },
        { t: "note", x: "**Loop else.** A loop can have an `else` block that runs only if the loop finished without hitting a `break`. It is unusual but handy for search code: the else means \"not found\"." },
      ],
      drills: [
        {
          prompt: "Print each peak in `peaks` until you reach `\"Apo\"`, which should not be printed. Stop the loop entirely at that point.",
          hint: "Check the name first, break before printing.",
          starter: "peaks = [\"Ugo\", \"Pulag\", \"Apo\", \"Halcon\"]\n",
          solution: "peaks = [\"Ugo\", \"Pulag\", \"Apo\", \"Halcon\"]\nfor peak in peaks:\n    if peak == \"Apo\":\n        break\n    print(peak)",
          checks: [
            { k: "out_lines", v: ["Ugo", "Pulag"], msg: "Prints only the first two" },
            { k: "src_has", v: "break", msg: "Uses break" },
          ],
        },
        {
          prompt: "Print only the even numbers from `nums`, using `continue` to skip the odd ones rather than wrapping the print in an if.",
          hint: "if n % 2 != 0: continue, then print(n) below it.",
          starter: "nums = [1, 2, 3, 4, 5, 6]\n",
          solution: "nums = [1, 2, 3, 4, 5, 6]\nfor n in nums:\n    if n % 2 != 0:\n        continue\n    print(n)",
          checks: [
            { k: "out_lines", v: ["2", "4", "6"], msg: "Prints the even numbers only" },
            { k: "src_has", v: "continue", msg: "Uses continue" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does `break` do?",
          options: ["Skips one pass", "Exits the loop entirely", "Restarts the loop", "Pauses the program"],
          answer: 1,
          why: "break leaves the loop immediately. Execution continues on the first line after the loop body.",
        },
        {
          q: "What does this print?",
          code: "for n in [1, 2, 3]:\n    if n == 2:\n        continue\n    print(n)",
          options: ["1", "1 then 3", "1 then 2 then 3", "Nothing"],
          answer: 1,
          why: "continue skips the rest of the pass where n is 2, so only 1 and 3 get printed. The loop is not stopped.",
        },
        {
          q: "Which is the natural tool for stopping a search once the item is found?",
          options: ["continue", "break", "pass", "return"],
          answer: 1,
          why: "Once you have found what you were looking for, break exits so you do not scan the rest for nothing.",
        },
      ],
      challenge: {
        prompt: "Walk through `readings`, skipping any negative value with `continue`, adding the rest to `total`, and stopping entirely with `break` the moment `total` reaches 5000 or more. Print `total` at the end. It should print `5211`.",
        hint: "Handle the negative skip first, then add, then test the threshold and break.",
        starter: "readings = [811, -1, 1090, 2926, -5, 384, 2150]\ntotal = 0\n",
        solution: "readings = [811, -1, 1090, 2926, -5, 384, 2150]\ntotal = 0\nfor r in readings:\n    if r < 0:\n        continue\n    total += r\n    if total >= 5000:\n        break\nprint(total)",
        checks: [
          { k: "var_is", n: "total", v: 5211, msg: "total is 5211" },
          { k: "out_is", v: "5211", msg: "Prints 5211" },
          { k: "src_has", v: "continue", msg: "Uses continue" },
          { k: "src_has", v: "break", msg: "Uses break" },
        ],
      },
    },

    {
      id: "m4-w3",
      title: "Looping Through Dictionaries and Lists",
      brief: [
        { t: "p", x: "Looping over a dictionary directly gives you the **keys**. Most of the time you want both key and value, which is what `.items()` is for." },
        { t: "code", x: "peak = {\"name\": \"Pulag\", \"province\": \"Benguet\", \"elevation_m\": 2926}\n\nfor key in peak:\n    print(key)                    # name, province, elevation_m\n\nfor key, value in peak.items():\n    print(f\"{key}: {value}\")      # name: Pulag ...", cap: "`.items()` yields pairs, which you unpack into two names." },
        { t: "ul", x: [
          "`.keys()` just the keys",
          "`.values()` just the values",
          "`.items()` both, as pairs",
        ]},
        { t: "h", x: "Lists of dictionaries" },
        { t: "p", x: "This is the shape real data usually arrives in: a list where every item is a record. You loop over the list, then read fields out of each record by key." },
        { t: "code", x: "peaks = [\n    {\"name\": \"Pulag\", \"elevation_m\": 2926},\n    {\"name\": \"Ugo\", \"elevation_m\": 2150},\n]\n\nfor p in peaks:\n    print(p[\"name\"], p[\"elevation_m\"])", cap: "One pass per record. Inside the pass, `p` is one dictionary." },
        { t: "h", x: "Nested loops" },
        { t: "p", x: "A loop inside a loop runs the inner one completely for each pass of the outer one. Useful for grids and groupings, but the work multiplies fast, so keep an eye on the sizes." },
        { t: "code", x: "for region in [\"Luzon\", \"Visayas\"]:\n    for n in [1, 2]:\n        print(region, n)\n# Luzon 1 / Luzon 2 / Visayas 1 / Visayas 2", cap: "Four passes total: two outer times two inner." },
      ],
      drills: [
        {
          prompt: "Loop over the `peak` dictionary with `.items()` and print one line per pair in the form `name: Pulag`.",
          hint: "for key, value in peak.items(): then print with an f-string.",
          starter: "peak = {\"name\": \"Pulag\", \"province\": \"Benguet\", \"elevation_m\": 2926}\n",
          solution: "peak = {\"name\": \"Pulag\", \"province\": \"Benguet\", \"elevation_m\": 2926}\nfor key, value in peak.items():\n    print(f\"{key}: {value}\")",
          checks: [
            { k: "out_lines", v: ["name: Pulag", "province: Benguet", "elevation_m: 2926"], msg: "Three pair lines in order" },
            { k: "src_has", v: ".items()", msg: "Uses .items()" },
          ],
        },
        {
          prompt: "Loop over the list of records and print only the peaks above 2000 m, in the form `Pulag 2926`.",
          hint: "Loop over peaks, then use an if on p[\"elevation_m\"] inside the loop.",
          starter: "peaks = [\n    {\"name\": \"Pulag\", \"elevation_m\": 2926},\n    {\"name\": \"Batulao\", \"elevation_m\": 811},\n    {\"name\": \"Ugo\", \"elevation_m\": 2150},\n]\n",
          solution: "peaks = [\n    {\"name\": \"Pulag\", \"elevation_m\": 2926},\n    {\"name\": \"Batulao\", \"elevation_m\": 811},\n    {\"name\": \"Ugo\", \"elevation_m\": 2150},\n]\nfor p in peaks:\n    if p[\"elevation_m\"] > 2000:\n        print(p[\"name\"], p[\"elevation_m\"])",
          checks: [
            { k: "out_lines", v: ["Pulag 2926", "Ugo 2150"], msg: "Only the two high peaks" },
            { k: "src_has", v: "for ", msg: "Uses a loop" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does a plain `for x in mydict:` give you on each pass?",
          options: ["The values", "The keys", "Pairs of key and value", "An error"],
          answer: 1,
          why: "Iterating a dictionary directly walks its keys. Use .values() or .items() to get at the values.",
        },
        {
          q: "How do you loop over both keys and values at once?",
          options: ["`for k, v in d:`", "`for k, v in d.items():`", "`for k in d.pairs():`", "`for v in d.values():`"],
          answer: 1,
          why: ".items() yields (key, value) tuples, which the two loop names unpack automatically.",
        },
        {
          q: "How many lines does this print?",
          code: "for a in [1, 2, 3]:\n    for b in [\"x\", \"y\"]:\n        print(a, b)",
          options: ["3", "2", "5", "6"],
          answer: 3,
          why: "The inner loop runs fully for each outer pass, so it is 3 times 2, which is 6.",
        },
      ],
      challenge: {
        prompt: "From the list of records, build a dictionary `by_region` mapping each region to the number of peaks in it, then print it. Expected: `{'Luzon': 2, 'Visayas': 1}`.",
        hint: "Loop over the records. Use by_region.get(region, 0) + 1 to handle the first time you see a region.",
        starter: "peaks = [\n    {\"name\": \"Pulag\", \"region\": \"Luzon\"},\n    {\"name\": \"Kanlaon\", \"region\": \"Visayas\"},\n    {\"name\": \"Ugo\", \"region\": \"Luzon\"},\n]\nby_region = {}\n",
        solution: "peaks = [\n    {\"name\": \"Pulag\", \"region\": \"Luzon\"},\n    {\"name\": \"Kanlaon\", \"region\": \"Visayas\"},\n    {\"name\": \"Ugo\", \"region\": \"Luzon\"},\n]\nby_region = {}\nfor p in peaks:\n    r = p[\"region\"]\n    by_region[r] = by_region.get(r, 0) + 1\nprint(by_region)",
        checks: [
          { k: "expr", v: "by_region == {'Luzon': 2, 'Visayas': 1}", msg: "Counts are correct" },
          { k: "src_has", v: "for ", msg: "Uses a loop" },
          { k: "out_has", v: "Luzon", msg: "Prints the dictionary" },
        ],
      },
    },

    {
      id: "m4-w4",
      title: "List Comprehensions",
      brief: [
        { t: "p", x: "A **list comprehension** builds a list in one expression. It replaces the very common pattern of creating an empty list and appending to it in a loop." },
        { t: "code", x: "# the long way\nnames = []\nfor p in peaks:\n    names.append(p.upper())\n\n# the comprehension\nnames = [p.upper() for p in peaks]", cap: "Same result. The second version says it in one line." },
        { t: "p", x: "The shape is always: `[expression for item in collection]`. Read it right to left at first: take each item from the collection, apply the expression, collect the results." },
        { t: "h", x: "Adding a filter" },
        { t: "p", x: "An `if` at the end keeps only the items you want." },
        { t: "code", x: "elevations = [811, 2926, 1090, 2150]\n\nhigh = [e for e in elevations if e > 2000]\nprint(high)          # [2926, 2150]\n\nkm = [round(e / 1000, 2) for e in elevations if e > 2000]\nprint(km)            # [2.93, 2.15]", cap: "Filter first, then the expression is applied to what survives." },
        { t: "p", x: "Dictionaries and sets have the same trick, using curly braces." },
        { t: "code", x: "peaks = [\"Pulag\", \"Apo\"]\nlengths = {p: len(p) for p in peaks}\nprint(lengths)       # {'Pulag': 5, 'Apo': 3}\n\ninitials = {p[0] for p in peaks}\nprint(initials)      # {'P', 'A'}", cap: "Dict comprehension needs a key: value pair. Set comprehension does not." },
        { t: "note", x: "**Know when to stop.** Comprehensions are for one clear transformation, optionally filtered. Once you need several statements, nested conditions or a try block, write the ordinary loop. Readable beats clever." },
      ],
      drills: [
        {
          prompt: "Using a list comprehension, build `upper` containing every name in `peaks` in uppercase, then print it.",
          hint: "[p.upper() for p in peaks]",
          starter: "peaks = [\"Pulag\", \"Apo\", \"Ugo\"]\n",
          solution: "peaks = [\"Pulag\", \"Apo\", \"Ugo\"]\nupper = [p.upper() for p in peaks]\nprint(upper)",
          checks: [
            { k: "expr", v: "upper == ['PULAG', 'APO', 'UGO']", msg: "upper holds the uppercase names" },
            { k: "src_has", v: "for", msg: "Uses a comprehension" },
            { k: "src_hasnt", v: "append", msg: "No append, this is a comprehension" },
          ],
        },
        {
          prompt: "Using one comprehension with a filter, build `high_km` holding every elevation above 2000 converted to kilometres and rounded to two decimals. Print it.",
          hint: "[round(e / 1000, 2) for e in elevations if e > 2000]",
          starter: "elevations = [811, 2926, 1090, 2150]\n",
          solution: "elevations = [811, 2926, 1090, 2150]\nhigh_km = [round(e / 1000, 2) for e in elevations if e > 2000]\nprint(high_km)",
          checks: [
            { k: "expr", v: "high_km == [2.93, 2.15]", msg: "high_km is [2.93, 2.15]" },
            { k: "src_has", v: "if", msg: "Includes a filter" },
            { k: "src_hasnt", v: "append", msg: "No append" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does `[x * 2 for x in [1, 2, 3]]` produce?",
          options: ["[1, 2, 3]", "[2, 4, 6]", "6", "[[2], [4], [6]]"],
          answer: 1,
          why: "The expression `x * 2` is applied to each item and the results are collected into a new list.",
        },
        {
          q: "Where does the filter condition go?",
          options: ["Before the `for`", "At the end, after the `for` clause", "Inside the expression", "Comprehensions cannot filter"],
          answer: 1,
          why: "The form is `[expr for item in items if condition]`. Items failing the condition are dropped before the expression runs.",
        },
        {
          q: "When should you use an ordinary loop instead?",
          options: ["Whenever a filter is needed", "When the body needs several statements or error handling", "When the list is longer than 10 items", "Never, comprehensions are always better"],
          answer: 1,
          why: "Comprehensions hold one expression. Multi-step logic, try blocks or side effects belong in a normal loop where they stay readable.",
        },
      ],
      challenge: {
        prompt: "From the list of records, use one comprehension to build `labels`, a list of strings like `Pulag (2926 m)` for peaks above 2000 m only. Print it. Expected: `['Pulag (2926 m)', 'Ugo (2150 m)']`.",
        hint: "[f\"{p['name']} ({p['elevation_m']} m)\" for p in peaks if p['elevation_m'] > 2000]",
        starter: "peaks = [\n    {\"name\": \"Pulag\", \"elevation_m\": 2926},\n    {\"name\": \"Batulao\", \"elevation_m\": 811},\n    {\"name\": \"Ugo\", \"elevation_m\": 2150},\n]\n",
        solution: "peaks = [\n    {\"name\": \"Pulag\", \"elevation_m\": 2926},\n    {\"name\": \"Batulao\", \"elevation_m\": 811},\n    {\"name\": \"Ugo\", \"elevation_m\": 2150},\n]\nlabels = [f\"{p['name']} ({p['elevation_m']} m)\" for p in peaks if p[\"elevation_m\"] > 2000]\nprint(labels)",
        checks: [
          { k: "expr", v: "labels == ['Pulag (2926 m)', 'Ugo (2150 m)']", msg: "labels holds the two formatted strings" },
          { k: "src_hasnt", v: "append", msg: "Built with a comprehension" },
          { k: "src_has", v: "if", msg: "Filters above 2000 m" },
        ],
      },
    },

  ],
};
