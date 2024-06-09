import { c as create_ssr_component, f as add_attribute, d as each, e as escape } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredPosts;
  let { data } = $$props;
  let searchQuery = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  filteredPosts = data.posts.filter((post) => post.meta.title.toLowerCase().includes(searchQuery.toLowerCase()));
  return `<div class="container-fluid blog-page"><div class="row"> <div class="col-12"><div class="blog-search d-block d-lg-none"><h2 data-svelte-h="svelte-1aap0hw">Search for a Post</h2> <form class="d-flex" role="search"><input class="form-control me-2" type="search" placeholder="Filter blog posts..." aria-label="Filter"${add_attribute("value", searchQuery, 0)}></form></div></div></div>  <div class="row align-items-start"><div class="col-md-7"><div class="blog-items"><ul>${each(filteredPosts, (post) => {
    return `<li><h2><a${add_attribute("href", post.path, 0)}>${escape(post.meta.title)} </a></h2>
              Published ${escape(post.meta.date)} </li>`;
  })}</ul></div></div>  <div class="col-md-5"><div class="d-none d-lg-block blog-search"><h2 data-svelte-h="svelte-1aap0hw">Search for a Post</h2> <form class="d-flex" role="search"><input class="form-control me-2" type="search" placeholder="Filter blog posts..." aria-label="Filter"${add_attribute("value", searchQuery, 0)}></form></div></div></div></div>`;
});
export {
  Page as default
};
