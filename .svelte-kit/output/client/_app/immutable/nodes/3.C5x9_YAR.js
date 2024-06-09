import{s as $,n as N}from"../chunks/scheduler.BzV8Pfuc.js";import{S as z,i as K,e as _,t as J,s as y,c as b,a as k,b as V,d as g,f as S,l as w,g as q,h as d,j as D,n as Q,o as P,k as U,p as R,q as j,r as A,u as F,v as H}from"../chunks/index.DHocS9Wk.js";import{e as M}from"../chunks/each.D6YF6ztN.js";function O(f,e,s){const t=f.slice();return t[4]=e[s],t}function T(f){let e,s=f[4]+"",t;return{c(){e=_("span"),t=J(s),this.h()},l(i){e=b(i,"SPAN",{class:!0});var c=k(e);t=V(c,s),c.forEach(g),this.h()},h(){w(e,"class","badge text-bg-secondary")},m(i,c){q(i,e,c),d(e,t)},p(i,c){c&8&&s!==(s=i[4]+"")&&D(t,s)},d(i){i&&g(e)}}}function X(f){let e,s,t,i,c,u,n,I,p,x,m,E,l=M(f[3]),r=[];for(let a=0;a<l.length;a+=1)r[a]=T(O(f,l,a));return{c(){e=_("div"),s=_("div"),t=_("div"),i=_("h5"),c=J(f[0]),u=y(),n=_("h6"),I=J(f[1]),p=y(),x=_("p"),m=J(f[2]),E=y();for(let a=0;a<r.length;a+=1)r[a].c();this.h()},l(a){e=b(a,"DIV",{class:!0});var h=k(e);s=b(h,"DIV",{class:!0});var o=k(s);t=b(o,"DIV",{class:!0});var v=k(t);i=b(v,"H5",{class:!0});var B=k(i);c=V(B,f[0]),B.forEach(g),u=S(v),n=b(v,"H6",{class:!0});var G=k(n);I=V(G,f[1]),G.forEach(g),p=S(v),x=b(v,"P",{class:!0});var L=k(x);m=V(L,f[2]),L.forEach(g),E=S(v);for(let C=0;C<r.length;C+=1)r[C].l(v);v.forEach(g),o.forEach(g),h.forEach(g),this.h()},h(){w(i,"class","card-title"),w(n,"class","card-subtitle mb-2"),w(x,"class","card-text"),w(t,"class","card-body"),w(s,"class","card"),w(e,"class","col-12 gy-4 col-md-4")},m(a,h){q(a,e,h),d(e,s),d(s,t),d(t,i),d(i,c),d(t,u),d(t,n),d(n,I),d(t,p),d(t,x),d(x,m),d(t,E);for(let o=0;o<r.length;o+=1)r[o]&&r[o].m(t,null)},p(a,[h]){if(h&1&&D(c,a[0]),h&2&&D(I,a[1]),h&4&&D(m,a[2]),h&8){l=M(a[3]);let o;for(o=0;o<l.length;o+=1){const v=O(a,l,o);r[o]?r[o].p(v,h):(r[o]=T(v),r[o].c(),r[o].m(t,null))}for(;o<r.length;o+=1)r[o].d(1);r.length=l.length}},i:N,o:N,d(a){a&&g(e),Q(r,a)}}}function Y(f,e,s){let{title:t}=e,{subtitle:i}=e,{text:c}=e,{badges:u}=e;return f.$$set=n=>{"title"in n&&s(0,t=n.title),"subtitle"in n&&s(1,i=n.subtitle),"text"in n&&s(2,c=n.text),"badges"in n&&s(3,u=n.badges)},[t,i,c,u]}class W extends z{constructor(e){super(),K(this,e,Y,X,$,{title:0,subtitle:1,text:2,badges:3})}}function Z(f){let e,s,t,i="Work Experience",c,u,n,I,p,x,m,E;return n=new W({props:{title:"Defi Contractor",subtitle:"Vertex Industries Feb 2024 - present",text:ee,badges:["Solidity","Rust","Python"]}}),p=new W({props:{title:"Junior Software Engineer",subtitle:"Publicis Sapient Aug 2022 - Nov 2023",text:te,badges:["Javascript","Java","Salesforce"]}}),m=new W({props:{title:"Test Framework Engineering Intern",subtitle:"Bluescape Feb 2022 - July 2022",text:se,badges:["Node.js","Jest","Git"]}}),{c(){e=_("div"),s=_("div"),t=_("h2"),t.textContent=i,c=y(),u=_("div"),P(n.$$.fragment),I=y(),P(p.$$.fragment),x=y(),P(m.$$.fragment),this.h()},l(l){e=b(l,"DIV",{class:!0});var r=k(e);s=b(r,"DIV",{class:!0});var a=k(s);t=b(a,"H2",{class:!0,"data-svelte-h":!0}),U(t)!=="svelte-twx6v2"&&(t.textContent=i),c=S(a),u=b(a,"DIV",{class:!0});var h=k(u);R(n.$$.fragment,h),I=S(h),R(p.$$.fragment,h),x=S(h),R(m.$$.fragment,h),h.forEach(g),a.forEach(g),r.forEach(g),this.h()},h(){w(t,"class","heading"),w(u,"class","row"),w(s,"class","container"),w(e,"class","about-page")},m(l,r){q(l,e,r),d(e,s),d(s,t),d(s,c),d(s,u),j(n,u,null),d(u,I),j(p,u,null),d(u,x),j(m,u,null),E=!0},p:N,i(l){E||(A(n.$$.fragment,l),A(p.$$.fragment,l),A(m.$$.fragment,l),E=!0)},o(l){F(n.$$.fragment,l),F(p.$$.fragment,l),F(m.$$.fragment,l),E=!1},d(l){l&&g(e),H(n),H(p),H(m)}}}let ee="Working with Vertex I was responsible for writing smart contracts in Solidity and Oracles in Rust. My team was rather small and developed several projects from the ground up. We worked as smart contract developers and built production oracles (software for interfacing with contracts) in Rust.",te="I started my 'professional' programming career at Publicis. Here I worked mainly on salesforce projects involving Javascript front ends. I wrote server endpoints in Apex and weaved them into front ends with JS. Some of the technologies used were React and the Lightning Component Framework.",se="At Bluescape I worked on testing their expansive front end. I used Jest to test the JS front end written in React. It was my first time working with production code and I grew exponentially as a developer. In part due to using Jira to manage tickets to proper git workflows.";class ie extends z{constructor(e){super(),K(this,e,null,Z,$,{})}}export{ie as component};
