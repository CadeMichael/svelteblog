---
title: A better way to run system commands in Neovim
date: '03-07-25'
---

# Running commands in NVIM

## 'system' and 'schedule' functions

- from the docs

```lua
function vim.system(cmd: string[], opts?: vim.SystemOpts, on_exit?: fun(out: vim.SystemCompleted))
  -> Object: vim.SystemObj
```

> Runs a system command or throws an error if `cmd` cannot be run.


```lua
function vim.schedule(fn: fun())
```

> Schedules `fn` to be invoked soon by the main event-loop. Useful to avoid |textlock| or other temporary restrictions.


### Chaining them together

```lua
  vim.system({ "some command" }, { text = true }, function(obj)
    vim.schedule(function()
      if #obj.stderr > 0 then
        vim.api.nvim_notify("Something failed...", vim.log.levels.ERROR, {})
      end
      if #obj.stdout > 0 then
        vim.api.nvim_notify("Yay it worked...", vim.log.levels.INFO, {})
      end
    end)
  end)
```

# Example with Dune commands

```lua
local function get_project_name(dune_root)
  local handle = vim.loop.fs_scandir(dune_root)
  if handle then
    while true do
      local name, type = vim.loop.fs_scandir_next(handle)
      if not name then break end
      if type == "file" and name:match("(.+)%.opam$") then
        return name:match("(.+)%.opam$") -- Extracts <proj_name>
      end
    end
  end
  return nil
end

local function duneExec()
  local cwd = vim.fn.getcwd()
  local dune_root = vim.lsp.buf.list_workspace_folders()[1]

  vim.cmd("cd " .. dune_root)

  local project_name = get_project_name(dune_root)

  if project_name then
    vim.api.nvim_notify("Executing dune project: " .. project_name, vim.log.levels.INFO, {})
  else
    vim.api.nvim_notify("No .opam file found in " .. dune_root, vim.log.levels.WARN, {})
    return nil
  end

  vim.system({ "dune", "exec", project_name }, { text = true }, function(obj)
    vim.schedule(function()
      if #obj.stderr > 0 then
        vim.api.nvim_notify("dune exec failed...", vim.log.levels.ERROR, {})
        vim.api.nvim_notify(obj.stderr, vim.log.levels.WARN, {})
      end
      if #obj.stdout > 0 then
        vim.api.nvim_notify(obj.stdout, vim.log.levels.INFO, {})
      end
    end)
  end)
  vim.cmd("cd " .. cwd)
end
```
