import { c as create_ssr_component } from "./ssr.js";
const metadata = {
  "title": "Simple Neovim Configuration with Lazy.nvim",
  "date": "05-17-24"
};
const SimpleNvimFileLayout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav class="toc" data-svelte-h="svelte-1c8z7n4"><ol class="toc-level toc-level-1"><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#lazy-directory-structure">Lazy Directory Structure</a><ol class="toc-level toc-level-2"><li class="toc-item toc-item-h2"><a class="toc-link toc-link-h2" href="#how-to-organize-confignvim">How to organize ‘.config/nvim’</a></li><li class="toc-item toc-item-h2"><a class="toc-link toc-link-h2" href="#tables--plugins">Tables == Plugins</a><ol class="toc-level toc-level-3"><li class="toc-item toc-item-h3"><a class="toc-link toc-link-h3" href="#basic-idea">basic idea</a></li><li class="toc-item toc-item-h3"><a class="toc-link toc-link-h3" href="#loading-the-plugins-in-initlua">loading the plugins in init.lua</a></li><li class="toc-item toc-item-h3"><a class="toc-link toc-link-h3" href="#example-for-telescope-and-related-plugins">example for telescope and related plugins</a></li></ol></li><li class="toc-item toc-item-h2"><a class="toc-link toc-link-h2" href="#do-plugins--neovim">Do plugins == Neovim?</a></li></ol></li></ol></nav> <h1 id="lazy-directory-structure" data-svelte-h="svelte-1am30zo"><a aria-hidden="true" tabindex="-1" href="#lazy-directory-structure"><span class="icon icon-link"></span></a>Lazy Directory Structure</h1> <p data-svelte-h="svelte-bmrqkl">Before using <a href="https://github.com/folke/lazy.nvim" rel="nofollow">lazy</a> I felt that my config was all over the place. Within ’~/.config/nvim/’ I had <code>after/</code>, <code>lua/config</code>, <code>lua/ide</code>, all to manage plugin configuration.</p> <p data-svelte-h="svelte-1f73l13">After helping some friends set up Nvim I realized I was still keeping things rather messy and found a style that seems to make things modular. Allowing for easier upstart, upgrading, and maintenance.</p> <h2 id="how-to-organize-confignvim" data-svelte-h="svelte-hld9nc"><a aria-hidden="true" tabindex="-1" href="#how-to-organize-confignvim"><span class="icon icon-link"></span></a>How to organize ‘.config/nvim’</h2> <ul data-svelte-h="svelte-1hjvz87"><li>each folder has a purpose<ul><li><code>ftplugin/</code><ul><li>language specific configuration</li> <li>keybindings</li> <li>snippets</li></ul></li> <li><code>lua/</code><ul><li>all <strong>universal</strong> configurations</li> <li>autocommands</li> <li>keymappings</li> <li><code>lua/plugs/</code><ul><li>every file represents a <em>subtype</em> of plugin</li> <li>this can be as modular or monolithic as you want</li> <li>includes the plugin installation and configuration</li></ul></li></ul></li></ul></li></ul> <!-- HTML_TAG_START -->${`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span style="color:#D8A657">.</span></span>
<span class="line"><span style="color:#A9B665">├──</span><span style="color:#D8A657"> readme.md</span></span>
<span class="line"><span style="color:#A9B665">├──</span><span style="color:#D8A657"> ftplugin</span></span>
<span class="line"><span style="color:#A9B665">│  </span><span style="color:#D8A657"> ├──</span><span style="color:#D8A657"> cpp.lua</span></span>
<span class="line"><span style="color:#A9B665">│  </span><span style="color:#D8A657"> ├──</span><span style="color:#D8A657"> go.lua</span></span>
<span class="line"><span style="color:#A9B665">│  </span><span style="color:#D8A657"> ├──</span><span style="color:#D8A657"> nim.lua</span></span>
<span class="line"><span style="color:#A9B665">│  </span><span style="color:#D8A657"> ├──</span><span style="color:#D8A657"> ocaml.lua</span></span>
<span class="line"><span style="color:#A9B665">│  </span><span style="color:#D8A657"> ├──</span><span style="color:#D8A657"> python.lua</span></span>
<span class="line"><span style="color:#A9B665">│  </span><span style="color:#D8A657"> ├──</span><span style="color:#D8A657"> rust.lua</span></span>
<span class="line"><span style="color:#A9B665">│  </span><span style="color:#D8A657"> ├──</span><span style="color:#D8A657"> solidity.lua</span></span>
<span class="line"><span style="color:#A9B665">│  </span><span style="color:#D8A657"> └──</span><span style="color:#D8A657"> telekasten.lua</span></span>
<span class="line"><span style="color:#A9B665">├──</span><span style="color:#D8A657"> init.lua</span></span>
<span class="line"><span style="color:#A9B665">├──</span><span style="color:#D8A657"> lazy-lock.json</span></span>
<span class="line"><span style="color:#A9B665">└──</span><span style="color:#D8A657"> lua</span></span>
<span class="line"><span style="color:#A9B665">    ├──</span><span style="color:#D8A657"> autocmd.lua</span></span>
<span class="line"><span style="color:#A9B665">    ├──</span><span style="color:#D8A657"> keymaps.lua</span></span>
<span class="line"><span style="color:#A9B665">    └──</span><span style="color:#D8A657"> plugs</span></span>
<span class="line"><span style="color:#A9B665">        ├──</span><span style="color:#D8A657"> editor.lua</span></span>
<span class="line"><span style="color:#A9B665">        ├──</span><span style="color:#D8A657"> fuzzy.lua</span></span>
<span class="line"><span style="color:#A9B665">        ├──</span><span style="color:#D8A657"> git.lua</span></span>
<span class="line"><span style="color:#A9B665">        ├──</span><span style="color:#D8A657"> lsp.lua</span></span>
<span class="line"><span style="color:#A9B665">        ├──</span><span style="color:#D8A657"> repl.lua</span></span>
<span class="line"><span style="color:#A9B665">        ├──</span><span style="color:#D8A657"> snips.lua</span></span>
<span class="line"><span style="color:#A9B665">        └──</span><span style="color:#D8A657"> theme.lua</span></span></code></pre>`}<!-- HTML_TAG_END --> <h2 id="tables--plugins" data-svelte-h="svelte-cq8stv"><a aria-hidden="true" tabindex="-1" href="#tables--plugins"><span class="icon icon-link"></span></a>Tables == Plugins</h2> <ul data-svelte-h="svelte-1b9npii"><li>what is great about lazy (and a few other plugin managers) is that plugin setups are simply lua tables.</li> <li>as a result you can return and agregate these tables from different lua modules (files with returns) and load your plugins in one place</li></ul> <h3 id="basic-idea" data-svelte-h="svelte-13eujt3"><a aria-hidden="true" tabindex="-1" href="#basic-idea"><span class="icon icon-link"></span></a>basic idea</h3> <ul data-svelte-h="svelte-jsx7bn"><li>this could be some file names <code>foo.lua</code> in the folder where we put our plugin files<ul><li>we return a table with the plugins related to <strong>foo</strong> and their configurations</li></ul></li></ul> <!-- HTML_TAG_START -->${`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span style="color:#EA6962">return</span><span style="color:#D4BE98"> &#123;</span></span>
<span class="line"><span style="color:#D8A657">  'github/link'</span><span style="color:#D4BE98">,</span></span>
<span class="line"><span style="color:#928374;font-style:italic">  -- optional configuration</span></span>
<span class="line"><span style="color:#D4BE98">  dependencies </span><span style="color:#E78A4E">=</span><span style="color:#D4BE98"> &#123;&#125;,</span></span>
<span class="line"><span style="color:#A9B665">  config</span><span style="color:#E78A4E"> =</span><span style="color:#EA6962"> function</span><span style="color:#D4BE98"> ()</span></span>
<span class="line"><span style="color:#928374;font-style:italic">    -- plugin config / setup</span></span>
<span class="line"><span style="color:#EA6962">  end</span></span>
<span class="line"><span style="color:#D4BE98">&#125;</span></span></code></pre>`}<!-- HTML_TAG_END --> <h3 id="loading-the-plugins-in-initlua" data-svelte-h="svelte-i382s6"><a aria-hidden="true" tabindex="-1" href="#loading-the-plugins-in-initlua"><span class="icon icon-link"></span></a>loading the plugins in init.lua</h3> <p data-svelte-h="svelte-csbbsm">When we want to load our plugin files we can do one of two things</p> <ol data-svelte-h="svelte-iojaev"><li>Require each ‘module’ or plugin file<ul><li>create a table of each plugin file loaded as a module</li> <li>pass this into lazy</li></ul></li> <li>Tell lazy which directories (directories in lua can be refeferenced by their name)<ul><li>add this as a parameter to lazy’s setup</li></ul></li></ol> <!-- HTML_TAG_START -->${`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span style="color:#EA6962">local</span><span style="color:#D4BE98"> lazypath </span><span style="color:#E78A4E">=</span><span style="color:#D4BE98"> vim.fn.</span><span style="color:#A9B665">stdpath</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'data'</span><span style="color:#D4BE98">) </span><span style="color:#E78A4E">..</span><span style="color:#D8A657"> '/lazy/lazy.nvim'</span></span>
<span class="line"><span style="color:#EA6962">if</span><span style="color:#E78A4E"> not</span><span style="color:#D4BE98"> vim.loop.</span><span style="color:#A9B665">fs_stat</span><span style="color:#D4BE98">(lazypath) </span><span style="color:#EA6962">then</span></span>
<span class="line"><span style="color:#D4BE98">  vim.fn.</span><span style="color:#A9B665">system</span><span style="color:#D4BE98">(&#123;</span></span>
<span class="line"><span style="color:#D8A657">    'git'</span><span style="color:#D4BE98">,</span></span>
<span class="line"><span style="color:#D8A657">    'clone'</span><span style="color:#D4BE98">,</span></span>
<span class="line"><span style="color:#D8A657">    '--filter=blob:none'</span><span style="color:#D4BE98">,</span></span>
<span class="line"><span style="color:#D8A657">    'https://github.com/folke/lazy.nvim.git'</span><span style="color:#D4BE98">,</span></span>
<span class="line"><span style="color:#D8A657">    '--branch=stable'</span><span style="color:#D4BE98">,   </span><span style="color:#928374;font-style:italic">-- latest stable release</span></span>
<span class="line"><span style="color:#D4BE98">    lazypath,</span></span>
<span class="line"><span style="color:#D4BE98">  &#125;)</span></span>
<span class="line"><span style="color:#EA6962">end</span></span>
<span class="line"><span style="color:#D4BE98">vim.opt.</span><span style="color:#7DAEA3">rtp</span><span style="color:#D4BE98">:</span><span style="color:#A9B665">prepend</span><span style="color:#D4BE98">(lazypath)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#928374;font-style:italic">-- manually requiring plugins (approach 1)</span></span>
<span class="line"><span style="color:#EA6962">local</span><span style="color:#D4BE98"> plugins </span><span style="color:#E78A4E">=</span><span style="color:#D4BE98"> &#123;</span></span>
<span class="line"><span style="color:#A9B665">  require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">"plugs.lsp"</span><span style="color:#D4BE98">),</span></span>
<span class="line"><span style="color:#A9B665">  require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">"plugs.theme"</span><span style="color:#D4BE98">),</span></span>
<span class="line"><span style="color:#A9B665">  require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">"plugs.fuzzy"</span><span style="color:#D4BE98">),</span></span>
<span class="line"><span style="color:#A9B665">  require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">"plugs.lsp"</span><span style="color:#D4BE98">),</span></span>
<span class="line"><span style="color:#A9B665">  require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">"plugs.snips"</span><span style="color:#D4BE98">),</span></span>
<span class="line"><span style="color:#A9B665">  require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">"plugs.repl"</span><span style="color:#D4BE98">),</span></span>
<span class="line"><span style="color:#A9B665">  require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">"plugs.git"</span><span style="color:#D4BE98">),</span></span>
<span class="line"><span style="color:#A9B665">  require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">"plugs.editor"</span><span style="color:#D4BE98">)</span></span>
<span class="line"><span style="color:#D4BE98">&#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A9B665">require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'lazy'</span><span style="color:#D4BE98">).</span><span style="color:#A9B665">setup</span><span style="color:#D4BE98">(plugins)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#928374;font-style:italic">-- importing the module directly (approach 2)</span></span>
<span class="line"><span style="color:#A9B665">require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'lazy'</span><span style="color:#D4BE98">).</span><span style="color:#A9B665">setup</span><span style="color:#D4BE98">(&#123;import</span><span style="color:#E78A4E">=</span><span style="color:#D8A657">"plugs"</span><span style="color:#D4BE98">&#125;) </span><span style="color:#928374;font-style:italic">-- get's all the 'lua/plug/' files</span></span></code></pre>`}<!-- HTML_TAG_END --> <h3 id="example-for-telescope-and-related-plugins" data-svelte-h="svelte-g12oh"><a aria-hidden="true" tabindex="-1" href="#example-for-telescope-and-related-plugins"><span class="icon icon-link"></span></a>example for telescope and related plugins</h3> <p data-svelte-h="svelte-176tpq4">This is an example from my <code>lua/plugs/fuzzy.lua</code> module where I setup telescope and its related plugins</p> <ul data-svelte-h="svelte-4drdjt"><li>I start the file with a <code>require {}</code> and put all my setup within the return</li> <li>the keymaps and settings are all setup within the plugins <code>config = function () ... end</code><ul><li>this means if something isn’t working or I want to add some functionality I know exactly where to look</li></ul></li></ul> <!-- HTML_TAG_START -->${`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span style="color:#EA6962">return</span><span style="color:#D4BE98"> &#123;</span></span>
<span class="line"><span style="color:#D8A657">  'nvim-telescope/telescope.nvim'</span><span style="color:#D4BE98">,</span></span>
<span class="line"><span style="color:#D4BE98">  &#123;</span></span>
<span class="line"><span style="color:#D8A657">    'nvim-telescope/telescope-fzf-native.nvim'</span><span style="color:#D4BE98">,</span></span>
<span class="line"><span style="color:#D4BE98">    dependencies </span><span style="color:#E78A4E">=</span><span style="color:#D4BE98"> &#123; </span><span style="color:#D8A657">'nvim-lua/plenary.nvim' </span><span style="color:#D4BE98">&#125;,</span></span>
<span class="line"><span style="color:#D4BE98">    build </span><span style="color:#E78A4E">=</span><span style="color:#D8A657"> 'make'</span><span style="color:#D4BE98">,</span></span>
<span class="line"><span style="color:#A9B665">    config</span><span style="color:#E78A4E"> =</span><span style="color:#EA6962"> function</span><span style="color:#D4BE98">()</span></span>
<span class="line"><span style="color:#EA6962">      local</span><span style="color:#D4BE98"> default_theme </span><span style="color:#E78A4E">=</span><span style="color:#A9B665"> require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'telescope.themes'</span><span style="color:#D4BE98">).</span><span style="color:#A9B665">get_ivy</span><span style="color:#D4BE98">(&#123;&#125;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#928374;font-style:italic">      -- setup plugin</span></span>
<span class="line"><span style="color:#A9B665">      require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'telescope'</span><span style="color:#D4BE98">).</span><span style="color:#A9B665">setup</span><span style="color:#D4BE98">(&#123;</span></span>
<span class="line"><span style="color:#D4BE98">        defaults </span><span style="color:#E78A4E">=</span><span style="color:#D4BE98"> &#123;</span></span>
<span class="line"><span style="color:#D4BE98">          layout_strategy </span><span style="color:#E78A4E">=</span><span style="color:#D4BE98"> default_theme.layout_strategy,</span></span>
<span class="line"><span style="color:#D4BE98">          layout_config </span><span style="color:#E78A4E">=</span><span style="color:#D4BE98"> default_theme.layout_config,</span></span>
<span class="line"><span style="color:#D4BE98">        &#125;,</span></span>
<span class="line"><span style="color:#D4BE98">      &#125;)</span></span>
<span class="line"><span style="color:#A9B665">      require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'telescope'</span><span style="color:#D4BE98">).</span><span style="color:#A9B665">load_extension</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'fzf'</span><span style="color:#D4BE98">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#928374;font-style:italic">      -- set custom keybindings</span></span>
<span class="line"><span style="color:#EA6962">      local</span><span style="color:#D4BE98"> tsb </span><span style="color:#E78A4E">=</span><span style="color:#A9B665"> require</span><span style="color:#D8A657"> 'telescope.builtin'</span></span>
<span class="line"><span style="color:#D4BE98">      vim.keymap.</span><span style="color:#A9B665">set</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'n'</span><span style="color:#D4BE98">, </span><span style="color:#D8A657">'&#x3C;Space>bs'</span><span style="color:#D4BE98">, tsb.buffers, &#123; desc </span><span style="color:#E78A4E">=</span><span style="color:#D8A657"> 'ts buf' </span><span style="color:#D4BE98">&#125;)</span></span>
<span class="line"><span style="color:#D4BE98">      vim.keymap.</span><span style="color:#A9B665">set</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'n'</span><span style="color:#D4BE98">, </span><span style="color:#D8A657">'&#x3C;Space>.'</span><span style="color:#D4BE98">, </span><span style="color:#EA6962">function</span><span style="color:#D4BE98">()</span></span>
<span class="line"><span style="color:#D4BE98">        tsb.</span><span style="color:#A9B665">find_files</span><span style="color:#D4BE98">(&#123; no_ignore </span><span style="color:#E78A4E">=</span><span style="color:#89B482"> true</span><span style="color:#D4BE98"> &#125;) </span><span style="color:#928374;font-style:italic">-- show files git ignores</span></span>
<span class="line"><span style="color:#EA6962">      end</span><span style="color:#D4BE98">, &#123; desc </span><span style="color:#E78A4E">=</span><span style="color:#D8A657"> 'ts find files' </span><span style="color:#D4BE98">&#125;)</span></span>
<span class="line"><span style="color:#D4BE98">      vim.keymap.</span><span style="color:#A9B665">set</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'n'</span><span style="color:#D4BE98">, </span><span style="color:#D8A657">'&#x3C;Space>pf'</span><span style="color:#D4BE98">, tsb.git_files, &#123; desc </span><span style="color:#E78A4E">=</span><span style="color:#D8A657"> 'ts git files' </span><span style="color:#D4BE98">&#125;)</span></span>
<span class="line"><span style="color:#D4BE98">      vim.keymap.</span><span style="color:#A9B665">set</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'n'</span><span style="color:#D4BE98">, </span><span style="color:#D8A657">'&#x3C;Space>h'</span><span style="color:#D4BE98">, tsb.help_tags, &#123; desc </span><span style="color:#E78A4E">=</span><span style="color:#D8A657"> 'ts help' </span><span style="color:#D4BE98">&#125;)</span></span>
<span class="line"><span style="color:#D4BE98">      vim.keymap.</span><span style="color:#A9B665">set</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'n'</span><span style="color:#D4BE98">, </span><span style="color:#D8A657">'&#x3C;Space>m'</span><span style="color:#D4BE98">, tsb.keymaps, &#123; desc </span><span style="color:#E78A4E">=</span><span style="color:#D8A657"> 'ts maps' </span><span style="color:#D4BE98">&#125;)</span></span>
<span class="line"><span style="color:#D4BE98">      vim.keymap.</span><span style="color:#A9B665">set</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'n'</span><span style="color:#D4BE98">, </span><span style="color:#D8A657">'&#x3C;Space>ps'</span><span style="color:#D4BE98">, tsb.live_grep, &#123; desc </span><span style="color:#E78A4E">=</span><span style="color:#D8A657"> 'grep project' </span><span style="color:#D4BE98">&#125;)</span></span>
<span class="line"><span style="color:#D4BE98">      vim.keymap.</span><span style="color:#A9B665">set</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'n'</span><span style="color:#D4BE98">, </span><span style="color:#D8A657">'&#x3C;Space>gs'</span><span style="color:#D4BE98">, tsb.git_status, &#123; desc </span><span style="color:#E78A4E">=</span><span style="color:#D8A657"> 'git diff' </span><span style="color:#D4BE98">&#125;)</span></span>
<span class="line"><span style="color:#EA6962">    end</span></span>
<span class="line"><span style="color:#D4BE98">  &#125;,</span></span>
<span class="line"><span style="color:#928374;font-style:italic">  -- telekasten</span></span>
<span class="line"><span style="color:#D4BE98">  &#123;</span></span>
<span class="line"><span style="color:#D8A657">    'renerocksai/telekasten.nvim'</span><span style="color:#D4BE98">,</span></span>
<span class="line"><span style="color:#D4BE98">    dependencies </span><span style="color:#E78A4E">=</span><span style="color:#D4BE98"> &#123; </span><span style="color:#D8A657">'renerocksai/calendar-vim' </span><span style="color:#D4BE98">&#125;,</span></span>
<span class="line"><span style="color:#A9B665">    config</span><span style="color:#E78A4E"> =</span><span style="color:#EA6962"> function</span><span style="color:#D4BE98">()</span></span>
<span class="line"><span style="color:#A9B665">      require</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'telekasten'</span><span style="color:#D4BE98">).</span><span style="color:#A9B665">setup</span><span style="color:#D4BE98">(&#123;</span></span>
<span class="line"><span style="color:#D4BE98">        home </span><span style="color:#E78A4E">=</span><span style="color:#D4BE98"> vim.fn.</span><span style="color:#A9B665">expand</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">"~/zkast"</span><span style="color:#D4BE98">),</span></span>
<span class="line"><span style="color:#D4BE98">      &#125;)</span></span>
<span class="line"><span style="color:#D4BE98">      vim.keymap.</span><span style="color:#A9B665">set</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'n'</span><span style="color:#D4BE98">, </span><span style="color:#D8A657">'&#x3C;Space>&#x3C;Space>'</span><span style="color:#D4BE98">, </span><span style="color:#D8A657">'&#x3C;cmd>Telekasten panel&#x3C;CR>'</span><span style="color:#D4BE98">, &#123; desc </span><span style="color:#E78A4E">=</span><span style="color:#D8A657"> 'telekasten panel' </span><span style="color:#D4BE98">&#125;)</span></span>
<span class="line"><span style="color:#D4BE98">      vim.keymap.</span><span style="color:#A9B665">set</span><span style="color:#D4BE98">(</span><span style="color:#D8A657">'n'</span><span style="color:#D4BE98">, </span><span style="color:#D8A657">'&#x3C;Space>rf'</span><span style="color:#D4BE98">, </span><span style="color:#D8A657">'&#x3C;cmd>Telekasten find_notes&#x3C;CR>'</span><span style="color:#D4BE98">, &#123; desc </span><span style="color:#E78A4E">=</span><span style="color:#D8A657"> 'telekasten find notes' </span><span style="color:#D4BE98">&#125;)</span></span>
<span class="line"><span style="color:#EA6962">    end</span></span>
<span class="line"><span style="color:#D4BE98">  &#125;,</span></span>
<span class="line"><span style="color:#D4BE98">&#125;</span></span></code></pre>`}<!-- HTML_TAG_END --> <h2 id="do-plugins--neovim" data-svelte-h="svelte-hg6a4q"><a aria-hidden="true" tabindex="-1" href="#do-plugins--neovim"><span class="icon icon-link"></span></a>Do plugins == Neovim?</h2> <p data-svelte-h="svelte-3ovmfm">What makes nvim great? Is it the core functionality, the lua configuration and extensibility, the community, the plugin ecosystem??? Yes…</p> <p data-svelte-h="svelte-bidh1g">In my opinion it is a combination of everything. Some people do go a bit plugin crazy and try to offload everything to a plugin (which is ok). However, without any of the amazing attributes listed the plugin system wouldn’t be what it is. Having a ‘real’ configuration language like Lua, with a flushed out api, not only is customization easy but it enables the community to make great plugins. Since I had my first ‘working’ configuration I’ve probably cut my used plugins by 1/3 but I still have them handle some of the most crucial aspects of my workflow.</p> <p data-svelte-h="svelte-1o9fzb9">Neovim enables its plugin ecosystem and combined it is the best editor (for me)!</p>`;
});
export {
  SimpleNvimFileLayout as default,
  metadata
};