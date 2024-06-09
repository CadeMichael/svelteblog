export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png","gruvbox-theme.json","luasnip.gif","profile.jpg","svelte-icon.svg"]),
	mimeTypes: {".png":"image/png",".json":"application/json",".gif":"image/gif",".jpg":"image/jpeg",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.3FAp7KOc.js","app":"_app/immutable/entry/app.C1Ri3rn_.js","imports":["_app/immutable/entry/start.3FAp7KOc.js","_app/immutable/chunks/entry.DOLNYVgE.js","_app/immutable/chunks/scheduler.BzV8Pfuc.js","_app/immutable/entry/app.C1Ri3rn_.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.BzV8Pfuc.js","_app/immutable/chunks/index.DHocS9Wk.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
