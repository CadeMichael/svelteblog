---
title: Advent of Code 2024 day 2 in Zig
date: '01-14-25'
---

# Advent of Code

- in my [previous](https://cademichael.github.io/blog/AdventOfZig1) blog post I explained advent of code. In essence it's a great way to learn a new language and practice file / string manipulations.
- the problem for today can be found [here](https://adventofcode.com/2024/day/2).

# Zig Implementation

- for today's problem we can't do a simple implementation because part 2 of the problem involves checking the 'safety' of a line if one number is removed from it.
    - this means we have to check each 'unsafe' line **n** times, and because we have to go through each line in the input our total runtime is `O(n^2)`.
    - to check each line we have to reach for the `ArrayList` data structure, but we can save time and memory by using the `.items` field to view a slice of the elements.

## Parsing the file

- today I opted for the more simple `@embed` to get the file converted into a `[]u8` buffer compiled into the binary.
```zig
// embed the file
const input = @embedFile("input.txt");

// convert it into an iterator
var it = mem.tokenizeScalar(u8, input, '\n');
```

## Function for defining whether a line is 'safe'

- if you haven't followed the link to the problem it is essentially a problem of comparing numbers on the same line.
- our input is a file with multiple lines, each of which is composed of several numbers
    - a line is '*safe*' all of the numbers either all increase by at most 3, or decrease by at most 3.
    - for **part2** we have to check if removing a number from a line makes it '*safe*'
- instead of operating on an ArrayList we will operate on *slices* this is a little more performant and we can ignore a specific index rather easily.

```zig
// helper function to get absolute value of an integer
pub fn abs(x: i32) i32 {
    if (x < 0) {
        return x * -1;
    }
    return x;
}

// determine if a line is 'safe'
// takes a line of numbers and an index to ignore
pub fn isSafe(line: []i32, i: usize) bool {
    var lastNum: i32 = -1;
    var lastDif: i32 = 0;
    for (line, 0..) |num, index| {
        // first number in line
        if (index == i) continue;
        if (lastNum < 0) {
            lastNum = num;
        } else {
            // current difference
            const diff = (num - lastNum);
            // check for 'safety'
            if (diff == 0 or // no change
                abs(diff) > 3 or // inc or dec greater than 3
                (lastDif < 0 and diff > 0) or // switch from dec to inc
                (lastDif > 0 and diff < 0)) // switch from inc to dec
            {
                return false; // not a safe line
            }
            // set last difference and number
            lastDif = (num - lastNum);
            lastNum = num;
        }
    }
    return true;
}
```

## putting all the pieces together in our 'main' function

```zig
pub fn main() !void {
    const allocator = std.heap.page_allocator;

    std.debug.print("AOC 2024 day 2\n", .{});

    var it = mem.tokenizeScalar(u8, input, '\n');

    // scores for part 1 and 2
    var p1: i32 = 0;
    var p2: i32 = 0;

    while (it.next()) |line| {
        // get individual numbers
        var nums = mem.tokenizeScalar(u8, line, ' ');
        // ArrayList to hold number values in the line
        var lineNums = ArrayList(i32).init(allocator);
        defer lineNums.deinit();

        // Populate the ArrayList O(n)
        while (nums.next()) |numu8| {
            const num = try std.fmt.parseInt(i32, numu8, 10);
            try lineNums.append(num);
        }

        // if safe add line for p1
        if (isSafe(lineNums.items, lineNums.items.len + 1)) { // O(n)
            p1 += 1;
            p2 += 1;
        } else {
            // if safe with one level removed add line for p2
            for (0..lineNums.items.len) |i| { // O(n)
                // take the 'items' field from ArrayList and give the index to ignore
                if (isSafe(lineNums.items, i)) { // O(n)
                    p2 += 1;
                    break;
                }
            } // total runtime = O(n * n) + O(n) + O(n) = O(n^2)
        }
    }

    // print answer for part1
    std.debug.print("Part1 => {d}\n", .{p1});
    // print answer for part2
    std.debug.print("Part2 => {d}\n", .{p2});
}
```
