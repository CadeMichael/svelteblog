---
title: Advent of Code 2024 day 1 in Zig
date: '01-11-25'
---

# Advent of Code

- [advent of code](https://adventofcode.com/) is an advent calendar where each day a new two part puzzle gets released with each user getting a unique input.
- it has become a tradition for many tech enthusiasts, and is usually done in a variety of languages or in a language someone is interested in as a way to learn it.
- This year I had finals around the same time as advent of code so I had to take this year off but I decided to look more into Zig and start doing problems as I found time.
- I can't recommend AOC (advent of code) enough, it's lots of fun and when it comes to string manipulation and basic algorithms it is a great way to learn!
- previously I used AOC to learn Clojure, Golang, and Rust
    - I have a [video](https://www.youtube.com/watch?v=HBrxyTClly4) going through day 2 of the 2023 year in Clojure.

> the problem being tackled by this post can be found [here](https://adventofcode.com/2024/day/1).

## Why Zig

- just for my own ego I will say I have been interested in Zig long before [Ghostty](https://ghostty.org/). For those who don't follow tech trends (people who have friends and touch grass) Ghostty is the newest terminal on the block. It's claim to fame is native GUI on MacOS and Linux and being written in Zig. I started learning Zig around a year ago but opted for Rust as the startup I was working at used Rust extensively. However, I was intrigued by Zig, but felt that what I was interested in making and what I needed to know for work did not have a place for Zig.
    + a [video](https://www.youtube.com/watch?v=l3UWcaS8A1Y&t=2s) I made on Zig as a build tool when I was mad at the Rust Foundation for their crazy copyright plans they have since retracted.
- **Zig** is a low level programming language with good *quality of life* features, a great build system, and although it is a *manual memory management* language it has several features to make code more safe.
    + it can be seen as a new C in the same way Rust is seen as a new C++
    + although I do get annoyed by the comparisons of **Rust** and Zig as they are different languages with different use cases I will sin against myself and make a comparison right now.
        * *Zig is simple*, really simple (not Go simple but close) and offloads a great deal of work onto the programmer. You need to manage memory, the standard library isn't C small but it's small. If you are familiar with the 80/20 rule I would say that Zig is the perfect example. It gives you 80% of the 'safety' of rust with 20% of the effort.
        * *Rust is complicated*, not a bad thing, but a thing. It has an amazing standard library. For most simple tasks you don't need any 3rd party packages. You have macros, a great build tool and package manager, and a great community but it is a beast to deal with sometimes. The borrow checker guarantees your code is safe but it isn't so much a conversation with the borrow checker but an argument. Additionally the syntax is verbose, personally I find it beautiful but when dealing with types your code gets long and verbose. I love Rust, I'm not saying learn Zig not Rust, more learn Zig for Zig things and Rust for Rust things (like when safety is a must).
- Sadly Zig being so new there aren't many resources to learn from. There is the *standard library docs* which are great but terse. My personal favorite resource is [ziglings](https://codeberg.org/ziglings/exercises/). Ziglings is a repository of exercises in Zig. Every exercise is composed of a Zig file with a piece of broken code that you have to fix. You learn Zig by writing a little but of it to fix an error for many niche aspects of the language. It's amazing, but I did ziglings a year ago and needed to write some 'real' programs to feel comfortable with the language. Thats where AOC comes in! I don't see many solutions for AOC in Zig, and even though the first days are rather simple I hope this tutorial helps someone.

## Zig Build

- one of the most attractive features of Zig as a *C replacement* is the compiler.
- the **Zig compiler** can compile C, C++, and of course Zig code.
    + this makes Zig not only a language but a build tool, where you configure your builds with Zig!
    + we create our build instructions with a `build.zig` in the root of our project directory
    + we build with
        * `zig build` := build a default (usually debug) binary
        * `zig build -Doptimize=<optimization level>` := build an optimized binary based on the parameters passed in
- the following is a bare bones `build.zig` I use for each advent of code problem

```zig
const std = @import("std");

// required to define a public 'build' function
pub fn build(b: *std.Build) void {
    // 'exe' represents our executable or binary
    const exe = b.addExecutable(.{
        .name = "day1",                             // name of our binary
        .root_source_file = b.path("./day1.zig"),   // source code to build
        .target = b.standardTargetOptions(.{}),     // options for build target
        .optimize = b.standardOptimizeOption(.{}),  // options for optimization of executable
    });

    // 'installArtifact' is required for 'installing' the binary on your file system
    // ie place the binary in './zig-out/bin/<binary>'
    b.installArtifact(exe);
}
```

## Loading Files

- the most difficult part of getting started for me was figuring out the best way to load files.
- you can use a 'reader' to read the file or 'embed' the file in the resulting binary
    - when doing rudimentary benchmarking I could not find a significant performance difference between the two approaches
- both methods turn our file's contents into an **array of u8 values** that we have to split or tokenize on a certain delimiter to get an **iterator** that we use to get the values we need from our file content.

### using a 'reader'

- in short use a `reader` when your file being read isn't static, ie it might change. You load the file into memory at runtime and 'read' it line by line.
- you need an `allocator` to allocate memory to the file being read in.
    + here we can see one of the safety features of Zig with `defer`.
    + we can defer the **freeing** of our file's content in memory to when it is no longer used. This way we don't need to manually place our free function in the exact place it needs to be.

```zig
// create a page allocator
const allocator = std.heap.page_allocator;

// open the input file making sure to close when done
const file = try std.fs.cwd().openFile("./day1.txt", .{});
defer file.close();

// read the file into an array of bytes
const content: []u8 = try file.reader().readAllAlloc(allocator, 999999);
defer allocator.free(content);

// split input bytes by newline, returning an iterator
var it = mem.tokenizeScalar(u8, content, '\n');
```

### embedding the file

- if you know that your file won't change and you want something a bit more simple there is `@embed`.
- this is a **comptime** feature or something that takes place at compile time. When your Zig program is compiled the file is embedded in your binary as `[]const u8` or an immutable array of u8's.

```zig
// embed the file
const input = @embedFile("day1.txt");

// tokenize the lines
var it = mem.tokenizeScalar(u8, input, '\n');
```

## parsing each line

- the next biggest challenge was parsing each line (represented by a value returned by `.next()` on our iterator of lines).
    + we continue getting the *next* line with our while loop, another Zig nicety is that we can *capture* the value returned by `it.next()` with the `|<name>|` syntax, in our case the result of `.next()` is assigned the name `line`.
- because each line is an array of u8's we can't just take the result as is. The problem for this challenge gives two liens of numbers separated by whitespace. If we just tried to take the u8's we wouldn't get a number but an array of u8's that represent digits of a number.
    + to work around this we tokenize each line, splitting on `' '`. Then we parse the resulting u8 array as an integer.
        * you may have noticed the `.?`, this is another great Zig feature and is essentially getting a value from an Option, or a function that may fail.

```zig
// iterate across all lines
while (it.next()) |line| {
    // iterator of bytes separated by ' '
    var nums = mem.tokenizeScalar(u8, line, ' ');

    // convert byte representation of left and right to i32
    const l = try std.fmt.parseInt(i32, nums.next().?, 10);
    const r = try std.fmt.parseInt(i32, nums.next().?, 10);

    // rest of code...
}
```

## sorting the stored values from each line

- I left out a good deal of the code but want to focus on the Zigisms or Zig specific aspects of solving these types of problesm, before showing the entire program.
- to solve the problem we need to sort the `ArrayLists` that are used to save the parsed integer values from the text file.
    + to do this we can use the `.items` ArrayList field.
        * this gives us a 'view' into our ArrayList or a slice of all of the values which can be thought of as a mutable array.
        * we don't need to allocate or free memory for this 'view' because the memory has already been allocated for our ArrayList, in essence we are just 'looking' at the values in the ArrayList.
    + we can then sort these **slices** with `mem.sort`, which takes the type stored in the slice, the slice, options, and the function to use for sorting.

```zig
// create and sort an array of the items in each arraylist
const leftArr = left.items; // '.items' returns a slice or view of values
mem.sort(i32, leftArr, {}, std.sort.asc(i32));

const rightArr = right.items;
mem.sort(i32, rightArr, {}, std.sort.asc(i32));
```

## Full Code

- This is the full code for the solution to both parts of the problem for AOC 2024 day 1!

```zig
// for testing use
// - 'zig build'
// for bechmarking use
// - 'zig build -Doptimize=ReleaseFast'

const std = @import("std");
const mem = std.mem;
const ArrayList = std.ArrayList;
// if you embed the file use the following
// const input = @embedFile("day1.txt");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    std.debug.print("AOC 2024 day 1\n", .{});

    // if embedding the file this is all that's needed
    // var it = mem.tokenizeScalar(u8, input, '\n');

    // open the input file making sure to close when done
    const file = try std.fs.cwd().openFile("./day1.txt", .{});
    defer file.close();

    // read the file into an array of bytes
    const content: []u8 = try file.reader().readAllAlloc(allocator, 999999);
    defer allocator.free(content);

    // create an arraylist for left values
    var left = ArrayList(i32).init(allocator);
    defer left.deinit();

    // create an arraylist for right values
    var right = ArrayList(i32).init(allocator);
    defer right.deinit();

    // split input bytes by newline
    var it = mem.tokenizeScalar(u8, content, '\n');

    // iterate across all lines
    while (it.next()) |line| {
        // iterator of bytes separated by ' '
        var nums = mem.tokenizeScalar(u8, line, ' ');

        // convert byte representation of left and right to i32
        const l = try std.fmt.parseInt(i32, nums.next().?, 10);
        const r = try std.fmt.parseInt(i32, nums.next().?, 10);

        // populate left & right arraylists
        try left.append(l);
        try right.append(r);
    }

    // create and sort an array of the items in each arraylist
    const leftArr = left.items; // '.items' returns a slice or view of values
    mem.sort(i32, leftArr, {}, std.sort.asc(i32));

    const rightArr = right.items;
    mem.sort(i32, rightArr, {}, std.sort.asc(i32));

    // Part1
    // create a value to track the difference of values
    var p1: i32 = 0;

    // iterate across both arrays
    for (leftArr, rightArr) |l, r| {
        // get the absolute value of the difference between right and left nums
        var diff: i32 = l - r;
        if (diff < 0) {
            diff = diff * -1;
        }

        // add difference to answer
        p1 += diff;
    }

    // print answer for part one
    std.debug.print("Part 1 => {d}\n", .{p1});

    // Part2
    var p2: i32 = 0;

    // iterate across the left array
    for (leftArr) |l| {
        // track number of repeats
        var repeats: i32 = 0;
        // iterate across the right array
        for (rightArr) |r| {
            // repeat found
            if (l == r) {
                repeats += 1;
            }
        }

        // increase p2 by the 'repeat score'
        p2 += repeats * l;
    }

    // print answer for part two
    std.debug.print("Part 2 => {d}\n", .{p2});
}
```

## Python Code

- for the python code I just googled python solutions and this one seemed pretty good. The repo I got it from can be found here
    - https://github.com/seapagan/aoc-2024/blob/main/01/main.py
- it seems well written and this problem doesn't have much room for optimization.
    - again it isn't my code but I found it on github

```python
from collections import Counter


# ------------------------ read in and return the data ----------------------- #
def get_data() -> tuple[list[int], list[int]]:
    with open("day1.txt", "r") as file:
        # Read and process all lines, splitting into two sorted arrays
        data = [tuple(map(int, line.strip().split())) for line in file]

    # Unzip and sort
    array1, array2 = zip(*data)
    return sorted(array1), sorted(array2)


# ---------------------- calculate the answer for part 1 --------------------- #
def part1(array1, array2):
    running_total = sum(abs(a - b) for a, b in zip(array1, array2))
    return running_total


# ---------------------- calculate the answer for part 2 --------------------- #
def part2(array1, array2):
    similarity = 0
    array2_counts = Counter(array2)

    for num in array1:
        similarity += num * array2_counts[num]

    return similarity


first, second = get_data()  # O(n)
part1_answer = part1(first, second)  # O(n) since both arrays are the same size
part2_answer = part2(first, second)  # O(n + m)

print(f"Answer to Part 1 is {part1_answer}")  # for me it is 1388114
print(f"Answer to Part 2 is {part2_answer}")  # for me it is 23529853
```

## Speed Comparison

- to see how performant Zig is I used the cli benchmarking tool `hyperfine` to compare the execution time for the Zig and Python implementations.
- this isn't to be taken as pure fact, I'm using *hyperfine* on my laptop and the reported time can be affected by CPU architecture, other programs running on your computer, etc... 
    + however, it still shows the great performance of Zig!

```sh
ziggy/2024/d1
% zig build -Doptimize=ReleaseFast
ziggy/2024/d1
% hyperfine './zig-out/bin/day1'
Benchmark 1: ./zig-out/bin/day1
  Time (mean ± σ):     266.8 µs ±  51.2 µs    [User: 215.1 µs, System: 64.5 µs]
  Range (min … max):   117.9 µs … 536.1 µs    1006 runs

  Warning: Command took less than 5 ms to complete. Note that the results might be inaccurate because hyper
fine can not calibrate the shell startup time much more precise than this limit. You can try to use the `-N
`/`--shell=none` option to disable the shell completely.

ziggy/2024/d1
% hyperfine 'python3 main.py'
Benchmark 1: python3 main.py
  Time (mean ± σ):      13.4 ms ±   0.3 ms    [User: 10.7 ms, System: 2.1 ms]
  Range (min … max):    13.1 ms …  15.6 ms    187 runs

  Warning: Statistical outliers were detected. Consider re-running this benchmark on a quiet system without
 any interferences from other programs. It might help to use the '--warmup' or '--prepare' options.

ziggy/2024/d1
%
```

- based on this (somewhat crude) test we can see that Zig performs roughly 50 times faster than the Python.
    - this isn't a dig against Python, it would be shocking if it wasn't at least an order of magnitude slower than a low lever compiled language. Moreover this result just shows how fast Zig binaries are and how although much more verbose than the Python it isn't overly complicated or unapproachable.
