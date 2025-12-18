<script lang="ts">
  export let title: string;
  export let description: string = "";
  export let topics: string[] = [];
  export let paper: string | null = null;
  export let presentation: string | null = null;
  export let conference: string | null = null;
  let open = false;
  const id = `research-${Math.random().toString(36).slice(2,9)}`;
</script>

<div class="card mb-4 research-card">
  <div class="card-body">
    <h5 class="card-title">{title}</h5>
    {#if topics.length}
      <p class="card-subtitle topic-list mb-1">:: {topics.join(' :: ')} ::</p>
    {/if}

    {#if description}
      <button class="abstract-toggle" aria-expanded={open} aria-controls={id} on:click={() => (open = !open)}>
        Abstract
        <span class:open={open} class="caret">▾</span>
      </button>

      {#if open}
        <p id={id} class="card-text">{description}</p>
      {/if}
    {/if}

    <div class="d-flex gap-2">
      {#if presentation}
        <a class="badge text-bg-secondary" href={presentation} rel="noopener" target="_blank">Presentation</a>
      {/if}
      {#if paper}
        <a class="badge text-bg-secondary" href={paper} rel="noopener" target="_blank">Paper</a>
      {/if}
      {#if conference}
        <a class="badge text-bg-secondary" href={conference} rel="noopener" target="_blank">Conference</a>
      {/if}
    </div>
  </div>
</div>
