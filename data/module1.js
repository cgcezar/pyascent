export default {
  id: "m1",
  title: "Python Basics",
  blurb: "Getting the interpreter to talk back, then storing what it says.",
  waypoints: [

    {
      id: "m1-w1",
      title: "Introduction to Python",
      brief: [
        { t: "p", x: "Python is a programming language you write as plain text. Something called the **interpreter** reads your text one line at a time, top to bottom, and does what each line says. There is no separate build step to worry about, which is a big part of why Python is a common first language." },
        { t: "p", x: "Two ideas will save you a lot of confusion early on:" },
        { t: "ul", x: [
          "**Order matters.** Line 3 runs after line 2. If you use something before you create it, Python stops and complains.",
          "**Indentation matters.** Spaces at the start of a line are not decoration. They tell Python which lines belong inside an `if` or a loop. Four spaces is the convention.",
        ]},
        { t: "code", x: "print(\"Trailhead: Ambangeg\")\nprint(\"Target: 2926 m\")\nprint(\"Status: ready\")", cap: "Three lines, three outputs, in the order written." },
        { t: "note", x: "**About this app.** The Python running here is real CPython compiled to WebAssembly, running inside your browser. Nothing is sent to a server. That also means `input()` is switched off, so any exercise that would need typed input uses a variable instead." },
        { t: "p", x: "One more thing worth knowing: Python is **case sensitive**. `Print` is not `print`, and `Name` is not `name`. Most beginner errors are a capital letter in the wrong place or a missing quote." },
      ],
      drills: [
        {
          prompt: "Print three lines that describe a climb you would like to do. Any three lines will do, one `print()` per line.",
          hint: "Each `print()` call puts its text on its own line. You need three separate calls.",
          starter: "# Write three print() calls below\n",
          solution: "print(\"Mount Pulag\")\nprint(\"Benguet\")\nprint(\"2926 m\")",
          checks: [
            { k: "out_n_lines", v: 3, msg: "Prints exactly 3 lines" },
            { k: "src_has", v: "print", msg: "Uses print()" },
          ],
        },
        {
          prompt: "Python runs top to bottom. Print `Pack bag`, then `Leave house`, then `Ride bus`, in exactly that order.",
          hint: "The order of your print() lines is the order of the output.",
          starter: "",
          solution: "print(\"Pack bag\")\nprint(\"Leave house\")\nprint(\"Ride bus\")",
          checks: [
            { k: "out_lines", v: ["Pack bag", "Leave house", "Ride bus"], msg: "Three lines in the right order" },
          ],
        },
      ],
      quiz: [
        {
          q: "How does the Python interpreter read your file?",
          options: ["All at once, in any order it likes", "One line at a time, from top to bottom", "Bottom to top", "Only the lines inside functions"],
          answer: 1,
          why: "Execution is top to bottom. That is why you cannot use a variable on line 2 that you only create on line 5.",
        },
        {
          q: "What does this print?",
          code: "print(\"one\")\nprint(\"two\")",
          options: ["one two", "two\\none", "one\\ntwo", "Nothing, it needs a main() function"],
          answer: 2,
          why: "Each print() ends with a newline, so the two words land on separate lines. Python needs no main() to start running.",
        },
        {
          q: "Why does `Print(\"hi\")` fail?",
          options: ["The quotes are wrong", "Python is case sensitive, the function is `print`", "You need a semicolon", "print only accepts numbers"],
          answer: 1,
          why: "Python is case sensitive. `Print` is treated as an undefined name, so you get a NameError.",
        },
      ],
      challenge: {
        prompt: "Print a four-line trail card. Line 1 the mountain name, line 2 the province, line 3 the elevation with the unit, line 4 the word `Cleared`.",
        hint: "Four separate print() calls. The last line must be exactly `Cleared`.",
        starter: "",
        solution: "print(\"Pulag\")\nprint(\"Benguet\")\nprint(\"2926 m\")\nprint(\"Cleared\")",
        checks: [
          { k: "out_n_lines", v: 4, msg: "Prints exactly 4 lines" },
          { k: "out_has", v: "Cleared", msg: "Last line says Cleared" },
          { k: "out_has", v: "m", msg: "Elevation includes a unit" },
        ],
      },
    },

    {
      id: "m1-w2",
      title: "Your First Python Command",
      brief: [
        { t: "p", x: "`print()` is a **function**. You write its name, then round brackets, then whatever you want it to show inside the brackets. The thing you put inside is called an **argument**." },
        { t: "code", x: "print(\"Hello, trail\")   # text needs quotes\nprint(2926)             # numbers do not\nprint(\"Pulag\", 2926)    # two arguments, joined by a space", cap: "Text goes in quotes. Numbers do not." },
        { t: "p", x: "Text in quotes is called a **string**. Single or double quotes both work, as long as you close with the same one you opened with. If the text itself contains an apostrophe, use double quotes on the outside." },
        { t: "code", x: "print('Ambangeg trail')\nprint(\"It's a long walk\")   # apostrophe inside double quotes", cap: "Pick the quote that keeps your text readable." },
        { t: "p", x: "Two extra tricks on `print()` that come up constantly:" },
        { t: "ul", x: [
          "`sep=` changes what goes between arguments. Default is a single space.",
          "`end=` changes what goes at the end. Default is a newline, so `end=\"\"` keeps the next print on the same line.",
        ]},
        { t: "code", x: "print(\"Pulag\", \"Benguet\", sep=\" | \")\nprint(\"loading\", end=\"\")\nprint(\"...done\")", cap: "Output:\nPulag | Benguet\nloading...done" },
      ],
      drills: [
        {
          prompt: "Print the exact line `Hello, trail` with nothing else around it.",
          hint: "Watch the comma and the space. The text has to match character for character.",
          starter: "",
          solution: "print(\"Hello, trail\")",
          checks: [{ k: "out_is", v: "Hello, trail", msg: "Output is exactly: Hello, trail" }],
        },
        {
          prompt: "Using one `print()` call with `sep=`, produce the line `Pulag-Benguet-2926`. Pass three separate arguments, do not glue the string together yourself.",
          hint: "print(a, b, c, sep=\"-\") puts a dash between each argument.",
          starter: "print(\"Pulag\", \"Benguet\", 2926)\n",
          solution: "print(\"Pulag\", \"Benguet\", 2926, sep=\"-\")",
          checks: [
            { k: "out_is", v: "Pulag-Benguet-2926", msg: "Output is exactly: Pulag-Benguet-2926" },
            { k: "src_has", v: "sep", msg: "Uses the sep argument" },
          ],
        },
      ],
      quiz: [
        {
          q: "Which line has a syntax error?",
          options: ["print(\"hi\")", "print('hi')", "print(\"hi')", "print(42)"],
          answer: 2,
          why: "The quotes have to match. Opening with a double quote and closing with a single quote leaves the string unterminated.",
        },
        {
          q: "What does `print(\"a\", \"b\")` output?",
          options: ["ab", "a b", "a, b", "a\\nb"],
          answer: 1,
          why: "Multiple arguments are joined by the default separator, which is one space.",
        },
        {
          q: "What is the effect of `end=\"\"`?",
          options: ["Deletes the output", "Stops the program", "Leaves the cursor on the same line so the next print continues it", "Adds an extra blank line"],
          answer: 2,
          why: "`end` replaces the newline normally added after the output. An empty string means no line break at all.",
        },
      ],
      challenge: {
        prompt: "Print exactly two lines. The first must be `Trail: Ambangeg`, the second must be `Permit: yes`. Use `sep=\": \"` on at least one of them instead of typing the colon inside a string.",
        hint: "print(\"Trail\", \"Ambangeg\", sep=\": \") produces the first line.",
        starter: "",
        solution: "print(\"Trail\", \"Ambangeg\", sep=\": \")\nprint(\"Permit\", \"yes\", sep=\": \")",
        checks: [
          { k: "out_lines", v: ["Trail: Ambangeg", "Permit: yes"], msg: "Both lines exact and in order" },
          { k: "src_has", v: "sep", msg: "Uses sep at least once" },
        ],
      },
    },

    {
      id: "m1-w3",
      title: "Variables and Data Types",
      brief: [
        { t: "p", x: "A **variable** is a name pointing at a value. You create one with `=`, which means *assign*, not *equals* in the maths sense. Read `x = 5` as \"let x refer to 5\"." },
        { t: "code", x: "mountain = \"Pulag\"\nelevation = 2926\ndays = 2.5\npermit_ok = True\n\nprint(mountain, elevation, days, permit_ok)", cap: "Four variables, four different types." },
        { t: "p", x: "Python figures out the type from the value. The four you will use most:" },
        { t: "ul", x: [
          "`str` a string, text in quotes",
          "`int` a whole number, no decimal point",
          "`float` a number with a decimal point",
          "`bool` either `True` or `False`, capital first letter",
        ]},
        { t: "p", x: "`type()` tells you what you are holding, and `int()`, `float()`, `str()` convert between them. Converting matters because `\"5\" + 5` is an error, while `int(\"5\") + 5` is `10`." },
        { t: "code", x: "count = \"12\"\nprint(type(count))        # <class 'str'>\nprint(int(count) + 1)     # 13\nprint(str(2926) + \" m\")   # 2926 m", cap: "Convert before you combine." },
        { t: "note", x: "**Naming rules.** Letters, digits and underscores only, and it cannot start with a digit. Convention is `lower_snake_case`. Pick names that say what the value is: `elevation_m` beats `e`." },
      ],
      drills: [
        {
          prompt: "Create a variable `peak` holding the text `Pulag`, and `height` holding the whole number `2926`. Then print them on one line separated by a space.",
          hint: "Text needs quotes. The number must not have quotes, otherwise it becomes a string.",
          starter: "peak = \nheight = \n",
          solution: "peak = \"Pulag\"\nheight = 2926\nprint(peak, height)",
          checks: [
            { k: "var_is", n: "peak", v: "Pulag", msg: "peak is the string Pulag" },
            { k: "var_is", n: "height", v: 2926, msg: "height is the number 2926" },
            { k: "type_is", n: "height", v: "int", msg: "height is an int, not a string" },
            { k: "out_has", v: "Pulag", msg: "Prints the values" },
          ],
        },
        {
          prompt: "The variable `raw` holds the string `\"1450\"`. Convert it to a whole number, add 200, store the result in `total`, and print `total`.",
          hint: "int(raw) turns the text into a number you can do maths with.",
          starter: "raw = \"1450\"\n",
          solution: "raw = \"1450\"\ntotal = int(raw) + 200\nprint(total)",
          checks: [
            { k: "var_is", n: "total", v: 1650, msg: "total equals 1650" },
            { k: "type_is", n: "total", v: "int", msg: "total is an int" },
            { k: "out_has", v: "1650", msg: "Prints 1650" },
          ],
        },
      ],
      quiz: [
        {
          q: "What is the type of `2926`?",
          options: ["str", "int", "float", "bool"],
          answer: 1,
          why: "A whole number with no decimal point is an int. `2926.0` would be a float.",
        },
        {
          q: "What happens with `\"5\" + 5`?",
          options: ["10", "55", "TypeError", "5 5"],
          answer: 2,
          why: "Python will not silently mix a string and an int. Convert one side first: `int(\"5\") + 5` or `\"5\" + str(5)`.",
        },
        {
          q: "Which is a valid variable name?",
          options: ["2nd_camp", "camp-2", "camp_2", "class"],
          answer: 2,
          why: "Names cannot start with a digit, cannot contain a hyphen since that reads as subtraction, and cannot be a reserved word like `class`.",
        },
      ],
      challenge: {
        prompt: "Build a trip summary. Create `peak` (string), `elevation_m` (int), `days` (float) and `permit_ok` (bool), then print one line in the exact form `Pulag 2926 2.5 True` using a single print with four arguments.",
        hint: "print(peak, elevation_m, days, permit_ok) already separates them with spaces.",
        starter: "",
        solution: "peak = \"Pulag\"\nelevation_m = 2926\ndays = 2.5\npermit_ok = True\nprint(peak, elevation_m, days, permit_ok)",
        checks: [
          { k: "type_is", n: "peak", v: "str", msg: "peak is a str" },
          { k: "type_is", n: "elevation_m", v: "int", msg: "elevation_m is an int" },
          { k: "type_is", n: "days", v: "float", msg: "days is a float" },
          { k: "type_is", n: "permit_ok", v: "bool", msg: "permit_ok is a bool" },
          { k: "out_is", v: "Pulag 2926 2.5 True", msg: "Output line is exact" },
        ],
      },
    },

    {
      id: "m1-w4",
      title: "Working with Strings",
      brief: [
        { t: "p", x: "Strings can be joined, measured, sliced and reshaped. Joining with `+` is called **concatenation**, and both sides have to be strings." },
        { t: "code", x: "first = \"Mount\"\nsecond = \"Pulag\"\nprint(first + \" \" + second)   # Mount Pulag\nprint(len(second))            # 5", cap: "`len()` counts characters, spaces included." },
        { t: "h", x: "f-strings" },
        { t: "p", x: "The cleanest way to build a sentence out of variables is an **f-string**. Put `f` before the quote, then wrap any variable in curly braces. No conversion needed, numbers just work." },
        { t: "code", x: "peak = \"Pulag\"\nelev = 2926\nprint(f\"{peak} rises to {elev} m\")\nprint(f\"That is {elev / 1000:.2f} km\")", cap: "Output:\nPulag rises to 2926 m\nThat is 2.93 km" },
        { t: "h", x: "Common string methods" },
        { t: "ul", x: [
          "`.upper()` and `.lower()` change case",
          "`.strip()` removes spaces at both ends, very useful on messy input",
          "`.replace(a, b)` swaps every occurrence of a with b",
          "`.split(sep)` breaks a string into a list of pieces",
          "`.title()` capitalises the first letter of each word",
        ]},
        { t: "code", x: "raw = \"  benguet, mountain province  \"\nclean = raw.strip().title()\nprint(clean)                    # Benguet, Mountain Province\nprint(clean.split(\", \"))        # ['Benguet', 'Mountain Province']", cap: "Methods can be chained left to right." },
        { t: "note", x: "**Strings never change in place.** `name.upper()` hands back a new string. If you want to keep it you have to assign it: `name = name.upper()`." },
      ],
      drills: [
        {
          prompt: "Given `peak` and `elev` below, use an f-string to print exactly `Pulag stands at 2926 m`.",
          hint: "f\"{peak} stands at {elev} m\"",
          starter: "peak = \"Pulag\"\nelev = 2926\n",
          solution: "peak = \"Pulag\"\nelev = 2926\nprint(f\"{peak} stands at {elev} m\")",
          checks: [
            { k: "out_is", v: "Pulag stands at 2926 m", msg: "Output is exact" },
            { k: "src_has", v: "f\"", msg: "Uses an f-string" },
          ],
        },
        {
          prompt: "The variable `messy` has stray spaces and the wrong case. Clean it into `clean` so that it prints as `Ambangeg Trail`, then print `clean`.",
          hint: "Chain .strip() and .title() on the original string.",
          starter: "messy = \"   ambangeg trail   \"\n",
          solution: "messy = \"   ambangeg trail   \"\nclean = messy.strip().title()\nprint(clean)",
          checks: [
            { k: "var_is", n: "clean", v: "Ambangeg Trail", msg: "clean equals 'Ambangeg Trail'" },
            { k: "out_is", v: "Ambangeg Trail", msg: "Prints the cleaned text" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does `len(\"Mt Pulag\")` return?",
          options: ["7", "8", "2", "9"],
          answer: 1,
          why: "len counts every character including the space: M, t, space, P, u, l, a, g is 8.",
        },
        {
          q: "After `name = \"pulag\"` and `name.upper()`, what does `print(name)` show?",
          options: ["PULAG", "pulag", "Pulag", "An error"],
          answer: 1,
          why: "String methods return a new string and leave the original alone. You would need `name = name.upper()` to keep the change.",
        },
        {
          q: "What does `\"a,b,c\".split(\",\")` produce?",
          options: ["\"abc\"", "['a', 'b', 'c']", "('a','b','c')", "3"],
          answer: 1,
          why: "split cuts the string at every separator and returns a list of the pieces.",
        },
      ],
      challenge: {
        prompt: "Take the raw record below and print exactly `PULAG (Benguet) is 2926 m`. Split the record on the comma, strip the spaces off each piece, uppercase the name, and use an f-string to assemble the line.",
        hint: "parts = record.split(\",\") gives you three pieces. Then parts[0].strip().upper() and so on.",
        starter: "record = \"pulag , Benguet , 2926\"\n",
        solution: "record = \"pulag , Benguet , 2926\"\nparts = record.split(\",\")\nname = parts[0].strip().upper()\nprov = parts[1].strip()\nelev = parts[2].strip()\nprint(f\"{name} ({prov}) is {elev} m\")",
        checks: [
          { k: "out_is", v: "PULAG (Benguet) is 2926 m", msg: "Output is exact" },
          { k: "src_has", v: "split", msg: "Uses .split()" },
          { k: "src_has", v: "strip", msg: "Uses .strip()" },
        ],
      },
    },

    {
      id: "m1-w5",
      title: "Working with Numbers",
      brief: [
        { t: "p", x: "Python does arithmetic with the operators you would expect, plus three that trip people up at first." },
        { t: "code", x: "print(7 + 2)    # 9\nprint(7 - 2)    # 5\nprint(7 * 2)    # 14\nprint(7 / 2)    # 3.5   true division, always a float\nprint(7 // 2)   # 3     floor division, drops the remainder\nprint(7 % 2)    # 1     modulo, the remainder itself\nprint(7 ** 2)   # 49    power", cap: "Note that `/` gives 3.5 while `//` gives 3." },
        { t: "p", x: "`%` looks strange until you see what it is for. `n % 2 == 0` is the standard test for an even number, and `total % 60` gives you leftover minutes after taking out whole hours." },
        { t: "h", x: "Order and rounding" },
        { t: "p", x: "Python follows the usual precedence: brackets, then `**`, then `*` `/` `//` `%`, then `+` `-`. When in doubt add brackets, they cost nothing and make intent obvious." },
        { t: "code", x: "print(2 + 3 * 4)      # 14\nprint((2 + 3) * 4)    # 20\nprint(round(3.14159, 2))  # 3.14\nprint(abs(-120))          # 120\nprint(max(2926, 2954))    # 2954", cap: "round, abs, min and max are built in." },
        { t: "note", x: "**Floats are approximate.** `0.1 + 0.2` prints `0.30000000000000004`. That is not a Python bug, it is how binary floating point works everywhere. Round only when you display, and never compare floats with `==` for equality." },
      ],
      drills: [
        {
          prompt: "A climb covers `total_minutes = 415`. Compute whole `hours` and leftover `minutes`, then print them as `6 h 55 min`.",
          hint: "Use // for the hours and % for the leftover minutes.",
          starter: "total_minutes = 415\n",
          solution: "total_minutes = 415\nhours = total_minutes // 60\nminutes = total_minutes % 60\nprint(f\"{hours} h {minutes} min\")",
          checks: [
            { k: "var_is", n: "hours", v: 6, msg: "hours equals 6" },
            { k: "var_is", n: "minutes", v: 55, msg: "minutes equals 55" },
            { k: "out_is", v: "6 h 55 min", msg: "Output is exactly: 6 h 55 min" },
          ],
        },
        {
          prompt: "Compute the average of the three elevations below, round it to one decimal place, store it in `avg`, and print it.",
          hint: "Add them, divide by 3, then round(value, 1).",
          starter: "a = 2926\nb = 2954\nc = 2842\n",
          solution: "a = 2926\nb = 2954\nc = 2842\navg = round((a + b + c) / 3, 1)\nprint(avg)",
          checks: [
            { k: "expr", v: "abs(avg - 2907.3) < 0.05", msg: "avg is 2907.3" },
            { k: "src_has", v: "round", msg: "Uses round()" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does `9 // 4` give?",
          options: ["2.25", "2", "3", "1"],
          answer: 1,
          why: "Floor division throws away the fractional part and keeps the whole number below. `9 / 4` would be 2.25.",
        },
        {
          q: "What does `10 % 3` give?",
          options: ["3", "3.33", "1", "0"],
          answer: 2,
          why: "3 goes into 10 three times with 1 left over. Modulo returns that remainder.",
        },
        {
          q: "What is `2 + 3 * 4 ** 2`?",
          options: ["400", "50", "80", "26"],
          answer: 1,
          why: "Power first gives 16, then 3 * 16 is 48, then 2 + 48 is 50.",
        },
      ],
      challenge: {
        prompt: "You gain `gain_m = 1476` metres over `distance_km = 12.4`. Compute the average gain per kilometre, round it to one decimal, store it in `rate`, and print exactly `1476 m over 12.4 km = 119.0 m/km`.",
        hint: "rate = round(gain_m / distance_km, 1), then build the line with an f-string.",
        starter: "gain_m = 1476\ndistance_km = 12.4\n",
        solution: "gain_m = 1476\ndistance_km = 12.4\nrate = round(gain_m / distance_km, 1)\nprint(f\"{gain_m} m over {distance_km} km = {rate} m/km\")",
        checks: [
          { k: "expr", v: "abs(rate - 119.0) < 0.05", msg: "rate is 119.0" },
          { k: "out_is", v: "1476 m over 12.4 km = 119.0 m/km", msg: "Output line is exact" },
        ],
      },
    },

    {
      id: "m1-w6",
      title: "Comments and Code Clarity",
      brief: [
        { t: "p", x: "A **comment** starts with `#`. Python ignores everything after it on that line. Comments are for the human reading your code later, which is usually you in three weeks having forgotten everything." },
        { t: "code", x: "# Convert the raw elevation reading to metres\nraw_feet = 9600\nelevation_m = round(raw_feet * 0.3048)   # 1 ft = 0.3048 m\nprint(elevation_m)", cap: "The comment explains the why. The code already shows the what." },
        { t: "p", x: "The rule that separates useful comments from noise: **do not narrate, explain**." },
        { t: "ul", x: [
          "Weak: `x = x + 1  # add one to x`. The code already said that.",
          "Strong: `x = x + 1  # skip the header row in the CSV`. Now the reader knows why.",
        ]},
        { t: "h", x: "Clarity beats cleverness" },
        { t: "p", x: "Most of what makes code readable is not comments at all. It is good names, short lines and consistent spacing. Compare these two, they do the same thing:" },
        { t: "code", x: "# hard to follow\nd=2926;x=d*0.001;print(x)\n\n# easy to follow\nelevation_m = 2926\nelevation_km = elevation_m * 0.001\nprint(elevation_km)", cap: "Same result, very different maintenance cost." },
        { t: "note", x: "**Docstrings.** Triple quoted text at the top of a function is a docstring, not a comment. It stays in the program and shows up in `help()`. You will meet these properly in Module 5." },
      ],
      drills: [
        {
          prompt: "Convert `raw_feet = 9600` to whole metres in a variable named `elevation_m`, print it, and include at least one comment that explains the conversion factor.",
          hint: "One metre is 0.3048 feet. Use round() to get a whole number.",
          starter: "raw_feet = 9600\n",
          solution: "raw_feet = 9600\n# 1 foot = 0.3048 metres\nelevation_m = round(raw_feet * 0.3048)\nprint(elevation_m)",
          checks: [
            { k: "var_is", n: "elevation_m", v: 2926, msg: "elevation_m equals 2926" },
            { k: "src_has", v: "#", msg: "Includes a comment" },
            { k: "out_has", v: "2926", msg: "Prints the result" },
          ],
        },
        {
          prompt: "Rewrite the cramped code in the editor so that it uses clear multi-line variable names and prints the same value. Do not use semicolons, and give the variables descriptive names longer than three characters.",
          hint: "Split it into one statement per line and rename d and x to something meaningful.",
          starter: "d=2926;x=d*0.001;print(x)",
          solution: "elevation_m = 2926\nelevation_km = elevation_m * 0.001\nprint(elevation_km)",
          checks: [
            { k: "src_hasnt", v: ";", msg: "No semicolons" },
            { k: "out_has", v: "2.926", msg: "Prints 2.926" },
            { k: "src_lines_min", v: 3, msg: "Split into separate statements" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does Python do with everything after a `#` on a line?",
          options: ["Runs it as a separate statement", "Ignores it", "Prints it", "Treats it as a string"],
          answer: 1,
          why: "The interpreter skips comments entirely. They exist purely for people reading the code.",
        },
        {
          q: "Which comment actually earns its place?",
          options: ["`total = 0  # set total to zero`", "`i = i + 1  # increment i`", "`rate = g / d  # metres gained per km, used for the difficulty band`", "`print(x)  # print x`"],
          answer: 2,
          why: "The first three restate the code. The last one explains what the number means and why it is being computed.",
        },
        {
          q: "What is the single biggest driver of readable code?",
          options: ["A comment on every line", "Short variable names to save typing", "Descriptive names and one idea per line", "Putting everything on one line"],
          answer: 2,
          why: "Good naming and simple structure make most comments unnecessary. Comments then cover only the parts that genuinely need context.",
        },
      ],
      challenge: {
        prompt: "Write a small, clearly commented block that converts a hiking pace. Given `distance_km = 12.4` and `hours = 6.5`, compute `pace_kph` rounded to two decimals, print exactly `Average pace: 1.91 kph`, and include a comment explaining what pace means here.",
        hint: "pace_kph = round(distance_km / hours, 2). Add a # comment above it.",
        starter: "distance_km = 12.4\nhours = 6.5\n",
        solution: "distance_km = 12.4\nhours = 6.5\n# Average moving speed across the whole climb, rests included\npace_kph = round(distance_km / hours, 2)\nprint(f\"Average pace: {pace_kph} kph\")",
        checks: [
          { k: "expr", v: "abs(pace_kph - 1.91) < 0.005", msg: "pace_kph is 1.91" },
          { k: "out_is", v: "Average pace: 1.91 kph", msg: "Output is exact" },
          { k: "src_has", v: "#", msg: "Includes an explaining comment" },
        ],
      },
    },

  ],
};
