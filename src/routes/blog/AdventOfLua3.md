---
title: Advent of Code 2024 day 3 in Lua and Regex
date: '01-16-25'
---

# Lua ? 

- Ok I know I said I would do the advent of codes in **Zig** but day 3 felt tailor made for Lua. I did a few days last year in Lua and it helped tremendously with Nvim plugins and configuration, and showed me the power of **Lua regex**.
- Zig doesn't yet have a regex library and the ones that are 3rd party seem somewhat unmaintained. So I decided to reach for good old **Lua** and it was suprisingly easy and the code is surprisingly performant.

# Part one

- essentially we just need to find and perform all the 'multiplication' operations in our input
    - they look like `mul(num1, num2)`, and the numbers can be at most 3 digits long. There are a bunch of 'partial matches' and a simple regex will solve it easily

## Lua Regex

- the Lua regex syntax has some differences to what I would consider 'normal' regex but works surprisingly well and I'd bet it is part of what made Lua a great choice for Nvim.
- for this problem we want to match `mul(num, num)`, with each number being at most 3 digits long
- match 'mul('
    - `mul%(` -> the `%` before the `(` denotes that this is a char to match not part of a regex
- matching for a number, at most 3 digits long
    - `(%d%d?%d?)` -> here the `()` denote a regex expression, `%d` represents a digit, and `%d?` represents an optional digit.
- matching the ending parenthesis ')'
    - `%)` -> match for the closing parenthesis char.

## Part 1 solution

- here we can use a simple `gmatch()` to match for the occurrences of digits within a `mult()`
    - we convert these strings to numbers, multiply them and add the product to our sum

```lua
-- Part 1
local sum = 0

-- open the file
local file = io.open("input.txt", "r")
if file then
  -- iterate across file lines
  for line in file:lines() do
    for x, y in line:gmatch("mul%((%d%d?%d?),(%d%d?%d?)%)") do
      sum = sum + (tonumber(x) * tonumber(y))
    end
  end
  file:close()
  print(sum)
else
  print("Cannot open file.")
end
```

- and part 1 takes roughly 750 micro seconds to run! I'm always surprised by Lua's performance and simplicity. Just 13 lines of code (without blank lines)!
    - I am using LuaJit, so performance is better than 'regular' Lua.

# Part 2

- part two is a little more complex.
- there are also `do()` and `don't()` strings in our input and we only sum the multiplications between `do()`s
    - do achieve this we track the indexes of `do()` and `don't()` to make sure our current position is within a do block.
    - when doing a regex with `find()` we can declare parameters for the location of the start and end of the pattern found.
        - this is the mechanism that allows us to find where we have "do"s and "don't"s.

```lua
local sum = 0
local enabled = true -- whether we are in a 'do()' block

local file = io.open("input.txt", "r")
if file then
  for line in file:lines() do
    local pos = 1 -- current position (Lua is 1 indexed)
    local n = #line -- length of current line

    -- while still in the same line
    while pos <= n do
      -- indexes of "do" block
      local doStart, doEnd = line:find("do%(%)", pos)
      if doStart == pos then
        enabled = true -- hit "do"
        pos = doEnd + 1 -- go to end of "do"
      else
        -- indexes of "don't()" block
        local dontStart, dontEnd = line:find("don't%(%)", pos)
        if dontStart == pos then
          enabled = false -- hit "don't"
          pos = dontEnd + 1 -- go to end of "don't"
        else
          -- find "mult()"
          local mulStart, mulEnd, x, y = line:find("mul%((%d%d?%d?),(%d%d?%d?)%)", pos)
          if mulStart == pos then
            -- if enabled add product of x and y to the sum
            if enabled then
              sum = sum + (tonumber(x) * tonumber(y))
            end
            pos = mulEnd + 1
          else
            -- move forward one position
            pos = pos + 1
          end
        end
      end
    end
  end
  file:close() -- Always close the file when you're done
  print(sum)   -- This should print 161 for the given example
else
  print("Cannot open file.")
end
```
