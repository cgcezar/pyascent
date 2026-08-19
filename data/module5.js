export default {
  id: "m5",
  title: "Functions and Errors",
  blurb: "Packaging logic under a name, and keeping the program alive when something goes wrong.",
  waypoints: [

    {
      id: "m5-w1",
      title: "Defining Functions",
      brief: [
        { t: "p", x: "A **function** is a named block of code you can run whenever you want. You define it once with `def`, then **call** it by writing its name with brackets." },
        { t: "code", x: "def greet():\n    print(\"Trail is open\")\n    print(\"Sign the logbook\")\n\ngreet()\ngreet()", cap: "Defining does not run it. Calling does. This prints four lines." },
        { t: "p", x: "The structure is the same as every other block in Python: the `def` line ends with a colon, and everything belonging to the function is indented underneath." },
        { t: "h", x: "Why bother" },
        { t: "ul", x: [
          "**No repetition.** Write the logic once, call it from anywhere.",
          "**One place to fix.** A bug lives in one function, not scattered across ten copies.",
          "**Names as documentation.** `calculate_pace()` explains itself. Six loose lines do not.",
        ]},
        { t: "h", x: "Docstrings" },
        { t: "p", x: "A triple-quoted string on the first line inside a function describes what it does. Unlike a comment it stays available at runtime through `help()`." },
        { t: "code", x: "def greet():\n    \"\"\"Print the standard trailhead notice.\"\"\"\n    print(\"Trail is open\")", cap: "One line, present tense, says what the function does." },
        { t: "note", x: "**Define before you call.** Python reads top to bottom, so the `def` has to appear above the line that calls it. Calling a function that has not been defined yet gives a NameError." },
      ],
      drills: [
        {
          prompt: "Define a function called `greet` that prints `Trail is open`, then call it twice.",
          hint: "def greet(): with an indented print, then two calls to greet() at the bottom.",
          starter: "",
          solution: "def greet():\n    print(\"Trail is open\")\n\ngreet()\ngreet()",
          checks: [
            { k: "out_lines", v: ["Trail is open", "Trail is open"], msg: "Prints the line twice" },
            { k: "src_has", v: "def greet", msg: "Defines greet" },
            { k: "expr", v: "callable(greet)", msg: "greet is a function" },
          ],
        },
        {
          prompt: "Define `trail_notice` with a docstring, which prints two lines: `Trail is open` and `Sign the logbook`. Call it once.",
          hint: "The docstring is a triple-quoted string as the first line inside the function.",
          starter: "",
          solution: "def trail_notice():\n    \"\"\"Print the standard trailhead notice.\"\"\"\n    print(\"Trail is open\")\n    print(\"Sign the logbook\")\n\ntrail_notice()",
          checks: [
            { k: "out_lines", v: ["Trail is open", "Sign the logbook"], msg: "Both lines printed once" },
            { k: "expr", v: "trail_notice.__doc__ is not None", msg: "Has a docstring" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does defining a function with `def` do on its own?",
          options: ["Runs the code inside it", "Creates the function without running it", "Prints its name", "Nothing at all"],
          answer: 1,
          why: "The def statement creates the function object and binds the name. The body only runs when you call it.",
        },
        {
          q: "How do you call a function named `greet`?",
          options: ["`greet`", "`greet()`", "`call greet`", "`def greet()`"],
          answer: 1,
          why: "The brackets are what triggers the call. Writing the bare name just refers to the function object itself.",
        },
        {
          q: "What is a docstring?",
          options: ["A comment starting with #", "A triple-quoted description as the first line in the function", "A variable named doc", "A required parameter"],
          answer: 1,
          why: "Docstrings survive at runtime and show up in help() and IDE tooltips, which plain # comments do not.",
        },
      ],
      challenge: {
        prompt: "Define a function `route_card` with a docstring that prints exactly three lines: `Route: Ambangeg`, `Peak: Pulag`, `Permit: required`. Call it once.",
        hint: "Three prints inside the function, one call after the definition.",
        starter: "",
        solution: "def route_card():\n    \"\"\"Print the standard route summary card.\"\"\"\n    print(\"Route: Ambangeg\")\n    print(\"Peak: Pulag\")\n    print(\"Permit: required\")\n\nroute_card()",
        checks: [
          { k: "out_lines", v: ["Route: Ambangeg", "Peak: Pulag", "Permit: required"], msg: "Three exact lines" },
          { k: "expr", v: "callable(route_card) and route_card.__doc__ is not None", msg: "route_card exists and is documented" },
        ],
      },
    },

    {
      id: "m5-w2",
      title: "Function Parameters and Return Values",
      brief: [
        { t: "p", x: "**Parameters** are the inputs a function accepts. You list them in the brackets of the `def` line. The values you pass when calling are the **arguments**." },
        { t: "code", x: "def describe(name, elevation):\n    print(f\"{name} is {elevation} m\")\n\ndescribe(\"Pulag\", 2926)\ndescribe(\"Ugo\", 2150)", cap: "Same function, different inputs, different output." },
        { t: "h", x: "return sends a value back" },
        { t: "p", x: "This is the important distinction. `print` shows something on screen. `return` hands a value back to whoever called the function, so it can be stored and used. A function with no `return` gives back `None`." },
        { t: "code", x: "def pace(distance_km, hours):\n    return round(distance_km / hours, 2)\n\nresult = pace(12.4, 6.5)\nprint(result)          # 1.91\nprint(pace(8, 4) * 2)  # 4.0, you can use it in an expression", cap: "A returned value can be stored, printed or fed into more maths." },
        { t: "p", x: "`return` also **exits the function immediately**. Nothing after it runs, which makes it useful for handling special cases early." },
        { t: "h", x: "Default and keyword arguments" },
        { t: "code", x: "def describe(name, elevation, unit=\"m\"):\n    return f\"{name} is {elevation} {unit}\"\n\nprint(describe(\"Pulag\", 2926))\nprint(describe(\"Pulag\", 2.9, unit=\"km\"))\nprint(describe(elevation=2926, name=\"Pulag\"))", cap: "Defaults make a parameter optional. Keywords let you pass in any order." },
        { t: "note", x: "**Parameters with defaults go last.** `def f(a, b=1)` is fine, `def f(a=1, b)` is a syntax error, because Python would not know how to match a bare positional argument." },
      ],
      drills: [
        {
          prompt: "Write a function `describe(name, elevation)` that **returns** the string `Pulag is 2926 m`. Call it with those values, store the result in `line`, and print `line`.",
          hint: "Use return with an f-string, not print, inside the function.",
          starter: "",
          solution: "def describe(name, elevation):\n    return f\"{name} is {elevation} m\"\n\nline = describe(\"Pulag\", 2926)\nprint(line)",
          checks: [
            { k: "var_is", n: "line", v: "Pulag is 2926 m", msg: "line holds the returned string" },
            { k: "src_has", v: "return", msg: "Uses return, not print, inside the function" },
            { k: "out_is", v: "Pulag is 2926 m", msg: "Prints the returned value" },
          ],
        },
        {
          prompt: "Write `pace(distance_km, hours)` returning the speed rounded to two decimals, with `hours` defaulting to `1`. Store `pace(12.4, 6.5)` in `p1` and `pace(8)` in `p2`, then print both on one line.",
          hint: "def pace(distance_km, hours=1): the default must come last.",
          starter: "",
          solution: "def pace(distance_km, hours=1):\n    return round(distance_km / hours, 2)\n\np1 = pace(12.4, 6.5)\np2 = pace(8)\nprint(p1, p2)",
          checks: [
            { k: "expr", v: "abs(p1 - 1.91) < 0.005", msg: "p1 is 1.91" },
            { k: "expr", v: "abs(p2 - 8.0) < 0.005", msg: "p2 uses the default and is 8.0" },
            { k: "src_has", v: "hours=1", tight: true, msg: "hours has a default of 1" },
          ],
        },
      ],
      quiz: [
        {
          q: "What is the difference between `print` and `return`?",
          options: ["No difference", "print shows text on screen, return hands a value back to the caller", "return is faster", "print works only inside functions"],
          answer: 1,
          why: "A printed value is gone once shown. A returned value can be stored in a variable and used in further code.",
        },
        {
          q: "What does a function return when it has no `return` statement?",
          options: ["0", "An empty string", "None", "It raises an error"],
          answer: 2,
          why: "Every function returns something. With no explicit return, that something is None.",
        },
        {
          q: "Which definition is valid?",
          options: ["`def f(a=1, b):`", "`def f(a, b=1):`", "`def f(a=1, b, c):`", "`def f(=a, b):`"],
          answer: 1,
          why: "Parameters with defaults must come after those without, otherwise positional arguments could not be matched unambiguously.",
        },
      ],
      challenge: {
        prompt: "Write `summit_time(distance_km, kph=2.0, rest_min=0)` that returns total minutes rounded to the nearest whole number: the walking time plus the rest. Store `summit_time(12.4, 2.0, 45)` in `mins` and print exactly `417 minutes`.",
        hint: "Walking minutes is distance / kph * 60. Add rest_min, then round().",
        starter: "",
        solution: "def summit_time(distance_km, kph=2.0, rest_min=0):\n    walking = distance_km / kph * 60\n    return round(walking + rest_min)\n\nmins = summit_time(12.4, 2.0, 45)\nprint(f\"{mins} minutes\")",
        checks: [
          { k: "var_is", n: "mins", v: 417, msg: "mins is 417" },
          { k: "out_is", v: "417 minutes", msg: "Output is exact" },
          { k: "expr", v: "summit_time(10) == 300", msg: "Defaults work when only distance is given" },
        ],
      },
    },

    {
      id: "m5-w3",
      title: "Built-in Functions for Data",
      brief: [
        { t: "p", x: "Python ships with functions that cover most everyday summarising. Reaching for these instead of writing your own loop is shorter and less error prone." },
        { t: "code", x: "elevations = [811, 2926, 1090, 2150]\n\nprint(len(elevations))     # 4\nprint(sum(elevations))     # 6977\nprint(min(elevations))     # 811\nprint(max(elevations))     # 2926\nprint(sorted(elevations))  # [811, 1090, 2150, 2926]", cap: "The core five. Between them they answer most simple questions about a list." },
        { t: "p", x: "An average is just `sum(x) / len(x)`. There is no built-in `average`, which surprises people, but the division says it plainly enough." },
        { t: "h", x: "The key argument" },
        { t: "p", x: "`min`, `max` and `sorted` accept `key=`, a function telling them what to compare. This is how you sort records by one field." },
        { t: "code", x: "peaks = [\n    {\"name\": \"Ugo\", \"elev\": 2150},\n    {\"name\": \"Pulag\", \"elev\": 2926},\n]\n\nhighest = max(peaks, key=lambda p: p[\"elev\"])\nprint(highest[\"name\"])     # Pulag\n\nby_name = sorted(peaks, key=lambda p: p[\"name\"])\nprint([p[\"name\"] for p in by_name])   # ['Pulag', 'Ugo']", cap: "`lambda p: p['elev']` is a small throwaway function saying 'compare on this field'." },
        { t: "h", x: "A few more worth knowing" },
        { t: "ul", x: [
          "`any(conditions)` True when at least one item is truthy, `all(...)` True when every one is",
          "`round(x, n)`, `abs(x)`, `type(x)`",
          "`zip(a, b)` pairs up two collections item by item",
        ]},
        { t: "code", x: "names = [\"Pulag\", \"Ugo\"]\nelevs = [2926, 2150]\nfor n, e in zip(names, elevs):\n    print(n, e)\n\nprint(any(e > 2500 for e in elevs))   # True\nprint(all(e > 2500 for e in elevs))   # False", cap: "zip walks two lists in step. any and all summarise a set of conditions." },
      ],
      drills: [
        {
          prompt: "Using built-ins only, print four lines from `elevations`: the count, the sum, the highest value, and the average rounded to two decimals.",
          hint: "len, sum, max, then round(sum(x) / len(x), 2).",
          starter: "elevations = [811, 2926, 1090, 2150]\n",
          solution: "elevations = [811, 2926, 1090, 2150]\nprint(len(elevations))\nprint(sum(elevations))\nprint(max(elevations))\nprint(round(sum(elevations) / len(elevations), 2))",
          checks: [
            { k: "out_lines", v: ["4", "6977", "2926", "1744.25"], msg: "Count, sum, max and average" },
            { k: "src_has", v: "sum(", msg: "Uses sum()" },
          ],
        },
        {
          prompt: "Find the record with the highest elevation using `max` with a `key`, store it in `highest`, and print just its name.",
          hint: "max(peaks, key=lambda p: p[\"elev\"]) then read [\"name\"] off the result.",
          starter: "peaks = [\n    {\"name\": \"Ugo\", \"elev\": 2150},\n    {\"name\": \"Pulag\", \"elev\": 2926},\n    {\"name\": \"Batulao\", \"elev\": 811},\n]\n",
          solution: "peaks = [\n    {\"name\": \"Ugo\", \"elev\": 2150},\n    {\"name\": \"Pulag\", \"elev\": 2926},\n    {\"name\": \"Batulao\", \"elev\": 811},\n]\nhighest = max(peaks, key=lambda p: p[\"elev\"])\nprint(highest[\"name\"])",
          checks: [
            { k: "expr", v: "highest['name'] == 'Pulag'", msg: "highest is the Pulag record" },
            { k: "out_is", v: "Pulag", msg: "Prints Pulag" },
            { k: "src_has", v: "key=", msg: "Uses the key argument" },
          ],
        },
      ],
      quiz: [
        {
          q: "How do you get the average of a list called `values`?",
          options: ["`average(values)`", "`values.mean()`", "`sum(values) / len(values)`", "`avg(values)`"],
          answer: 2,
          why: "Python has no built-in average. Dividing the sum by the count is the standard way, and pandas gives you .mean() later.",
        },
        {
          q: "What does `key=` do in `sorted(items, key=...)`?",
          options: ["Filters items out", "Says which value to compare each item by", "Reverses the order", "Renames the items"],
          answer: 1,
          why: "The key function is applied to each item and the results are what get compared, which is how you sort records by a chosen field.",
        },
        {
          q: "What does `any([False, False, True])` return?",
          options: ["True", "False", "1", "An error"],
          answer: 0,
          why: "any is True when at least one item is truthy. all would be False here because not every item is True.",
        },
      ],
      challenge: {
        prompt: "Given `names` and `elevs`, print exactly two lines: the name of the highest peak, and `True` or `False` for whether every peak is above 1000 m. Use `zip` and `max` for the first, and `all` for the second.",
        hint: "max(zip(elevs, names))[1] works, or zip into a list first. For the second, all(e > 1000 for e in elevs).",
        starter: "names = [\"Batulao\", \"Pulag\", \"Ugo\"]\nelevs = [811, 2926, 2150]\n",
        solution: "names = [\"Batulao\", \"Pulag\", \"Ugo\"]\nelevs = [811, 2926, 2150]\npairs = list(zip(names, elevs))\nhighest = max(pairs, key=lambda p: p[1])\nprint(highest[0])\nprint(all(e > 1000 for e in elevs))",
        checks: [
          { k: "out_lines", v: ["Pulag", "False"], msg: "Highest name then the all() result" },
          { k: "src_has", v: "all(", msg: "Uses all()" },
          { k: "src_has", v: "max(", msg: "Uses max()" },
        ],
      },
    },

    {
      id: "m5-w4",
      title: "Handling Errors and Exceptions",
      brief: [
        { t: "p", x: "When something goes wrong Python raises an **exception** and, unless you handle it, the program stops. `try` and `except` let you catch that and carry on." },
        { t: "code", x: "raw = \"not a number\"\n\ntry:\n    value = int(raw)\nexcept ValueError:\n    value = 0\n    print(\"Could not read that, using 0\")\n\nprint(value)", cap: "The risky line goes in try. The recovery goes in except." },
        { t: "h", x: "The exceptions you will meet most" },
        { t: "ul", x: [
          "`ValueError` right type, wrong content, like `int(\"abc\")`",
          "`TypeError` wrong type entirely, like `\"5\" + 5`",
          "`KeyError` a dictionary key that is not there",
          "`IndexError` a list position past the end",
          "`ZeroDivisionError` dividing by zero",
          "`FileNotFoundError` opening a file that does not exist",
        ]},
        { t: "p", x: "Catch the **specific** exception you expect. A bare `except:` swallows everything including typos in your own code, which turns a five second fix into an hour of confusion." },
        { t: "code", x: "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\nprint(safe_divide(10, 2))   # 5.0\nprint(safe_divide(10, 0))   # None", cap: "Name the error you expect. Let anything else surface." },
        { t: "h", x: "else and finally" },
        { t: "ul", x: [
          "`else` runs only when the try block raised nothing",
          "`finally` runs either way, ideal for cleanup",
        ]},
        { t: "code", x: "try:\n    n = int(\"42\")\nexcept ValueError:\n    print(\"bad input\")\nelse:\n    print(\"parsed\", n)\nfinally:\n    print(\"done\")", cap: "Output: parsed 42, then done." },
        { t: "note", x: "**Read the traceback bottom up.** The last line names the exception type and message. The lines above show the path that got you there, with your own file usually nearest the bottom." },
      ],
      drills: [
        {
          prompt: "Try converting `raw` to an int. If it fails, set `value` to `0` and print `Could not read that, using 0`. Print `value` at the end either way.",
          hint: "Catch ValueError specifically, not a bare except.",
          starter: "raw = \"not a number\"\n",
          solution: "raw = \"not a number\"\ntry:\n    value = int(raw)\nexcept ValueError:\n    value = 0\n    print(\"Could not read that, using 0\")\nprint(value)",
          checks: [
            { k: "var_is", n: "value", v: 0, msg: "value falls back to 0" },
            { k: "out_has", v: "Could not read that, using 0", msg: "Prints the recovery message" },
            { k: "src_has", v: "ValueError", msg: "Catches ValueError specifically" },
          ],
        },
        {
          prompt: "Write `safe_divide(a, b)` that returns the division result, or `None` when `b` is zero. Print `safe_divide(10, 2)` and `safe_divide(10, 0)` on two lines.",
          hint: "Wrap the return in try, catch ZeroDivisionError and return None.",
          starter: "",
          solution: "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))",
          checks: [
            { k: "out_lines", v: ["5.0", "None"], msg: "5.0 then None" },
            { k: "src_has", v: "ZeroDivisionError", msg: "Catches ZeroDivisionError" },
            { k: "expr", v: "safe_divide(9, 3) == 3.0", msg: "Works for normal input too" },
          ],
        },
      ],
      quiz: [
        {
          q: "Which error does `int(\"abc\")` raise?",
          options: ["TypeError", "ValueError", "KeyError", "SyntaxError"],
          answer: 1,
          why: "The argument is the right type, a string, but its content cannot be read as a number, which is exactly what ValueError means.",
        },
        {
          q: "Why is a bare `except:` a bad habit?",
          options: ["It is slower", "It catches everything including your own typos, hiding real bugs", "It is not valid Python", "It only works once"],
          answer: 1,
          why: "Catching everything makes genuine mistakes silently disappear. Name the exception you actually expect to handle.",
        },
        {
          q: "When does a `finally` block run?",
          options: ["Only on success", "Only on failure", "Always, whether or not an exception was raised", "Only when there is no except"],
          answer: 2,
          why: "finally always runs, which is why it is used for cleanup like closing files or releasing resources.",
        },
      ],
      challenge: {
        prompt: "Write `read_elevation(record, key)` that returns the int value at `key`, or `0` when the key is missing or the value cannot be converted. Catch `KeyError` and `ValueError` separately. Print three lines: the result for `\"elev\"`, for `\"days\"`, and for `\"missing\"`.",
        hint: "Two except blocks, or one `except (KeyError, ValueError):`. The spec asks for them separately.",
        starter: "record = {\"elev\": \"2926\", \"days\": \"two\"}\n",
        solution: "record = {\"elev\": \"2926\", \"days\": \"two\"}\n\ndef read_elevation(rec, key):\n    try:\n        return int(rec[key])\n    except KeyError:\n        return 0\n    except ValueError:\n        return 0\n\nprint(read_elevation(record, \"elev\"))\nprint(read_elevation(record, \"days\"))\nprint(read_elevation(record, \"missing\"))",
        checks: [
          { k: "out_lines", v: ["2926", "0", "0"], msg: "2926 then 0 then 0" },
          { k: "src_has", v: "KeyError", msg: "Catches KeyError" },
          { k: "src_has", v: "ValueError", msg: "Catches ValueError" },
        ],
      },
    },

  ],
};
