import * as universal from '../entries/pages/blog/_slug_/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/5.CfsRwnRp.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.BzV8Pfuc.js","_app/immutable/chunks/index.DHocS9Wk.js"];
export const stylesheets = [];
export const fonts = [];
