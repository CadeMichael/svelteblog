---
title: Odin First Impressions and New "core:os"
date: "03-11-2026"
---

# First Impressions

- https://odin-lang.org/news/moving-towards-a-new-core-os/

```odin
input, err := os.read_entire_file("input.txt", context.allocator)
if err != os.ERROR_NONE do panic("can't read input file")
```

```sh
.rwxr-xr-x@ 191k  󰡯 d1
.rwxr-xr-x@ 2.4M  󰡯 day1
```

```sh
~/D/c/a/2/d1 ❯❯❯ hyperfine ./d1
Benchmark 1: ./d1
  Time (mean ± σ):     694.8 µs ±  45.3 µs    [User: 516.8 µs, System: 155.4 µs]
  Range (min … max):   556.5 µs … 965.5 µs    824 runs

~/D/c/a/2/d1 ❯❯❯ hyperfine ./day1
Benchmark 1: ./day1
  Time (mean ± σ):       1.5 ms ±   0.6 ms    [User: 1.0 ms, System: 0.4 ms]
  Range (min … max):     1.3 ms …  10.7 ms    222 runs

~/D/c/a/2/d1 ❯❯❯ hyperfine "python3 d1.py"
Benchmark 1: python3 d1.py
  Time (mean ± σ):      61.9 ms ±   3.7 ms    [User: 58.2 ms, System: 2.6 ms]
  Range (min … max):    59.4 ms …  80.5 ms    36 runs
```
