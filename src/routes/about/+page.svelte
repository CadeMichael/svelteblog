<script lang="ts">
  import WorkExperience from "$lib/components/WorkExperience.svelte";

  let vertex =
    "Working with Vertex I was responsible for writing smart contracts in Solidity and Oracles in Rust. My team was rather small and developed several projects from the ground up. We worked as smart contract developers and built production oracles (software for interfacing with contracts) in Rust.";
  let publicis =
    "I started my 'professional' programming career at Publicis. Here I worked mainly on salesforce projects involving Javascript front ends. I wrote server endpoints in Apex and weaved them into front ends with JS. Some of the technologies used were React and the Lightning Component Framework.";
  let bluescape =
    "At Bluescape I worked on testing their expansive front end. I used Jest to test the JS front end written in React. It was my first time working with production code and I grew exponentially as a developer. In part due to using Jira to manage tickets to proper git workflows.";
</script>

<div class="about-page">
  <div class="container">
    <h2 class="heading">Work Experience</h2>
    <div class="row">
      <WorkExperience
        title={"Defi Contractor"}
        subtitle={"Vertex Industries Feb 2024 - present"}
        text={vertex}
        badges={["Solidity", "Rust", "Python"]}
      />
      <WorkExperience
        title={"Junior Software Engineer"}
        subtitle={"Publicis Sapient Aug 2022 - Nov 2023"}
        text={publicis}
        badges={["Javascript", "Java", "Salesforce"]}
      />
      <WorkExperience
        title={"Test Framework Engineering Intern"}
        subtitle={"Bluescape Feb 2022 - July 2022"}
        text={bluescape}
        badges={["Node.js", "Jest", "Git"]}
      />
    </div>
  </div>
</div>
