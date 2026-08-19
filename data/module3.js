export default {
  id: "m3",
  title: "Collections",
  blurb: "Holding many values in one name, and picking the right container for the job.",
  waypoints: [

    {
      id: "m3-w1",
      title: "Lists and Indexing",
      brief: [
        { t: "p", x: "A **list** holds several values in order, written inside square brackets and separated by commas. The values can be any type, and they can be mixed, though in practice you usually keep them the same." },
        { t: "code", x: "peaks = [\"Pulag\", \"Apo\", \"Halcon\", \"Ugo\"]\nprint(peaks)          # ['Pulag', 'Apo', 'Halcon', 'Ugo']\nprint(len(peaks))     # 4", cap: "`len()` gives the number of items." },
        { t: "h", x: "Indexing starts at zero" },
        { t: "p", x: "The first item is at position `0`, not `1`. This trips up everyone at first and then becomes second nature. Negative indexes count backwards from the end, so `-1` is always the last item." },
        { t: "code", x: "peaks = [\"Pulag\", \"Apo\", \"Halcon\", \"Ugo\"]\nprint(peaks[0])    # Pulag\nprint(peaks[2])    # Halcon\nprint(peaks[-1])   # Ugo\nprint(peaks[-2])   # Halcon", cap: "Index 0 is first. Index -1 is last." },
        { t: "p", x: "Lists are **mutable**, meaning you can change an item in place by assigning to its index." },
        { t: "code", x: "peaks[1] = \"Kanlaon\"\nprint(peaks)   # ['Pulag', 'Kanlaon', 'Halcon', 'Ugo']", cap: "Assigning to an index replaces that one item." },
        { t: "note", x: "**IndexError.** Asking for `peaks[4]` in a four-item list fails, because the valid indexes are 0, 1, 2 and 3. The last valid index is always `len(list) - 1`." },
      ],
      drills: [
        {
          prompt: "From the `peaks` list, print the first item, then the last item, on two separate lines. Use a negative index for the last one.",
          hint: "peaks[0] and peaks[-1].",
          starter: "peaks = [\"Pulag\", \"Apo\", \"Halcon\", \"Ugo\"]\n",
          solution: "peaks = [\"Pulag\", \"Apo\", \"Halcon\", \"Ugo\"]\nprint(peaks[0])\nprint(peaks[-1])",
          checks: [
            { k: "out_lines", v: ["Pulag", "Ugo"], msg: "Prints Pulag then Ugo" },
            { k: "src_has", v: "-1", msg: "Uses a negative index" },
          ],
        },
        {
          prompt: "Replace the second item of `peaks` with `\"Kanlaon\"`, then print the whole list and its length on two lines.",
          hint: "The second item is at index 1. Assign directly to peaks[1].",
          starter: "peaks = [\"Pulag\", \"Apo\", \"Halcon\", \"Ugo\"]\n",
          solution: "peaks = [\"Pulag\", \"Apo\", \"Halcon\", \"Ugo\"]\npeaks[1] = \"Kanlaon\"\nprint(peaks)\nprint(len(peaks))",
          checks: [
            { k: "expr", v: "peaks == ['Pulag', 'Kanlaon', 'Halcon', 'Ugo']", msg: "peaks holds the updated names" },
            { k: "out_has", v: "4", msg: "Prints the length" },
          ],
        },
      ],
      quiz: [
        {
          q: "What is `items[0]` in `items = [\"a\", \"b\", \"c\"]`?",
          options: ["\"a\"", "\"b\"", "0", "An error"],
          answer: 0,
          why: "Indexing starts at zero, so position 0 is the first item.",
        },
        {
          q: "What does `items[-1]` give?",
          options: ["An error", "The first item", "The last item", "The list reversed"],
          answer: 2,
          why: "Negative indexes count from the end. -1 is the last item, -2 the one before it.",
        },
        {
          q: "For a list of length 5, which index raises an IndexError?",
          options: ["0", "4", "5", "-5"],
          answer: 2,
          why: "Valid positive indexes run from 0 to len - 1, so 0 to 4. Index 5 is past the end.",
        },
      ],
      challenge: {
        prompt: "Given the `elevations` list, print exactly three lines: the first elevation, the last elevation, and the difference between the highest-indexed and lowest-indexed value as `Spread: N`.",
        hint: "elevations[0], elevations[-1], then f\"Spread: {elevations[-1] - elevations[0]}\". Mind the sign.",
        starter: "elevations = [811, 1090, 2150, 2926]\n",
        solution: "elevations = [811, 1090, 2150, 2926]\nprint(elevations[0])\nprint(elevations[-1])\nprint(f\"Spread: {elevations[-1] - elevations[0]}\")",
        checks: [
          { k: "out_lines", v: ["811", "2926", "Spread: 2115"], msg: "Three exact lines" },
          { k: "src_has", v: "[-1]", msg: "Uses a negative index" },
        ],
      },
    },

    {
      id: "m3-w2",
      title: "List Methods and Slicing",
      brief: [
        { t: "p", x: "Lists come with methods that change them in place. These do not return a new list, they modify the one you already have and return `None`." },
        { t: "ul", x: [
          "`.append(x)` adds x to the end",
          "`.insert(i, x)` puts x at position i and shifts the rest along",
          "`.remove(x)` deletes the first occurrence of the value x",
          "`.pop()` removes and returns the last item, `.pop(i)` a specific one",
          "`.sort()` sorts in place, `.reverse()` flips the order",
        ]},
        { t: "code", x: "gear = [\"tent\", \"stove\"]\ngear.append(\"map\")\ngear.insert(0, \"headlamp\")\nprint(gear)          # ['headlamp', 'tent', 'stove', 'map']\n\nlast = gear.pop()\nprint(last, gear)    # map ['headlamp', 'tent', 'stove']", cap: "append and insert change the list itself." },
        { t: "note", x: "**A classic trap.** `gear = gear.append(\"map\")` sets gear to `None`, because append returns nothing. Call it on its own line: `gear.append(\"map\")`." },
        { t: "h", x: "Slicing" },
        { t: "p", x: "A **slice** takes a section of a list with `list[start:stop]`. The start is included, the stop is not. Leave either side blank to mean \"from the beginning\" or \"to the end\"." },
        { t: "code", x: "nums = [10, 20, 30, 40, 50]\nprint(nums[1:3])    # [20, 30]     stop is excluded\nprint(nums[:2])     # [10, 20]\nprint(nums[3:])     # [40, 50]\nprint(nums[-2:])    # [40, 50]\nprint(nums[::2])    # [10, 30, 50]  every second item\nprint(nums[::-1])   # [50, 40, 30, 20, 10]  reversed copy", cap: "A slice always hands back a new list." },
        { t: "p", x: "`sorted(list)` is the non-destructive twin of `.sort()`. It returns a sorted copy and leaves the original untouched, which is often what you want." },
      ],
      drills: [
        {
          prompt: "Add `\"map\"` to the end of `gear`, insert `\"headlamp\"` at the very front, then print the list. It should end up as `['headlamp', 'tent', 'stove', 'map']`.",
          hint: "append for the end, insert(0, ...) for the front. Call them on their own lines.",
          starter: "gear = [\"tent\", \"stove\"]\n",
          solution: "gear = [\"tent\", \"stove\"]\ngear.append(\"map\")\ngear.insert(0, \"headlamp\")\nprint(gear)",
          checks: [
            { k: "expr", v: "gear == ['headlamp', 'tent', 'stove', 'map']", msg: "gear holds the four items in order" },
            { k: "src_has", v: "append", msg: "Uses .append()" },
            { k: "src_has", v: "insert", msg: "Uses .insert()" },
          ],
        },
        {
          prompt: "From `nums`, store the middle three values in `middle`, and a reversed copy of the whole list in `flipped`. Print both. Do not modify `nums` itself.",
          hint: "nums[1:4] takes indexes 1, 2 and 3. nums[::-1] reverses without touching the original.",
          starter: "nums = [10, 20, 30, 40, 50]\n",
          solution: "nums = [10, 20, 30, 40, 50]\nmiddle = nums[1:4]\nflipped = nums[::-1]\nprint(middle)\nprint(flipped)",
          checks: [
            { k: "expr", v: "middle == [20, 30, 40]", msg: "middle is [20, 30, 40]" },
            { k: "expr", v: "flipped == [50, 40, 30, 20, 10]", msg: "flipped is the reversed copy" },
            { k: "expr", v: "nums == [10, 20, 30, 40, 50]", msg: "nums is unchanged" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does `[1,2,3,4][1:3]` give?",
          options: ["[1, 2, 3]", "[2, 3]", "[2, 3, 4]", "[1, 2]"],
          answer: 1,
          why: "The start index is included and the stop index is excluded, so you get positions 1 and 2.",
        },
        {
          q: "What is the value of `x` after `x = [3,1,2].sort()`?",
          options: ["[1, 2, 3]", "[3, 1, 2]", "None", "An error"],
          answer: 2,
          why: "`.sort()` sorts in place and returns None. Use `sorted([3,1,2])` if you want the sorted list as a value.",
        },
        {
          q: "What does `nums[::-1]` do?",
          options: ["Removes the last item", "Returns a reversed copy", "Reverses the list in place", "Raises an error"],
          answer: 1,
          why: "A step of -1 walks the list backwards and produces a new list. The original is untouched.",
        },
      ],
      challenge: {
        prompt: "From `elevations`, build `top3`: the three highest values, in descending order, without changing `elevations`. Print `top3`, then print the original list to prove it is unchanged.",
        hint: "sorted(elevations, reverse=True) gives a descending copy. Then slice the first three.",
        starter: "elevations = [811, 2926, 1090, 2954, 2150, 2842]\n",
        solution: "elevations = [811, 2926, 1090, 2954, 2150, 2842]\ntop3 = sorted(elevations, reverse=True)[:3]\nprint(top3)\nprint(elevations)",
        checks: [
          { k: "expr", v: "top3 == [2954, 2926, 2842]", msg: "top3 is the three highest, descending" },
          { k: "expr", v: "elevations == [811, 2926, 1090, 2954, 2150, 2842]", msg: "elevations is unchanged" },
          { k: "src_has", v: "sorted", msg: "Uses sorted() rather than .sort()" },
        ],
      },
    },

    {
      id: "m3-w3",
      title: "Tuples and Immutability",
      brief: [
        { t: "p", x: "A **tuple** is like a list, but it cannot be changed after it is created. You write it with round brackets instead of square ones." },
        { t: "code", x: "location = (16.5967, 120.8983)\nprint(location[0])     # 16.5967\nprint(len(location))   # 2\n\n# location[0] = 0  ->  TypeError, tuples are immutable", cap: "Indexing and slicing work exactly like lists. Assignment does not." },
        { t: "p", x: "**Immutable** means fixed once created. That sounds like a limitation but it is the point. Use a tuple when the group of values is a single thing whose parts should not drift: a coordinate pair, an RGB colour, a database row." },
        { t: "ul", x: [
          "Use a **list** for a collection that grows, shrinks or gets reordered.",
          "Use a **tuple** for a fixed record where position carries meaning.",
        ]},
        { t: "h", x: "Unpacking" },
        { t: "p", x: "You can pull a tuple apart into separate variables in one line. This is used constantly, especially with functions that return several values." },
        { t: "code", x: "location = (16.5967, 120.8983)\nlat, lon = location\nprint(lat, lon)     # 16.5967 120.8983\n\n# swapping, no temp variable needed\na, b = 1, 2\na, b = b, a\nprint(a, b)         # 2 1", cap: "The number of names must match the number of items." },
        { t: "note", x: "**One item tuples need a trailing comma.** `(5)` is just the number 5 in brackets. `(5,)` is a tuple containing 5. The comma is what makes a tuple, the brackets are usually optional." },
      ],
      drills: [
        {
          prompt: "Create a tuple `location` holding the latitude `16.5967` and longitude `120.8983`, then unpack it into `lat` and `lon` and print them on one line.",
          hint: "location = (16.5967, 120.8983) then lat, lon = location.",
          starter: "",
          solution: "location = (16.5967, 120.8983)\nlat, lon = location\nprint(lat, lon)",
          checks: [
            { k: "type_is", n: "location", v: "tuple", msg: "location is a tuple" },
            { k: "expr", v: "abs(lat - 16.5967) < 1e-6 and abs(lon - 120.8983) < 1e-6", msg: "lat and lon unpacked correctly" },
          ],
        },
        {
          prompt: "Swap the values of `first` and `second` in a single line using tuple unpacking, then print them.",
          hint: "first, second = second, first",
          starter: "first = \"Pulag\"\nsecond = \"Apo\"\n",
          solution: "first = \"Pulag\"\nsecond = \"Apo\"\nfirst, second = second, first\nprint(first, second)",
          checks: [
            { k: "var_is", n: "first", v: "Apo", msg: "first is now Apo" },
            { k: "var_is", n: "second", v: "Pulag", msg: "second is now Pulag" },
            { k: "out_is", v: "Apo Pulag", msg: "Prints the swapped values" },
          ],
        },
      ],
      quiz: [
        {
          q: "What happens when you run `t = (1, 2, 3)` then `t[0] = 9`?",
          options: ["t becomes (9, 2, 3)", "A TypeError, tuples cannot be changed", "A new tuple is returned", "Nothing happens"],
          answer: 1,
          why: "Tuples are immutable. Item assignment is not supported, so Python raises a TypeError.",
        },
        {
          q: "Which is a one-item tuple?",
          options: ["`(5)`", "`[5]`", "`(5,)`", "`{5}`"],
          answer: 2,
          why: "The trailing comma makes it a tuple. `(5)` is just 5, `[5]` is a list and `{5}` is a set.",
        },
        {
          q: "When is a tuple the better choice over a list?",
          options: ["When you need to append items later", "When the group is a fixed record and position has meaning", "When you need sorting", "Tuples are always better"],
          answer: 1,
          why: "Tuples signal that the grouping is fixed, like a coordinate pair. Lists are for collections that change.",
        },
      ],
      challenge: {
        prompt: "You have a list of tuples, each `(name, elevation)`. Unpack the first tuple into `name` and `elev`, then print exactly `Pulag sits at 2926 m`. Do not index into the tuple with `[0]` and `[1]`, use unpacking.",
        hint: "name, elev = records[0], then build the line with an f-string.",
        starter: "records = [(\"Pulag\", 2926), (\"Apo\", 2954)]\n",
        solution: "records = [(\"Pulag\", 2926), (\"Apo\", 2954)]\nname, elev = records[0]\nprint(f\"{name} sits at {elev} m\")",
        checks: [
          { k: "out_is", v: "Pulag sits at 2926 m", msg: "Output is exact" },
          { k: "var_is", n: "name", v: "Pulag", msg: "name unpacked" },
          { k: "var_is", n: "elev", v: 2926, msg: "elev unpacked" },
        ],
      },
    },

    {
      id: "m3-w4",
      title: "Dictionaries: Keys and Values",
      brief: [
        { t: "p", x: "A **dictionary** stores pairs. Each **key** maps to a **value**, and you look things up by key instead of by position. Written with curly braces and colons." },
        { t: "code", x: "peak = {\n    \"name\": \"Pulag\",\n    \"province\": \"Benguet\",\n    \"elevation_m\": 2926,\n}\n\nprint(peak[\"name\"])          # Pulag\nprint(peak[\"elevation_m\"])   # 2926", cap: "Keys are usually strings. Values can be anything." },
        { t: "p", x: "This is the right shape whenever your data has named fields. A list would force you to remember that position 2 was the elevation. A dictionary just says so." },
        { t: "h", x: "Reading safely" },
        { t: "p", x: "`peak[\"missing\"]` raises a `KeyError`. `peak.get(\"missing\")` returns `None` instead, and `peak.get(\"missing\", 0)` returns a default you choose. Use `.get()` whenever the key might genuinely be absent." },
        { t: "code", x: "print(peak.get(\"days\"))       # None\nprint(peak.get(\"days\", 1))    # 1\nprint(\"name\" in peak)         # True", cap: "`in` checks keys, not values." },
        { t: "h", x: "Changing and inspecting" },
        { t: "code", x: "peak[\"days\"] = 2           # adds a new pair\npeak[\"elevation_m\"] = 2922 # overwrites an existing one\ndel peak[\"province\"]       # removes a pair\n\nprint(peak.keys())\nprint(peak.values())\nprint(peak.items())        # pairs, ideal for looping", cap: "Assigning to a new key adds it. Assigning to an existing key replaces it." },
        { t: "note", x: "**Keys must be immutable.** Strings, numbers and tuples work as keys. Lists do not, because they can change. Values have no such restriction." },
      ],
      drills: [
        {
          prompt: "Build a dictionary `peak` with keys `name`, `province` and `elevation_m` set to `Pulag`, `Benguet` and `2926`. Print the name and elevation on one line.",
          hint: "Curly braces, key: value pairs separated by commas.",
          starter: "",
          solution: "peak = {\"name\": \"Pulag\", \"province\": \"Benguet\", \"elevation_m\": 2926}\nprint(peak[\"name\"], peak[\"elevation_m\"])",
          checks: [
            { k: "type_is", n: "peak", v: "dict", msg: "peak is a dict" },
            { k: "expr", v: "peak['name'] == 'Pulag' and peak['elevation_m'] == 2926", msg: "Keys hold the right values" },
            { k: "out_has", v: "2926", msg: "Prints the elevation" },
          ],
        },
        {
          prompt: "Add a `days` key set to `2`, update `elevation_m` to `2922`, then safely read a key called `guide` that does not exist, defaulting to `\"none\"`, into a variable `guide`. Print `guide`.",
          hint: "Use .get(\"guide\", \"none\") so a missing key does not crash.",
          starter: "peak = {\"name\": \"Pulag\", \"elevation_m\": 2926}\n",
          solution: "peak = {\"name\": \"Pulag\", \"elevation_m\": 2926}\npeak[\"days\"] = 2\npeak[\"elevation_m\"] = 2922\nguide = peak.get(\"guide\", \"none\")\nprint(guide)",
          checks: [
            { k: "expr", v: "peak['days'] == 2 and peak['elevation_m'] == 2922", msg: "Dictionary updated correctly" },
            { k: "var_is", n: "guide", v: "none", msg: "guide defaults to 'none'" },
            { k: "src_has", v: ".get(", msg: "Uses .get() with a default" },
          ],
        },
      ],
      quiz: [
        {
          q: "How do you read the value stored under the key `\"name\"`?",
          options: ["`peak.name`", "`peak[\"name\"]`", "`peak(0)`", "`peak->name`"],
          answer: 1,
          why: "Dictionaries use square brackets with the key inside. Dot access is for object attributes, which is a different thing.",
        },
        {
          q: "What does `peak.get(\"missing\", 0)` return when the key is absent?",
          options: ["A KeyError", "None", "0", "An empty string"],
          answer: 2,
          why: "The second argument to .get() is the default returned when the key is not there. With no default it returns None.",
        },
        {
          q: "Which cannot be used as a dictionary key?",
          options: ["`\"name\"`", "`42`", "`(1, 2)`", "`[1, 2]`"],
          answer: 3,
          why: "Keys must be immutable so they can be hashed. Lists are mutable, so they are rejected. Tuples are fine.",
        },
      ],
      challenge: {
        prompt: "Given the `peak` dictionary, print exactly two lines: `Pulag, Benguet` then `2926 m over 2 days`. Read every value through the dictionary, and use `.get()` with a default of `1` for the `days` key.",
        hint: "f\"{peak['name']}, {peak['province']}\" for the first line. Watch the quote types inside the f-string.",
        starter: "peak = {\"name\": \"Pulag\", \"province\": \"Benguet\", \"elevation_m\": 2926, \"days\": 2}\n",
        solution: "peak = {\"name\": \"Pulag\", \"province\": \"Benguet\", \"elevation_m\": 2926, \"days\": 2}\ndays = peak.get(\"days\", 1)\nprint(f\"{peak['name']}, {peak['province']}\")\nprint(f\"{peak['elevation_m']} m over {days} days\")",
        checks: [
          { k: "out_lines", v: ["Pulag, Benguet", "2926 m over 2 days"], msg: "Both lines exact" },
          { k: "src_has", v: ".get(", msg: "Uses .get() with a default" },
        ],
      },
    },

    {
      id: "m3-w5",
      title: "Sets and Uniqueness",
      brief: [
        { t: "p", x: "A **set** is an unordered collection where every value appears at most once. Creating one from a list is the standard way to remove duplicates." },
        { t: "code", x: "visited = [\"Pulag\", \"Ugo\", \"Pulag\", \"Batulao\", \"Ugo\"]\nunique = set(visited)\nprint(unique)          # {'Ugo', 'Batulao', 'Pulag'}  order varies\nprint(len(unique))     # 3", cap: "Duplicates vanish. Order is not preserved." },
        { t: "p", x: "Two consequences of being unordered: there is no indexing, so `unique[0]` fails, and printing a set can show the items in a different order each run. If you need a stable order, sort it: `sorted(unique)` gives a list back." },
        { t: "h", x: "Set operations" },
        { t: "p", x: "Sets do the maths you learned in school, and the operators read naturally." },
        { t: "code", x: "mine = {\"Pulag\", \"Ugo\", \"Batulao\"}\nyours = {\"Ugo\", \"Apo\"}\n\nprint(mine | yours)   # union, everything from both\nprint(mine & yours)   # intersection, in both\nprint(mine - yours)   # difference, in mine only\nprint(mine ^ yours)   # symmetric difference, in one but not both", cap: "Or use the named methods: .union(), .intersection(), .difference()." },
        { t: "ul", x: [
          "`.add(x)` puts one item in, `.discard(x)` takes one out without complaining if it was absent",
          "`x in myset` is very fast, much faster than the same check on a long list",
        ]},
        { t: "note", x: "**Empty set gotcha.** `{}` creates an empty **dictionary**, not a set. For an empty set you must write `set()`." },
      ],
      drills: [
        {
          prompt: "Remove the duplicates from `visited` into a set called `unique`, then print how many distinct peaks there are.",
          hint: "set(visited) then len().",
          starter: "visited = [\"Pulag\", \"Ugo\", \"Pulag\", \"Batulao\", \"Ugo\"]\n",
          solution: "visited = [\"Pulag\", \"Ugo\", \"Pulag\", \"Batulao\", \"Ugo\"]\nunique = set(visited)\nprint(len(unique))",
          checks: [
            { k: "type_is", n: "unique", v: "set", msg: "unique is a set" },
            { k: "var_set", n: "unique", v: ["Pulag", "Ugo", "Batulao"], msg: "Holds the three distinct names" },
            { k: "out_is", v: "3", msg: "Prints 3" },
          ],
        },
        {
          prompt: "Find which peaks appear in both `mine` and `yours`, store them in `shared`, and print the result sorted alphabetically as a list.",
          hint: "mine & yours gives the intersection. sorted() turns it into an ordered list.",
          starter: "mine = {\"Pulag\", \"Ugo\", \"Batulao\"}\nyours = {\"Ugo\", \"Apo\", \"Batulao\"}\n",
          solution: "mine = {\"Pulag\", \"Ugo\", \"Batulao\"}\nyours = {\"Ugo\", \"Apo\", \"Batulao\"}\nshared = mine & yours\nprint(sorted(shared))",
          checks: [
            { k: "var_set", n: "shared", v: ["Ugo", "Batulao"], msg: "shared holds Ugo and Batulao" },
            { k: "out_is", v: "['Batulao', 'Ugo']", msg: "Prints the sorted list" },
          ],
        },
      ],
      quiz: [
        {
          q: "What does `len(set([1, 2, 2, 3, 3, 3]))` return?",
          options: ["6", "3", "2", "1"],
          answer: 1,
          why: "A set keeps only distinct values, so 1, 2 and 3 remain, giving a length of 3.",
        },
        {
          q: "What does `{}` create?",
          options: ["An empty set", "An empty dictionary", "An empty list", "A syntax error"],
          answer: 1,
          why: "Curly braces with nothing inside make an empty dict. Use `set()` for an empty set.",
        },
        {
          q: "Why can you not write `myset[0]`?",
          options: ["Sets only hold strings", "Sets are unordered so there is no position 0", "Sets are immutable", "You must use .get()"],
          answer: 1,
          why: "Sets have no defined order, so indexing has no meaning. Convert to a list with sorted() or list() if you need positions.",
        },
      ],
      challenge: {
        prompt: "Two climbers submit their logs as lists with repeats. Print exactly three lines: the number of distinct peaks across both logs, the sorted list of peaks they both climbed, and the sorted list only `log_a` has.",
        hint: "Convert both to sets first. Then use |, & and - and wrap each result in sorted().",
        starter: "log_a = [\"Pulag\", \"Ugo\", \"Pulag\", \"Batulao\"]\nlog_b = [\"Ugo\", \"Apo\", \"Ugo\", \"Batulao\"]\n",
        solution: "log_a = [\"Pulag\", \"Ugo\", \"Pulag\", \"Batulao\"]\nlog_b = [\"Ugo\", \"Apo\", \"Ugo\", \"Batulao\"]\na = set(log_a)\nb = set(log_b)\nprint(len(a | b))\nprint(sorted(a & b))\nprint(sorted(a - b))",
        checks: [
          { k: "out_lines", v: ["4", "['Batulao', 'Ugo']", "['Pulag']"], msg: "Three exact lines" },
          { k: "src_has", v: "set", msg: "Uses sets" },
        ],
      },
    },

  ],
};
