import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.l7tweNBg.js","_app/immutable/chunks/scheduler.BzV8Pfuc.js","_app/immutable/chunks/index.DHocS9Wk.js","_app/immutable/chunks/stores.D1OcQzIp.js","_app/immutable/chunks/entry.DOLNYVgE.js"];
export const stylesheets = ["_app/immutable/assets/0.ChQCKMr8.css"];
export const fonts = [];
