<script lang="ts">
  export let data;
</script>

<div class="blog-post">
  <article>
    <h1>{data.title}</h1>
    <p>Published: {data.date}</p>
    <svelte:component this={data.content} />
  </article>
</div>

<style>
  .blog-post {
  }
</style>
