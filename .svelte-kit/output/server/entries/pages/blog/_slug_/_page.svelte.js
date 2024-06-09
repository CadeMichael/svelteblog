import { c as create_ssr_component, e as escape, v as validate_component, m as missing_component } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="blog-post svelte-e0j7s0"><article><h1>${escape(data.title)}</h1> <p>Published: ${escape(data.date)}</p> ${validate_component(data.content || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</article> </div>`;
});
export {
  Page as default
};
