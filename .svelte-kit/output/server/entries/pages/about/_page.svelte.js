import { c as create_ssr_component, e as escape, d as each, v as validate_component } from "../../../chunks/ssr.js";
const WorkExperience = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { subtitle } = $$props;
  let { text } = $$props;
  let { badges } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.badges === void 0 && $$bindings.badges && badges !== void 0)
    $$bindings.badges(badges);
  return `<div class="col-12 gy-4 col-md-4"><div class="card"><div class="card-body"><h5 class="card-title">${escape(title)}</h5> <h6 class="card-subtitle mb-2">${escape(subtitle)}</h6> <p class="card-text">${escape(text)}</p> ${each(badges, (badge) => {
    return `<span class="badge text-bg-secondary">${escape(badge)}</span>`;
  })}</div></div></div>`;
});
let vertex = "Working with Vertex I was responsible for writing smart contracts in Solidity and Oracles in Rust. My team was rather small and developed several projects from the ground up. We worked as smart contract developers and built production oracles (software for interfacing with contracts) in Rust.";
let publicis = "I started my 'professional' programming career at Publicis. Here I worked mainly on salesforce projects involving Javascript front ends. I wrote server endpoints in Apex and weaved them into front ends with JS. Some of the technologies used were React and the Lightning Component Framework.";
let bluescape = "At Bluescape I worked on testing their expansive front end. I used Jest to test the JS front end written in React. It was my first time working with production code and I grew exponentially as a developer. In part due to using Jira to manage tickets to proper git workflows.";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="about-page"><div class="container"><h2 class="heading" data-svelte-h="svelte-twx6v2">Work Experience</h2> <div class="row">${validate_component(WorkExperience, "WorkExperience").$$render(
    $$result,
    {
      title: "Defi Contractor",
      subtitle: "Vertex Industries Feb 2024 - present",
      text: vertex,
      badges: ["Solidity", "Rust", "Python"]
    },
    {},
    {}
  )} ${validate_component(WorkExperience, "WorkExperience").$$render(
    $$result,
    {
      title: "Junior Software Engineer",
      subtitle: "Publicis Sapient Aug 2022 - Nov 2023",
      text: publicis,
      badges: ["Javascript", "Java", "Salesforce"]
    },
    {},
    {}
  )} ${validate_component(WorkExperience, "WorkExperience").$$render(
    $$result,
    {
      title: "Test Framework Engineering Intern",
      subtitle: "Bluescape Feb 2022 - July 2022",
      text: bluescape,
      badges: ["Node.js", "Jest", "Git"]
    },
    {},
    {}
  )}</div></div></div>`;
});
export {
  Page as default
};
