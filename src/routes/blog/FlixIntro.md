---
title: Introduction to the Flix programming language
date: '07-14-25'
---

# What is Flix?

## background

[Flix](https://flix.dev/) is a JVM language. I want to preface any fancy category theory talk and PL research focused features could scare people away.
Flix can import and run Java packages, giving it a boost over many similar research languages in my opinion. The standard library doesn't have something?
Ok use a Java library. Flix feels somewhat production ready, it comes with a good LSP, fast compiler, and built in Test support. This is an oversimplification,
but there is a good deal of truth behind it. A research language that doesn't have do do everything at once to be useful is great for getting off the ground running.

Flix's compiler is written in Scala using the `asm` bytecode library, and delivers performant `jar` executables. I am biased as I worked as a researcher alongside Professor Magnus Madsen's Lab, where Flix was created. The lab there has really talented researchers, and almost more importantly for a large software project, extremely apt programmers. There is usually a divide between the quality of one's research and their software engineering chops, but this is not the case with Magnus's lab.

## the why

Why do we need a new language? There are already so many, and most are barely used or useful. Well, programming is changing and I think it's most likely a good thing.The essence of computation is abstraction, and new abstractions are always being proposed some of which are pretty groundbreaking. Flix incorporates one such innovation, **Algebraic Effects**. 

Before going into Effects I think it's helpful to think of a previous great abstraction, the **Monad**. Monads allow for the sequencing of computations that might have effects (and are monoids in the category of endofunctors of course). They're great but they are not the easiest things to use, especially when composing them. If you have ever seen a video of ice divers, people who dive and swim under ice, sometimes they have trouble finding the hole prepared to leave the ice. That is somewhat what it feels like to program with monads. Once a value is in a monad it hard to get it out. The high bar of functional theory needed for effective monad use makes them useful but somewhat exclusionary. 

Effects give similar benefits to monads (and many effect libraries are written with monads), being the encapsulation of computations and possible side Effects, but feel much easier to use from the perspective of a software engineer. An Effect invokes the idea of throwing errors and there are parallels but Algebraic Effects can express much more than throwing errors. To best understand Effect systems there are two main concepts that must be understood. The **Effect**, and the **Handler**. 

Think of the Effect as an invoice or an I owe you. In essence you are telling the program what a function returns, without giving the logic of the function.
Conversely think of a Handler as the fulfillment of that invoice / IOU. It is the implementation that returns the type requested by the Effect. When a function has Effects, the Effects are included in the type signature of the function. If a function handles an Effect it is no longer in the type signature of the function, as the *Effect is Handled*.

This psuedo code is an oversimplification but helps to illustrate this point.

```
effect Say {
    hello(): String
    bye(): String
}

def greet(): <effect Say> { // greet has Say effect
    if (meeting) {
        Say.hello()
    } else {
        Say.bye()
    }
}

def main { // main has no effects because they are handled
    run {
        greet()
    } with { // handle effects
        hello() {return "hello"}
        bye() {return "bye"}
    }
}
```

Ok, this looks like a roundabout way to program, why not just define `hello()` and `bye()`? Well what if we aren't just using English? We can define handlers for
any greetings in any language. This makes our code more flexible, but isn't anything that interfaces in OOP or Trait's in FP couldn't accomplish so what gives? Effects allow for more modularity without as much boilerplate. Additionally, with more complicated Effects we have continuations, meaning we can go back into the function at the stack frame in which the Effect was invoked. 

### Effects in Flix

Flix has some of the best language support for Effects. This is mainly opinion but given the JVM preface I don't think there is much of a debate.
Effect oriented languages have been springing up and although great they feel more "researchy" in the sense that it feels impossible to write large
projects with them. Flix feels like a general purpose language with Effects. You could write Flix without ever writing an Effect. The only interface with
Effects you would have are in the type signatures of Functions. 

For example let's look at the default `main` function when you init a project.

```
def main(): Unit \ IO =
    println("Hello World!")
```

Here `Unit \ IO` denotes a function that returns nothing (ie Unit) with the IO Effect. Being a builtin function `println` doesn't Require handling `IO`. But handlers in Flix have some of the most developer friendly syntax (in my opinion). You denote effectful code with `run` and handle them with `with`.

This example is straight from Flix's documentation and demonstrates effects that don't resume. In essence these are Exceptions we see in other languages. In this example think of the `run {} with {}` syntax as `try {} catch {}` in common languages.

```
eff DivByZero { // declaring 'DivByZero' effect
    def divByZero(): Void
}

def divide(x: Int32, y: Int32): Int32 \ DivByZero = // 'divide' has effect 'DivByZero'
    if (y == 0) {
        DivByZero.divByZero()
    } else {
        x / y
    }

def main(): Unit \ IO = // 'main' doesn't have 'DivByZero' effect as it is handled within the function
    run {
        println(divide(3, 2));
        println(divide(3, 0))
    } with handler DivByZero {
        // every handled effect has an extra parameter, a continuation, for when you want to resume post handling
        def divByZero(_resume) = println("Oops: Division by Zero!")
    }
```

To show a basic usage of continuations we can refactor the `divByZero` Effect to return a default value using a **continuation**.
We can see how Effects allow more modular code as changing `divByZero` or providing different implementation doesn't change where it is called.

```
eff DivByZero {
    def divByZero(x: Int32, y: Int32): Int32
}

def divide(x: Int32, y: Int32): Int32 \ DivByZero = 
    DivByZero.divByZero(x, y)

def main(): Unit \ IO = 
    run {
        println(divide(3, 2)); // outputs 1
        println(divide(3, 0))  // outputs "oops" 0
    } with handler DivByZero {
        // every handled effect has an extra parameter, a continuation, for when you want to resume post handling
        def divByZero(x, y, resume) = match y {
            case 0 => println("oops"); resume(0)
            case i => resume(x/i)
        }
    }
```

Here we handle division in the Effect Handler. The `divide` function is redundant but serves to show how Effects show up in type signatures.
Unhandled Effects must show up in the return type, but once handled they no longer need to. This can be seen in a more complicated example that show
how to define a handler function, and a helper to apply the handler in the `main` function.

```
eff DivByZero {
    def div(x: Int32, y: Int32): Int32
}

// handle DivByZero in function `f`
def handle(f: a -> b \ ef): a -> b \ (ef - DivByZero) + IO = x -> // return type lacks 'DivByZero'
   run {
       f(x)
   } with handler DivByZero { // define handler
        def div(a, b, resume) = match b {
            case 0 => println("oops"); resume(0)
            case i => resume(a/i)
        }
   }

// helper to handle the effect in a `main` function
def runDivWithIO(f: Unit -> a \ ef): a \ (ef - DivByZero) +  {IO} = handle(f)()

def main(): Unit \ IO = 
    run {
        println(DivByZero.div(3, 2));
        println(DivByZero.div(3, 0))
    } with runDivWithIO
```

# Setup

Flix relies on its LSP for semantic highlighting and has great VSCode support. The plugin can be installed via the plugin panel. Additionally there is a
good Neovim [plugin](https://github.com/flix/nvim) to get up and running. Flix relies on the **flix.jar** which is essentially a jvm binary containing the compiler
and LSP. VSCode will download one into it's Cache or it can be [downloaded](https://github.com/flix/flix/releases/latest) locally for use on a per project basis.

When using the jar from the CLI simply prefix any commands with `java -jar flix.jar`. For instance if I'm using the jar at the root of my project, to initialize
the project I would call `java -jar flix.jar init`.

The Flix [book](https://doc.flix.dev/introduction.html) provides full setup instructions and great documentation / examples to get started with the language!

# Resources

## Papers

Some good papers on Effects...
- [An Introduction to Algebraic Effects and Handlers. Invited tutorial paper.](https://www.sciencedirect.com/science/article/pii/S1571066115000705?via%3Dihub)
- [Effect handlers, evidently.](https://dl.acm.org/doi/10.1145/3408981)

## Talks 

Some good Flix talks...
- [Principles of the Flix Programming Language](https://www.youtube.com/watch?v=RNZeAmp1EaA)
- [An Introduction to Functional Imperative Programming in Flix](https://www.youtube.com/watch?v=2LSOqikNqxM)

