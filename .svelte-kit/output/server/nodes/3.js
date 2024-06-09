

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.C5x9_YAR.js","_app/immutable/chunks/scheduler.BzV8Pfuc.js","_app/immutable/chunks/index.DHocS9Wk.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = [];
export const fonts = [];
