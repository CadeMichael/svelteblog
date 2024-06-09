<script lang="ts">
  interface PostMeta {
    title: string;
    date: string;
  }

  interface Post {
    path: string;
    meta: PostMeta;
  }

  interface Data {
    posts: Post[];
  }

  export let data: Data;
  let searchQuery = ""; // Reactive variable for the search input

  $: filteredPosts = data.posts.filter((post: Post) =>
    post.meta.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
</script>

<div class="container-fluid blog-page">
  <div class="row">
    <!-- small search -->
    <div class="col-12">
      <div class="blog-search d-block d-lg-none">
        <h2>Search for a Post</h2>
        <form class="d-flex" role="search" on:submit|preventDefault>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Filter blog posts..."
            aria-label="Filter"
            bind:value={searchQuery}
          />
        </form>
      </div>
    </div>
  </div>
  <!-- Posts row -->
  <div class="row align-items-start">
    <div class="col-md-7">
      <div class="blog-items">
        <ul>
          {#each filteredPosts as post}
            <li>
              <h2>
                <a href={post.path}>
                  {post.meta.title}
                </a>
              </h2>
              Published {post.meta.date}
            </li>
          {/each}
        </ul>
      </div>
    </div>
    <!-- large search  -->
    <div class="col-md-5">
      <div class="d-none d-lg-block blog-search">
        <h2>Search for a Post</h2>
        <form class="d-flex" role="search" on:submit|preventDefault>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Filter blog posts..."
            aria-label="Filter"
            bind:value={searchQuery}
          />
        </form>
      </div>
    </div>
  </div>
</div>
