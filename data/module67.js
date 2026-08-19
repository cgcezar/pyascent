export const module6 = {
  id: "m6",
  title: "Files and External Data",
  blurb: "Reading data that lives outside your program.",
  waypoints: [

    {
      id: "m6-w1",
      title: "Working with External Files",
      brief: [
        { t: "p", x: "`open()` gives you a connection to a file. The second argument is the **mode**: `\"r\"` to read, `\"w\"` to write from scratch, `\"a\"` to append to the end." },
        { t: "code", x: "with open(\"packlist.txt\", \"r\") as f:\n    text = f.read()\n\nprint(text)", cap: "`with` closes the file for you, even if something goes wrong inside the block." },
        { t: "p", x: "Always use the `with` form. Without it you have to remember `f.close()`, and a file left open can lose data that is still sitting in a buffer." },
        { t: "h", x: "Three ways to read" },
        { t: "ul", x: [
          "`f.read()` the whole file as one string",
          "`f.readlines()` a list of lines, each still carrying its newline",
          "looping over `f` directly, one line at a time, which uses the least memory",
        ]},
        { t: "code", x: "with open(\"packlist.txt\") as f:\n    for line in f:\n        print(line.strip())", cap: "`.strip()` removes the trailing newline. Forget it and you get double spacing." },
        { t: "h", x: "Writing" },
        { t: "code", x: "with open(\"log.txt\", \"w\") as f:\n    f.write(\"Day 1: Ambangeg\\n\")\n    f.write(\"Day 2: summit\\n\")", cap: "`\"w\"` wipes any existing file. Use `\"a\"` to add to the end instead." },
        { t: "note", x: "**Files in this app.** Two sample files are already in the virtual filesystem: `packlist.txt` and `trails.csv`. They live in the browser only, so writing to them is safe and nothing touches your machine." },
      ],
      drills: [
        {
          prompt: "Open `packlist.txt`, read every line, and print each item stripped of its trailing newline.",
          hint: "with open(\"packlist.txt\") as f: then loop over f and print(line.strip()).",
          starter: "",
          solution: "with open(\"packlist.txt\") as f:\n    for line in f:\n        print(line.strip())",
          checks: [
            { k: "out_lines", v: ["headlamp", "water filter", "rain shell", "trail map", "first aid kit"], msg: "Five items, no blank lines" },
            { k: "src_has", v: "with open", msg: "Uses the with form" },
            { k: "src_has", v: "strip", msg: "Strips the newline" },
          ],
        },
        {
          prompt: "Write two lines to a new file `log.txt`, then read it back and print how many lines it has.",
          hint: "Open with \"w\" to write, remember the \\n at the end of each line, then reopen to read.",
          starter: "",
          solution: "with open(\"log.txt\", \"w\") as f:\n    f.write(\"Day 1: Ambangeg\\n\")\n    f.write(\"Day 2: summit\\n\")\n\nwith open(\"log.txt\") as f:\n    lines = f.readlines()\n\nprint(len(lines))",
          checks: [
            { k: "out_is", v: "2", msg: "Reports 2 lines" },
            { k: "src_has", v: "\"w\"", msg: "Opens in write mode" },
          ],
        },
      ],
      quiz: [
        {
          q: "Why is `with open(...) as f:` preferred?",
          options: ["It is faster", "It closes the file automatically, even when an error occurs", "It is the only way to read files", "It compresses the file"],
          answer: 1,
          why: "The with block guarantees cleanup. Without it you must call f.close() yourself and an exception can skip that line.",
        },
        {
          q: "What does mode `\"w\"` do to a file that already exists?",
          options: ["Appends to the end", "Raises an error", "Wipes it and starts empty", "Opens it read only"],
          answer: 2,
          why: "Write mode truncates the file. Use `\"a\"` when you want to keep what is already there.",
        },
        {
          q: "Why call `.strip()` on each line when looping over a file?",
          options: ["To convert to uppercase", "To remove the trailing newline character", "To split on commas", "It is not needed"],
          answer: 1,
          why: "Each line read from a file keeps its newline, so printing it adds a second line break unless you strip it.",
        },
      ],
      challenge: {
        prompt: "Read `packlist.txt`, count the items, and print exactly two lines: `Items: 5` and `Longest: first aid kit`. Ignore any blank lines.",
        hint: "Build a list of stripped, non-empty lines first. Then len() for the count and max(items, key=len) for the longest.",
        starter: "",
        solution: "with open(\"packlist.txt\") as f:\n    items = [line.strip() for line in f if line.strip()]\n\nprint(f\"Items: {len(items)}\")\nprint(f\"Longest: {max(items, key=len)}\")",
        checks: [
          { k: "out_lines", v: ["Items: 5", "Longest: first aid kit"], msg: "Both lines exact" },
          { k: "src_has", v: "open", msg: "Reads the file" },
        ],
      },
    },

    {
      id: "m6-w2",
      title: "Reading CSV Files with Python",
      brief: [
        { t: "p", x: "A **CSV** is a plain text table. One row per line, fields separated by commas, and the first line is usually the header naming each column." },
        { t: "data" },
        { t: "p", x: "You could split each line on commas yourself, but the `csv` module handles the awkward cases, like a field that contains a comma inside quotes." },
        { t: "code", x: "import csv\n\nwith open(\"trails.csv\") as f:\n    reader = csv.reader(f)\n    header = next(reader)      # pull the first row off\n    for row in reader:\n        print(row[0], row[3])  # name, elevation_m", cap: "`csv.reader` gives each row as a list of strings." },
        { t: "h", x: "DictReader is usually better" },
        { t: "p", x: "`csv.DictReader` uses the header row to give you a dictionary per row, so you read fields by name instead of counting columns." },
        { t: "code", x: "import csv\n\nwith open(\"trails.csv\") as f:\n    for row in csv.DictReader(f):\n        print(row[\"name\"], row[\"elevation_m\"])", cap: "No index counting, and the code survives a column being reordered." },
        { t: "note", x: "**Everything comes back as a string.** `row[\"elevation_m\"]` is `\"2926\"`, not `2926`. Convert with `int()` or `float()` before doing any maths, or your sums will silently concatenate text." },
      ],
      drills: [
        {
          prompt: "Using `csv.DictReader`, print the name and elevation of the first three rows in `trails.csv`, one per line, in the form `Apo 2954`.",
          hint: "Count rows as you go and break after three. Remember to import csv first.",
          starter: "import csv\n",
          solution: "import csv\n\nwith open(\"trails.csv\") as f:\n    for i, row in enumerate(csv.DictReader(f)):\n        if i == 3:\n            break\n        print(row[\"name\"], row[\"elevation_m\"])",
          checks: [
            { k: "out_lines", v: ["Apo 2954", "Dulang-dulang 2938", "Pulag 2926"], msg: "First three rows" },
            { k: "src_has", v: "DictReader", msg: "Uses DictReader" },
          ],
        },
        {
          prompt: "Count how many rows in `trails.csv` have an elevation above 2500, store it in `count`, and print it.",
          hint: "Convert the field with int() before comparing, otherwise you are comparing text.",
          starter: "import csv\n\ncount = 0\n",
          solution: "import csv\n\ncount = 0\nwith open(\"trails.csv\") as f:\n    for row in csv.DictReader(f):\n        if int(row[\"elevation_m\"]) > 2500:\n            count += 1\n\nprint(count)",
          checks: [
            { k: "var_is", n: "count", v: 10, msg: "count is 10" },
            { k: "src_has", v: "int(", msg: "Converts the field to a number" },
            { k: "out_is", v: "10", msg: "Prints 10" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does the first line of a typical CSV contain?",
          options: ["The first data row", "The column names", "The row count", "A comment"],
          answer: 1,
          why: "The header row names the columns, which is what DictReader uses as the keys for every row dictionary.",
        },
        {
          q: "What type is `row[\"elevation_m\"]` from a DictReader?",
          options: ["int", "float", "str", "It depends on the value"],
          answer: 2,
          why: "The csv module does no type inference. Every field arrives as a string and you convert what you need.",
        },
        {
          q: "Why prefer `csv.DictReader` over `csv.reader`?",
          options: ["It is faster", "You access fields by column name instead of by position", "It sorts the rows", "It skips blank lines"],
          answer: 1,
          why: "Reading by name is clearer and does not break when columns get reordered or a new one is inserted.",
        },
      ],
      challenge: {
        prompt: "Read `trails.csv` and print exactly two lines: `Rows: 20` and the average elevation across all rows rounded to one decimal, in the form `Mean: 2374.4`.",
        hint: "Collect the converted elevations into a list, then use len() and sum() on it.",
        starter: "import csv\n",
        solution: "import csv\n\nelevs = []\nwith open(\"trails.csv\") as f:\n    for row in csv.DictReader(f):\n        elevs.append(int(row[\"elevation_m\"]))\n\nprint(f\"Rows: {len(elevs)}\")\nprint(f\"Mean: {round(sum(elevs) / len(elevs), 1)}\")",
        checks: [
          { k: "out_lines", v: ["Rows: 20", "Mean: 2374.4"], msg: "Both lines exact" },
          { k: "src_has", v: "csv", msg: "Uses the csv module" },
        ],
      },
    },

  ],
};

export const module7 = {
  id: "m7",
  title: "Pandas and Data Analysis",
  blurb: "The same questions as Module 6, answered in one line instead of a loop.",
  needsPandas: true,
  waypoints: [

    {
      id: "m7-w1",
      title: "Introduction to Pandas",
      needsPandas: true,
      brief: [
        { t: "note", x: "**First run is slow.** pandas is about 10 MB and downloads once when you run your first cell in this module. After that it is instant. Give it up to a minute on a slow connection." },
        { t: "p", x: "**pandas** is a library for working with tables. Its main object is the **DataFrame**, which is a table with named columns and an index, essentially a spreadsheet you can program." },
        { t: "code", x: "import pandas as pd\n\ndf = pd.read_csv(\"trails.csv\")\nprint(df.shape)      # (20, 7)  rows, columns\nprint(df.columns.tolist())", cap: "`pd` is the universal nickname for pandas. Everyone writes it this way." },
        { t: "p", x: "Compare this against Module 6. Reading a CSV, converting the numbers and counting the rows took a loop and a manual `int()` call. pandas does it in one line and infers the types for you." },
        { t: "h", x: "DataFrame and Series" },
        { t: "ul", x: [
          "A **DataFrame** is the whole table.",
          "A **Series** is a single column, which is what you get with `df[\"elevation_m\"]`.",
        ]},
        { t: "code", x: "col = df[\"elevation_m\"]\nprint(type(col))       # <class 'pandas.core.series.Series'>\nprint(col.max())       # 2954\nprint(col.mean())      # 2374.4", cap: "Series carry their own methods: .max(), .mean(), .sum(), .count()." },
        { t: "p", x: "Selecting several columns needs a list inside the brackets, which is why you see double square brackets so often: `df[[\"name\", \"region\"]]`." },
      ],
      drills: [
        {
          prompt: "Load `trails.csv` into a DataFrame called `df`, then print its shape and the list of column names on two lines.",
          hint: "pd.read_csv(\"trails.csv\"), then df.shape and df.columns.tolist().",
          starter: "import pandas as pd\n",
          solution: "import pandas as pd\n\ndf = pd.read_csv(\"trails.csv\")\nprint(df.shape)\nprint(df.columns.tolist())",
          checks: [
            { k: "expr", v: "df.shape == (20, 7)", msg: "df has 20 rows and 7 columns" },
            { k: "out_has", v: "(20, 7)", msg: "Prints the shape" },
            { k: "out_has", v: "elevation_m", msg: "Prints the column names" },
          ],
        },
        {
          prompt: "Pull the `elevation_m` column into `col` and print its maximum and its mean on two lines.",
          hint: "df[\"elevation_m\"] gives a Series, which has .max() and .mean().",
          starter: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n",
          solution: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\ncol = df[\"elevation_m\"]\nprint(col.max())\nprint(col.mean())",
          checks: [
            { k: "expr", v: "col.max() == 2954", msg: "col is the elevation column" },
            { k: "out_has", v: "2954", msg: "Prints the maximum" },
            { k: "out_has", v: "2374.4", msg: "Prints the mean" },
          ],
        },
      ],
      quiz: [
        {
          q: "What is a DataFrame?",
          options: ["A single column of values", "A table with named columns and an index", "A Python dictionary", "A CSV file on disk"],
          answer: 1,
          why: "The DataFrame is the whole table. A single column pulled out of it is a Series.",
        },
        {
          q: "What does `df.shape` return?",
          options: ["The column names", "A tuple of (rows, columns)", "The file size", "The data types"],
          answer: 1,
          why: "shape is a tuple, so `df.shape[0]` is the row count and `df.shape[1]` the column count.",
        },
        {
          q: "Why does selecting several columns use double brackets?",
          options: ["A quirk with no meaning", "The inner brackets are a list of column names passed to the outer selector", "It makes a copy", "It sorts the columns"],
          answer: 1,
          why: "`df[[\"a\", \"b\"]]` is `df[` plus the list `[\"a\", \"b\"]`. One name gives a Series, a list of names gives a DataFrame.",
        },
      ],
      challenge: {
        prompt: "Load `trails.csv` and print exactly three lines: the number of rows, the number of columns, and the mean elevation rounded to one decimal.",
        hint: "df.shape[0] and df.shape[1] give the two counts. round(df[\"elevation_m\"].mean(), 1) gives the mean.",
        starter: "import pandas as pd\n",
        solution: "import pandas as pd\n\ndf = pd.read_csv(\"trails.csv\")\nprint(df.shape[0])\nprint(df.shape[1])\nprint(round(df[\"elevation_m\"].mean(), 1))",
        checks: [
          { k: "out_lines", v: ["20", "7", "2374.4"], msg: "Rows, columns and mean" },
          { k: "src_has", v: "read_csv", msg: "Uses pd.read_csv" },
        ],
      },
    },

    {
      id: "m7-w2",
      title: "Exploring Data with Pandas",
      needsPandas: true,
      brief: [
        { t: "p", x: "Before you analyse anything, look at it. These four calls are what you run on any table you have never seen before." },
        { t: "ul", x: [
          "`df.head(n)` the first n rows, default 5",
          "`df.info()` column names, how many non-empty values each has, and the types",
          "`df.describe()` count, mean, standard deviation, min, quartiles and max for the numeric columns",
          "`df.dtypes` just the types",
        ]},
        { t: "code", x: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n\nprint(df.head(3))\nprint(df.dtypes)\nprint(df[\"elevation_m\"].describe())", cap: "head to see the shape of it, dtypes to catch numbers that arrived as text." },
        { t: "h", x: "Counting categories" },
        { t: "p", x: "`.value_counts()` on a column tells you how many rows fall into each distinct value. It is one of the most useful methods in the whole library." },
        { t: "code", x: "print(df[\"region\"].value_counts())\n# Luzon      12\n# Visayas     4\n# Mindanao    3\n# Mindoro     1\n\nprint(df[\"region\"].nunique())    # 4\nprint(df[\"region\"].unique())     # the distinct values", cap: "value_counts sorts by frequency, highest first." },
        { t: "h", x: "Sorting" },
        { t: "code", x: "top = df.sort_values(\"elevation_m\", ascending=False).head(3)\nprint(top[[\"name\", \"elevation_m\"]])", cap: "sort_values returns a new DataFrame. Chain .head() to take the top few." },
        { t: "note", x: "**Missing values.** Real data has gaps, shown as `NaN`. `df.isna().sum()` counts them per column, `.dropna()` removes those rows and `.fillna(value)` replaces them. Always check before you trust a mean." },
      ],
      drills: [
        {
          prompt: "Print the first three rows of `df`, then the count of peaks per region.",
          hint: "df.head(3) and df[\"region\"].value_counts().",
          starter: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n",
          solution: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\nprint(df.head(3))\nprint(df[\"region\"].value_counts())",
          checks: [
            { k: "src_has", v: "head", msg: "Uses .head()" },
            { k: "src_has", v: "value_counts", msg: "Uses .value_counts()" },
            { k: "out_has", v: "Luzon", msg: "Shows the region counts" },
          ],
        },
        {
          prompt: "Sort the table by elevation, highest first, take the top three, and print only their `name` and `elevation_m` columns.",
          hint: "df.sort_values(\"elevation_m\", ascending=False).head(3), then select the two columns with double brackets.",
          starter: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n",
          solution: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\ntop = df.sort_values(\"elevation_m\", ascending=False).head(3)\nprint(top[[\"name\", \"elevation_m\"]])",
          checks: [
            { k: "src_has", v: "sort_values", msg: "Uses sort_values" },
            { k: "out_has", v: "Apo", msg: "Apo is the highest" },
            { k: "out_has", v: "Pulag", msg: "Pulag is in the top three" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does `df.head()` show by default?",
          options: ["The column names", "The first 5 rows", "A summary of statistics", "The last 5 rows"],
          answer: 1,
          why: "head returns the first 5 rows unless you pass a different number. `df.tail()` is its opposite.",
        },
        {
          q: "What does `df[\"region\"].value_counts()` give you?",
          options: ["The distinct regions only", "How many rows fall into each region", "The total row count", "The regions sorted alphabetically"],
          answer: 1,
          why: "It counts occurrences of each distinct value and sorts by frequency. `.unique()` gives just the distinct values.",
        },
        {
          q: "How do you check for missing values per column?",
          options: ["`df.missing()`", "`df.isna().sum()`", "`df.count()`", "`df.nulls`"],
          answer: 1,
          why: "isna() produces a table of True and False, and summing it counts the Trues in each column.",
        },
      ],
      challenge: {
        prompt: "Print exactly three lines: the number of distinct regions, the name of the highest peak, and the name of the lowest peak.",
        hint: "nunique() for the first. Sort by elevation and read the name from the first row with .iloc[0], both ascending and descending.",
        starter: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n",
        solution: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\nprint(df[\"region\"].nunique())\nprint(df.sort_values(\"elevation_m\", ascending=False).iloc[0][\"name\"])\nprint(df.sort_values(\"elevation_m\").iloc[0][\"name\"])",
        checks: [
          { k: "out_lines", v: ["4", "Apo", "Batulao"], msg: "Region count, highest, lowest" },
          { k: "src_has", v: "nunique", msg: "Uses nunique()" },
        ],
      },
    },

    {
      id: "m7-w3",
      title: "Filtering Data in Pandas",
      needsPandas: true,
      brief: [
        { t: "p", x: "Filtering works in two steps. First build a **boolean mask**, a column of True and False. Then use that mask to select rows." },
        { t: "code", x: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n\nmask = df[\"elevation_m\"] > 2500\nprint(mask.head())         # True/False per row\n\nhigh = df[mask]\nprint(len(high))           # 10", cap: "Usually written in one line: `df[df[\"elevation_m\"] > 2500]`." },
        { t: "h", x: "Combining conditions" },
        { t: "p", x: "Here is the part that catches everyone. In pandas you use `&` for and, `|` for or, and `~` for not. The plain words `and` and `or` do not work on Series. **Every condition must be wrapped in its own brackets**, because `&` binds more tightly than `>`." },
        { t: "code", x: "luzon_high = df[(df[\"region\"] == \"Luzon\") & (df[\"elevation_m\"] > 2500)]\nprint(len(luzon_high))     # 6\n\neasy_or_low = df[(df[\"difficulty\"] <= 3) | (df[\"elevation_m\"] < 1200)]\nprint(len(easy_or_low))    # 3", cap: "Brackets around each condition. Forgetting them is the single most common pandas error." },
        { t: "h", x: "Other useful filters" },
        { t: "ul", x: [
          "`df[df[\"region\"].isin([\"Luzon\", \"Visayas\"])]` matches any value in a list",
          "`df[df[\"name\"].str.startswith(\"K\")]` string tests through `.str`",
          "`df[df[\"elevation_m\"].between(2000, 2500)]` an inclusive range",
        ]},
        { t: "code", x: "sel = df[df[\"region\"].isin([\"Visayas\", \"Mindoro\"])]\nprint(sel[[\"name\", \"region\"]].to_string(index=False))", cap: "`.to_string(index=False)` prints without the row numbers." },
      ],
      drills: [
        {
          prompt: "Select every row where the elevation is above 2500 into `high`, and print how many there are.",
          hint: "df[df[\"elevation_m\"] > 2500] then len().",
          starter: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n",
          solution: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\nhigh = df[df[\"elevation_m\"] > 2500]\nprint(len(high))",
          checks: [
            { k: "expr", v: "len(high) == 10", msg: "high holds 10 rows" },
            { k: "out_is", v: "10", msg: "Prints 10" },
          ],
        },
        {
          prompt: "Select rows in Luzon **and** above 2500 m into `luzon_high`, then print the count. Remember the bracket rule.",
          hint: "df[(cond1) & (cond2)] with each condition in its own brackets.",
          starter: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n",
          solution: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\nluzon_high = df[(df[\"region\"] == \"Luzon\") & (df[\"elevation_m\"] > 2500)]\nprint(len(luzon_high))",
          checks: [
            { k: "expr", v: "len(luzon_high) == 6", msg: "luzon_high holds 6 rows" },
            { k: "src_has", v: "&", msg: "Uses & rather than the word and" },
            { k: "out_is", v: "6", msg: "Prints 6" },
          ],
        },
      ],
      quiz: [
        {
          q: "What is a boolean mask?",
          options: ["A list of column names", "A Series of True and False used to pick rows", "A way to hide columns", "A sorting order"],
          answer: 1,
          why: "The comparison produces one True or False per row, and passing that back into df keeps only the True rows.",
        },
        {
          q: "Which operator means 'and' when filtering a DataFrame?",
          options: ["`and`", "`&`", "`+`", "`AND`"],
          answer: 1,
          why: "pandas needs the element-wise operators `&`, `|` and `~`. The plain keywords raise an error on a Series.",
        },
        {
          q: "Why does `df[df[\"a\"] > 1 & df[\"b\"] < 2]` fail?",
          options: ["`&` is not valid in pandas", "`&` binds tighter than the comparisons, so each condition needs its own brackets", "You cannot combine two columns", "It needs `.filter()`"],
          answer: 1,
          why: "Python evaluates `1 & df[\"b\"]` first because of precedence. Writing `(df[\"a\"] > 1) & (df[\"b\"] < 2)` fixes it.",
        },
      ],
      challenge: {
        prompt: "Print exactly two lines: the number of Luzon peaks between 2000 and 2800 metres inclusive, and the number of peaks whose region is either Visayas or Mindanao.",
        hint: "`.between(2000, 2800)` is inclusive on both ends. `.isin([...])` handles the second one.",
        starter: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n",
        solution: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\nband = df[(df[\"region\"] == \"Luzon\") & (df[\"elevation_m\"].between(2000, 2800))]\nprint(len(band))\nsouth = df[df[\"region\"].isin([\"Visayas\", \"Mindanao\"])]\nprint(len(south))",
        checks: [
          { k: "out_lines", v: ["8", "7"], msg: "Both counts correct" },
          { k: "src_has", v: "isin", msg: "Uses .isin()" },
        ],
      },
    },

    {
      id: "m7-w4",
      title: "Grouping and Aggregating in Pandas",
      needsPandas: true,
      brief: [
        { t: "p", x: "`.groupby()` splits the table into groups sharing a value, applies a summary to each group, and combines the results. Split, apply, combine." },
        { t: "code", x: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n\nprint(df.groupby(\"region\")[\"elevation_m\"].mean())\n# Luzon       2297.42\n# Mindanao    2930.33\n# Mindoro     2586.00\n# Visayas     2135.75", cap: "Group by region, pick a column, apply a summary. Read it left to right." },
        { t: "p", x: "Think of the loop this replaces. In Module 4 you built a counting dictionary by hand. Here it is one call, and the summary can be a mean, sum, min, max or count." },
        { t: "code", x: "print(df.groupby(\"region\").size())              # rows per group\nprint(df.groupby(\"region\")[\"climbers\"].sum())   # total climbers per region", cap: "`.size()` counts rows in each group without needing a column." },
        { t: "h", x: "Several summaries at once" },
        { t: "p", x: "`.agg()` takes a list of summaries, or a dictionary mapping each column to what you want from it." },
        { t: "code", x: "out = df.groupby(\"region\").agg(\n    peaks=(\"name\", \"count\"),\n    mean_elev=(\"elevation_m\", \"mean\"),\n    highest=(\"elevation_m\", \"max\"),\n)\nprint(out.round(1))", cap: "Named aggregation: new_column=(source_column, summary). Clear and self-documenting." },
        { t: "note", x: "**The grouped column becomes the index.** Add `.reset_index()` to turn it back into an ordinary column, which you almost always want before saving or plotting the result." },
      ],
      drills: [
        {
          prompt: "Print the mean elevation per region, rounded to one decimal.",
          hint: "df.groupby(\"region\")[\"elevation_m\"].mean().round(1)",
          starter: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n",
          solution: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\nprint(df.groupby(\"region\")[\"elevation_m\"].mean().round(1))",
          checks: [
            { k: "src_has", v: "groupby", msg: "Uses groupby" },
            { k: "out_has", v: "Mindanao", msg: "Shows the region groups" },
            { k: "out_has", v: "2930.3", msg: "Mindanao mean is 2930.3" },
          ],
        },
        {
          prompt: "Count how many peaks are in each region and print the result, highest count first.",
          hint: "df.groupby(\"region\").size().sort_values(ascending=False), or value_counts() which already sorts.",
          starter: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n",
          solution: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\nprint(df.groupby(\"region\").size().sort_values(ascending=False))",
          checks: [
            { k: "src_has", v: "groupby", msg: "Uses groupby" },
            { k: "out_has", v: "12", msg: "Luzon has 12 peaks" },
          ],
        },
      ],
      quiz: [
        {
          q: "What three steps does groupby perform?",
          options: ["Sort, filter, print", "Split into groups, apply a summary, combine the results", "Merge, join, pivot", "Read, write, close"],
          answer: 1,
          why: "Split, apply, combine is the standard description and it is worth memorising, it explains the shape of the output.",
        },
        {
          q: "What does `df.groupby(\"region\").size()` return?",
          options: ["The memory used", "The number of rows in each group", "The number of columns", "The mean of each group"],
          answer: 1,
          why: "size counts rows per group. To summarise a specific column you name it first, as in `.groupby(\"region\")[\"elevation_m\"].mean()`.",
        },
        {
          q: "Why call `.reset_index()` after a groupby?",
          options: ["To sort the result", "To turn the grouped key back into an ordinary column", "To remove duplicates", "To free memory"],
          answer: 1,
          why: "groupby puts the grouping key in the index. reset_index moves it back to a regular column, which most downstream code expects.",
        },
      ],
      challenge: {
        prompt: "Build a summary called `out`, grouped by region, with three named columns: `peaks` counting the rows, `mean_elev` as the mean elevation, and `highest` as the maximum elevation. Round to one decimal, reset the index, and print it.",
        hint: "Use named aggregation: df.groupby(\"region\").agg(peaks=(\"name\", \"count\"), ...). Then .round(1).reset_index().",
        starter: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\n",
        solution: "import pandas as pd\ndf = pd.read_csv(\"trails.csv\")\nout = df.groupby(\"region\").agg(\n    peaks=(\"name\", \"count\"),\n    mean_elev=(\"elevation_m\", \"mean\"),\n    highest=(\"elevation_m\", \"max\"),\n).round(1).reset_index()\nprint(out)",
        checks: [
          { k: "expr", v: "list(out.columns) == ['region', 'peaks', 'mean_elev', 'highest']", msg: "Four columns with the right names" },
          { k: "expr", v: "len(out) == 4", msg: "One row per region" },
          { k: "expr", v: "int(out.loc[out['region'] == 'Luzon', 'peaks'].iloc[0]) == 12", msg: "Luzon shows 12 peaks" },
          { k: "src_has", v: "agg", msg: "Uses .agg()" },
        ],
      },
    },

  ],
};
