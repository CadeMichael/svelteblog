---
title: Simple Neovim Configuration with Lazy.nvim
date: '05-17-24'
---

# Lazy Directory Structure

Before using [lazy](https://github.com/folke/lazy.nvim) I felt that my config was all over the place. Within '~/.config/nvim/' I had `after/`, `lua/config`, `lua/ide`, all to manage plugin configuration.

After helping some friends set up Nvim I realized I was still keeping things rather messy and found a style that seems to make things modular. Allowing for easier upstart, upgrading, and maintenance.

## How to organize '.config/nvim'

- each folder has a purpose
    - `ftplugin/`
        - language specific configuration
        - keybindings
        - snippets
    - `lua/`
        - all **universal** configurations
        - autocommands
        - keymappings
        - `lua/plugs/`
            - every file represents a *subtype* of plugin
            - this can be as modular or monolithic as you want
            - includes the plugin installation and configuration


```sh
.
├── readme.md
├── ftplugin
│   ├── cpp.lua
│   ├── go.lua
│   ├── nim.lua
│   ├── ocaml.lua
│   ├── python.lua
│   ├── rust.lua
│   ├── solidity.lua
│   └── telekasten.lua
├── init.lua
├── lazy-lock.json
└── lua
    ├── autocmd.lua
    ├── keymaps.lua
    └── plugs
        ├── editor.lua
        ├── fuzzy.lua
        ├── git.lua
        ├── lsp.lua
        ├── repl.lua
        ├── snips.lua
        └── theme.lua
```

## Tables == Plugins

- what is great about lazy (and a few other plugin managers) is that plugin setups are simply lua tables.
- as a result you can return and agregate these tables from different lua modules (files with returns) and load your plugins in one place

### basic idea

- this could be some file names `foo.lua` in the folder where we put our plugin files
    - we return a table with the plugins related to **foo** and their configurations

```lua
return {
  'github/link',
  -- optional configuration
  dependencies = {},
  config = function ()
    -- plugin config / setup
  end
}
```

### loading the plugins in init.lua

When we want to load our plugin files we can do one of two things

1. Require each 'module' or plugin file
    - create a table of each plugin file loaded as a module
    - pass this into lazy
2. Tell lazy which directories (directories in lua can be refeferenced by their name)
    - add this as a parameter to lazy's setup

```lua
local lazypath = vim.fn.stdpath('data') .. '/lazy/lazy.nvim'
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    'git',
    'clone',
    '--filter=blob:none',
    'https://github.com/folke/lazy.nvim.git',
    '--branch=stable',   -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- manually requiring plugins (approach 1)
local plugins = {
  require("plugs.lsp"),
  require("plugs.theme"),
  require("plugs.fuzzy"),
  require("plugs.lsp"),
  require("plugs.snips"),
  require("plugs.repl"),
  require("plugs.git"),
  require("plugs.editor")
}

require('lazy').setup(plugins)

-- importing the module directly (approach 2)
require('lazy').setup({import="plugs"}) -- get's all the 'lua/plug/' files
```

### example for telescope and related plugins

This is an example from my `lua/plugs/fuzzy.lua` module where I setup telescope and its related plugins
- I start the file with a `require {}` and put all my setup within the return
- the keymaps and settings are all setup within the plugins `config = function () ... end`
    - this means if something isn't working or I want to add some functionality I know exactly where to look

```lua
return {
  'nvim-telescope/telescope.nvim',
  {
    'nvim-telescope/telescope-fzf-native.nvim',
    dependencies = { 'nvim-lua/plenary.nvim' },
    build = 'make',
    config = function()
      local default_theme = require('telescope.themes').get_ivy({})

      -- setup plugin
      require('telescope').setup({
        defaults = {
          layout_strategy = default_theme.layout_strategy,
          layout_config = default_theme.layout_config,
        },
      })
      require('telescope').load_extension('fzf')

      -- set custom keybindings
      local tsb = require 'telescope.builtin'
      vim.keymap.set('n', '<Space>bs', tsb.buffers, { desc = 'ts buf' })
      vim.keymap.set('n', '<Space>.', function()
        tsb.find_files({ no_ignore = true }) -- show files git ignores
      end, { desc = 'ts find files' })
      vim.keymap.set('n', '<Space>pf', tsb.git_files, { desc = 'ts git files' })
      vim.keymap.set('n', '<Space>h', tsb.help_tags, { desc = 'ts help' })
      vim.keymap.set('n', '<Space>m', tsb.keymaps, { desc = 'ts maps' })
      vim.keymap.set('n', '<Space>ps', tsb.live_grep, { desc = 'grep project' })
      vim.keymap.set('n', '<Space>gs', tsb.git_status, { desc = 'git diff' })
    end
  },
  -- telekasten
  {
    'renerocksai/telekasten.nvim',
    dependencies = { 'renerocksai/calendar-vim' },
    config = function()
      require('telekasten').setup({
        home = vim.fn.expand("~/zkast"),
      })
      vim.keymap.set('n', '<Space><Space>', '<cmd>Telekasten panel<CR>', { desc = 'telekasten panel' })
      vim.keymap.set('n', '<Space>rf', '<cmd>Telekasten find_notes<CR>', { desc = 'telekasten find notes' })
    end
  },
}
```

## Do plugins == Neovim?

What makes nvim great? Is it the core functionality, the lua configuration and extensibility, the community, the plugin ecosystem??? Yes...

In my opinion it is a combination of everything. Some people do go a bit plugin crazy and try to offload everything to a plugin (which is ok). However, without any of the amazing attributes listed the plugin system wouldn't be what it is. Having a 'real' configuration language like Lua, with a flushed out api, not only is customization easy but it enables the community to make great plugins. Since I had my first 'working' configuration I've probably cut my used plugins by 1/3 but I still have them handle some of the most crucial aspects of my workflow.

Neovim enables its plugin ecosystem and combined it is the best editor (for me)!
