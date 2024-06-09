import { c as create_ssr_component } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="home-page" data-svelte-h="svelte-1cn5a02"><div class="col-lg-6 col-12 text-center container"><div class="image-container"><img src="profile.jpg" class="card-img-top" alt="Profile"></div> <div class="description"><h1>Welcome to my Website</h1></div> <div class="description"><h2>Software engineering <a href="/about">portfolio</a> &amp;
      <a href="/blog">blog</a></h2></div></div></div>`;
});
export {
  Page as default
};
