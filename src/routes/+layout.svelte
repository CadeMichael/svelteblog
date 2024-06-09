<script>
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import "$lib/styles/style.scss";
</script>

<Navbar />

<div class="all-content">
  <slot></slot>
</div>

<Footer />

<style>
  .all-content {
    margin-top: 75px;
  }
</style>
