<script lang="ts">
  export let title: String;
  export let subtitle: String;
  export let text: String;
  export let badges: String[];
</script>

<div class="col-12 gy-4 col-md-4">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{title}</h5>
      <h6 class="card-subtitle mb-2">{subtitle}</h6>
      <p class="card-text">{text}</p>
      {#each badges as badge}
        <span class="badge text-bg-secondary">{badge}</span>
      {/each}
    </div>
  </div>
</div>
