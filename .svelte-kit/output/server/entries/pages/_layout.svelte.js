import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="text-center mt-auto" data-svelte-h="svelte-4duh59"><div class="container p-2"><section class="mb-0"> <a class="btn btn-outline-light btn-floating m-1" href="https://www.youtube.com/channel/UCsFz3xPT6LXXWcq_EbB1r-Q" role="button"><i class="fab fa-youtube"></i></a>  <a class="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/bigdogbjj/" role="button"><i class="fab fa-instagram"></i></a>  <a class="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/cade-lueker-79a55b199/" role="button"><i class="fab fa-linkedin-in"></i></a>  <a class="btn btn-outline-light btn-floating m-1" href="https://www.github.com/cademichael/" role="button"><i class="fab fa-github"></i></a></section></div> <div class="text-center p-3 copyright">Made with [ <img src="/svelte-icon.svg" alt="Svelte" class="icon-svelte"> +
    <i class="fab fa-sass"></i>
    + <i class="fab fa-markdown"></i> ]</div></footer>`;
});
const css$1 = {
  code: ".navbar.svelte-zurb3d{background-color:#282828;position:fixed;top:0;z-index:1000;width:100%}.navbar-brand.svelte-zurb3d{color:#83a598}",
  map: `{"version":3,"file":"Navbar.svelte","sources":["Navbar.svelte"],"sourcesContent":["<script>\\n  import { page } from \\"$app/stores\\";\\n<\/script>\\n\\n<nav class=\\"navbar navbar-expand-lg nav-underline\\" data-bs-theme=\\"dark\\">\\n  <div class=\\"container-fluid\\">\\n    <button\\n      class=\\"navbar-toggler\\"\\n      type=\\"button\\"\\n      data-bs-toggle=\\"collapse\\"\\n      data-bs-target=\\"#navbarNav\\"\\n      aria-controls=\\"navbarNav\\"\\n      aria-expanded=\\"false\\"\\n      aria-label=\\"Toggle navigation\\"\\n    >\\n      <span class=\\"navbar-toggler-icon\\"></span>\\n    </button>\\n    <span class=\\"navbar-brand mb-0 h1\\">Cade Lueker</span>\\n    <div class=\\"collapse navbar-collapse\\" id=\\"navbarNav\\">\\n      <ul class=\\"navbar-nav ms-auto\\" style=\\"margin-right: 10px;\\">\\n        <li class=\\"nav-item\\">\\n          <a\\n            class=\\"nav-link {$page.url.pathname === '/' ? 'active' : ''}\\"\\n            href=\\"/\\">Home</a\\n          >\\n        </li>\\n        <li class=\\"nav-item\\">\\n          <a\\n            class=\\"nav-link {$page.url.pathname === '/about' ? 'active' : ''}\\"\\n            href=\\"/about\\">About</a\\n          >\\n        </li>\\n        <li class=\\"nav-item\\">\\n          <a\\n            class=\\"nav-link {$page.url.pathname.includes('/blog')\\n              ? 'active'\\n              : ''}\\"\\n            href=\\"/blog\\">Blog</a\\n          >\\n        </li>\\n      </ul>\\n    </div>\\n  </div>\\n</nav>\\n\\n<style>\\n  .navbar {\\n    background-color: #282828;\\n    position: fixed; /* Fix position to the top of the viewport */\\n    top: 0; /* Align top edge at the top of the viewport */\\n    z-index: 1000;\\n    width: 100%;\\n  }\\n  .navbar-brand {\\n    color: #83a598;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA8CE,qBAAQ,CACN,gBAAgB,CAAE,OAAO,CACzB,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IACT,CACA,2BAAc,CACZ,KAAK,CAAE,OACT"}`
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$1);
  $$unsubscribe_page();
  return `<nav class="navbar navbar-expand-lg nav-underline svelte-zurb3d" data-bs-theme="dark"><div class="container-fluid"><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" data-svelte-h="svelte-1eytg9k"><span class="navbar-toggler-icon"></span></button> <span class="navbar-brand mb-0 h1 svelte-zurb3d" data-svelte-h="svelte-1vnwv4d">Cade Lueker</span> <div class="collapse navbar-collapse" id="navbarNav"><ul class="navbar-nav ms-auto" style="margin-right: 10px;"><li class="nav-item"><a class="${"nav-link " + escape($page.url.pathname === "/" ? "active" : "", true)}" href="/">Home</a></li> <li class="nav-item"><a class="${"nav-link " + escape($page.url.pathname === "/about" ? "active" : "", true)}" href="/about">About</a></li> <li class="nav-item"><a class="${"nav-link " + escape($page.url.pathname.includes("/blog") ? "active" : "", true)}" href="/blog">Blog</a></li></ul></div></div> </nav>`;
});
const css = {
  code: ".all-content.svelte-1b1lzt9{margin-top:75px}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\n  import Footer from \\"$lib/components/Footer.svelte\\";\\n  import Navbar from \\"$lib/components/Navbar.svelte\\";\\n  import \\"$lib/styles/style.scss\\";\\n<\/script>\\n\\n<Navbar />\\n\\n<div class=\\"all-content\\">\\n  <slot></slot>\\n</div>\\n\\n<Footer />\\n\\n<style>\\n  .all-content {\\n    margin-top: 75px;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAeE,2BAAa,CACX,UAAU,CAAE,IACd"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} <div class="all-content svelte-1b1lzt9">${slots.default ? slots.default({}) : ``}</div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
