---
title: Can Zig, Go, or Rust compete with C++ for Competitive Programming?
date: '05-22-25'
---

# Competitive Programming

I'm not the best Competitive Programmer, in fact I think it would be an overstatement to call me a Competitive Programmer.
I have probably participated in one competitive programming contest, but I have a deep admiration for people that perfect its craft.
However, I do prefer practicing algorithms and interview problems using competitive programming because you need to handle **real input**.
I love advent of code for the same reason, it feels like a more realistic exercise when you have to handle taking in and reporting data.
This is nothing against leetcode, it is a great resource, especially for interview prep but feels like you are working in more of a vacuum.

As a non competitive, competitive programming enthusiast I have practiced problems with multiple languages, even languages that are somewhat
ill suited for this task. If I had to do a real competition I would use **C++**, it combines a full standard library with performance and has
been the most used competitive programming language forever.

In this post I am just exploring several languages and how to set them up for competitive programming, mainly handling input.

1. Rust
2. Go
3. Zig

# handling input with C++

- when completing a problem it is common practice to take the input into your program via a text file.
    + this comes with the issue of not wanting to write two solutions, one for stdin and one for reading a file
- really **simple** and somewhat standardized as C++ is the defacto standard for competitive programming
    + no thinking out of the box required
    + online judges will pass flags disabling the `freeopen` calls

```cpp
// use local files unless compiled with ONLINE_JUDGE flag
#ifndef ONLINE_JUDGE
  freopen("input.txt", "r", stdin);   // input
  freopen("output.txt", "w", stdout); // output
#endif
int i;

// then we can get input from stdin or 'input.txt'
// with
std::cin >> i;
//or
scanf("%d", &i);
```

# Getting input with Rust

- **Rust** is the new kid on the block
    + it's *very loved* (maybe too much)
        - does everything need to be rewritten???
    + great *build system & package manager*
    + type **safety** and some memory safety guarantees
    + also complicated but it seems like every added complexity has a *purpose*
- **types** have to align and you have to defeat the **borrow checker**
    + might seem frustrating at first but when it clicks it is *elegant*
- can't use *simple macros* to switch between input types (file and stdin)
- manually *typing input* is painful and borderline impossible for some problems
- but if you *set file input* you will need to change your code to submit to an online judge
- output
    - much less complicated just use `println!`
    - not the best for performance (or so i've heard)
        + but the goal here is input and I think `println!` is fine
- what I love about this Rust implementation is how the types are used
    + it almost feels like magic being able to use `collect` with polymorphic types to 
    make the function determine what type to parse from the input.
    + it almost feels like automated tetris where rust finds the type that fits.

## handling file input

- example from Advent of Code
    + leveraging the `include_str!` macro
    + embedds the file in the binary (good for AOC not for competitive programming)

```rs
let input: Vec<Vec<Vec<Vec<&str>>>> = include_str!("../input.txt")
    .lines()
    .map(|l|  {
        let mut x: Vec<&str> = l.split(": ").collect();
        x.reverse();
        x.pop();
        x.reverse();
        x[0]
    })
    .map(|l| {
        let x: Vec<&str> = l.split("; ").collect();
        let y: Vec<Vec<&str>> = x
            .into_iter()
            .map(|g| g.split(", ").collect()).collect();
        let z: Vec<Vec<Vec<&str>>> = y.into_iter()
            .map(|g| g
                .into_iter()
                .map(|c| c.split(" ").collect()).collect()).collect();
        z
    })
    .collect();
```

## handling standard input

```rs
fn main() {
    let mut buffer = String::new(); // empty String
    let stdin = std::io::stdin(); // standard input

    // read a line from stdin and assign to buffer
    stdin.read_line(&mut buffer).unwrap();
    println!("{}", buffer);
}
```

## great starter template

- from *https://rustp.org/basic-programs/basic-template/*

```rs
se std::io::stdin;

fn take_int() -> usize { // get int from stdin
    let mut input = String::new();
    stdin().read_line(&mut input).unwrap();
    return input.trim().parse().unwrap()
}

fn take_vector() -> Vec<usize> { // get a vector of usize
    let mut input = String::new();
    stdin().read_line(&mut input).unwrap();
    let arr: Vec<usize> = input.trim().split_whitespace().map(|x| x.parse().unwrap()).collect();
    return arr;
}

fn take_string() -> Vec<char> { // get a string as a vector of char
    let mut input = String::new();
    stdin().read_line(&mut input).unwrap();
    let vec:Vec<char> = input.trim().chars().collect();
    return vec;
}
fn to_string(vec:Vec<char>) -> String{ // convert vec of char to String
    return vec.iter().collect::<String>();
}
```

## making it a module

- wrap in a *module*, and make functions public
    - easier importing
    - no unused errors

```rs
mod rcp {
    use std::io::stdin;

    pub fn take_int() -> usize
    //...
}

pub fn main() {
    let i = rcp::take_int();
}
```

## making it type polymorphic

- the Rust type system lets you tell the function what type to return
    - achieved with **type polymorphism**, restricted with *Traits*

```rs
mod rcp {
    use std::io::stdin;

    pub fn read<T: std::str::FromStr>() -> T {
        let mut line = String::new();
        stdin().read_line(&mut line).expect("read_line failed");
        line.trim().parse().ok().expect("failed to parse")
    }
}

pub fn main() {
    let message: String = read();
    let float: f32 = read();
    println!("{} {}", message, float);
}
```

## adding file or standard input

- add a function to init a `reader` 
    + corresponds to either a *file or stdin*

```rs
mod rcp {
    use std::{
        fs::File,
        io::{self, BufRead, BufReader},
    };

    // returns a Boxed type that implements BufRead
    pub fn init_reader() -> Box<dyn BufRead> {
        if std::env::args().any(|arg| arg == "--file") { // `cargo run -- --file`
            Box::new(BufReader::new(
                File::open("input.txt").expect("failed to open 'input.txt'"),
            ))
        } else {
            Box::new(BufReader::new(io::stdin()))
        }
    }

    ...
}
```

## final template

- putting it all together
    + only downside is we need to *pass the reader* around

```rs
mod rcp {
    use std::{
        fs::File,
        io::{self, BufRead, BufReader},
    };

    pub fn read<T: std::str::FromStr>(reader: &mut impl BufRead) -> T {
        let mut line = String::new();
        reader.read_line(&mut line).expect("read_line failed");
        line.trim().parse().ok().expect("failed to parse")
    }

    pub fn read_vec<T: std::str::FromStr>(reader: &mut impl BufRead) -> Vec<T> {
        let mut line = String::new();
        reader.read_line(&mut line).expect("read_line failed");
        line.split_whitespace()
            .map(|s| s.parse().ok().expect("failed to parse"))
            .collect()
    }

    // throw away empty lines
    pub fn empty_line(reader: &mut impl BufRead) {
        let mut dummy = String::new();
        reader.read_line(&mut dummy).ok();
    } 

    pub fn init_reader() -> Box<dyn BufRead> {
        if std::env::args().any(|arg| arg == "--file") {
            Box::new(BufReader::new(
                File::open("input.txt").expect("failed to open 'input.txt'"),
            ))
        } else {
            Box::new(BufReader::new(io::stdin()))
        }
    }
}
```

## using the template

```rs
pub fn main() {
    let mut reader = rcp::init_reader();

    let num: usize = rcp::read(&mut reader);
    let word: String = rcp::read(&mut reader);
    let vec: Vec<String> = rcp::read_vec(&mut reader);

    println!("input -> {}, {}, {:?}", num, word, vec);
}
```

# Getting input with Go

Go is a great language. Despite the hate it seems to receive from the PL community I think it's great. It was designed for development, you have an idea and you don't want to get caught up in the language you're using. It's not the best for research but for software engineering it is great.

It's simplicity can be seen in the simplicity of using it to parse input from Stdin or from a file without changing your code.

## How to set Stdin

- one of the nice things about Go is its standard library
- we can import `os` and tell Go what should be used as Stdin
- we just need to "pipe" this text into Stdin
- wrapping this in a function allows us to use the same code for solving and submitting a problem, only having to comment out one line
- once our file is used for Stdin we can use the `fmt` function `Scanf` as usual!

```go
import (
	"fmt"
	"log"
	"os"
)

func setStdin(file string) {
	// text []byte -> compatible with os.Stdin
	text, err := os.ReadFile(file)
	if err != nil {
		log.Fatal(err)
	}

	// reader and writer
	r, w, err := os.Pipe()
	if err != nil {
		log.Fatal(err)
	}

	// set os.Stdin to our reader
    // this will "read" what is written from our input file
	os.Stdin = r

	// ignore number of bytes written and write file data to writer
    // this text will then be able to be read from our "reader" r
	_, err = w.Write(text)
	if err != nil {
		log.Fatal(err)
	}

	// close writer
	w.Close()
}

func main() {
	setStdin("input.txt")
    // we can now use `fmt.Scanf` as we would if we were reading from standard input
    ...
}
```

# Getting input with Zig

Zig was the hardest language to get working. I really enjoy the language and appreciate its goals for low level programming.
However, I don't think I'll ever write much Zig as most of my work and research falls outside of its intended use cases.
I am not a low level programmer but if I become one Zig would be one of my tools for sure.

Trying to get input from a file without changing the code that reads from input with Zig's standard library was too difficult.
So I leveraged one of Zig's greatest strengths, it's **C FFI**. C has `scanf` and `printf`, so I wrapped them with Zig functions to make their use more seamless.

## importing C libraries with Zig

Importing a C library is fairly simple with `@cImport`. However, when using C functions that return any value (scanf returns an int) that value has to be explicitly ignored. 

But the `_ = scanf(...)` is pretty cumbersome so I opted to wrap these functions.

```zig
const cStdio = @cImport({
    @cInclude("stdio.h");
});
const cString = @cImport({
    @cInclude("string.h");
});
```

## String representations in Zig

Strings in Zig can be a little weird, mainly because they differ from C strings (arrays of chars), and might need to be massaged slightly to be used in imported C functions. In order to pass strings from Zig to C we use a special type...

- `[*:0]const u8`
    + null-terminated C string

## Wrapping C functions with Zig

One of Zig's most attractive features is the Union (or Sum) type. This let's us write functions that can throw errors, denoted with `!`.

To encapsulate possible errors from the `scanf` and `printf` functions I created the `CStudio` error type

```zig
const CStdioError = error{
    printfError,
    scanfError,
    fgetsError,
    freopenError,
};
```

It is now easy to wrap a function and show that it can fail. For example, this is how `scanf` is wrapped.
- `anytype`
    + accept any value(s), variadic-style
- `@call(.auto, ...)`
    + call a function with automatic calling convention
- `.{a} ++ b`
    + build a new tuple starting with b, then appending b

```zig
// `scanf` wrapper
fn c_scanf(restrict: [*:0]const u8, args: anytype) !void {
    if (@call(.auto, cStdio.scanf, .{restrict} ++ args) < 1)
        return CStdioError.scanfError;
}
```

Using the wrapped function feels almost native and allows for the competitive programming flow many are used to.

```zig
var i: i32 = undefined;
var s: [30]u8 = undefined;
try c_scanf("%d", .{&i});
// in C `s` decays into a pointer, not in zig!
try c_scanf("%s", .{&s});
```

## Setting standard input to a file

This was "more of the same" in that I opted to wrap C functions for the task. However, due to a known number of function arguments it is much more simple.

```zig
// set `stdin` and `stdout` to files
// must take in `[*:0]const u8` to be compatible with C
fn fileIO(input: [*:0]const u8, output: [*:0]const u8) !void {
    _ = cStdio.freopen(input, "r", cStdio.stdin()) orelse
        return CStdioError.freopenError;
    _ = cStdio.freopen(output, "w", cStdio.stdout()) orelse
        return CStdioError.freopenError;
}
```

## Putting it all together

Adding everything together shows how useful and painless wrapping C functions in Zig can be. I added a parameter to the program allowing for a filename to be passed
in order to set standard input / output to files.

```zig
// zig imports
const std = @import("std");

// c imports
const cStdio = @cImport({
    @cInclude("stdio.h");
});
const cString = @cImport({
    @cInclude("string.h");
});

const CStdioError = error{
    printfError,
    scanfError,
    fgetsError,
    freopenError,
};

// `printf` wrapper
fn c_printf(restrict: [*:0]const u8, args: anytype) !void {
    if (@call(.auto, cStdio.printf, .{restrict} ++ args) < 1)
        return CStdioError.printfError;
}

// `scanf` wrapper
fn c_scanf(restrict: [*:0]const u8, args: anytype) !void {
    if (@call(.auto, cStdio.scanf, .{restrict} ++ args) < 1)
        return CStdioError.scanfError;
}

// set `stdin` and `stdout` to files
fn fileIO(input: [*:0]const u8, output: [*:0]const u8) !void {
    _ = cStdio.freopen(input, "r", cStdio.stdin()) orelse
        return CStdioError.freopenError;
    _ = cStdio.freopen(output, "w", cStdio.stdout()) orelse
        return CStdioError.freopenError;
}

pub fn main() !void {
    // check for `--file` flag
    const flag = "--file";
    const args = std.os.argv;
    if (args.len > 1 and cString.strlen(flag) == cString.strlen(args[1])) {
        for (flag, args[1]) |a, b|
            if (a == b)
                continue
            else
                break;
        try fileIO("input.txt", "output.txt");
    }

    // declare variables to be read in
    var i: i32 = undefined;
    var s: [30]u8 = undefined;

    // read `i` and `s`
    try c_scanf("%d", .{&i});
    try c_scanf("%s", .{&s});

    // print `i` and `s`
    try c_printf("%d\n", .{i});
    try c_printf("%s\n", .{&s});
}
```
