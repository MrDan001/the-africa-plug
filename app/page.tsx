"use client";

import { useState } from "react";

const stories = [
  { tag:"ON THE GROUND", title:"Lagos after dark: the places shaping the city's new energy", meta:"Culture · Lagos", image:"https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1400&q=85" },
  { tag:"WHY HERE?", title:"Why Zanzibar keeps appearing in conversations about Africa's next wave", meta:"Business · Zanzibar", image:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=85" },
  { tag:"PEOPLE TO KNOW", title:"Meet the builders, creators and operators moving Africa forward", meta:"People · Africa", image:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85" }
];

export default function Home(){
 const [menu,setMenu]=useState(false);
 return <main>
  <header className="nav">
   <a className="brand" href="#" aria-label="The Africa Plug home"><span className="brand-mark">TAP</span><span className="brand-name">THE AFRICA<br/>PLUG</span></a>
   <nav className={menu?"nav-links open":"nav-links"}><a href="#discover">Discover</a><a href="#understand">Understand</a><a href="#access">Access</a><a href="#stories">Stories</a><a href="#about">About</a></nav>
   <a className="nav-cta" href="#ask">Ask TAP <span>↗</span></a>
   <button className="menu" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu?"×":"☰"}</button>
  </header>

  <section className="hero">
   <div className="hero-bg"/><div className="hero-grid"/>
   <div className="hero-copy"><p className="eyebrow"><span/> YOUR CONNECTION TO AFRICA</p>
    <h1>Know Africa.<br/><em>Access Africa.</em><br/>Experience Africa.</h1>
    <p className="hero-lede">Discover the businesses being built, markets moving, people to know, places to go, things to experience and opportunities worth knowing about.</p>
    <div className="hero-actions"><a className="button primary" href="#discover">Explore Africa <span>↗</span></a><a className="button ghost" href="#access">Work With FK <span>→</span></a></div>
   </div>
   <div className="hero-note"><span>01 / 03</span><b>AFRICA → WORLD</b><span>Business · Culture · Travel · Opportunity</span></div>
  </section>

  <section className="intro" id="discover"><div className="section-label">THE AFRICA PLUG</div><div className="intro-copy"><h2>There is more happening here than you realise.</h2><p>From the boardroom to the beach club, TAP connects the dots between the people, businesses, places, culture and opportunities shaping Africa.</p></div></section>

  <section className="worlds">
   <article className="world world-dark"><div className="world-number">01</div><p>DISCOVER</p><h3>See what's<br/><i>happening.</i></h3><span>Business · Culture · Travel · Food · People · Places</span><a href="#stories">Explore →</a></article>
   <article className="world world-image"><div className="world-number">02</div><p>UNDERSTAND</p><h3>Know how<br/>it <i>works.</i></h3><span>Playbooks · Guides · Intelligence · Ask TAP</span><a href="#understand">Learn →</a></article>
   <article className="world world-accent"><div className="world-number">03</div><p>ACCESS</p><h3>Get closer<br/>to the <i>opportunity.</i></h3><span>Consulting · Navigation · Verification · Connections</span><a href="#access">Connect →</a></article>
  </section>

  <section className="feature" id="understand"><div className="feature-image"/><div className="feature-copy"><p className="eyebrow">THE AFRICA PLAYBOOK</p><h2>The knowledge you wish somebody gave you before you arrived.</h2><p>Practical guides for navigating African markets, cities, business, travel, food, culture and the realities on the ground.</p><a className="text-link" href="#stories">Explore the Playbooks <span>↗</span></a></div></section>

  <section className="stories" id="stories"><div className="section-head"><div><p className="eyebrow">PUT US ON</p><h2>What's worth knowing.</h2></div><a className="text-link" href="#stories">View all stories ↗</a></div>
   <div className="story-grid">{stories.map(story=><article className="story" key={story.title}><div className="story-image" style={{backgroundImage:"url("+story.image+")"}}/><div className="story-body"><p>{story.tag}</p><h3>{story.title}</h3><span>{story.meta} <b>↗</b></span></div></article>)}</div>
  </section>

  <section className="ask" id="ask"><div className="ask-mark">?</div><div><p className="eyebrow">ASK THE AFRICA PLUG</p><h2>You have a question<br/>about Africa. <i>Ask.</i></h2><p>Not every question needs a full consulting engagement. Bring FK a specific question, challenge or decision and leave with clarity and practical next steps.</p><a className="button dark" href="mailto:hello@theafricaplug.com">Book a 30-minute Ask FK <span>↗</span></a></div></section>

  <section className="access" id="access"><div className="access-head"><p className="eyebrow">WORK WITH FK</p><h2>When the opportunity is bigger than a question.</h2><p>Commercial navigation for companies, investors, founders and organisations exploring African markets.</p></div>
   <div className="services"><div><span>01</span><h3>Commercial Deal Consulting</h3><p>Market-entry navigation, opportunity identification, partner mapping, verification and commercial relationship development.</p><a href="mailto:hello@theafricaplug.com">Start a conversation →</a></div>
   <div><span>02</span><h3>Market & Opportunity Navigation</h3><p>Understand the market, the structure, the people and how an opportunity actually works locally before you move.</p><a href="mailto:hello@theafricaplug.com">Explore →</a></div>
   <div><span>03</span><h3>Stay Finder</h3><p>Accommodation discovery built around how you actually need to use a city, not just how a hotel looks online.</p><a href="#stories">Coming into focus →</a></div></div>
  </section>

  <section className="closing" id="about"><div className="closing-line">AFRICA <span>→</span> WORLD</div><h2>Where the world<br/><i>plugs into Africa.</i></h2><p>Extraordinary things are happening across the continent. We show you what is worth knowing, how it works, where to experience it and, where relevant, how to access it.</p><a className="button primary" href="#discover">Start exploring <span>↗</span></a></section>

  <footer><div className="footer-brand"><span className="brand-mark">TAP</span><strong>THE AFRICA PLUG</strong><p>Your connection to Africa.</p></div><div className="footer-links"><a href="#discover">Discover</a><a href="#understand">Understand</a><a href="#access">Access</a><a href="#about">About</a></div><div className="footer-note">Business · Investment · Culture · Travel · Lifestyle · Opportunity<br/><small>© 2026 The Africa Plug</small></div></footer>
 </main>
}