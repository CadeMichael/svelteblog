<script lang="ts">
  import ResearchCard from "$lib/components/ResearchCard.svelte";

  const items = [
    {
      title: "Towards Abstract Cumulative Semantics via Handlers",
      description: "We consider the problem of modularizing control flow in a generic abstract interpretation framework. A generic abstract interpretation framework is not truly flexible if it does not allow interpreting with different path- and flow-sensitivities, by going forwards or backwards, and over- or under-approximately. Most interpreters inherently intertwine syntax and semantics, making the implementation antagonistic to modularity. Current approaches to modular designs require the use of complex data structures (e.g., monad transformers), providing modularity but often proving unwieldy (e.g., lifts). We observe that leveraging scoped effects within an interpreter facilitates the accumulation of semantic fragments against a fixed syntax. In this paper, we define cumulative abstract semantics, illustrating the potential for creating multiple dynamic evaluators and static analyses from one interpreter. This modularity is achieved by grouping effects into two categories: syntax elimination and domain-semantic introduction handlers. Our contribution shows the benefits of using effects as an instrument for designing a clean, elegant, and modular abstract interpretation framework.",
      topics: ["Abstract Interpretation", "Algebraic Effects"],
      presentation: "/research/cumulative_semantics",
      paper: "https://arxiv.org/abs/2512.10861",
      conference: "https://popl26.sigplan.org/details/pepm-2026-papers/11/Towards-Cumulative-Abstract-Semantics-via-Handlers-Short-Paper-"
    }
  ];
</script>

<div class="research-page container">
  <h2 class="heading">Research</h2>

  <div class="row justify-content-center">
    {#each items as item}
      <div class="col-md-4 d-flex justify-content-center">
        <ResearchCard
          title={item.title}
          description={item.description}
          topics={item.topics}
          presentation={item.presentation}
          paper={item.paper}
          conference={item.conference}
        />
      </div>
    {/each}
  </div>
</div>

