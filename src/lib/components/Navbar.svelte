<script>
  import { page } from "$app/stores";
</script>

<nav class="navbar navbar-expand-lg nav-underline" data-bs-theme="dark">
  <div class="container-fluid">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <span class="navbar-brand mb-0 h1">Cade Lueker</span>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto" style="margin-right: 10px;">
        <li class="nav-item">
          <a
            class="nav-link {$page.url.pathname === '/' ? 'active' : ''}"
            href="/">Home</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link {$page.url.pathname === '/about' ? 'active' : ''}"
            href="/about">About</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link {$page.url.pathname.includes('/blog')
              ? 'active'
              : ''}"
            href="/blog">Blog</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  .navbar {
    background-color: #282828;
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
  }
  .navbar-brand {
    color: #83a598;
  }
</style>
