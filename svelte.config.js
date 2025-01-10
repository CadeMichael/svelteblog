import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex, escapeSvelte } from "mdsvex";
import { getHighlighter } from "shiki";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import toc from '@jsdevtools/rehype-toc';
// import gruvbox from './static/gruvbox-theme.json' assert { type: 'json' };

// need to get plugin from json
import { promises as fs } from 'fs';
import path from 'path';

async function loadJson(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

const gruvbox = await loadJson(path.resolve('./static/gruvbox-theme.json'));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess({}),

    mdsvex({
      extensions: [".md"],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, toc],
      highlight: {
        highlighter: async (code, lang = 'text') => {
          const highlighter = await getHighlighter({
            themes: [gruvbox],
            langs: ['zig', 'wasm', 'ocaml', 'lua', 'lean4', 'nix', 'py', 'elisp', 'js', 'rs', 'sh']
          })
          await highlighter.loadLanguage('zig', 'wasm', 'ocaml', 'nix', 'lua', 'lean4', 'py', 'elisp', 'js', 'rs', 'sh')
          const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'gruvbox' }))
          return `{@html \`${html}\` }`
        }
      },
    }),
  ],

  kit: {
    adapter: adapter(),
  },

  extensions: [".svelte", ".md"],
};

export default config;

