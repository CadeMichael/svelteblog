const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : ""))));
  });
};
async function load({ params }) {
  const post = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../luasnipPlugin.md": () => import("../../../../chunks/luasnipPlugin.js"), "../simpleNvimFileLayout.md": () => import("../../../../chunks/simpleNvimFileLayout.js") }), `../${params.slug}.md`, 2);
  const { title, date } = post.metadata;
  const content = post.default;
  return {
    content,
    title,
    date
  };
}
export {
  load
};
