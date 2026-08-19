export default {
  id: "m2",
  title: "Logic and Conditionals",
  blurb: "Teaching your program to make a decision instead of running straight through.",
  waypoints: [

    {
      id: "m2-w1",
      title: "Booleans and Comparison Operators",
      brief: [
        { t: "p", x: "A **boolean** is a value that is either `True` or `False`. Capital first letter, no quotes. `\"True\"` with quotes is a string, which is a different thing entirely." },
        { t: "p", x: "Comparisons produce booleans. This is where decisions come from." },
        { t: "code", x: "print(2926 > 2000)    # True\nprint(2926 == 2926)   # True\nprint(2926 != 2954)   # True\nprint(2926 <= 2900)   # False", cap: "`==` compares. `=` assigns. Mixing them up is the classic beginner bug." },
        { t: "ul", x: [
          "`==` equal to, `!=` not equal to",
          "`>` `<` greater than, less than",
          "`>=` `<=` greater or equal, less or equal",
        ]},
        { t: "h", x: "Combining conditions" },
        { t: "p", x: "`and` needs both sides true. `or` needs at least one. `not` flips whatever follows it." },
        { t: "code", x: "elev = 2926\npermit = True\n\nprint(elev > 2500 and permit)     # True\nprint(elev > 3000 or permit)      # True\nprint(not permit)                 # False", cap: "Read these out loud, they say what they mean." },
        { t: "p", x: "Python also chains comparisons the way maths does, which reads beautifully: `2000 < elev < 3000` is valid and means exactly what it looks like." },
        { t: "note", x: "**Truthiness.** In a boolean context, empty things are false and non-empty things are true. `0`, `\"\"`, `[]`, `{}` and `None` all count as false. Every other value counts as true. That is why `if items:` is the idiomatic way to ask \"is this list non-empty\"." },
      ],
      drills: [
        {
          prompt: "Store in `is_high` whether `elev` is strictly greater than 2500, and in `is_ready` whether `elev` is above 2500 **and** `permit` is True. Print both.",
          hint: "A comparison already gives you a boolean. No if statement needed yet.",
          starter: "elev = 2926\npermit = True\n",
          solution: "elev = 2926\npermit = True\nis_high = elev > 2500\nis_ready = elev > 2500 and permit\nprint(is_high, is_ready)",
          checks: [
            { k: "var_is", n: "is_high", v: true, msg: "is_high is True" },
            { k: "var_is", n: "is_ready", v: true, msg: "is_ready is True" },
            { k: "type_is", n: "is_high", v: "bool", msg: "is_high is a real bool, not a string" },
          ],
        },
        {
          prompt: "Using a single chained comparison, store in `in_band` whether `elev` sits strictly between 2000 and 3000. Print it.",
          hint: "Python allows 2000 < elev < 3000 directly.",
          starter: "elev = 2926\n",
          solution: "elev = 2926\nin_band = 2000 < elev < 3000\nprint(in_band)",
          checks: [
            { k: "var_is", n: "in_band", v: true, msg: "in_band is True" },
            { k: "src_has", v: "2000<elev<3000", tight: true, msg: "Uses a single chained comparison" },
            { k: "out_has", v: "True", msg: "Prints True" },
          ],
        },
      ],
      quiz: [
        {
          q: "What is the difference between `=` and `==`?",
          options: ["No difference", "`=` assigns a value, `==` compares two values", "`=` compares, `==` assigns", "`==` only works on numbers"],
          answer: 1,
          why: "`x = 5` puts 5 into x. `x == 5` asks whether x is currently 5 and hands back True or False.",
        },
        {
          q: "What does `True and False` evaluate to?",
          options: ["True", "False", "None", "An error"],
          answer: 1,
          why: "`and` is only True when both sides are True.",
        },
        {
          q: "Which of these is treated as False in a condition?",
          options: ["`\"False\"`", "`[0]`", "`[]`", "`-1`"],
          answer: 2,
          why: "An empty list is falsy. A non-empty string, a list containing a zero, and any non-zero number are all truthy.",
        },
      ],
      challenge: {
        prompt: "Given the three variables below, compute `go` as True only when the elevation is above 2000, the permit is approved, **and** the forecast is not `\"storm\"`. Print `go`.",
        hint: "Combine two `and` conditions with a `!=` comparison for the forecast.",
        starter: "elev = 2926\npermit = True\nforecast = \"cloudy\"\n",
        solution: "elev = 2926\npermit = True\nforecast = \"cloudy\"\ngo = elev > 2000 and permit and forecast != \"storm\"\nprint(go)",
        checks: [
          { k: "var_is", n: "go", v: true, msg: "go is True for this input" },
          { k: "type_is", n: "go", v: "bool", msg: "go is a bool" },
          { k: "src_has", v: "and", msg: "Combines conditions with and" },
        ],
      },
    },

    {
      id: "m2-w2",
      title: "If Statements and Logic",
      brief: [
        { t: "p", x: "An `if` statement runs a block of code only when its condition is True. The structure is always the same: the word `if`, a condition, a colon, then an indented block underneath." },
        { t: "code", x: "elev = 2926\n\nif elev > 2500:\n    print(\"High altitude route\")\n    print(\"Bring a warm layer\")\n\nprint(\"Always runs\")", cap: "Both indented lines belong to the if. The last line does not." },
        { t: "p", x: "The colon and the indentation are not style, they are syntax. Python uses indentation the way other languages use curly braces. Four spaces per level, and be consistent, mixing tabs and spaces is a common source of errors." },
        { t: "h", x: "What can go in the condition" },
        { t: "p", x: "Anything that evaluates to True or False. That includes comparisons, combined conditions, and plain values relying on truthiness." },
        { t: "code", x: "notes = []\n\nif not notes:\n    print(\"No trail notes yet\")\n\nif len(notes) == 0:\n    print(\"Same test, spelled out\")", cap: "Both work. The first reads better once you are used to it." },
        { t: "note", x: "**IndentationError.** If Python complains about indentation, look for a line that is indented differently from its neighbours, or a block that is empty. An `if` must have at least one indented line under it." },
      ],
      drills: [
        {
          prompt: "If `elev` is greater than 2500, print `High altitude route`. Otherwise print nothing at all.",
          hint: "One if, one indented print. No else needed here.",
          starter: "elev = 2926\n",
          solution: "elev = 2926\nif elev > 2500:\n    print(\"High altitude route\")",
          checks: [
            { k: "out_is", v: "High altitude route", msg: "Prints the message" },
            { k: "src_has", v: "if", msg: "Uses an if statement" },
          ],
        },
        {
          prompt: "The list `gear` is empty. Print `Pack list is empty` only when it has nothing in it, using truthiness rather than `len()`.",
          hint: "`if not gear:` is the idiomatic form.",
          starter: "gear = []\n",
          solution: "gear = []\nif not gear:\n    print(\"Pack list is empty\")",
          checks: [
            { k: "out_is", v: "Pack list is empty", msg: "Prints the message" },
            { k: "src_hasnt", v: "len(", msg: "Avoids len(), uses truthiness" },
            { k: "src_has", v: "not", msg: "Uses not" },
          ],
        },
      ],
      quiz: [
        {
          q: "What punctuation ends the `if` line?",
          options: ["A semicolon", "A colon", "Nothing", "A curly brace"],
          answer: 1,
          why: "Every block opener in Python ends with a colon, then the block itself is indented on the following lines.",
        },
        {
          q: "How does Python know which lines belong inside the if?",
          options: ["By the curly braces", "By the indentation", "By the `end` keyword", "It runs everything below"],
          answer: 1,
          why: "Indentation is the block structure. When the indentation returns to the previous level, the block is over.",
        },
        {
          q: "What does this print?",
          code: "x = 5\nif x > 10:\n    print(\"big\")\nprint(\"done\")",
          options: ["big", "big\\ndone", "done", "Nothing"],
          answer: 2,
          why: "The condition is False so the indented line is skipped. `print(\"done\")` is not indented, so it is outside the if and always runs.",
        },
      ],
      challenge: {
        prompt: "Given `elev` and `weather`, print `Summit push approved` only when the elevation is at least 2500 and the weather is not `\"storm\"`. With the starter values it should print. Nothing else should be printed.",
        hint: "One if with two conditions joined by and.",
        starter: "elev = 2926\nweather = \"clear\"\n",
        solution: "elev = 2926\nweather = \"clear\"\nif elev >= 2500 and weather != \"storm\":\n    print(\"Summit push approved\")",
        checks: [
          { k: "out_is", v: "Summit push approved", msg: "Prints exactly the approval line" },
          { k: "src_has", v: "if", msg: "Uses if" },
          { k: "src_has", v: "and", msg: "Tests both conditions" },
        ],
      },
    },

    {
      id: "m2-w3",
      title: "Else and Elif Conditions",
      brief: [
        { t: "p", x: "`else` catches everything the `if` did not. `elif` (short for else-if) lets you test another condition before giving up." },
        { t: "code", x: "elev = 2926\n\nif elev >= 2800:\n    band = \"very high\"\nelif elev >= 2000:\n    band = \"high\"\nelif elev >= 1000:\n    band = \"mid\"\nelse:\n    band = \"low\"\n\nprint(band)   # very high", cap: "Only one branch ever runs." },
        { t: "p", x: "Two rules that explain almost every surprise with chains like this:" },
        { t: "ul", x: [
          "Python checks the conditions **in order** and stops at the first True one. Everything below is skipped even if it would also be true.",
          "`else` has no condition and must come last. It is optional.",
        ]},
        { t: "p", x: "This means **order matters enormously**. If you put `elev >= 1000` first, every high mountain would be labelled mid, because that test passes before the stricter ones get a chance." },
        { t: "code", x: "# wrong order, everything comes out \"mid\"\nif elev >= 1000:\n    band = \"mid\"\nelif elev >= 2800:\n    band = \"very high\"   # unreachable for elev >= 2800", cap: "Go from the most specific test to the least." },
        { t: "note", x: "**if versus elif.** A run of separate `if` statements tests every one independently and can trigger several. An `if / elif` chain picks exactly one. When the cases are mutually exclusive, use elif." },
      ],
      drills: [
        {
          prompt: "Set `band` to `\"very high\"` when `elev` is 2800 or more, `\"high\"` at 2000 or more, `\"mid\"` at 1000 or more, and `\"low\"` otherwise. Print `band`.",
          hint: "Order the tests from the highest threshold down.",
          starter: "elev = 2926\n",
          solution: "elev = 2926\nif elev >= 2800:\n    band = \"very high\"\nelif elev >= 2000:\n    band = \"high\"\nelif elev >= 1000:\n    band = \"mid\"\nelse:\n    band = \"low\"\nprint(band)",
          checks: [
            { k: "var_is", n: "band", v: "very high", msg: "band is 'very high' for 2926" },
            { k: "src_has", v: "elif", msg: "Uses elif" },
            { k: "src_has", v: "else", msg: "Has a fallback else" },
          ],
        },
        {
          prompt: "Given `weather`, print `Go` when it is `\"clear\"`, `Wait` when it is `\"rain\"`, and `Cancel` for anything else. Test it with the starter value first, then try changing it.",
          hint: "Two conditions and one else, comparing strings with ==.",
          starter: "weather = \"rain\"\n",
          solution: "weather = \"rain\"\nif weather == \"clear\":\n    print(\"Go\")\nelif weather == \"rain\":\n    print(\"Wait\")\nelse:\n    print(\"Cancel\")",
          checks: [
            { k: "out_is", v: "Wait", msg: "Prints Wait for rain" },
            { k: "src_has", v: "elif", msg: "Uses elif" },
            { k: "src_has", v: "else", msg: "Has an else branch" },
          ],
        },
      ],
      quiz: [
        {
          q: "In an if / elif / else chain, how many branches run?",
          options: ["All of the true ones", "Exactly one", "At most two", "None unless else exists"],
          answer: 1,
          why: "Python takes the first branch whose condition is True and skips the rest of the chain entirely.",
        },
        {
          q: "What does this print when `x = 15`?",
          code: "if x > 5:\n    print(\"A\")\nelif x > 10:\n    print(\"B\")\nelse:\n    print(\"C\")",
          options: ["A", "B", "A and B", "C"],
          answer: 0,
          why: "`x > 5` is True first, so A prints and the elif is never evaluated even though it would also be True. Order the strictest test first.",
        },
        {
          q: "Which statement about `else` is correct?",
          options: ["It needs its own condition", "It must come first", "It is optional and comes last", "You can have several per chain"],
          answer: 2,
          why: "`else` takes no condition, appears at most once, and always sits at the end of the chain.",
        },
      ],
      challenge: {
        prompt: "Write a difficulty grader. Given `rating` (1 to 9), print `Beginner` for 1 to 3, `Intermediate` for 4 to 6, `Advanced` for 7 to 9, and `Invalid rating` for anything outside 1 to 9. With `rating = 4` it must print `Intermediate`.",
        hint: "Check the invalid case first, or use chained comparisons like `1 <= rating <= 3`.",
        starter: "rating = 4\n",
        solution: "rating = 4\nif rating < 1 or rating > 9:\n    print(\"Invalid rating\")\nelif rating <= 3:\n    print(\"Beginner\")\nelif rating <= 6:\n    print(\"Intermediate\")\nelse:\n    print(\"Advanced\")",
        checks: [
          { k: "out_is", v: "Intermediate", msg: "Prints Intermediate for 4" },
          { k: "src_has", v: "elif", msg: "Uses an elif chain" },
          { k: "src_has", v: "Invalid rating", msg: "Handles the invalid case" },
        ],
      },
    },

    {
      id: "m2-w4",
      title: "Nested Conditionals",
      brief: [
        { t: "p", x: "A **nested** conditional is an `if` inside another `if`. The inner one is only reached when the outer condition passed, so you are asking a follow-up question." },
        { t: "code", x: "permit = True\nweather = \"clear\"\n\nif permit:\n    if weather == \"clear\":\n        print(\"Climb today\")\n    else:\n        print(\"Permit is fine, wait for the weather\")\nelse:\n    print(\"Get the permit first\")", cap: "Each level of nesting adds four more spaces." },
        { t: "p", x: "Nesting is useful when the second question only makes sense given the first answer. Asking about the weather is pointless if there is no permit, and the nested form says that clearly." },
        { t: "h", x: "When to flatten instead" },
        { t: "p", x: "If both conditions simply need to be true and there is no separate message for each failure, `and` is cleaner than nesting." },
        { t: "code", x: "# nested, three levels deep\nif permit:\n    if weather == \"clear\":\n        if fit:\n            print(\"Go\")\n\n# flat, same meaning\nif permit and weather == \"clear\" and fit:\n    print(\"Go\")", cap: "Prefer the flat version when the branches share one outcome." },
        { t: "note", x: "**Guard clauses.** Another way to avoid deep nesting is to handle the failure case first and stop early. Inside a function you would `return`. This keeps the happy path at the shallowest indentation, which is much easier to read." },
      ],
      drills: [
        {
          prompt: "Using nested ifs, print `Climb today` when the permit is approved and the weather is clear, `Permit is fine, wait for the weather` when the permit is approved but the weather is not clear, and `Get the permit first` when there is no permit.",
          hint: "Outer if on permit, inner if on weather, each with its own else.",
          starter: "permit = True\nweather = \"rain\"\n",
          solution: "permit = True\nweather = \"rain\"\nif permit:\n    if weather == \"clear\":\n        print(\"Climb today\")\n    else:\n        print(\"Permit is fine, wait for the weather\")\nelse:\n    print(\"Get the permit first\")",
          checks: [
            { k: "out_is", v: "Permit is fine, wait for the weather", msg: "Correct message for permit + rain" },
            { k: "src_has", v: "else", msg: "Handles the alternatives" },
          ],
        },
        {
          prompt: "Flatten this. The three nested conditions below all lead to the same single outcome, so rewrite it as one `if` using `and`, printing `Go` when all three hold.",
          hint: "if permit and weather == \"clear\" and fit:",
          starter: "permit = True\nweather = \"clear\"\nfit = True\n\n# rewrite the logic below as a single if\n",
          solution: "permit = True\nweather = \"clear\"\nfit = True\nif permit and weather == \"clear\" and fit:\n    print(\"Go\")",
          checks: [
            { k: "out_is", v: "Go", msg: "Prints Go" },
            { k: "src_has", v: "and", msg: "Uses and instead of nesting" },
            { k: "src_lines_min", v: 4, msg: "Keeps it to a single flat if" },
          ],
        },
      ],
      quiz: [
        {
          q: "When does an inner `if` get evaluated?",
          options: ["Always", "Only when the outer condition was True", "Only when the outer condition was False", "Before the outer one"],
          answer: 1,
          why: "The inner block is part of the outer block, so it is only reached when the outer condition passes.",
        },
        {
          q: "Which is the better choice when two conditions must both hold and there is only one outcome?",
          options: ["Nested ifs, it is more explicit", "A single if with `and`", "Two separate if statements", "An elif chain"],
          answer: 1,
          why: "Flattening with `and` says the same thing with less indentation. Nesting earns its place when each failure needs its own response.",
        },
        {
          q: "What does this print when `a = False` and `b = True`?",
          code: "if a:\n    if b:\n        print(\"X\")\n    else:\n        print(\"Y\")\nelse:\n    print(\"Z\")",
          options: ["X", "Y", "Z", "Nothing"],
          answer: 2,
          why: "The outer condition is False so the whole inner block is skipped and the outer else runs.",
        },
      ],
      challenge: {
        prompt: "Write a summit decision. If `permit` is False print `No permit`. Otherwise, if `weather` is `\"storm\"` print `Storm, stay at camp`, else if `hours_left` is under 4 print `Not enough daylight`, else print `Summit push`. With the starter values it must print `Not enough daylight`.",
        hint: "Outer if on permit. Inside it, an if / elif / else chain on weather and hours_left.",
        starter: "permit = True\nweather = \"clear\"\nhours_left = 3\n",
        solution: "permit = True\nweather = \"clear\"\nhours_left = 3\nif not permit:\n    print(\"No permit\")\nelse:\n    if weather == \"storm\":\n        print(\"Storm, stay at camp\")\n    elif hours_left < 4:\n        print(\"Not enough daylight\")\n    else:\n        print(\"Summit push\")",
        checks: [
          { k: "out_is", v: "Not enough daylight", msg: "Correct branch for these values" },
          { k: "src_has", v: "elif", msg: "Uses an elif" },
          { k: "src_has", v: "permit", msg: "Checks the permit first" },
        ],
      },
    },

  ],
};
