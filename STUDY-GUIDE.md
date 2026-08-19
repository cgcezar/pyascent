# PyAscent Study Guide

A complete written companion to the PyAscent app. 30 waypoints across 7 modules, from your first `print()` to grouping a table in pandas.

Every waypoint has the same shape: a **brief** explaining the idea, two **drills** to write yourself, a short **knowledge check**, and one **coding checkpoint**. Solutions are folded away so you can try first.

Clearing everything is worth 2926 metres of elevation in the app, which is the height of Mount Pulag in Benguet.

## Contents

**Module 1: Python Basics** Getting the interpreter to talk back, then storing what it says.
- 1.1 Introduction to Python
- 1.2 Your First Python Command
- 1.3 Variables and Data Types
- 1.4 Working with Strings
- 1.5 Working with Numbers
- 1.6 Comments and Code Clarity

**Module 2: Logic and Conditionals** Teaching your program to make a decision instead of running straight through.
- 2.1 Booleans and Comparison Operators
- 2.2 If Statements and Logic
- 2.3 Else and Elif Conditions
- 2.4 Nested Conditionals

**Module 3: Collections** Holding many values in one name, and picking the right container for the job.
- 3.1 Lists and Indexing
- 3.2 List Methods and Slicing
- 3.3 Tuples and Immutability
- 3.4 Dictionaries: Keys and Values
- 3.5 Sets and Uniqueness

**Module 4: Loops** Doing the same work many times without writing it many times.
- 4.1 For Loops and range() *(bonus)*
- 4.2 While Loops
- 4.3 Loop Control: break and continue
- 4.4 Looping Through Dictionaries and Lists
- 4.5 List Comprehensions

**Module 5: Functions and Errors** Packaging logic under a name, and keeping the program alive when something goes wrong.
- 5.1 Defining Functions
- 5.2 Function Parameters and Return Values
- 5.3 Built-in Functions for Data
- 5.4 Handling Errors and Exceptions

**Module 6: Files and External Data** Reading data that lives outside your program.
- 6.1 Working with External Files
- 6.2 Reading CSV Files with Python

**Module 7: Pandas and Data Analysis** The same questions as Module 6, answered in one line instead of a loop.
- 7.1 Introduction to Pandas
- 7.2 Exploring Data with Pandas
- 7.3 Filtering Data in Pandas
- 7.4 Grouping and Aggregating in Pandas

---

# Module 1: Python Basics

*Getting the interpreter to talk back, then storing what it says.*

## 1.1 Introduction to Python

### Brief

Python is a programming language you write as plain text. Something called the **interpreter** reads your text one line at a time, top to bottom, and does what each line says. There is no separate build step to worry about, which is a big part of why Python is a common first language.

Two ideas will save you a lot of confusion early on:

- **Order matters.** Line 3 runs after line 2. If you use something before you create it, Python stops and complains.
- **Indentation matters.** Spaces at the start of a line are not decoration. They tell Python which lines belong inside an `if` or a loop. Four spaces is the convention.

```python
print("Trailhead: Ambangeg")
print("Target: 2926 m")
print("Status: ready")
```
*Three lines, three outputs, in the order written.*

> **About this app.** The Python running here is real CPython compiled to WebAssembly, running inside your browser. Nothing is sent to a server. That also means `input()` is switched off, so any exercise that would need typed input uses a variable instead.

One more thing worth knowing: Python is **case sensitive**. `Print` is not `print`, and `Name` is not `name`. Most beginner errors are a capital letter in the wrong place or a missing quote.

### Drills

**Drill 1**

Print three lines that describe a climb you would like to do. Any three lines will do, one `print()` per line.

Starting point:

```python
# Write three print() calls below
```

*Hint: Each `print()` call puts its text on its own line. You need three separate calls.*

<details><summary>Worked solution</summary>

```python
print("Mount Pulag")
print("Benguet")
print("2926 m")
```

</details>

**Drill 2**

Python runs top to bottom. Print `Pack bag`, then `Leave house`, then `Ride bus`, in exactly that order.

*Hint: The order of your print() lines is the order of the output.*

<details><summary>Worked solution</summary>

```python
print("Pack bag")
print("Leave house")
print("Ride bus")
```

</details>

### Knowledge check

**1. How does the Python interpreter read your file?**

- A. All at once, in any order it likes
- B. One line at a time, from top to bottom
- C. Bottom to top
- D. Only the lines inside functions

<details><summary>Answer</summary>

**B.** Execution is top to bottom. That is why you cannot use a variable on line 2 that you only create on line 5.

</details>

**2. What does this print?**

```python
print("one")
print("two")
```

- A. one two
- B. two\none
- C. one\ntwo
- D. Nothing, it needs a main() function

<details><summary>Answer</summary>

**C.** Each print() ends with a newline, so the two words land on separate lines. Python needs no main() to start running.

</details>

**3. Why does `Print("hi")` fail?**

- A. The quotes are wrong
- B. Python is case sensitive, the function is `print`
- C. You need a semicolon
- D. print only accepts numbers

<details><summary>Answer</summary>

**B.** Python is case sensitive. `Print` is treated as an undefined name, so you get a NameError.

</details>

### Checkpoint

**Coding checkpoint**

Print a four-line trail card. Line 1 the mountain name, line 2 the province, line 3 the elevation with the unit, line 4 the word `Cleared`.

*Hint: Four separate print() calls. The last line must be exactly `Cleared`.*

<details><summary>Worked solution</summary>

```python
print("Pulag")
print("Benguet")
print("2926 m")
print("Cleared")
```

</details>

---

## 1.2 Your First Python Command

### Brief

`print()` is a **function**. You write its name, then round brackets, then whatever you want it to show inside the brackets. The thing you put inside is called an **argument**.

```python
print("Hello, trail")   # text needs quotes
print(2926)             # numbers do not
print("Pulag", 2926)    # two arguments, joined by a space
```
*Text goes in quotes. Numbers do not.*

Text in quotes is called a **string**. Single or double quotes both work, as long as you close with the same one you opened with. If the text itself contains an apostrophe, use double quotes on the outside.

```python
print('Ambangeg trail')
print("It's a long walk")   # apostrophe inside double quotes
```
*Pick the quote that keeps your text readable.*

Two extra tricks on `print()` that come up constantly:

- `sep=` changes what goes between arguments. Default is a single space.
- `end=` changes what goes at the end. Default is a newline, so `end=""` keeps the next print on the same line.

```python
print("Pulag", "Benguet", sep=" | ")
print("loading", end="")
print("...done")
```
*Output: Pulag | Benguet loading...done*

### Drills

**Drill 1**

Print the exact line `Hello, trail` with nothing else around it.

*Hint: Watch the comma and the space. The text has to match character for character.*

<details><summary>Worked solution</summary>

```python
print("Hello, trail")
```

</details>

**Drill 2**

Using one `print()` call with `sep=`, produce the line `Pulag-Benguet-2926`. Pass three separate arguments, do not glue the string together yourself.

Starting point:

```python
print("Pulag", "Benguet", 2926)
```

*Hint: print(a, b, c, sep="-") puts a dash between each argument.*

<details><summary>Worked solution</summary>

```python
print("Pulag", "Benguet", 2926, sep="-")
```

</details>

### Knowledge check

**1. Which line has a syntax error?**

- A. print("hi")
- B. print('hi')
- C. print("hi')
- D. print(42)

<details><summary>Answer</summary>

**C.** The quotes have to match. Opening with a double quote and closing with a single quote leaves the string unterminated.

</details>

**2. What does `print("a", "b")` output?**

- A. ab
- B. a b
- C. a, b
- D. a\nb

<details><summary>Answer</summary>

**B.** Multiple arguments are joined by the default separator, which is one space.

</details>

**3. What is the effect of `end=""`?**

- A. Deletes the output
- B. Stops the program
- C. Leaves the cursor on the same line so the next print continues it
- D. Adds an extra blank line

<details><summary>Answer</summary>

**C.** `end` replaces the newline normally added after the output. An empty string means no line break at all.

</details>

### Checkpoint

**Coding checkpoint**

Print exactly two lines. The first must be `Trail: Ambangeg`, the second must be `Permit: yes`. Use `sep=": "` on at least one of them instead of typing the colon inside a string.

*Hint: print("Trail", "Ambangeg", sep=": ") produces the first line.*

<details><summary>Worked solution</summary>

```python
print("Trail", "Ambangeg", sep=": ")
print("Permit", "yes", sep=": ")
```

</details>

---

## 1.3 Variables and Data Types

### Brief

A **variable** is a name pointing at a value. You create one with `=`, which means *assign*, not *equals* in the maths sense. Read `x = 5` as "let x refer to 5".

```python
mountain = "Pulag"
elevation = 2926
days = 2.5
permit_ok = True

print(mountain, elevation, days, permit_ok)
```
*Four variables, four different types.*

Python figures out the type from the value. The four you will use most:

- `str` a string, text in quotes
- `int` a whole number, no decimal point
- `float` a number with a decimal point
- `bool` either `True` or `False`, capital first letter

`type()` tells you what you are holding, and `int()`, `float()`, `str()` convert between them. Converting matters because `"5" + 5` is an error, while `int("5") + 5` is `10`.

```python
count = "12"
print(type(count))        # <class 'str'>
print(int(count) + 1)     # 13
print(str(2926) + " m")   # 2926 m
```
*Convert before you combine.*

> **Naming rules.** Letters, digits and underscores only, and it cannot start with a digit. Convention is `lower_snake_case`. Pick names that say what the value is: `elevation_m` beats `e`.

### Drills

**Drill 1**

Create a variable `peak` holding the text `Pulag`, and `height` holding the whole number `2926`. Then print them on one line separated by a space.

Starting point:

```python
peak = 
height = 
```

*Hint: Text needs quotes. The number must not have quotes, otherwise it becomes a string.*

<details><summary>Worked solution</summary>

```python
peak = "Pulag"
height = 2926
print(peak, height)
```

</details>

**Drill 2**

The variable `raw` holds the string `"1450"`. Convert it to a whole number, add 200, store the result in `total`, and print `total`.

Starting point:

```python
raw = "1450"
```

*Hint: int(raw) turns the text into a number you can do maths with.*

<details><summary>Worked solution</summary>

```python
raw = "1450"
total = int(raw) + 200
print(total)
```

</details>

### Knowledge check

**1. What is the type of `2926`?**

- A. str
- B. int
- C. float
- D. bool

<details><summary>Answer</summary>

**B.** A whole number with no decimal point is an int. `2926.0` would be a float.

</details>

**2. What happens with `"5" + 5`?**

- A. 10
- B. 55
- C. TypeError
- D. 5 5

<details><summary>Answer</summary>

**C.** Python will not silently mix a string and an int. Convert one side first: `int("5") + 5` or `"5" + str(5)`.

</details>

**3. Which is a valid variable name?**

- A. 2nd_camp
- B. camp-2
- C. camp_2
- D. class

<details><summary>Answer</summary>

**C.** Names cannot start with a digit, cannot contain a hyphen since that reads as subtraction, and cannot be a reserved word like `class`.

</details>

### Checkpoint

**Coding checkpoint**

Build a trip summary. Create `peak` (string), `elevation_m` (int), `days` (float) and `permit_ok` (bool), then print one line in the exact form `Pulag 2926 2.5 True` using a single print with four arguments.

*Hint: print(peak, elevation_m, days, permit_ok) already separates them with spaces.*

<details><summary>Worked solution</summary>

```python
peak = "Pulag"
elevation_m = 2926
days = 2.5
permit_ok = True
print(peak, elevation_m, days, permit_ok)
```

</details>

---

## 1.4 Working with Strings

### Brief

Strings can be joined, measured, sliced and reshaped. Joining with `+` is called **concatenation**, and both sides have to be strings.

```python
first = "Mount"
second = "Pulag"
print(first + " " + second)   # Mount Pulag
print(len(second))            # 5
```
*`len()` counts characters, spaces included.*

#### f-strings

The cleanest way to build a sentence out of variables is an **f-string**. Put `f` before the quote, then wrap any variable in curly braces. No conversion needed, numbers just work.

```python
peak = "Pulag"
elev = 2926
print(f"{peak} rises to {elev} m")
print(f"That is {elev / 1000:.2f} km")
```
*Output: Pulag rises to 2926 m That is 2.93 km*

#### Common string methods

- `.upper()` and `.lower()` change case
- `.strip()` removes spaces at both ends, very useful on messy input
- `.replace(a, b)` swaps every occurrence of a with b
- `.split(sep)` breaks a string into a list of pieces
- `.title()` capitalises the first letter of each word

```python
raw = "  benguet, mountain province  "
clean = raw.strip().title()
print(clean)                    # Benguet, Mountain Province
print(clean.split(", "))        # ['Benguet', 'Mountain Province']
```
*Methods can be chained left to right.*

> **Strings never change in place.** `name.upper()` hands back a new string. If you want to keep it you have to assign it: `name = name.upper()`.

### Drills

**Drill 1**

Given `peak` and `elev` below, use an f-string to print exactly `Pulag stands at 2926 m`.

Starting point:

```python
peak = "Pulag"
elev = 2926
```

*Hint: f"{peak} stands at {elev} m"*

<details><summary>Worked solution</summary>

```python
peak = "Pulag"
elev = 2926
print(f"{peak} stands at {elev} m")
```

</details>

**Drill 2**

The variable `messy` has stray spaces and the wrong case. Clean it into `clean` so that it prints as `Ambangeg Trail`, then print `clean`.

Starting point:

```python
messy = "   ambangeg trail   "
```

*Hint: Chain .strip() and .title() on the original string.*

<details><summary>Worked solution</summary>

```python
messy = "   ambangeg trail   "
clean = messy.strip().title()
print(clean)
```

</details>

### Knowledge check

**1. What does `len("Mt Pulag")` return?**

- A. 7
- B. 8
- C. 2
- D. 9

<details><summary>Answer</summary>

**B.** len counts every character including the space: M, t, space, P, u, l, a, g is 8.

</details>

**2. After `name = "pulag"` and `name.upper()`, what does `print(name)` show?**

- A. PULAG
- B. pulag
- C. Pulag
- D. An error

<details><summary>Answer</summary>

**B.** String methods return a new string and leave the original alone. You would need `name = name.upper()` to keep the change.

</details>

**3. What does `"a,b,c".split(",")` produce?**

- A. "abc"
- B. ['a', 'b', 'c']
- C. ('a','b','c')
- D. 3

<details><summary>Answer</summary>

**B.** split cuts the string at every separator and returns a list of the pieces.

</details>

### Checkpoint

**Coding checkpoint**

Take the raw record below and print exactly `PULAG (Benguet) is 2926 m`. Split the record on the comma, strip the spaces off each piece, uppercase the name, and use an f-string to assemble the line.

Starting point:

```python
record = "pulag , Benguet , 2926"
```

*Hint: parts = record.split(",") gives you three pieces. Then parts[0].strip().upper() and so on.*

<details><summary>Worked solution</summary>

```python
record = "pulag , Benguet , 2926"
parts = record.split(",")
name = parts[0].strip().upper()
prov = parts[1].strip()
elev = parts[2].strip()
print(f"{name} ({prov}) is {elev} m")
```

</details>

---

## 1.5 Working with Numbers

### Brief

Python does arithmetic with the operators you would expect, plus three that trip people up at first.

```python
print(7 + 2)    # 9
print(7 - 2)    # 5
print(7 * 2)    # 14
print(7 / 2)    # 3.5   true division, always a float
print(7 // 2)   # 3     floor division, drops the remainder
print(7 % 2)    # 1     modulo, the remainder itself
print(7 ** 2)   # 49    power
```
*Note that `/` gives 3.5 while `//` gives 3.*

`%` looks strange until you see what it is for. `n % 2 == 0` is the standard test for an even number, and `total % 60` gives you leftover minutes after taking out whole hours.

#### Order and rounding

Python follows the usual precedence: brackets, then `**`, then `*` `/` `//` `%`, then `+` `-`. When in doubt add brackets, they cost nothing and make intent obvious.

```python
print(2 + 3 * 4)      # 14
print((2 + 3) * 4)    # 20
print(round(3.14159, 2))  # 3.14
print(abs(-120))          # 120
print(max(2926, 2954))    # 2954
```
*round, abs, min and max are built in.*

> **Floats are approximate.** `0.1 + 0.2` prints `0.30000000000000004`. That is not a Python bug, it is how binary floating point works everywhere. Round only when you display, and never compare floats with `==` for equality.

### Drills

**Drill 1**

A climb covers `total_minutes = 415`. Compute whole `hours` and leftover `minutes`, then print them as `6 h 55 min`.

Starting point:

```python
total_minutes = 415
```

*Hint: Use // for the hours and % for the leftover minutes.*

<details><summary>Worked solution</summary>

```python
total_minutes = 415
hours = total_minutes // 60
minutes = total_minutes % 60
print(f"{hours} h {minutes} min")
```

</details>

**Drill 2**

Compute the average of the three elevations below, round it to one decimal place, store it in `avg`, and print it.

Starting point:

```python
a = 2926
b = 2954
c = 2842
```

*Hint: Add them, divide by 3, then round(value, 1).*

<details><summary>Worked solution</summary>

```python
a = 2926
b = 2954
c = 2842
avg = round((a + b + c) / 3, 1)
print(avg)
```

</details>

### Knowledge check

**1. What does `9 // 4` give?**

- A. 2.25
- B. 2
- C. 3
- D. 1

<details><summary>Answer</summary>

**B.** Floor division throws away the fractional part and keeps the whole number below. `9 / 4` would be 2.25.

</details>

**2. What does `10 % 3` give?**

- A. 3
- B. 3.33
- C. 1
- D. 0

<details><summary>Answer</summary>

**C.** 3 goes into 10 three times with 1 left over. Modulo returns that remainder.

</details>

**3. What is `2 + 3 * 4 ** 2`?**

- A. 400
- B. 50
- C. 80
- D. 26

<details><summary>Answer</summary>

**B.** Power first gives 16, then 3 * 16 is 48, then 2 + 48 is 50.

</details>

### Checkpoint

**Coding checkpoint**

You gain `gain_m = 1476` metres over `distance_km = 12.4`. Compute the average gain per kilometre, round it to one decimal, store it in `rate`, and print exactly `1476 m over 12.4 km = 119.0 m/km`.

Starting point:

```python
gain_m = 1476
distance_km = 12.4
```

*Hint: rate = round(gain_m / distance_km, 1), then build the line with an f-string.*

<details><summary>Worked solution</summary>

```python
gain_m = 1476
distance_km = 12.4
rate = round(gain_m / distance_km, 1)
print(f"{gain_m} m over {distance_km} km = {rate} m/km")
```

</details>

---

## 1.6 Comments and Code Clarity

### Brief

A **comment** starts with `#`. Python ignores everything after it on that line. Comments are for the human reading your code later, which is usually you in three weeks having forgotten everything.

```python
# Convert the raw elevation reading to metres
raw_feet = 9600
elevation_m = round(raw_feet * 0.3048)   # 1 ft = 0.3048 m
print(elevation_m)
```
*The comment explains the why. The code already shows the what.*

The rule that separates useful comments from noise: **do not narrate, explain**.

- Weak: `x = x + 1  # add one to x`. The code already said that.
- Strong: `x = x + 1  # skip the header row in the CSV`. Now the reader knows why.

#### Clarity beats cleverness

Most of what makes code readable is not comments at all. It is good names, short lines and consistent spacing. Compare these two, they do the same thing:

```python
# hard to follow
d=2926;x=d*0.001;print(x)

# easy to follow
elevation_m = 2926
elevation_km = elevation_m * 0.001
print(elevation_km)
```
*Same result, very different maintenance cost.*

> **Docstrings.** Triple quoted text at the top of a function is a docstring, not a comment. It stays in the program and shows up in `help()`. You will meet these properly in Module 5.

### Drills

**Drill 1**

Convert `raw_feet = 9600` to whole metres in a variable named `elevation_m`, print it, and include at least one comment that explains the conversion factor.

Starting point:

```python
raw_feet = 9600
```

*Hint: One metre is 0.3048 feet. Use round() to get a whole number.*

<details><summary>Worked solution</summary>

```python
raw_feet = 9600
# 1 foot = 0.3048 metres
elevation_m = round(raw_feet * 0.3048)
print(elevation_m)
```

</details>

**Drill 2**

Rewrite the cramped code in the editor so that it uses clear multi-line variable names and prints the same value. Do not use semicolons, and give the variables descriptive names longer than three characters.

Starting point:

```python
d=2926;x=d*0.001;print(x)
```

*Hint: Split it into one statement per line and rename d and x to something meaningful.*

<details><summary>Worked solution</summary>

```python
elevation_m = 2926
elevation_km = elevation_m * 0.001
print(elevation_km)
```

</details>

### Knowledge check

**1. What does Python do with everything after a `#` on a line?**

- A. Runs it as a separate statement
- B. Ignores it
- C. Prints it
- D. Treats it as a string

<details><summary>Answer</summary>

**B.** The interpreter skips comments entirely. They exist purely for people reading the code.

</details>

**2. Which comment actually earns its place?**

- A. `total = 0  # set total to zero`
- B. `i = i + 1  # increment i`
- C. `rate = g / d  # metres gained per km, used for the difficulty band`
- D. `print(x)  # print x`

<details><summary>Answer</summary>

**C.** The first three restate the code. The last one explains what the number means and why it is being computed.

</details>

**3. What is the single biggest driver of readable code?**

- A. A comment on every line
- B. Short variable names to save typing
- C. Descriptive names and one idea per line
- D. Putting everything on one line

<details><summary>Answer</summary>

**C.** Good naming and simple structure make most comments unnecessary. Comments then cover only the parts that genuinely need context.

</details>

### Checkpoint

**Coding checkpoint**

Write a small, clearly commented block that converts a hiking pace. Given `distance_km = 12.4` and `hours = 6.5`, compute `pace_kph` rounded to two decimals, print exactly `Average pace: 1.91 kph`, and include a comment explaining what pace means here.

Starting point:

```python
distance_km = 12.4
hours = 6.5
```

*Hint: pace_kph = round(distance_km / hours, 2). Add a # comment above it.*

<details><summary>Worked solution</summary>

```python
distance_km = 12.4
hours = 6.5
# Average moving speed across the whole climb, rests included
pace_kph = round(distance_km / hours, 2)
print(f"Average pace: {pace_kph} kph")
```

</details>

---

# Module 2: Logic and Conditionals

*Teaching your program to make a decision instead of running straight through.*

## 2.1 Booleans and Comparison Operators

### Brief

A **boolean** is a value that is either `True` or `False`. Capital first letter, no quotes. `"True"` with quotes is a string, which is a different thing entirely.

Comparisons produce booleans. This is where decisions come from.

```python
print(2926 > 2000)    # True
print(2926 == 2926)   # True
print(2926 != 2954)   # True
print(2926 <= 2900)   # False
```
*`==` compares. `=` assigns. Mixing them up is the classic beginner bug.*

- `==` equal to, `!=` not equal to
- `>` `<` greater than, less than
- `>=` `<=` greater or equal, less or equal

#### Combining conditions

`and` needs both sides true. `or` needs at least one. `not` flips whatever follows it.

```python
elev = 2926
permit = True

print(elev > 2500 and permit)     # True
print(elev > 3000 or permit)      # True
print(not permit)                 # False
```
*Read these out loud, they say what they mean.*

Python also chains comparisons the way maths does, which reads beautifully: `2000 < elev < 3000` is valid and means exactly what it looks like.

> **Truthiness.** In a boolean context, empty things are false and non-empty things are true. `0`, `""`, `[]`, `{}` and `None` all count as false. Every other value counts as true. That is why `if items:` is the idiomatic way to ask "is this list non-empty".

### Drills

**Drill 1**

Store in `is_high` whether `elev` is strictly greater than 2500, and in `is_ready` whether `elev` is above 2500 **and** `permit` is True. Print both.

Starting point:

```python
elev = 2926
permit = True
```

*Hint: A comparison already gives you a boolean. No if statement needed yet.*

<details><summary>Worked solution</summary>

```python
elev = 2926
permit = True
is_high = elev > 2500
is_ready = elev > 2500 and permit
print(is_high, is_ready)
```

</details>

**Drill 2**

Using a single chained comparison, store in `in_band` whether `elev` sits strictly between 2000 and 3000. Print it.

Starting point:

```python
elev = 2926
```

*Hint: Python allows 2000 < elev < 3000 directly.*

<details><summary>Worked solution</summary>

```python
elev = 2926
in_band = 2000 < elev < 3000
print(in_band)
```

</details>

### Knowledge check

**1. What is the difference between `=` and `==`?**

- A. No difference
- B. `=` assigns a value, `==` compares two values
- C. `=` compares, `==` assigns
- D. `==` only works on numbers

<details><summary>Answer</summary>

**B.** `x = 5` puts 5 into x. `x == 5` asks whether x is currently 5 and hands back True or False.

</details>

**2. What does `True and False` evaluate to?**

- A. True
- B. False
- C. None
- D. An error

<details><summary>Answer</summary>

**B.** `and` is only True when both sides are True.

</details>

**3. Which of these is treated as False in a condition?**

- A. `"False"`
- B. `[0]`
- C. `[]`
- D. `-1`

<details><summary>Answer</summary>

**C.** An empty list is falsy. A non-empty string, a list containing a zero, and any non-zero number are all truthy.

</details>

### Checkpoint

**Coding checkpoint**

Given the three variables below, compute `go` as True only when the elevation is above 2000, the permit is approved, **and** the forecast is not `"storm"`. Print `go`.

Starting point:

```python
elev = 2926
permit = True
forecast = "cloudy"
```

*Hint: Combine two `and` conditions with a `!=` comparison for the forecast.*

<details><summary>Worked solution</summary>

```python
elev = 2926
permit = True
forecast = "cloudy"
go = elev > 2000 and permit and forecast != "storm"
print(go)
```

</details>

---

## 2.2 If Statements and Logic

### Brief

An `if` statement runs a block of code only when its condition is True. The structure is always the same: the word `if`, a condition, a colon, then an indented block underneath.

```python
elev = 2926

if elev > 2500:
    print("High altitude route")
    print("Bring a warm layer")

print("Always runs")
```
*Both indented lines belong to the if. The last line does not.*

The colon and the indentation are not style, they are syntax. Python uses indentation the way other languages use curly braces. Four spaces per level, and be consistent, mixing tabs and spaces is a common source of errors.

#### What can go in the condition

Anything that evaluates to True or False. That includes comparisons, combined conditions, and plain values relying on truthiness.

```python
notes = []

if not notes:
    print("No trail notes yet")

if len(notes) == 0:
    print("Same test, spelled out")
```
*Both work. The first reads better once you are used to it.*

> **IndentationError.** If Python complains about indentation, look for a line that is indented differently from its neighbours, or a block that is empty. An `if` must have at least one indented line under it.

### Drills

**Drill 1**

If `elev` is greater than 2500, print `High altitude route`. Otherwise print nothing at all.

Starting point:

```python
elev = 2926
```

*Hint: One if, one indented print. No else needed here.*

<details><summary>Worked solution</summary>

```python
elev = 2926
if elev > 2500:
    print("High altitude route")
```

</details>

**Drill 2**

The list `gear` is empty. Print `Pack list is empty` only when it has nothing in it, using truthiness rather than `len()`.

Starting point:

```python
gear = []
```

*Hint: `if not gear:` is the idiomatic form.*

<details><summary>Worked solution</summary>

```python
gear = []
if not gear:
    print("Pack list is empty")
```

</details>

### Knowledge check

**1. What punctuation ends the `if` line?**

- A. A semicolon
- B. A colon
- C. Nothing
- D. A curly brace

<details><summary>Answer</summary>

**B.** Every block opener in Python ends with a colon, then the block itself is indented on the following lines.

</details>

**2. How does Python know which lines belong inside the if?**

- A. By the curly braces
- B. By the indentation
- C. By the `end` keyword
- D. It runs everything below

<details><summary>Answer</summary>

**B.** Indentation is the block structure. When the indentation returns to the previous level, the block is over.

</details>

**3. What does this print?**

```python
x = 5
if x > 10:
    print("big")
print("done")
```

- A. big
- B. big\ndone
- C. done
- D. Nothing

<details><summary>Answer</summary>

**C.** The condition is False so the indented line is skipped. `print("done")` is not indented, so it is outside the if and always runs.

</details>

### Checkpoint

**Coding checkpoint**

Given `elev` and `weather`, print `Summit push approved` only when the elevation is at least 2500 and the weather is not `"storm"`. With the starter values it should print. Nothing else should be printed.

Starting point:

```python
elev = 2926
weather = "clear"
```

*Hint: One if with two conditions joined by and.*

<details><summary>Worked solution</summary>

```python
elev = 2926
weather = "clear"
if elev >= 2500 and weather != "storm":
    print("Summit push approved")
```

</details>

---

## 2.3 Else and Elif Conditions

### Brief

`else` catches everything the `if` did not. `elif` (short for else-if) lets you test another condition before giving up.

```python
elev = 2926

if elev >= 2800:
    band = "very high"
elif elev >= 2000:
    band = "high"
elif elev >= 1000:
    band = "mid"
else:
    band = "low"

print(band)   # very high
```
*Only one branch ever runs.*

Two rules that explain almost every surprise with chains like this:

- Python checks the conditions **in order** and stops at the first True one. Everything below is skipped even if it would also be true.
- `else` has no condition and must come last. It is optional.

This means **order matters enormously**. If you put `elev >= 1000` first, every high mountain would be labelled mid, because that test passes before the stricter ones get a chance.

```python
# wrong order, everything comes out "mid"
if elev >= 1000:
    band = "mid"
elif elev >= 2800:
    band = "very high"   # unreachable for elev >= 2800
```
*Go from the most specific test to the least.*

> **if versus elif.** A run of separate `if` statements tests every one independently and can trigger several. An `if / elif` chain picks exactly one. When the cases are mutually exclusive, use elif.

### Drills

**Drill 1**

Set `band` to `"very high"` when `elev` is 2800 or more, `"high"` at 2000 or more, `"mid"` at 1000 or more, and `"low"` otherwise. Print `band`.

Starting point:

```python
elev = 2926
```

*Hint: Order the tests from the highest threshold down.*

<details><summary>Worked solution</summary>

```python
elev = 2926
if elev >= 2800:
    band = "very high"
elif elev >= 2000:
    band = "high"
elif elev >= 1000:
    band = "mid"
else:
    band = "low"
print(band)
```

</details>

**Drill 2**

Given `weather`, print `Go` when it is `"clear"`, `Wait` when it is `"rain"`, and `Cancel` for anything else. Test it with the starter value first, then try changing it.

Starting point:

```python
weather = "rain"
```

*Hint: Two conditions and one else, comparing strings with ==.*

<details><summary>Worked solution</summary>

```python
weather = "rain"
if weather == "clear":
    print("Go")
elif weather == "rain":
    print("Wait")
else:
    print("Cancel")
```

</details>

### Knowledge check

**1. In an if / elif / else chain, how many branches run?**

- A. All of the true ones
- B. Exactly one
- C. At most two
- D. None unless else exists

<details><summary>Answer</summary>

**B.** Python takes the first branch whose condition is True and skips the rest of the chain entirely.

</details>

**2. What does this print when `x = 15`?**

```python
if x > 5:
    print("A")
elif x > 10:
    print("B")
else:
    print("C")
```

- A. A
- B. B
- C. A and B
- D. C

<details><summary>Answer</summary>

**A.** `x > 5` is True first, so A prints and the elif is never evaluated even though it would also be True. Order the strictest test first.

</details>

**3. Which statement about `else` is correct?**

- A. It needs its own condition
- B. It must come first
- C. It is optional and comes last
- D. You can have several per chain

<details><summary>Answer</summary>

**C.** `else` takes no condition, appears at most once, and always sits at the end of the chain.

</details>

### Checkpoint

**Coding checkpoint**

Write a difficulty grader. Given `rating` (1 to 9), print `Beginner` for 1 to 3, `Intermediate` for 4 to 6, `Advanced` for 7 to 9, and `Invalid rating` for anything outside 1 to 9. With `rating = 4` it must print `Intermediate`.

Starting point:

```python
rating = 4
```

*Hint: Check the invalid case first, or use chained comparisons like `1 <= rating <= 3`.*

<details><summary>Worked solution</summary>

```python
rating = 4
if rating < 1 or rating > 9:
    print("Invalid rating")
elif rating <= 3:
    print("Beginner")
elif rating <= 6:
    print("Intermediate")
else:
    print("Advanced")
```

</details>

---

## 2.4 Nested Conditionals

### Brief

A **nested** conditional is an `if` inside another `if`. The inner one is only reached when the outer condition passed, so you are asking a follow-up question.

```python
permit = True
weather = "clear"

if permit:
    if weather == "clear":
        print("Climb today")
    else:
        print("Permit is fine, wait for the weather")
else:
    print("Get the permit first")
```
*Each level of nesting adds four more spaces.*

Nesting is useful when the second question only makes sense given the first answer. Asking about the weather is pointless if there is no permit, and the nested form says that clearly.

#### When to flatten instead

If both conditions simply need to be true and there is no separate message for each failure, `and` is cleaner than nesting.

```python
# nested, three levels deep
if permit:
    if weather == "clear":
        if fit:
            print("Go")

# flat, same meaning
if permit and weather == "clear" and fit:
    print("Go")
```
*Prefer the flat version when the branches share one outcome.*

> **Guard clauses.** Another way to avoid deep nesting is to handle the failure case first and stop early. Inside a function you would `return`. This keeps the happy path at the shallowest indentation, which is much easier to read.

### Drills

**Drill 1**

Using nested ifs, print `Climb today` when the permit is approved and the weather is clear, `Permit is fine, wait for the weather` when the permit is approved but the weather is not clear, and `Get the permit first` when there is no permit.

Starting point:

```python
permit = True
weather = "rain"
```

*Hint: Outer if on permit, inner if on weather, each with its own else.*

<details><summary>Worked solution</summary>

```python
permit = True
weather = "rain"
if permit:
    if weather == "clear":
        print("Climb today")
    else:
        print("Permit is fine, wait for the weather")
else:
    print("Get the permit first")
```

</details>

**Drill 2**

Flatten this. The three nested conditions below all lead to the same single outcome, so rewrite it as one `if` using `and`, printing `Go` when all three hold.

Starting point:

```python
permit = True
weather = "clear"
fit = True

# rewrite the logic below as a single if
```

*Hint: if permit and weather == "clear" and fit:*

<details><summary>Worked solution</summary>

```python
permit = True
weather = "clear"
fit = True
if permit and weather == "clear" and fit:
    print("Go")
```

</details>

### Knowledge check

**1. When does an inner `if` get evaluated?**

- A. Always
- B. Only when the outer condition was True
- C. Only when the outer condition was False
- D. Before the outer one

<details><summary>Answer</summary>

**B.** The inner block is part of the outer block, so it is only reached when the outer condition passes.

</details>

**2. Which is the better choice when two conditions must both hold and there is only one outcome?**

- A. Nested ifs, it is more explicit
- B. A single if with `and`
- C. Two separate if statements
- D. An elif chain

<details><summary>Answer</summary>

**B.** Flattening with `and` says the same thing with less indentation. Nesting earns its place when each failure needs its own response.

</details>

**3. What does this print when `a = False` and `b = True`?**

```python
if a:
    if b:
        print("X")
    else:
        print("Y")
else:
    print("Z")
```

- A. X
- B. Y
- C. Z
- D. Nothing

<details><summary>Answer</summary>

**C.** The outer condition is False so the whole inner block is skipped and the outer else runs.

</details>

### Checkpoint

**Coding checkpoint**

Write a summit decision. If `permit` is False print `No permit`. Otherwise, if `weather` is `"storm"` print `Storm, stay at camp`, else if `hours_left` is under 4 print `Not enough daylight`, else print `Summit push`. With the starter values it must print `Not enough daylight`.

Starting point:

```python
permit = True
weather = "clear"
hours_left = 3
```

*Hint: Outer if on permit. Inside it, an if / elif / else chain on weather and hours_left.*

<details><summary>Worked solution</summary>

```python
permit = True
weather = "clear"
hours_left = 3
if not permit:
    print("No permit")
else:
    if weather == "storm":
        print("Storm, stay at camp")
    elif hours_left < 4:
        print("Not enough daylight")
    else:
        print("Summit push")
```

</details>

---

# Module 3: Collections

*Holding many values in one name, and picking the right container for the job.*

## 3.1 Lists and Indexing

### Brief

A **list** holds several values in order, written inside square brackets and separated by commas. The values can be any type, and they can be mixed, though in practice you usually keep them the same.

```python
peaks = ["Pulag", "Apo", "Halcon", "Ugo"]
print(peaks)          # ['Pulag', 'Apo', 'Halcon', 'Ugo']
print(len(peaks))     # 4
```
*`len()` gives the number of items.*

#### Indexing starts at zero

The first item is at position `0`, not `1`. This trips up everyone at first and then becomes second nature. Negative indexes count backwards from the end, so `-1` is always the last item.

```python
peaks = ["Pulag", "Apo", "Halcon", "Ugo"]
print(peaks[0])    # Pulag
print(peaks[2])    # Halcon
print(peaks[-1])   # Ugo
print(peaks[-2])   # Halcon
```
*Index 0 is first. Index -1 is last.*

Lists are **mutable**, meaning you can change an item in place by assigning to its index.

```python
peaks[1] = "Kanlaon"
print(peaks)   # ['Pulag', 'Kanlaon', 'Halcon', 'Ugo']
```
*Assigning to an index replaces that one item.*

> **IndexError.** Asking for `peaks[4]` in a four-item list fails, because the valid indexes are 0, 1, 2 and 3. The last valid index is always `len(list) - 1`.

### Drills

**Drill 1**

From the `peaks` list, print the first item, then the last item, on two separate lines. Use a negative index for the last one.

Starting point:

```python
peaks = ["Pulag", "Apo", "Halcon", "Ugo"]
```

*Hint: peaks[0] and peaks[-1].*

<details><summary>Worked solution</summary>

```python
peaks = ["Pulag", "Apo", "Halcon", "Ugo"]
print(peaks[0])
print(peaks[-1])
```

</details>

**Drill 2**

Replace the second item of `peaks` with `"Kanlaon"`, then print the whole list and its length on two lines.

Starting point:

```python
peaks = ["Pulag", "Apo", "Halcon", "Ugo"]
```

*Hint: The second item is at index 1. Assign directly to peaks[1].*

<details><summary>Worked solution</summary>

```python
peaks = ["Pulag", "Apo", "Halcon", "Ugo"]
peaks[1] = "Kanlaon"
print(peaks)
print(len(peaks))
```

</details>

### Knowledge check

**1. What is `items[0]` in `items = ["a", "b", "c"]`?**

- A. "a"
- B. "b"
- C. 0
- D. An error

<details><summary>Answer</summary>

**A.** Indexing starts at zero, so position 0 is the first item.

</details>

**2. What does `items[-1]` give?**

- A. An error
- B. The first item
- C. The last item
- D. The list reversed

<details><summary>Answer</summary>

**C.** Negative indexes count from the end. -1 is the last item, -2 the one before it.

</details>

**3. For a list of length 5, which index raises an IndexError?**

- A. 0
- B. 4
- C. 5
- D. -5

<details><summary>Answer</summary>

**C.** Valid positive indexes run from 0 to len - 1, so 0 to 4. Index 5 is past the end.

</details>

### Checkpoint

**Coding checkpoint**

Given the `elevations` list, print exactly three lines: the first elevation, the last elevation, and the difference between the highest-indexed and lowest-indexed value as `Spread: N`.

Starting point:

```python
elevations = [811, 1090, 2150, 2926]
```

*Hint: elevations[0], elevations[-1], then f"Spread: {elevations[-1] - elevations[0]}". Mind the sign.*

<details><summary>Worked solution</summary>

```python
elevations = [811, 1090, 2150, 2926]
print(elevations[0])
print(elevations[-1])
print(f"Spread: {elevations[-1] - elevations[0]}")
```

</details>

---

## 3.2 List Methods and Slicing

### Brief

Lists come with methods that change them in place. These do not return a new list, they modify the one you already have and return `None`.

- `.append(x)` adds x to the end
- `.insert(i, x)` puts x at position i and shifts the rest along
- `.remove(x)` deletes the first occurrence of the value x
- `.pop()` removes and returns the last item, `.pop(i)` a specific one
- `.sort()` sorts in place, `.reverse()` flips the order

```python
gear = ["tent", "stove"]
gear.append("map")
gear.insert(0, "headlamp")
print(gear)          # ['headlamp', 'tent', 'stove', 'map']

last = gear.pop()
print(last, gear)    # map ['headlamp', 'tent', 'stove']
```
*append and insert change the list itself.*

> **A classic trap.** `gear = gear.append("map")` sets gear to `None`, because append returns nothing. Call it on its own line: `gear.append("map")`.

#### Slicing

A **slice** takes a section of a list with `list[start:stop]`. The start is included, the stop is not. Leave either side blank to mean "from the beginning" or "to the end".

```python
nums = [10, 20, 30, 40, 50]
print(nums[1:3])    # [20, 30]     stop is excluded
print(nums[:2])     # [10, 20]
print(nums[3:])     # [40, 50]
print(nums[-2:])    # [40, 50]
print(nums[::2])    # [10, 30, 50]  every second item
print(nums[::-1])   # [50, 40, 30, 20, 10]  reversed copy
```
*A slice always hands back a new list.*

`sorted(list)` is the non-destructive twin of `.sort()`. It returns a sorted copy and leaves the original untouched, which is often what you want.

### Drills

**Drill 1**

Add `"map"` to the end of `gear`, insert `"headlamp"` at the very front, then print the list. It should end up as `['headlamp', 'tent', 'stove', 'map']`.

Starting point:

```python
gear = ["tent", "stove"]
```

*Hint: append for the end, insert(0, ...) for the front. Call them on their own lines.*

<details><summary>Worked solution</summary>

```python
gear = ["tent", "stove"]
gear.append("map")
gear.insert(0, "headlamp")
print(gear)
```

</details>

**Drill 2**

From `nums`, store the middle three values in `middle`, and a reversed copy of the whole list in `flipped`. Print both. Do not modify `nums` itself.

Starting point:

```python
nums = [10, 20, 30, 40, 50]
```

*Hint: nums[1:4] takes indexes 1, 2 and 3. nums[::-1] reverses without touching the original.*

<details><summary>Worked solution</summary>

```python
nums = [10, 20, 30, 40, 50]
middle = nums[1:4]
flipped = nums[::-1]
print(middle)
print(flipped)
```

</details>

### Knowledge check

**1. What does `[1,2,3,4][1:3]` give?**

- A. [1, 2, 3]
- B. [2, 3]
- C. [2, 3, 4]
- D. [1, 2]

<details><summary>Answer</summary>

**B.** The start index is included and the stop index is excluded, so you get positions 1 and 2.

</details>

**2. What is the value of `x` after `x = [3,1,2].sort()`?**

- A. [1, 2, 3]
- B. [3, 1, 2]
- C. None
- D. An error

<details><summary>Answer</summary>

**C.** `.sort()` sorts in place and returns None. Use `sorted([3,1,2])` if you want the sorted list as a value.

</details>

**3. What does `nums[::-1]` do?**

- A. Removes the last item
- B. Returns a reversed copy
- C. Reverses the list in place
- D. Raises an error

<details><summary>Answer</summary>

**B.** A step of -1 walks the list backwards and produces a new list. The original is untouched.

</details>

### Checkpoint

**Coding checkpoint**

From `elevations`, build `top3`: the three highest values, in descending order, without changing `elevations`. Print `top3`, then print the original list to prove it is unchanged.

Starting point:

```python
elevations = [811, 2926, 1090, 2954, 2150, 2842]
```

*Hint: sorted(elevations, reverse=True) gives a descending copy. Then slice the first three.*

<details><summary>Worked solution</summary>

```python
elevations = [811, 2926, 1090, 2954, 2150, 2842]
top3 = sorted(elevations, reverse=True)[:3]
print(top3)
print(elevations)
```

</details>

---

## 3.3 Tuples and Immutability

### Brief

A **tuple** is like a list, but it cannot be changed after it is created. You write it with round brackets instead of square ones.

```python
location = (16.5967, 120.8983)
print(location[0])     # 16.5967
print(len(location))   # 2

# location[0] = 0  ->  TypeError, tuples are immutable
```
*Indexing and slicing work exactly like lists. Assignment does not.*

**Immutable** means fixed once created. That sounds like a limitation but it is the point. Use a tuple when the group of values is a single thing whose parts should not drift: a coordinate pair, an RGB colour, a database row.

- Use a **list** for a collection that grows, shrinks or gets reordered.
- Use a **tuple** for a fixed record where position carries meaning.

#### Unpacking

You can pull a tuple apart into separate variables in one line. This is used constantly, especially with functions that return several values.

```python
location = (16.5967, 120.8983)
lat, lon = location
print(lat, lon)     # 16.5967 120.8983

# swapping, no temp variable needed
a, b = 1, 2
a, b = b, a
print(a, b)         # 2 1
```
*The number of names must match the number of items.*

> **One item tuples need a trailing comma.** `(5)` is just the number 5 in brackets. `(5,)` is a tuple containing 5. The comma is what makes a tuple, the brackets are usually optional.

### Drills

**Drill 1**

Create a tuple `location` holding the latitude `16.5967` and longitude `120.8983`, then unpack it into `lat` and `lon` and print them on one line.

*Hint: location = (16.5967, 120.8983) then lat, lon = location.*

<details><summary>Worked solution</summary>

```python
location = (16.5967, 120.8983)
lat, lon = location
print(lat, lon)
```

</details>

**Drill 2**

Swap the values of `first` and `second` in a single line using tuple unpacking, then print them.

Starting point:

```python
first = "Pulag"
second = "Apo"
```

*Hint: first, second = second, first*

<details><summary>Worked solution</summary>

```python
first = "Pulag"
second = "Apo"
first, second = second, first
print(first, second)
```

</details>

### Knowledge check

**1. What happens when you run `t = (1, 2, 3)` then `t[0] = 9`?**

- A. t becomes (9, 2, 3)
- B. A TypeError, tuples cannot be changed
- C. A new tuple is returned
- D. Nothing happens

<details><summary>Answer</summary>

**B.** Tuples are immutable. Item assignment is not supported, so Python raises a TypeError.

</details>

**2. Which is a one-item tuple?**

- A. `(5)`
- B. `[5]`
- C. `(5,)`
- D. `{5}`

<details><summary>Answer</summary>

**C.** The trailing comma makes it a tuple. `(5)` is just 5, `[5]` is a list and `{5}` is a set.

</details>

**3. When is a tuple the better choice over a list?**

- A. When you need to append items later
- B. When the group is a fixed record and position has meaning
- C. When you need sorting
- D. Tuples are always better

<details><summary>Answer</summary>

**B.** Tuples signal that the grouping is fixed, like a coordinate pair. Lists are for collections that change.

</details>

### Checkpoint

**Coding checkpoint**

You have a list of tuples, each `(name, elevation)`. Unpack the first tuple into `name` and `elev`, then print exactly `Pulag sits at 2926 m`. Do not index into the tuple with `[0]` and `[1]`, use unpacking.

Starting point:

```python
records = [("Pulag", 2926), ("Apo", 2954)]
```

*Hint: name, elev = records[0], then build the line with an f-string.*

<details><summary>Worked solution</summary>

```python
records = [("Pulag", 2926), ("Apo", 2954)]
name, elev = records[0]
print(f"{name} sits at {elev} m")
```

</details>

---

## 3.4 Dictionaries: Keys and Values

### Brief

A **dictionary** stores pairs. Each **key** maps to a **value**, and you look things up by key instead of by position. Written with curly braces and colons.

```python
peak = {
    "name": "Pulag",
    "province": "Benguet",
    "elevation_m": 2926,
}

print(peak["name"])          # Pulag
print(peak["elevation_m"])   # 2926
```
*Keys are usually strings. Values can be anything.*

This is the right shape whenever your data has named fields. A list would force you to remember that position 2 was the elevation. A dictionary just says so.

#### Reading safely

`peak["missing"]` raises a `KeyError`. `peak.get("missing")` returns `None` instead, and `peak.get("missing", 0)` returns a default you choose. Use `.get()` whenever the key might genuinely be absent.

```python
print(peak.get("days"))       # None
print(peak.get("days", 1))    # 1
print("name" in peak)         # True
```
*`in` checks keys, not values.*

#### Changing and inspecting

```python
peak["days"] = 2           # adds a new pair
peak["elevation_m"] = 2922 # overwrites an existing one
del peak["province"]       # removes a pair

print(peak.keys())
print(peak.values())
print(peak.items())        # pairs, ideal for looping
```
*Assigning to a new key adds it. Assigning to an existing key replaces it.*

> **Keys must be immutable.** Strings, numbers and tuples work as keys. Lists do not, because they can change. Values have no such restriction.

### Drills

**Drill 1**

Build a dictionary `peak` with keys `name`, `province` and `elevation_m` set to `Pulag`, `Benguet` and `2926`. Print the name and elevation on one line.

*Hint: Curly braces, key: value pairs separated by commas.*

<details><summary>Worked solution</summary>

```python
peak = {"name": "Pulag", "province": "Benguet", "elevation_m": 2926}
print(peak["name"], peak["elevation_m"])
```

</details>

**Drill 2**

Add a `days` key set to `2`, update `elevation_m` to `2922`, then safely read a key called `guide` that does not exist, defaulting to `"none"`, into a variable `guide`. Print `guide`.

Starting point:

```python
peak = {"name": "Pulag", "elevation_m": 2926}
```

*Hint: Use .get("guide", "none") so a missing key does not crash.*

<details><summary>Worked solution</summary>

```python
peak = {"name": "Pulag", "elevation_m": 2926}
peak["days"] = 2
peak["elevation_m"] = 2922
guide = peak.get("guide", "none")
print(guide)
```

</details>

### Knowledge check

**1. How do you read the value stored under the key `"name"`?**

- A. `peak.name`
- B. `peak["name"]`
- C. `peak(0)`
- D. `peak->name`

<details><summary>Answer</summary>

**B.** Dictionaries use square brackets with the key inside. Dot access is for object attributes, which is a different thing.

</details>

**2. What does `peak.get("missing", 0)` return when the key is absent?**

- A. A KeyError
- B. None
- C. 0
- D. An empty string

<details><summary>Answer</summary>

**C.** The second argument to .get() is the default returned when the key is not there. With no default it returns None.

</details>

**3. Which cannot be used as a dictionary key?**

- A. `"name"`
- B. `42`
- C. `(1, 2)`
- D. `[1, 2]`

<details><summary>Answer</summary>

**D.** Keys must be immutable so they can be hashed. Lists are mutable, so they are rejected. Tuples are fine.

</details>

### Checkpoint

**Coding checkpoint**

Given the `peak` dictionary, print exactly two lines: `Pulag, Benguet` then `2926 m over 2 days`. Read every value through the dictionary, and use `.get()` with a default of `1` for the `days` key.

Starting point:

```python
peak = {"name": "Pulag", "province": "Benguet", "elevation_m": 2926, "days": 2}
```

*Hint: f"{peak['name']}, {peak['province']}" for the first line. Watch the quote types inside the f-string.*

<details><summary>Worked solution</summary>

```python
peak = {"name": "Pulag", "province": "Benguet", "elevation_m": 2926, "days": 2}
days = peak.get("days", 1)
print(f"{peak['name']}, {peak['province']}")
print(f"{peak['elevation_m']} m over {days} days")
```

</details>

---

## 3.5 Sets and Uniqueness

### Brief

A **set** is an unordered collection where every value appears at most once. Creating one from a list is the standard way to remove duplicates.

```python
visited = ["Pulag", "Ugo", "Pulag", "Batulao", "Ugo"]
unique = set(visited)
print(unique)          # {'Ugo', 'Batulao', 'Pulag'}  order varies
print(len(unique))     # 3
```
*Duplicates vanish. Order is not preserved.*

Two consequences of being unordered: there is no indexing, so `unique[0]` fails, and printing a set can show the items in a different order each run. If you need a stable order, sort it: `sorted(unique)` gives a list back.

#### Set operations

Sets do the maths you learned in school, and the operators read naturally.

```python
mine = {"Pulag", "Ugo", "Batulao"}
yours = {"Ugo", "Apo"}

print(mine | yours)   # union, everything from both
print(mine & yours)   # intersection, in both
print(mine - yours)   # difference, in mine only
print(mine ^ yours)   # symmetric difference, in one but not both
```
*Or use the named methods: .union(), .intersection(), .difference().*

- `.add(x)` puts one item in, `.discard(x)` takes one out without complaining if it was absent
- `x in myset` is very fast, much faster than the same check on a long list

> **Empty set gotcha.** `{}` creates an empty **dictionary**, not a set. For an empty set you must write `set()`.

### Drills

**Drill 1**

Remove the duplicates from `visited` into a set called `unique`, then print how many distinct peaks there are.

Starting point:

```python
visited = ["Pulag", "Ugo", "Pulag", "Batulao", "Ugo"]
```

*Hint: set(visited) then len().*

<details><summary>Worked solution</summary>

```python
visited = ["Pulag", "Ugo", "Pulag", "Batulao", "Ugo"]
unique = set(visited)
print(len(unique))
```

</details>

**Drill 2**

Find which peaks appear in both `mine` and `yours`, store them in `shared`, and print the result sorted alphabetically as a list.

Starting point:

```python
mine = {"Pulag", "Ugo", "Batulao"}
yours = {"Ugo", "Apo", "Batulao"}
```

*Hint: mine & yours gives the intersection. sorted() turns it into an ordered list.*

<details><summary>Worked solution</summary>

```python
mine = {"Pulag", "Ugo", "Batulao"}
yours = {"Ugo", "Apo", "Batulao"}
shared = mine & yours
print(sorted(shared))
```

</details>

### Knowledge check

**1. What does `len(set([1, 2, 2, 3, 3, 3]))` return?**

- A. 6
- B. 3
- C. 2
- D. 1

<details><summary>Answer</summary>

**B.** A set keeps only distinct values, so 1, 2 and 3 remain, giving a length of 3.

</details>

**2. What does `{}` create?**

- A. An empty set
- B. An empty dictionary
- C. An empty list
- D. A syntax error

<details><summary>Answer</summary>

**B.** Curly braces with nothing inside make an empty dict. Use `set()` for an empty set.

</details>

**3. Why can you not write `myset[0]`?**

- A. Sets only hold strings
- B. Sets are unordered so there is no position 0
- C. Sets are immutable
- D. You must use .get()

<details><summary>Answer</summary>

**B.** Sets have no defined order, so indexing has no meaning. Convert to a list with sorted() or list() if you need positions.

</details>

### Checkpoint

**Coding checkpoint**

Two climbers submit their logs as lists with repeats. Print exactly three lines: the number of distinct peaks across both logs, the sorted list of peaks they both climbed, and the sorted list only `log_a` has.

Starting point:

```python
log_a = ["Pulag", "Ugo", "Pulag", "Batulao"]
log_b = ["Ugo", "Apo", "Ugo", "Batulao"]
```

*Hint: Convert both to sets first. Then use |, & and - and wrap each result in sorted().*

<details><summary>Worked solution</summary>

```python
log_a = ["Pulag", "Ugo", "Pulag", "Batulao"]
log_b = ["Ugo", "Apo", "Ugo", "Batulao"]
a = set(log_a)
b = set(log_b)
print(len(a | b))
print(sorted(a & b))
print(sorted(a - b))
```

</details>

---

# Module 4: Loops

*Doing the same work many times without writing it many times.*

## 4.1 For Loops and range() (bonus waypoint)

### Brief

> **Bonus waypoint.** This one was not in your course outline, but the outline jumps straight to while loops. For loops come first almost everywhere else, and the rest of Module 4 assumes them, so this fills the gap.

A `for` loop walks through a collection and runs its block once per item. The loop variable takes each value in turn.

```python
peaks = ["Pulag", "Apo", "Ugo"]

for peak in peaks:
    print(peak)

# Pulag
# Apo
# Ugo
```
*Read it as: for each peak in peaks, do this.*

The name after `for` is yours to choose. It is created fresh on each pass and holds one item at a time. Singular names read best: `for peak in peaks`, `for row in rows`.

#### range()

When you need to repeat a fixed number of times rather than walk a collection, use `range()`. It produces numbers on demand.

```python
for i in range(3):
    print(i)          # 0, 1, 2

for i in range(1, 4):
    print(i)          # 1, 2, 3

for i in range(0, 10, 2):
    print(i)          # 0, 2, 4, 6, 8
```
*range(stop), range(start, stop), range(start, stop, step). Stop is always excluded.*

#### Accumulating

The most common loop pattern is starting with an empty total and adding to it each pass.

```python
elevations = [811, 1090, 2926]
total = 0
for e in elevations:
    total = total + e     # or total += e
print(total)              # 4827
```
*Set up the accumulator before the loop, not inside it.*

> **enumerate.** When you need both the position and the item, `for i, peak in enumerate(peaks):` gives you the index alongside the value, which is cleaner than managing a counter yourself.

### Drills

**Drill 1**

Print each peak in `peaks` on its own line using a for loop.

Starting point:

```python
peaks = ["Pulag", "Apo", "Ugo"]
```

*Hint: for peak in peaks: then an indented print(peak).*

<details><summary>Worked solution</summary>

```python
peaks = ["Pulag", "Apo", "Ugo"]
for peak in peaks:
    print(peak)
```

</details>

**Drill 2**

Add up every value in `elevations` into a variable `total` using a for loop, then print it. Do not use the built-in `sum()`.

Starting point:

```python
elevations = [811, 1090, 2926, 2150]
```

*Hint: Start total at 0 before the loop, then total += e inside it.*

<details><summary>Worked solution</summary>

```python
elevations = [811, 1090, 2926, 2150]
total = 0
for e in elevations:
    total += e
print(total)
```

</details>

### Knowledge check

**1. What does `for i in range(3)` produce?**

- A. 1, 2, 3
- B. 0, 1, 2
- C. 0, 1, 2, 3
- D. 3, 2, 1

<details><summary>Answer</summary>

**B.** range starts at 0 by default and stops before the number you give, so you get 0, 1 and 2.

</details>

**2. Where should an accumulator like `total = 0` be placed?**

- A. Inside the loop body
- B. Before the loop
- C. After the loop
- D. It does not matter

<details><summary>Answer</summary>

**B.** Inside the loop it would reset to zero on every pass, so the final value would only reflect the last item.

</details>

**3. What does `enumerate(items)` give you on each pass?**

- A. Just the item
- B. Just the index
- C. A pair of index and item
- D. The length

<details><summary>Answer</summary>

**C.** enumerate yields (index, item) pairs, which you usually unpack as `for i, item in enumerate(items):`.

</details>

### Checkpoint

**Coding checkpoint**

Loop over `elevations` with `enumerate` and print one line per peak in the form `1. 811 m`, `2. 1090 m` and so on, numbering from 1 rather than 0.

Starting point:

```python
elevations = [811, 1090, 2926]
```

*Hint: enumerate(elevations, start=1) begins the counter at 1.*

<details><summary>Worked solution</summary>

```python
elevations = [811, 1090, 2926]
for i, e in enumerate(elevations, start=1):
    print(f"{i}. {e} m")
```

</details>

---

## 4.2 While Loops

### Brief

A `while` loop repeats as long as its condition stays True. It checks the condition before every pass, including the first.

```python
altitude = 2400
while altitude < 2926:
    altitude += 150
    print(altitude)

print("Summit reached")
```
*The condition is re-tested at the top of every pass.*

Use `for` when you know the collection or the count. Use `while` when you are waiting for a condition to change and you do not know how many passes that will take.

#### The three parts you must not forget

- **Set up** the variable the condition tests, before the loop.
- **Test** it in the condition.
- **Change** it inside the body, in a way that moves toward making the condition False.

Miss the third and you have an **infinite loop**. The condition never becomes False, so the loop never ends.

```python
# infinite, altitude never changes
altitude = 2400
while altitude < 2926:
    print("climbing")
```
*Nothing inside the loop moves altitude toward 2926.*

> **Safe to experiment here.** Python runs in a background worker in this app, so an infinite loop is stopped after 12 seconds and you get a clear message instead of a frozen tab. Go ahead and try breaking one on purpose.

### Drills

**Drill 1**

Starting at `altitude = 2400`, gain 150 m per pass until you reach at least 2926. Print the altitude after each gain, then print `Summit reached` once the loop finishes.

Starting point:

```python
altitude = 2400
```

*Hint: while altitude < 2926: then altitude += 150 and a print inside. The final print goes outside the loop.*

<details><summary>Worked solution</summary>

```python
altitude = 2400
while altitude < 2926:
    altitude += 150
    print(altitude)
print("Summit reached")
```

</details>

**Drill 2**

Count down from 5 to 1, printing each number on its own line, then print `Go`. Use a while loop, not a for loop.

*Hint: Start n at 5, loop while n > 0, print n, then decrease n by 1.*

<details><summary>Worked solution</summary>

```python
n = 5
while n > 0:
    print(n)
    n -= 1
print("Go")
```

</details>

### Knowledge check

**1. When is a while loop's condition checked?**

- A. Only once at the start
- B. Before every pass, including the first
- C. Only after the first pass
- D. At the end of each pass

<details><summary>Answer</summary>

**B.** The condition is tested at the top. If it is False on the very first check, the body never runs at all.

</details>

**2. What causes an infinite loop?**

- A. Using while instead of for
- B. Nothing in the body changes what the condition tests
- C. Forgetting the colon
- D. Printing inside the loop

<details><summary>Answer</summary>

**B.** The loop only ends when the condition becomes False. If no code moves the tested value toward that, it never ends.

</details>

**3. Which situation suits a while loop better than a for loop?**

- A. Printing every item in a list
- B. Repeating exactly 10 times
- C. Reading until a running total passes a threshold
- D. Looping over a dictionary

<details><summary>Answer</summary>

**C.** You do not know in advance how many passes it takes to cross the threshold, which is exactly what while is for.

</details>

### Checkpoint

**Coding checkpoint**

You start at 0 m and gain a fixed 320 m per day. Using a while loop, count how many whole days it takes to reach or pass 2926 m. Store the count in `days` and print it in the form `10 days`.

Starting point:

```python
altitude = 0
days = 0
```

*Hint: Track altitude and days together. Loop while altitude < 2926, adding 320 and 1 each pass.*

<details><summary>Worked solution</summary>

```python
altitude = 0
days = 0
while altitude < 2926:
    altitude += 320
    days += 1
print(f"{days} days")
```

</details>

---

## 4.3 Loop Control: break and continue

### Brief

Two keywords change the normal flow of a loop from the inside.

- `break` exits the loop immediately. Nothing else in the body runs and no further passes happen.
- `continue` skips the rest of this pass and jumps straight to the next one. The loop keeps going.

```python
peaks = ["Ugo", "Pulag", "Apo", "Halcon"]

for peak in peaks:
    if peak == "Apo":
        break
    print(peak)

# Ugo
# Pulag
```
*break stops the whole loop at Apo, so Halcon is never reached.*

```python
for n in [1, 2, 3, 4, 5, 6]:
    if n % 2 != 0:
        continue
    print(n)

# 2
# 4
# 6
```
*continue skips the odd numbers and carries on.*

`break` is the natural tool for a search: walk through until you find what you want, then stop, because carrying on is wasted work.

```python
target = "Pulag"
found = False
for peak in peaks:
    if peak == target:
        found = True
        break
print(found)
```
*A flag variable plus break is the classic search shape.*

> **Loop else.** A loop can have an `else` block that runs only if the loop finished without hitting a `break`. It is unusual but handy for search code: the else means "not found".

### Drills

**Drill 1**

Print each peak in `peaks` until you reach `"Apo"`, which should not be printed. Stop the loop entirely at that point.

Starting point:

```python
peaks = ["Ugo", "Pulag", "Apo", "Halcon"]
```

*Hint: Check the name first, break before printing.*

<details><summary>Worked solution</summary>

```python
peaks = ["Ugo", "Pulag", "Apo", "Halcon"]
for peak in peaks:
    if peak == "Apo":
        break
    print(peak)
```

</details>

**Drill 2**

Print only the even numbers from `nums`, using `continue` to skip the odd ones rather than wrapping the print in an if.

Starting point:

```python
nums = [1, 2, 3, 4, 5, 6]
```

*Hint: if n % 2 != 0: continue, then print(n) below it.*

<details><summary>Worked solution</summary>

```python
nums = [1, 2, 3, 4, 5, 6]
for n in nums:
    if n % 2 != 0:
        continue
    print(n)
```

</details>

### Knowledge check

**1. What does `break` do?**

- A. Skips one pass
- B. Exits the loop entirely
- C. Restarts the loop
- D. Pauses the program

<details><summary>Answer</summary>

**B.** break leaves the loop immediately. Execution continues on the first line after the loop body.

</details>

**2. What does this print?**

```python
for n in [1, 2, 3]:
    if n == 2:
        continue
    print(n)
```

- A. 1
- B. 1 then 3
- C. 1 then 2 then 3
- D. Nothing

<details><summary>Answer</summary>

**B.** continue skips the rest of the pass where n is 2, so only 1 and 3 get printed. The loop is not stopped.

</details>

**3. Which is the natural tool for stopping a search once the item is found?**

- A. continue
- B. break
- C. pass
- D. return

<details><summary>Answer</summary>

**B.** Once you have found what you were looking for, break exits so you do not scan the rest for nothing.

</details>

### Checkpoint

**Coding checkpoint**

Walk through `readings`, skipping any negative value with `continue`, adding the rest to `total`, and stopping entirely with `break` the moment `total` reaches 5000 or more. Print `total` at the end. It should print `5211`.

Starting point:

```python
readings = [811, -1, 1090, 2926, -5, 384, 2150]
total = 0
```

*Hint: Handle the negative skip first, then add, then test the threshold and break.*

<details><summary>Worked solution</summary>

```python
readings = [811, -1, 1090, 2926, -5, 384, 2150]
total = 0
for r in readings:
    if r < 0:
        continue
    total += r
    if total >= 5000:
        break
print(total)
```

</details>

---

## 4.4 Looping Through Dictionaries and Lists

### Brief

Looping over a dictionary directly gives you the **keys**. Most of the time you want both key and value, which is what `.items()` is for.

```python
peak = {"name": "Pulag", "province": "Benguet", "elevation_m": 2926}

for key in peak:
    print(key)                    # name, province, elevation_m

for key, value in peak.items():
    print(f"{key}: {value}")      # name: Pulag ...
```
*`.items()` yields pairs, which you unpack into two names.*

- `.keys()` just the keys
- `.values()` just the values
- `.items()` both, as pairs

#### Lists of dictionaries

This is the shape real data usually arrives in: a list where every item is a record. You loop over the list, then read fields out of each record by key.

```python
peaks = [
    {"name": "Pulag", "elevation_m": 2926},
    {"name": "Ugo", "elevation_m": 2150},
]

for p in peaks:
    print(p["name"], p["elevation_m"])
```
*One pass per record. Inside the pass, `p` is one dictionary.*

#### Nested loops

A loop inside a loop runs the inner one completely for each pass of the outer one. Useful for grids and groupings, but the work multiplies fast, so keep an eye on the sizes.

```python
for region in ["Luzon", "Visayas"]:
    for n in [1, 2]:
        print(region, n)
# Luzon 1 / Luzon 2 / Visayas 1 / Visayas 2
```
*Four passes total: two outer times two inner.*

### Drills

**Drill 1**

Loop over the `peak` dictionary with `.items()` and print one line per pair in the form `name: Pulag`.

Starting point:

```python
peak = {"name": "Pulag", "province": "Benguet", "elevation_m": 2926}
```

*Hint: for key, value in peak.items(): then print with an f-string.*

<details><summary>Worked solution</summary>

```python
peak = {"name": "Pulag", "province": "Benguet", "elevation_m": 2926}
for key, value in peak.items():
    print(f"{key}: {value}")
```

</details>

**Drill 2**

Loop over the list of records and print only the peaks above 2000 m, in the form `Pulag 2926`.

Starting point:

```python
peaks = [
    {"name": "Pulag", "elevation_m": 2926},
    {"name": "Batulao", "elevation_m": 811},
    {"name": "Ugo", "elevation_m": 2150},
]
```

*Hint: Loop over peaks, then use an if on p["elevation_m"] inside the loop.*

<details><summary>Worked solution</summary>

```python
peaks = [
    {"name": "Pulag", "elevation_m": 2926},
    {"name": "Batulao", "elevation_m": 811},
    {"name": "Ugo", "elevation_m": 2150},
]
for p in peaks:
    if p["elevation_m"] > 2000:
        print(p["name"], p["elevation_m"])
```

</details>

### Knowledge check

**1. What does a plain `for x in mydict:` give you on each pass?**

- A. The values
- B. The keys
- C. Pairs of key and value
- D. An error

<details><summary>Answer</summary>

**B.** Iterating a dictionary directly walks its keys. Use .values() or .items() to get at the values.

</details>

**2. How do you loop over both keys and values at once?**

- A. `for k, v in d:`
- B. `for k, v in d.items():`
- C. `for k in d.pairs():`
- D. `for v in d.values():`

<details><summary>Answer</summary>

**B.** .items() yields (key, value) tuples, which the two loop names unpack automatically.

</details>

**3. How many lines does this print?**

```python
for a in [1, 2, 3]:
    for b in ["x", "y"]:
        print(a, b)
```

- A. 3
- B. 2
- C. 5
- D. 6

<details><summary>Answer</summary>

**D.** The inner loop runs fully for each outer pass, so it is 3 times 2, which is 6.

</details>

### Checkpoint

**Coding checkpoint**

From the list of records, build a dictionary `by_region` mapping each region to the number of peaks in it, then print it. Expected: `{'Luzon': 2, 'Visayas': 1}`.

Starting point:

```python
peaks = [
    {"name": "Pulag", "region": "Luzon"},
    {"name": "Kanlaon", "region": "Visayas"},
    {"name": "Ugo", "region": "Luzon"},
]
by_region = {}
```

*Hint: Loop over the records. Use by_region.get(region, 0) + 1 to handle the first time you see a region.*

<details><summary>Worked solution</summary>

```python
peaks = [
    {"name": "Pulag", "region": "Luzon"},
    {"name": "Kanlaon", "region": "Visayas"},
    {"name": "Ugo", "region": "Luzon"},
]
by_region = {}
for p in peaks:
    r = p["region"]
    by_region[r] = by_region.get(r, 0) + 1
print(by_region)
```

</details>

---

## 4.5 List Comprehensions

### Brief

A **list comprehension** builds a list in one expression. It replaces the very common pattern of creating an empty list and appending to it in a loop.

```python
# the long way
names = []
for p in peaks:
    names.append(p.upper())

# the comprehension
names = [p.upper() for p in peaks]
```
*Same result. The second version says it in one line.*

The shape is always: `[expression for item in collection]`. Read it right to left at first: take each item from the collection, apply the expression, collect the results.

#### Adding a filter

An `if` at the end keeps only the items you want.

```python
elevations = [811, 2926, 1090, 2150]

high = [e for e in elevations if e > 2000]
print(high)          # [2926, 2150]

km = [round(e / 1000, 2) for e in elevations if e > 2000]
print(km)            # [2.93, 2.15]
```
*Filter first, then the expression is applied to what survives.*

Dictionaries and sets have the same trick, using curly braces.

```python
peaks = ["Pulag", "Apo"]
lengths = {p: len(p) for p in peaks}
print(lengths)       # {'Pulag': 5, 'Apo': 3}

initials = {p[0] for p in peaks}
print(initials)      # {'P', 'A'}
```
*Dict comprehension needs a key: value pair. Set comprehension does not.*

> **Know when to stop.** Comprehensions are for one clear transformation, optionally filtered. Once you need several statements, nested conditions or a try block, write the ordinary loop. Readable beats clever.

### Drills

**Drill 1**

Using a list comprehension, build `upper` containing every name in `peaks` in uppercase, then print it.

Starting point:

```python
peaks = ["Pulag", "Apo", "Ugo"]
```

*Hint: [p.upper() for p in peaks]*

<details><summary>Worked solution</summary>

```python
peaks = ["Pulag", "Apo", "Ugo"]
upper = [p.upper() for p in peaks]
print(upper)
```

</details>

**Drill 2**

Using one comprehension with a filter, build `high_km` holding every elevation above 2000 converted to kilometres and rounded to two decimals. Print it.

Starting point:

```python
elevations = [811, 2926, 1090, 2150]
```

*Hint: [round(e / 1000, 2) for e in elevations if e > 2000]*

<details><summary>Worked solution</summary>

```python
elevations = [811, 2926, 1090, 2150]
high_km = [round(e / 1000, 2) for e in elevations if e > 2000]
print(high_km)
```

</details>

### Knowledge check

**1. What does `[x * 2 for x in [1, 2, 3]]` produce?**

- A. [1, 2, 3]
- B. [2, 4, 6]
- C. 6
- D. [[2], [4], [6]]

<details><summary>Answer</summary>

**B.** The expression `x * 2` is applied to each item and the results are collected into a new list.

</details>

**2. Where does the filter condition go?**

- A. Before the `for`
- B. At the end, after the `for` clause
- C. Inside the expression
- D. Comprehensions cannot filter

<details><summary>Answer</summary>

**B.** The form is `[expr for item in items if condition]`. Items failing the condition are dropped before the expression runs.

</details>

**3. When should you use an ordinary loop instead?**

- A. Whenever a filter is needed
- B. When the body needs several statements or error handling
- C. When the list is longer than 10 items
- D. Never, comprehensions are always better

<details><summary>Answer</summary>

**B.** Comprehensions hold one expression. Multi-step logic, try blocks or side effects belong in a normal loop where they stay readable.

</details>

### Checkpoint

**Coding checkpoint**

From the list of records, use one comprehension to build `labels`, a list of strings like `Pulag (2926 m)` for peaks above 2000 m only. Print it. Expected: `['Pulag (2926 m)', 'Ugo (2150 m)']`.

Starting point:

```python
peaks = [
    {"name": "Pulag", "elevation_m": 2926},
    {"name": "Batulao", "elevation_m": 811},
    {"name": "Ugo", "elevation_m": 2150},
]
```

*Hint: [f"{p['name']} ({p['elevation_m']} m)" for p in peaks if p['elevation_m'] > 2000]*

<details><summary>Worked solution</summary>

```python
peaks = [
    {"name": "Pulag", "elevation_m": 2926},
    {"name": "Batulao", "elevation_m": 811},
    {"name": "Ugo", "elevation_m": 2150},
]
labels = [f"{p['name']} ({p['elevation_m']} m)" for p in peaks if p["elevation_m"] > 2000]
print(labels)
```

</details>

---

# Module 5: Functions and Errors

*Packaging logic under a name, and keeping the program alive when something goes wrong.*

## 5.1 Defining Functions

### Brief

A **function** is a named block of code you can run whenever you want. You define it once with `def`, then **call** it by writing its name with brackets.

```python
def greet():
    print("Trail is open")
    print("Sign the logbook")

greet()
greet()
```
*Defining does not run it. Calling does. This prints four lines.*

The structure is the same as every other block in Python: the `def` line ends with a colon, and everything belonging to the function is indented underneath.

#### Why bother

- **No repetition.** Write the logic once, call it from anywhere.
- **One place to fix.** A bug lives in one function, not scattered across ten copies.
- **Names as documentation.** `calculate_pace()` explains itself. Six loose lines do not.

#### Docstrings

A triple-quoted string on the first line inside a function describes what it does. Unlike a comment it stays available at runtime through `help()`.

```python
def greet():
    """Print the standard trailhead notice."""
    print("Trail is open")
```
*One line, present tense, says what the function does.*

> **Define before you call.** Python reads top to bottom, so the `def` has to appear above the line that calls it. Calling a function that has not been defined yet gives a NameError.

### Drills

**Drill 1**

Define a function called `greet` that prints `Trail is open`, then call it twice.

*Hint: def greet(): with an indented print, then two calls to greet() at the bottom.*

<details><summary>Worked solution</summary>

```python
def greet():
    print("Trail is open")

greet()
greet()
```

</details>

**Drill 2**

Define `trail_notice` with a docstring, which prints two lines: `Trail is open` and `Sign the logbook`. Call it once.

*Hint: The docstring is a triple-quoted string as the first line inside the function.*

<details><summary>Worked solution</summary>

```python
def trail_notice():
    """Print the standard trailhead notice."""
    print("Trail is open")
    print("Sign the logbook")

trail_notice()
```

</details>

### Knowledge check

**1. What does defining a function with `def` do on its own?**

- A. Runs the code inside it
- B. Creates the function without running it
- C. Prints its name
- D. Nothing at all

<details><summary>Answer</summary>

**B.** The def statement creates the function object and binds the name. The body only runs when you call it.

</details>

**2. How do you call a function named `greet`?**

- A. `greet`
- B. `greet()`
- C. `call greet`
- D. `def greet()`

<details><summary>Answer</summary>

**B.** The brackets are what triggers the call. Writing the bare name just refers to the function object itself.

</details>

**3. What is a docstring?**

- A. A comment starting with #
- B. A triple-quoted description as the first line in the function
- C. A variable named doc
- D. A required parameter

<details><summary>Answer</summary>

**B.** Docstrings survive at runtime and show up in help() and IDE tooltips, which plain # comments do not.

</details>

### Checkpoint

**Coding checkpoint**

Define a function `route_card` with a docstring that prints exactly three lines: `Route: Ambangeg`, `Peak: Pulag`, `Permit: required`. Call it once.

*Hint: Three prints inside the function, one call after the definition.*

<details><summary>Worked solution</summary>

```python
def route_card():
    """Print the standard route summary card."""
    print("Route: Ambangeg")
    print("Peak: Pulag")
    print("Permit: required")

route_card()
```

</details>

---

## 5.2 Function Parameters and Return Values

### Brief

**Parameters** are the inputs a function accepts. You list them in the brackets of the `def` line. The values you pass when calling are the **arguments**.

```python
def describe(name, elevation):
    print(f"{name} is {elevation} m")

describe("Pulag", 2926)
describe("Ugo", 2150)
```
*Same function, different inputs, different output.*

#### return sends a value back

This is the important distinction. `print` shows something on screen. `return` hands a value back to whoever called the function, so it can be stored and used. A function with no `return` gives back `None`.

```python
def pace(distance_km, hours):
    return round(distance_km / hours, 2)

result = pace(12.4, 6.5)
print(result)          # 1.91
print(pace(8, 4) * 2)  # 4.0, you can use it in an expression
```
*A returned value can be stored, printed or fed into more maths.*

`return` also **exits the function immediately**. Nothing after it runs, which makes it useful for handling special cases early.

#### Default and keyword arguments

```python
def describe(name, elevation, unit="m"):
    return f"{name} is {elevation} {unit}"

print(describe("Pulag", 2926))
print(describe("Pulag", 2.9, unit="km"))
print(describe(elevation=2926, name="Pulag"))
```
*Defaults make a parameter optional. Keywords let you pass in any order.*

> **Parameters with defaults go last.** `def f(a, b=1)` is fine, `def f(a=1, b)` is a syntax error, because Python would not know how to match a bare positional argument.

### Drills

**Drill 1**

Write a function `describe(name, elevation)` that **returns** the string `Pulag is 2926 m`. Call it with those values, store the result in `line`, and print `line`.

*Hint: Use return with an f-string, not print, inside the function.*

<details><summary>Worked solution</summary>

```python
def describe(name, elevation):
    return f"{name} is {elevation} m"

line = describe("Pulag", 2926)
print(line)
```

</details>

**Drill 2**

Write `pace(distance_km, hours)` returning the speed rounded to two decimals, with `hours` defaulting to `1`. Store `pace(12.4, 6.5)` in `p1` and `pace(8)` in `p2`, then print both on one line.

*Hint: def pace(distance_km, hours=1): the default must come last.*

<details><summary>Worked solution</summary>

```python
def pace(distance_km, hours=1):
    return round(distance_km / hours, 2)

p1 = pace(12.4, 6.5)
p2 = pace(8)
print(p1, p2)
```

</details>

### Knowledge check

**1. What is the difference between `print` and `return`?**

- A. No difference
- B. print shows text on screen, return hands a value back to the caller
- C. return is faster
- D. print works only inside functions

<details><summary>Answer</summary>

**B.** A printed value is gone once shown. A returned value can be stored in a variable and used in further code.

</details>

**2. What does a function return when it has no `return` statement?**

- A. 0
- B. An empty string
- C. None
- D. It raises an error

<details><summary>Answer</summary>

**C.** Every function returns something. With no explicit return, that something is None.

</details>

**3. Which definition is valid?**

- A. `def f(a=1, b):`
- B. `def f(a, b=1):`
- C. `def f(a=1, b, c):`
- D. `def f(=a, b):`

<details><summary>Answer</summary>

**B.** Parameters with defaults must come after those without, otherwise positional arguments could not be matched unambiguously.

</details>

### Checkpoint

**Coding checkpoint**

Write `summit_time(distance_km, kph=2.0, rest_min=0)` that returns total minutes rounded to the nearest whole number: the walking time plus the rest. Store `summit_time(12.4, 2.0, 45)` in `mins` and print exactly `417 minutes`.

*Hint: Walking minutes is distance / kph * 60. Add rest_min, then round().*

<details><summary>Worked solution</summary>

```python
def summit_time(distance_km, kph=2.0, rest_min=0):
    walking = distance_km / kph * 60
    return round(walking + rest_min)

mins = summit_time(12.4, 2.0, 45)
print(f"{mins} minutes")
```

</details>

---

## 5.3 Built-in Functions for Data

### Brief

Python ships with functions that cover most everyday summarising. Reaching for these instead of writing your own loop is shorter and less error prone.

```python
elevations = [811, 2926, 1090, 2150]

print(len(elevations))     # 4
print(sum(elevations))     # 6977
print(min(elevations))     # 811
print(max(elevations))     # 2926
print(sorted(elevations))  # [811, 1090, 2150, 2926]
```
*The core five. Between them they answer most simple questions about a list.*

An average is just `sum(x) / len(x)`. There is no built-in `average`, which surprises people, but the division says it plainly enough.

#### The key argument

`min`, `max` and `sorted` accept `key=`, a function telling them what to compare. This is how you sort records by one field.

```python
peaks = [
    {"name": "Ugo", "elev": 2150},
    {"name": "Pulag", "elev": 2926},
]

highest = max(peaks, key=lambda p: p["elev"])
print(highest["name"])     # Pulag

by_name = sorted(peaks, key=lambda p: p["name"])
print([p["name"] for p in by_name])   # ['Pulag', 'Ugo']
```
*`lambda p: p['elev']` is a small throwaway function saying 'compare on this field'.*

#### A few more worth knowing

- `any(conditions)` True when at least one item is truthy, `all(...)` True when every one is
- `round(x, n)`, `abs(x)`, `type(x)`
- `zip(a, b)` pairs up two collections item by item

```python
names = ["Pulag", "Ugo"]
elevs = [2926, 2150]
for n, e in zip(names, elevs):
    print(n, e)

print(any(e > 2500 for e in elevs))   # True
print(all(e > 2500 for e in elevs))   # False
```
*zip walks two lists in step. any and all summarise a set of conditions.*

### Drills

**Drill 1**

Using built-ins only, print four lines from `elevations`: the count, the sum, the highest value, and the average rounded to two decimals.

Starting point:

```python
elevations = [811, 2926, 1090, 2150]
```

*Hint: len, sum, max, then round(sum(x) / len(x), 2).*

<details><summary>Worked solution</summary>

```python
elevations = [811, 2926, 1090, 2150]
print(len(elevations))
print(sum(elevations))
print(max(elevations))
print(round(sum(elevations) / len(elevations), 2))
```

</details>

**Drill 2**

Find the record with the highest elevation using `max` with a `key`, store it in `highest`, and print just its name.

Starting point:

```python
peaks = [
    {"name": "Ugo", "elev": 2150},
    {"name": "Pulag", "elev": 2926},
    {"name": "Batulao", "elev": 811},
]
```

*Hint: max(peaks, key=lambda p: p["elev"]) then read ["name"] off the result.*

<details><summary>Worked solution</summary>

```python
peaks = [
    {"name": "Ugo", "elev": 2150},
    {"name": "Pulag", "elev": 2926},
    {"name": "Batulao", "elev": 811},
]
highest = max(peaks, key=lambda p: p["elev"])
print(highest["name"])
```

</details>

### Knowledge check

**1. How do you get the average of a list called `values`?**

- A. `average(values)`
- B. `values.mean()`
- C. `sum(values) / len(values)`
- D. `avg(values)`

<details><summary>Answer</summary>

**C.** Python has no built-in average. Dividing the sum by the count is the standard way, and pandas gives you .mean() later.

</details>

**2. What does `key=` do in `sorted(items, key=...)`?**

- A. Filters items out
- B. Says which value to compare each item by
- C. Reverses the order
- D. Renames the items

<details><summary>Answer</summary>

**B.** The key function is applied to each item and the results are what get compared, which is how you sort records by a chosen field.

</details>

**3. What does `any([False, False, True])` return?**

- A. True
- B. False
- C. 1
- D. An error

<details><summary>Answer</summary>

**A.** any is True when at least one item is truthy. all would be False here because not every item is True.

</details>

### Checkpoint

**Coding checkpoint**

Given `names` and `elevs`, print exactly two lines: the name of the highest peak, and `True` or `False` for whether every peak is above 1000 m. Use `zip` and `max` for the first, and `all` for the second.

Starting point:

```python
names = ["Batulao", "Pulag", "Ugo"]
elevs = [811, 2926, 2150]
```

*Hint: max(zip(elevs, names))[1] works, or zip into a list first. For the second, all(e > 1000 for e in elevs).*

<details><summary>Worked solution</summary>

```python
names = ["Batulao", "Pulag", "Ugo"]
elevs = [811, 2926, 2150]
pairs = list(zip(names, elevs))
highest = max(pairs, key=lambda p: p[1])
print(highest[0])
print(all(e > 1000 for e in elevs))
```

</details>

---

## 5.4 Handling Errors and Exceptions

### Brief

When something goes wrong Python raises an **exception** and, unless you handle it, the program stops. `try` and `except` let you catch that and carry on.

```python
raw = "not a number"

try:
    value = int(raw)
except ValueError:
    value = 0
    print("Could not read that, using 0")

print(value)
```
*The risky line goes in try. The recovery goes in except.*

#### The exceptions you will meet most

- `ValueError` right type, wrong content, like `int("abc")`
- `TypeError` wrong type entirely, like `"5" + 5`
- `KeyError` a dictionary key that is not there
- `IndexError` a list position past the end
- `ZeroDivisionError` dividing by zero
- `FileNotFoundError` opening a file that does not exist

Catch the **specific** exception you expect. A bare `except:` swallows everything including typos in your own code, which turns a five second fix into an hour of confusion.

```python
def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None

print(safe_divide(10, 2))   # 5.0
print(safe_divide(10, 0))   # None
```
*Name the error you expect. Let anything else surface.*

#### else and finally

- `else` runs only when the try block raised nothing
- `finally` runs either way, ideal for cleanup

```python
try:
    n = int("42")
except ValueError:
    print("bad input")
else:
    print("parsed", n)
finally:
    print("done")
```
*Output: parsed 42, then done.*

> **Read the traceback bottom up.** The last line names the exception type and message. The lines above show the path that got you there, with your own file usually nearest the bottom.

### Drills

**Drill 1**

Try converting `raw` to an int. If it fails, set `value` to `0` and print `Could not read that, using 0`. Print `value` at the end either way.

Starting point:

```python
raw = "not a number"
```

*Hint: Catch ValueError specifically, not a bare except.*

<details><summary>Worked solution</summary>

```python
raw = "not a number"
try:
    value = int(raw)
except ValueError:
    value = 0
    print("Could not read that, using 0")
print(value)
```

</details>

**Drill 2**

Write `safe_divide(a, b)` that returns the division result, or `None` when `b` is zero. Print `safe_divide(10, 2)` and `safe_divide(10, 0)` on two lines.

*Hint: Wrap the return in try, catch ZeroDivisionError and return None.*

<details><summary>Worked solution</summary>

```python
def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None

print(safe_divide(10, 2))
print(safe_divide(10, 0))
```

</details>

### Knowledge check

**1. Which error does `int("abc")` raise?**

- A. TypeError
- B. ValueError
- C. KeyError
- D. SyntaxError

<details><summary>Answer</summary>

**B.** The argument is the right type, a string, but its content cannot be read as a number, which is exactly what ValueError means.

</details>

**2. Why is a bare `except:` a bad habit?**

- A. It is slower
- B. It catches everything including your own typos, hiding real bugs
- C. It is not valid Python
- D. It only works once

<details><summary>Answer</summary>

**B.** Catching everything makes genuine mistakes silently disappear. Name the exception you actually expect to handle.

</details>

**3. When does a `finally` block run?**

- A. Only on success
- B. Only on failure
- C. Always, whether or not an exception was raised
- D. Only when there is no except

<details><summary>Answer</summary>

**C.** finally always runs, which is why it is used for cleanup like closing files or releasing resources.

</details>

### Checkpoint

**Coding checkpoint**

Write `read_elevation(record, key)` that returns the int value at `key`, or `0` when the key is missing or the value cannot be converted. Catch `KeyError` and `ValueError` separately. Print three lines: the result for `"elev"`, for `"days"`, and for `"missing"`.

Starting point:

```python
record = {"elev": "2926", "days": "two"}
```

*Hint: Two except blocks, or one `except (KeyError, ValueError):`. The spec asks for them separately.*

<details><summary>Worked solution</summary>

```python
record = {"elev": "2926", "days": "two"}

def read_elevation(rec, key):
    try:
        return int(rec[key])
    except KeyError:
        return 0
    except ValueError:
        return 0

print(read_elevation(record, "elev"))
print(read_elevation(record, "days"))
print(read_elevation(record, "missing"))
```

</details>

---

# Module 6: Files and External Data

*Reading data that lives outside your program.*

## 6.1 Working with External Files

### Brief

`open()` gives you a connection to a file. The second argument is the **mode**: `"r"` to read, `"w"` to write from scratch, `"a"` to append to the end.

```python
with open("packlist.txt", "r") as f:
    text = f.read()

print(text)
```
*`with` closes the file for you, even if something goes wrong inside the block.*

Always use the `with` form. Without it you have to remember `f.close()`, and a file left open can lose data that is still sitting in a buffer.

#### Three ways to read

- `f.read()` the whole file as one string
- `f.readlines()` a list of lines, each still carrying its newline
- looping over `f` directly, one line at a time, which uses the least memory

```python
with open("packlist.txt") as f:
    for line in f:
        print(line.strip())
```
*`.strip()` removes the trailing newline. Forget it and you get double spacing.*

#### Writing

```python
with open("log.txt", "w") as f:
    f.write("Day 1: Ambangeg\n")
    f.write("Day 2: summit\n")
```
*`"w"` wipes any existing file. Use `"a"` to add to the end instead.*

> **Files in this app.** Two sample files are already in the virtual filesystem: `packlist.txt` and `trails.csv`. They live in the browser only, so writing to them is safe and nothing touches your machine.

### Drills

**Drill 1**

Open `packlist.txt`, read every line, and print each item stripped of its trailing newline.

*Hint: with open("packlist.txt") as f: then loop over f and print(line.strip()).*

<details><summary>Worked solution</summary>

```python
with open("packlist.txt") as f:
    for line in f:
        print(line.strip())
```

</details>

**Drill 2**

Write two lines to a new file `log.txt`, then read it back and print how many lines it has.

*Hint: Open with "w" to write, remember the \n at the end of each line, then reopen to read.*

<details><summary>Worked solution</summary>

```python
with open("log.txt", "w") as f:
    f.write("Day 1: Ambangeg\n")
    f.write("Day 2: summit\n")

with open("log.txt") as f:
    lines = f.readlines()

print(len(lines))
```

</details>

### Knowledge check

**1. Why is `with open(...) as f:` preferred?**

- A. It is faster
- B. It closes the file automatically, even when an error occurs
- C. It is the only way to read files
- D. It compresses the file

<details><summary>Answer</summary>

**B.** The with block guarantees cleanup. Without it you must call f.close() yourself and an exception can skip that line.

</details>

**2. What does mode `"w"` do to a file that already exists?**

- A. Appends to the end
- B. Raises an error
- C. Wipes it and starts empty
- D. Opens it read only

<details><summary>Answer</summary>

**C.** Write mode truncates the file. Use `"a"` when you want to keep what is already there.

</details>

**3. Why call `.strip()` on each line when looping over a file?**

- A. To convert to uppercase
- B. To remove the trailing newline character
- C. To split on commas
- D. It is not needed

<details><summary>Answer</summary>

**B.** Each line read from a file keeps its newline, so printing it adds a second line break unless you strip it.

</details>

### Checkpoint

**Coding checkpoint**

Read `packlist.txt`, count the items, and print exactly two lines: `Items: 5` and `Longest: first aid kit`. Ignore any blank lines.

*Hint: Build a list of stripped, non-empty lines first. Then len() for the count and max(items, key=len) for the longest.*

<details><summary>Worked solution</summary>

```python
with open("packlist.txt") as f:
    items = [line.strip() for line in f if line.strip()]

print(f"Items: {len(items)}")
print(f"Longest: {max(items, key=len)}")
```

</details>

---

## 6.2 Reading CSV Files with Python

### Brief

A **CSV** is a plain text table. One row per line, fields separated by commas, and the first line is usually the header naming each column.

The sample dataset `trails.csv` has 20 rows and 7 columns: `name`, `region`, `province`, `elevation_m`, `difficulty`, `days`, `climbers`.

You could split each line on commas yourself, but the `csv` module handles the awkward cases, like a field that contains a comma inside quotes.

```python
import csv

with open("trails.csv") as f:
    reader = csv.reader(f)
    header = next(reader)      # pull the first row off
    for row in reader:
        print(row[0], row[3])  # name, elevation_m
```
*`csv.reader` gives each row as a list of strings.*

#### DictReader is usually better

`csv.DictReader` uses the header row to give you a dictionary per row, so you read fields by name instead of counting columns.

```python
import csv

with open("trails.csv") as f:
    for row in csv.DictReader(f):
        print(row["name"], row["elevation_m"])
```
*No index counting, and the code survives a column being reordered.*

> **Everything comes back as a string.** `row["elevation_m"]` is `"2926"`, not `2926`. Convert with `int()` or `float()` before doing any maths, or your sums will silently concatenate text.

### Drills

**Drill 1**

Using `csv.DictReader`, print the name and elevation of the first three rows in `trails.csv`, one per line, in the form `Apo 2954`.

Starting point:

```python
import csv
```

*Hint: Count rows as you go and break after three. Remember to import csv first.*

<details><summary>Worked solution</summary>

```python
import csv

with open("trails.csv") as f:
    for i, row in enumerate(csv.DictReader(f)):
        if i == 3:
            break
        print(row["name"], row["elevation_m"])
```

</details>

**Drill 2**

Count how many rows in `trails.csv` have an elevation above 2500, store it in `count`, and print it.

Starting point:

```python
import csv

count = 0
```

*Hint: Convert the field with int() before comparing, otherwise you are comparing text.*

<details><summary>Worked solution</summary>

```python
import csv

count = 0
with open("trails.csv") as f:
    for row in csv.DictReader(f):
        if int(row["elevation_m"]) > 2500:
            count += 1

print(count)
```

</details>

### Knowledge check

**1. What does the first line of a typical CSV contain?**

- A. The first data row
- B. The column names
- C. The row count
- D. A comment

<details><summary>Answer</summary>

**B.** The header row names the columns, which is what DictReader uses as the keys for every row dictionary.

</details>

**2. What type is `row["elevation_m"]` from a DictReader?**

- A. int
- B. float
- C. str
- D. It depends on the value

<details><summary>Answer</summary>

**C.** The csv module does no type inference. Every field arrives as a string and you convert what you need.

</details>

**3. Why prefer `csv.DictReader` over `csv.reader`?**

- A. It is faster
- B. You access fields by column name instead of by position
- C. It sorts the rows
- D. It skips blank lines

<details><summary>Answer</summary>

**B.** Reading by name is clearer and does not break when columns get reordered or a new one is inserted.

</details>

### Checkpoint

**Coding checkpoint**

Read `trails.csv` and print exactly two lines: `Rows: 20` and the average elevation across all rows rounded to one decimal, in the form `Mean: 2374.4`.

Starting point:

```python
import csv
```

*Hint: Collect the converted elevations into a list, then use len() and sum() on it.*

<details><summary>Worked solution</summary>

```python
import csv

elevs = []
with open("trails.csv") as f:
    for row in csv.DictReader(f):
        elevs.append(int(row["elevation_m"]))

print(f"Rows: {len(elevs)}")
print(f"Mean: {round(sum(elevs) / len(elevs), 1)}")
```

</details>

---

# Module 7: Pandas and Data Analysis

*The same questions as Module 6, answered in one line instead of a loop.*

## 7.1 Introduction to Pandas

### Brief

> **First run is slow.** pandas is about 10 MB and downloads once when you run your first cell in this module. After that it is instant. Give it up to a minute on a slow connection.

**pandas** is a library for working with tables. Its main object is the **DataFrame**, which is a table with named columns and an index, essentially a spreadsheet you can program.

```python
import pandas as pd

df = pd.read_csv("trails.csv")
print(df.shape)      # (20, 7)  rows, columns
print(df.columns.tolist())
```
*`pd` is the universal nickname for pandas. Everyone writes it this way.*

Compare this against Module 6. Reading a CSV, converting the numbers and counting the rows took a loop and a manual `int()` call. pandas does it in one line and infers the types for you.

#### DataFrame and Series

- A **DataFrame** is the whole table.
- A **Series** is a single column, which is what you get with `df["elevation_m"]`.

```python
col = df["elevation_m"]
print(type(col))       # <class 'pandas.core.series.Series'>
print(col.max())       # 2954
print(col.mean())      # 2374.4
```
*Series carry their own methods: .max(), .mean(), .sum(), .count().*

Selecting several columns needs a list inside the brackets, which is why you see double square brackets so often: `df[["name", "region"]]`.

### Drills

**Drill 1**

Load `trails.csv` into a DataFrame called `df`, then print its shape and the list of column names on two lines.

Starting point:

```python
import pandas as pd
```

*Hint: pd.read_csv("trails.csv"), then df.shape and df.columns.tolist().*

<details><summary>Worked solution</summary>

```python
import pandas as pd

df = pd.read_csv("trails.csv")
print(df.shape)
print(df.columns.tolist())
```

</details>

**Drill 2**

Pull the `elevation_m` column into `col` and print its maximum and its mean on two lines.

Starting point:

```python
import pandas as pd
df = pd.read_csv("trails.csv")
```

*Hint: df["elevation_m"] gives a Series, which has .max() and .mean().*

<details><summary>Worked solution</summary>

```python
import pandas as pd
df = pd.read_csv("trails.csv")
col = df["elevation_m"]
print(col.max())
print(col.mean())
```

</details>

### Knowledge check

**1. What is a DataFrame?**

- A. A single column of values
- B. A table with named columns and an index
- C. A Python dictionary
- D. A CSV file on disk

<details><summary>Answer</summary>

**B.** The DataFrame is the whole table. A single column pulled out of it is a Series.

</details>

**2. What does `df.shape` return?**

- A. The column names
- B. A tuple of (rows, columns)
- C. The file size
- D. The data types

<details><summary>Answer</summary>

**B.** shape is a tuple, so `df.shape[0]` is the row count and `df.shape[1]` the column count.

</details>

**3. Why does selecting several columns use double brackets?**

- A. A quirk with no meaning
- B. The inner brackets are a list of column names passed to the outer selector
- C. It makes a copy
- D. It sorts the columns

<details><summary>Answer</summary>

**B.** `df[["a", "b"]]` is `df[` plus the list `["a", "b"]`. One name gives a Series, a list of names gives a DataFrame.

</details>

### Checkpoint

**Coding checkpoint**

Load `trails.csv` and print exactly three lines: the number of rows, the number of columns, and the mean elevation rounded to one decimal.

Starting point:

```python
import pandas as pd
```

*Hint: df.shape[0] and df.shape[1] give the two counts. round(df["elevation_m"].mean(), 1) gives the mean.*

<details><summary>Worked solution</summary>

```python
import pandas as pd

df = pd.read_csv("trails.csv")
print(df.shape[0])
print(df.shape[1])
print(round(df["elevation_m"].mean(), 1))
```

</details>

---

## 7.2 Exploring Data with Pandas

### Brief

Before you analyse anything, look at it. These four calls are what you run on any table you have never seen before.

- `df.head(n)` the first n rows, default 5
- `df.info()` column names, how many non-empty values each has, and the types
- `df.describe()` count, mean, standard deviation, min, quartiles and max for the numeric columns
- `df.dtypes` just the types

```python
import pandas as pd
df = pd.read_csv("trails.csv")

print(df.head(3))
print(df.dtypes)
print(df["elevation_m"].describe())
```
*head to see the shape of it, dtypes to catch numbers that arrived as text.*

#### Counting categories

`.value_counts()` on a column tells you how many rows fall into each distinct value. It is one of the most useful methods in the whole library.

```python
print(df["region"].value_counts())
# Luzon      12
# Visayas     4
# Mindanao    3
# Mindoro     1

print(df["region"].nunique())    # 4
print(df["region"].unique())     # the distinct values
```
*value_counts sorts by frequency, highest first.*

#### Sorting

```python
top = df.sort_values("elevation_m", ascending=False).head(3)
print(top[["name", "elevation_m"]])
```
*sort_values returns a new DataFrame. Chain .head() to take the top few.*

> **Missing values.** Real data has gaps, shown as `NaN`. `df.isna().sum()` counts them per column, `.dropna()` removes those rows and `.fillna(value)` replaces them. Always check before you trust a mean.

### Drills

**Drill 1**

Print the first three rows of `df`, then the count of peaks per region.

Starting point:

```python
import pandas as pd
df = pd.read_csv("trails.csv")
```

*Hint: df.head(3) and df["region"].value_counts().*

<details><summary>Worked solution</summary>

```python
import pandas as pd
df = pd.read_csv("trails.csv")
print(df.head(3))
print(df["region"].value_counts())
```

</details>

**Drill 2**

Sort the table by elevation, highest first, take the top three, and print only their `name` and `elevation_m` columns.

Starting point:

```python
import pandas as pd
df = pd.read_csv("trails.csv")
```

*Hint: df.sort_values("elevation_m", ascending=False).head(3), then select the two columns with double brackets.*

<details><summary>Worked solution</summary>

```python
import pandas as pd
df = pd.read_csv("trails.csv")
top = df.sort_values("elevation_m", ascending=False).head(3)
print(top[["name", "elevation_m"]])
```

</details>

### Knowledge check

**1. What does `df.head()` show by default?**

- A. The column names
- B. The first 5 rows
- C. A summary of statistics
- D. The last 5 rows

<details><summary>Answer</summary>

**B.** head returns the first 5 rows unless you pass a different number. `df.tail()` is its opposite.

</details>

**2. What does `df["region"].value_counts()` give you?**

- A. The distinct regions only
- B. How many rows fall into each region
- C. The total row count
- D. The regions sorted alphabetically

<details><summary>Answer</summary>

**B.** It counts occurrences of each distinct value and sorts by frequency. `.unique()` gives just the distinct values.

</details>

**3. How do you check for missing values per column?**

- A. `df.missing()`
- B. `df.isna().sum()`
- C. `df.count()`
- D. `df.nulls`

<details><summary>Answer</summary>

**B.** isna() produces a table of True and False, and summing it counts the Trues in each column.

</details>

### Checkpoint

**Coding checkpoint**

Print exactly three lines: the number of distinct regions, the name of the highest peak, and the name of the lowest peak.

Starting point:

```python
import pandas as pd
df = pd.read_csv("trails.csv")
```

*Hint: nunique() for the first. Sort by elevation and read the name from the first row with .iloc[0], both ascending and descending.*

<details><summary>Worked solution</summary>

```python
import pandas as pd
df = pd.read_csv("trails.csv")
print(df["region"].nunique())
print(df.sort_values("elevation_m", ascending=False).iloc[0]["name"])
print(df.sort_values("elevation_m").iloc[0]["name"])
```

</details>

---

## 7.3 Filtering Data in Pandas

### Brief

Filtering works in two steps. First build a **boolean mask**, a column of True and False. Then use that mask to select rows.

```python
import pandas as pd
df = pd.read_csv("trails.csv")

mask = df["elevation_m"] > 2500
print(mask.head())         # True/False per row

high = df[mask]
print(len(high))           # 10
```
*Usually written in one line: `df[df["elevation_m"] > 2500]`.*

#### Combining conditions

Here is the part that catches everyone. In pandas you use `&` for and, `|` for or, and `~` for not. The plain words `and` and `or` do not work on Series. **Every condition must be wrapped in its own brackets**, because `&` binds more tightly than `>`.

```python
luzon_high = df[(df["region"] == "Luzon") & (df["elevation_m"] > 2500)]
print(len(luzon_high))     # 6

easy_or_low = df[(df["difficulty"] <= 3) | (df["elevation_m"] < 1200)]
print(len(easy_or_low))    # 3
```
*Brackets around each condition. Forgetting them is the single most common pandas error.*

#### Other useful filters

- `df[df["region"].isin(["Luzon", "Visayas"])]` matches any value in a list
- `df[df["name"].str.startswith("K")]` string tests through `.str`
- `df[df["elevation_m"].between(2000, 2500)]` an inclusive range

```python
sel = df[df["region"].isin(["Visayas", "Mindoro"])]
print(sel[["name", "region"]].to_string(index=False))
```
*`.to_string(index=False)` prints without the row numbers.*

### Drills

**Drill 1**

Select every row where the elevation is above 2500 into `high`, and print how many there are.

Starting point:

```python
import pandas as pd
df = pd.read_csv("trails.csv")
```

*Hint: df[df["elevation_m"] > 2500] then len().*

<details><summary>Worked solution</summary>

```python
import pandas as pd
df = pd.read_csv("trails.csv")
high = df[df["elevation_m"] > 2500]
print(len(high))
```

</details>

**Drill 2**

Select rows in Luzon **and** above 2500 m into `luzon_high`, then print the count. Remember the bracket rule.

Starting point:

```python
import pandas as pd
df = pd.read_csv("trails.csv")
```

*Hint: df[(cond1) & (cond2)] with each condition in its own brackets.*

<details><summary>Worked solution</summary>

```python
import pandas as pd
df = pd.read_csv("trails.csv")
luzon_high = df[(df["region"] == "Luzon") & (df["elevation_m"] > 2500)]
print(len(luzon_high))
```

</details>

### Knowledge check

**1. What is a boolean mask?**

- A. A list of column names
- B. A Series of True and False used to pick rows
- C. A way to hide columns
- D. A sorting order

<details><summary>Answer</summary>

**B.** The comparison produces one True or False per row, and passing that back into df keeps only the True rows.

</details>

**2. Which operator means 'and' when filtering a DataFrame?**

- A. `and`
- B. `&`
- C. `+`
- D. `AND`

<details><summary>Answer</summary>

**B.** pandas needs the element-wise operators `&`, `|` and `~`. The plain keywords raise an error on a Series.

</details>

**3. Why does `df[df["a"] > 1 & df["b"] < 2]` fail?**

- A. `&` is not valid in pandas
- B. `&` binds tighter than the comparisons, so each condition needs its own brackets
- C. You cannot combine two columns
- D. It needs `.filter()`

<details><summary>Answer</summary>

**B.** Python evaluates `1 & df["b"]` first because of precedence. Writing `(df["a"] > 1) & (df["b"] < 2)` fixes it.

</details>

### Checkpoint

**Coding checkpoint**

Print exactly two lines: the number of Luzon peaks between 2000 and 2800 metres inclusive, and the number of peaks whose region is either Visayas or Mindanao.

Starting point:

```python
import pandas as pd
df = pd.read_csv("trails.csv")
```

*Hint: `.between(2000, 2800)` is inclusive on both ends. `.isin([...])` handles the second one.*

<details><summary>Worked solution</summary>

```python
import pandas as pd
df = pd.read_csv("trails.csv")
band = df[(df["region"] == "Luzon") & (df["elevation_m"].between(2000, 2800))]
print(len(band))
south = df[df["region"].isin(["Visayas", "Mindanao"])]
print(len(south))
```

</details>

---

## 7.4 Grouping and Aggregating in Pandas

### Brief

`.groupby()` splits the table into groups sharing a value, applies a summary to each group, and combines the results. Split, apply, combine.

```python
import pandas as pd
df = pd.read_csv("trails.csv")

print(df.groupby("region")["elevation_m"].mean())
# Luzon       2297.42
# Mindanao    2930.33
# Mindoro     2586.00
# Visayas     2135.75
```
*Group by region, pick a column, apply a summary. Read it left to right.*

Think of the loop this replaces. In Module 4 you built a counting dictionary by hand. Here it is one call, and the summary can be a mean, sum, min, max or count.

```python
print(df.groupby("region").size())              # rows per group
print(df.groupby("region")["climbers"].sum())   # total climbers per region
```
*`.size()` counts rows in each group without needing a column.*

#### Several summaries at once

`.agg()` takes a list of summaries, or a dictionary mapping each column to what you want from it.

```python
out = df.groupby("region").agg(
    peaks=("name", "count"),
    mean_elev=("elevation_m", "mean"),
    highest=("elevation_m", "max"),
)
print(out.round(1))
```
*Named aggregation: new_column=(source_column, summary). Clear and self-documenting.*

> **The grouped column becomes the index.** Add `.reset_index()` to turn it back into an ordinary column, which you almost always want before saving or plotting the result.

### Drills

**Drill 1**

Print the mean elevation per region, rounded to one decimal.

Starting point:

```python
import pandas as pd
df = pd.read_csv("trails.csv")
```

*Hint: df.groupby("region")["elevation_m"].mean().round(1)*

<details><summary>Worked solution</summary>

```python
import pandas as pd
df = pd.read_csv("trails.csv")
print(df.groupby("region")["elevation_m"].mean().round(1))
```

</details>

**Drill 2**

Count how many peaks are in each region and print the result, highest count first.

Starting point:

```python
import pandas as pd
df = pd.read_csv("trails.csv")
```

*Hint: df.groupby("region").size().sort_values(ascending=False), or value_counts() which already sorts.*

<details><summary>Worked solution</summary>

```python
import pandas as pd
df = pd.read_csv("trails.csv")
print(df.groupby("region").size().sort_values(ascending=False))
```

</details>

### Knowledge check

**1. What three steps does groupby perform?**

- A. Sort, filter, print
- B. Split into groups, apply a summary, combine the results
- C. Merge, join, pivot
- D. Read, write, close

<details><summary>Answer</summary>

**B.** Split, apply, combine is the standard description and it is worth memorising, it explains the shape of the output.

</details>

**2. What does `df.groupby("region").size()` return?**

- A. The memory used
- B. The number of rows in each group
- C. The number of columns
- D. The mean of each group

<details><summary>Answer</summary>

**B.** size counts rows per group. To summarise a specific column you name it first, as in `.groupby("region")["elevation_m"].mean()`.

</details>

**3. Why call `.reset_index()` after a groupby?**

- A. To sort the result
- B. To turn the grouped key back into an ordinary column
- C. To remove duplicates
- D. To free memory

<details><summary>Answer</summary>

**B.** groupby puts the grouping key in the index. reset_index moves it back to a regular column, which most downstream code expects.

</details>

### Checkpoint

**Coding checkpoint**

Build a summary called `out`, grouped by region, with three named columns: `peaks` counting the rows, `mean_elev` as the mean elevation, and `highest` as the maximum elevation. Round to one decimal, reset the index, and print it.

Starting point:

```python
import pandas as pd
df = pd.read_csv("trails.csv")
```

*Hint: Use named aggregation: df.groupby("region").agg(peaks=("name", "count"), ...). Then .round(1).reset_index().*

<details><summary>Worked solution</summary>

```python
import pandas as pd
df = pd.read_csv("trails.csv")
out = df.groupby("region").agg(
    peaks=("name", "count"),
    mean_elev=("elevation_m", "mean"),
    highest=("elevation_m", "max"),
).round(1).reset_index()
print(out)
```

</details>

---

## Where to go next

Once every waypoint is cleared, the natural next steps are:

- **Virtual environments and pip.** Everything here ran in the browser. On your own machine you will want `python -m venv .venv` and `pip install pandas` per project.
- **Jupyter or marimo notebooks.** The pandas work in Module 7 is far more pleasant in a notebook where each cell keeps its result.
- **matplotlib or plotly.** Grouping data is only half the job. Plotting the result is the other half.
- **Reading real CSVs.** Grab an open dataset and run Module 7 on it. Messy real data teaches things clean sample data cannot.
