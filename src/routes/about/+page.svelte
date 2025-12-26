<script lang="ts">
  import WorkExperience from "$lib/components/WorkExperience.svelte";

  let flix = "During the summer of 2025 I was invited to Aarhus to contribute to the Flix language, created by Professor Magnus Madsen. I mainly worked on expanding the Flix standard library using effect-oriented and functional design patterns. Additoinally I leveraged the new JDK24 bytecode manipulation APIs to prototype a more robust Scala backend for the Flix compiler";
  let phd = "Beginning my graduate degree in 2024 I started at CU Boulder, studying programming languages. My research has an emphasis on Category Theory, Abstract Interpretation, and Functional Programming. I mainly use functional languages such as Scala and Ocaml for implementations. When doing verification work I have used Coq but have a preference for Lean4.";
  let vertex =
    "Working with Vertex I was responsible for writing smart contracts in Solidity and Oracles in Rust. My team was rather small and developed several projects from the ground up. We worked as smart contract developers and built production oracles (software for interfacing with contracts) in Rust.";
  let publicis =
    "I started my 'professional' programming career at Publicis. Here I worked mainly on salesforce projects involving Javascript front ends. I wrote server endpoints in Apex and weaved them into front ends with JS. Some of the technologies used were React and the Lightning Component Framework.";
  let bluescape =
    "At Bluescape I worked on testing their expansive front end. I used Jest to test the JS front end written in React. It was my first time working with production code and I grew exponentially as a developer. In part due to using Jira to manage tickets to proper git workflows.";
</script>

<div class="about-page">
  <div class="container">
    <h2 class="heading">Work Experience & <a href="/Resume.pdf" target="_blank">Resume</a>
    </h2>
    <!-- Row 1 -->
    <div class="row justify-content-center">
      <div class="col-md-4 d-flex justify-content-center">
        <WorkExperience
          title={"Phd Student"}
          subtitle={"CU Boulder CUPLV Lab September 2024 - Present"}
          text={phd}
          badges={["Scala", "Verification", "Functional Programming"]}
        />
      </div>
      <div class="col-md-4 d-flex justify-content-center">
        <WorkExperience
          title={"Aarhus University Guest Researcher"}
          subtitle={"Aarhus Denmark May 2025 - July 2025"}
          text={flix}
          badges={["Scala", "Flix", "Open Source"]}
        />
      </div>
    </div>
    <!-- Row 2 -->
    <div class="row justify-content-center">
      <div class="col-md-4 d-flex justify-content-center">
        <WorkExperience
          title={"Defi Contractor"}
          subtitle={"Vertex Industries Feb 2024 - September 2024"}
          text={vertex}
          badges={["Solidity", "Rust", "Python"]}
        />
      </div>
      <div class="col-md-4 d-flex justify-content-center">
        <WorkExperience
          title={"Junior Software Engineer"}
          subtitle={"Publicis Sapient Aug 2022 - Nov 2023"}
          text={publicis}
          badges={["Javascript", "Java", "Salesforce"]}
        />
      </div>
      <div class="col-md-4 d-flex justify-content-center">
        <WorkExperience
          title={"Test Framework Engineering Intern"}
          subtitle={"Bluescape Feb 2022 - July 2022"}
          text={bluescape}
          badges={["Node.js", "Jest", "Git"]}
        />
      </div>
    </div>
  </div>
</div>

