---
title: Setting up Ocaml with Unit Tests for Practice Problems
date: '06-10-24'
---

# Ocaml Unit Tests and Pre Processors setup

- After hearing a great talk about Ocaml at OPLSS (Oregon Programming Languages Summer School), I decided to explore the language. 
- I have made several half hearted attemps to learn Ocaml but kept getting tripped up on the build system and project structure. There was just enough friction to keep me from enjoying the experience.
- My goal with this post is to make that process a little easier for anyone who has experienced the same things.

**Goals**

1. go through [ocaml exercises](https://ocaml.org/exercises)
2. have unit tests for each problem
3. correctly set up a project with [dune](https://dune.readthedocs.io/en/stable/usage.html#initializing-a-library)
4. Get set up with pre processors, I never fully grasped them in previous attempts

## Project setup

- default dune project setup
    - I removed every directory except for the lib dir which I renamed to 'test'.
    - when using unit tests we have to use a library!

```
ocamlPrac
├── dune-project
├── simple-problems.opam
└── test
    ├── beginner.ml
    ├── beginner_test.ml
    ├── dune
    ├── intermediate.ml
    └── intermediate_test.ml
```

## Installation

- it's a bit of an exercise in patience finding what packages you need / don't need for pre processing.
    - some packages install others as dependencies and or are part of the default opam setup.
    - I found that this combination of packages insures that you have everything that you need.

```sh
opam isntall ppx_inline_test ppx_assert ppx_sexp ppx_compare ppx_deriving
# if you want to print test results
opam install ppx_expect core
```

## Dune Setup

### Manual

- You can set you dune file manually. this file is in your **executable** or **library** directory, and is named `dune`.
- For the testing pre processors we need to be working in a library / executable. This means we can't use the default *dune* test dir. My directory is named test but it is not the default test dir.
    - you also need `(inline_tests)` to tell dune that you have unit tests in your library.
    - we have all of the pre processors passed into `pps`
        - inline_tests -> testing
        - ppx_assert -> better unit test syntax
        - sexp_conv -> handling custom types
        - compare -> comparing equality of custom types
        - ppx_expect -> optional if you want to print tests, to print sexp (lists etc) you will also need `core` and have to open it in your test file.
        - **ppx_jane** -> if you want to keep things simple just use this as a pps. You need the other packages installed but this pps references all of them. This was the only method that I found to work for **expect tests with sexp printing**

```
(library
 (name simple_prac)
 (libraries base stdio)
 (inline_tests)
 (preprocess
  (pps ppx_inline_test ppx_assert ppx_sexp_conv ppx_compare)))
  ; for simplicity you can do this instead
  (pps ppx_jane)
```

### Using dune tooling

- as per the [dune](https://dune.readthedocs.io/en/stable/usage.html#initializing-a-library) we can pass parameters into `dune init lib`
- the following should give us a similar setup to the manual one above
- we separate the libs and ppx we need with ',' and no spaces

```sh
% dune init lib mylib src --libs base,stdio  --inline-tests --ppx ppx_assert,ppx_sexp_conv,ppx_compare
Success: initialized library component named mylib
```

## Declaring Tests

### Unit Tests

- Start with `let%test_unit "<testname>" =`
    - you declare the testname in a string
    - for each unit test define it with
        - `[%test_eq: <return type>] (<function input>) <expected output>`
        - you must know the type you are expecting from the function being tested
    - separate each test_eq with a `;`
- run all tests with `dune runtest`
    - unfortunately it only prints when tests fail, if there is no output tests have passed
```ocaml
let%test_unit "last" =
  [%test_eq: string option] (last [ "a"; "b"; "c" ]) (Some "c");
  [%test_eq: string option] (last []) None
```

### Unit Tests with Printing

- if you want 'prettier' tests where your error messages make a bit more sense there is **ppx_expect**, which provides `%expect_test`

```ocaml
(* standard unit test*)
let%test_unit "encode 2" =
  [%test_eq: string rle list]
    (encode_cst
       (* change the first char to 'e' to break the test *)
       [ "a"; "a"; "a"; "a"; "b"; "c"; "c"; "a"; "a"; "d"; "e"; "e"; "e"; "e" ])
    [
      Many (4, "a");
      One "b";
      Many (2, "c");
      Many (2, "a");
      One "d";
      Many (4, "e");
    ]

(*expect test*)
let%expect_test "printing encode" =
  print_s
    [%sexp (* needed to decompose the type into a sexp for comparison *)
      (encode_cst
         [ (* change the first char to 'e' to break the test *)
           "a"; "a"; "a"; "a"; "b"; "c"; "c"; "a"; "a"; "d"; "e"; "e"; "e"; "e";
         ]
        : string rle list)];
  [%expect {|((Many 4 a) (One b) (Many 2 c) (Many 2 a) (One d) (Many 4 e))|}]
```

- the `expect_test` will output the following when it errs out

```sh
% dune runtest
File "test/intermediate_test.ml", line 1, characters 0-0:
diff --git a/_build/default/test/intermediate_test.ml b/_build/.sandbox/141cb4797c2cd634cf1d3e660f76
0165/default/test/intermediate_test.ml.corrected
index 06b2779..bde5973 100644
--- a/_build/default/test/intermediate_test.ml
+++ b/_build/.sandbox/141cb4797c2cd634cf1d3e660f760165/default/test/intermediate_test.ml.corrected
@@ -81,4 +81,4 @@ let%expect_test "printing encode" =
            "a"; "a"; "a"; "a"; "b"; "c"; "c"; "a"; "a"; "d"; "e"; "e"; "e"; "e";
          ]
         : string rle list)];
-  [%expect {|((Many 4 e) (One b) (Many 2 c) (Many 2 a) (One d) (Many 4 e))|}]
+  [%expect {| ((Many 4 a) (One b) (Many 2 c) (Many 2 a) (One d) (Many 4 e)) |}]
```

## Comparison with Custom Types

- in order to compare complex types we need to have `[@@deriving sexp, compare]`
    - sexp allows the type de be decomposed into S-expressions.
    - compare allows instances of the type to be comared with eachother.

```ocaml
type 'a rle = One of 'a | Many of int * 'a [@@deriving compare, sexp]
```

- for the practice problems from the ocaml website we will need to add these decorators in order to write unit tests.

## Sneaky Issues when opening Base

- when opening base you override some std lib functions. When going though the ocaml exercises and their solutions this becomes extremely apparent when trying to use `=`.
    - the std lib `=` can compare ints, strings, lists, etc... 
    - when opening Base, it will only compare ints. This means you will have to use type specific equality functions.

```ocaml
utop # #require "base";;
utop # open Base;;

utop # 1 = 1;; (* works fine with ints *)
- : bool/2 = true

utop # "a" = "a";; (* does not work with strings *)
Error: This expression has type string/2 but an expression was expected of type
         int/2
       File "_none_", line 1:
         Definition of type int/2
       File "_none_", line 1:
         Definition of type string/2

utop # String.equal "a" "a";;
- : bool/2 = true
```
