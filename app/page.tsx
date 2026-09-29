"use client";

import { useEffect, useState } from "react";

function TapWordmark({className=""}){return <span className={`tap-wordmark ${className}`} aria-hidden="true"><b>THE</b><strong>AFRICA <em>PLUG</em></strong></span>}
function BrandLockup({className=""}){return <span className={`brand-lockup ${className}`}><img className="brand-mark" src="/the-africa-plug-mark.svg" alt="" /><TapWordmark/></span>}

const slides = [
  { image:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=88", location:"Lagos, Nigeria", category:"Business. Culture. Energy.", title:<>YOUR CONNECTION<br/><span>TO AFRICA.</span></>, copy:"Discover the businesses being built, markets moving, people to know, places to go, things to experience and opportunities worth knowing about." },
  { image:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2200&q=88", location:"Zanzibar, Tanzania", category:"Travel. Culture. Escape.", title:<>SEE AFRICA<br/><span>DIFFERENTLY.</span></>, copy:"Go beyond the obvious. Find the neighbourhoods, stays, people, places and experiences that make a destination worth your time." },
  { image:"https://images.unsplash.com/photo-1529408632839-a54952c491e5?auto=format&fit=crop&w=2200&q=88", location:"Across Africa", category:"People. Capital. Opportunity.", title:<>KNOW WHAT'S<br/><span>MOVING.</span></>, copy:"Follow the ideas, companies, conversations and opportunities shaping what happens next across the continent." }
];

const stories = [
  { tag:"BUSINESS", title:"The next wave of African startups to watch", image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=86" },
  { tag:"TRAVEL", title:"Where to stay in Accra: the neighbourhoods that make a difference", image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=86" },
  { tag:"CULTURE", title:"The artists shaping contemporary African art", image:"https://images.unsplash.com/photo-1577083552431-6e5fd01988f6?auto=format&fit=crop&w=1000&q=86" },
  { tag:"FOOD & LIFESTYLE", title:"Lagos nightlife: the places everyone is talking about", image:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=86" }
];

function ArrowIcon(){return <span aria-hidden>→</span>}
function EyeIcon(){return <svg viewBox="0 0 48 32" aria-hidden><path d="M2 16S8.8 4 24 4s22 12 22 12-6.8 12-22 12S2 16 2 16Z" fill="none" stroke="currentColor" strokeWidth="3"/><circle cx="24" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="3"/></svg>}
function UnderstandIcon(){return <svg viewBox="0 0 48 48" aria-hidden><circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M17 17c4-3 7 1 7 5s-3 8-7 6m14-11c-4-3-7 1-7 5s3 8 7 6M24 13v22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>}
function AccessIcon(){return <svg viewBox="0 0 48 48" aria-hidden><path d="M20 28 14 34a6 6 0 0 1-9-4 6 6 0 0 1 1-7l7-7a6 6 0 0 1 9 1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="m28 20 6-6a6 6 0 0 1 9 4 6 6 0 0 1-1 6l-7 7a6 6 0 0 1-9-1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="m16 24 16 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>}

export default function Home(){
  const [menu,setMenu]=useState(false); const [showIntro,setShowIntro]=useState(true); const [slide,setSlide]=useState(0); const current=slides[slide];
  useEffect(()=>{const introTimer=window.setTimeout(()=>setShowIntro(false),2400); const slideTimer=window.setInterval(()=>setSlide(v=>(v+1)%slides.length),7000); return()=>{window.clearTimeout(introTimer);window.clearInterval(slideTimer)}},[]);
  const previous=()=>setSlide(v=>(v-1+slides.length)%slides.length); const next=()=>setSlide(v=>(v+1)%slides.length);
  return <main>
    {showIntro && <div className="tap-intro" aria-hidden="true"><BrandLockup className="intro-brand-lockup"/></div>}
    <header className="site-header">
      <a className="site-brand" href="#top" aria-label="The Africa Plug home"><BrandLockup/></a>
      <nav className={menu?"desktop-nav mobile-open":"desktop-nav"}>
        <a className="active" href="#top" onClick={()=>setMenu(false)}>Home</a><a href="#discover" onClick={()=>setMenu(false)}>Discover</a><a href="#business" onClick={()=>setMenu(false)}>Business &amp; Investment</a><a href="#travel" onClick={()=>setMenu(false)}>Travel &amp; Lifestyle</a><a href="#culture" onClick={()=>setMenu(false)}>Culture</a><a href="#stories" onClick={()=>setMenu(false)}>Media</a><a href="#about" onClick={()=>setMenu(false)}>About</a>
      </nav>
      <div className="header-actions"><button className="icon-button" aria-label="Search"><span className="search-dot"/></button><button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="Toggle menu"><span/><span/><span/></button></div>
    </header>

    <section className="hero" id="top">
      <div className="hero-media" style={{backgroundImage:"url("+current.image+")"}}/><div className="hero-overlay"/>
      <div className="hero-content"><div className="hero-kicker">THE AFRICA PLUG</div><h1>{current.title}</h1><p className="hero-tagline">Business. Investment. Culture. Travel. Lifestyle. Opportunity.</p><p className="hero-copy">{current.copy}</p><div className="hero-buttons"><a className="btn yellow" href="#discover">Explore Africa <ArrowIcon/></a><a className="btn outline" href="#business">Work With FK <ArrowIcon/></a><a className="btn outline" href="#ask">Ask The Africa Plug <ArrowIcon/></a></div></div>
      <div className="hero-meta"><div><b>{current.location}</b><span>{current.category}</span></div><div className="hero-controls"><button onClick={previous} aria-label="Previous slide">‹</button><div>{slides.map((_,index)=><button key={index} className={index===slide?"dot active":"dot"} onClick={()=>setSlide(index)} aria-label={"Go to slide "+(index+1)}/>)}</div><button onClick={next} aria-label="Next slide">›</button></div></div>
    </section>

    <section className="welcome-section" id="welcome">
      <div className="welcome-video-shell">
        <div
          className="welcome-video-frame"
          onClick={(event)=>{
            if(event.target !== event.currentTarget) return;
            const video=event.currentTarget.querySelector("video");
            if(!video) return;
            video.play().catch(()=>{});
            const element=event.currentTarget;
            if(element.requestFullscreen) element.requestFullscreen().catch(()=>{});
            else if(video.requestFullscreen) video.requestFullscreen().catch(()=>{});
          }}
          role="button"
          tabIndex={0}
          aria-label="Play welcome video fullscreen"
          onKeyDown={(event)=>{
            if(event.key==="Enter" || event.key===" "){
              event.preventDefault();
              event.currentTarget.click();
            }
          }}
        >
          <video
            className="welcome-video"
            autoPlay
            muted
            playsInline
            controls
            preload="metadata"
            aria-label="Welcome video"
            onCanPlay={(event)=>{ event.currentTarget.play().catch(()=>{}); }}
          >
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
      <div className="welcome-copy">
        <div className="welcome-eyebrow"><span className="eyebrow-line"/>WELCOME TO THE AFRICA PLUG</div>
        <h2>Welcome to<br/>The Africa Plug.</h2>
        <p>Get a quick glimpse of the Africa Plug experience — the people, places, ideas and opportunities connecting Africa to the world.</p>
        <div className="welcome-topics" aria-label="What you will find here">
          <span>Business</span><span>Investment</span><span>Culture</span><span>Travel</span><span>Lifestyle</span><span>Opportunity</span>
        </div>
      </div>
    </section>

    <section className="worlds-section" id="discover">
      <div className="section-intro"><div><span className="eyebrow-line"/><span>EXPLORE OUR WORLDS</span><h2>The Africa Plug has three<br/>connected worlds.</h2></div><div className="intro-right"><p>We show you what's happening, explain what it means, help you get closer to it, and connect you to the people, places and opportunities that matter.</p><a href="#stories">Learn more <ArrowIcon/></a></div></div>
      <div className="world-cards">
        <a className="world-card" href="#stories" id="business"><div className="world-image" style={{backgroundImage:"url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=86)"}}/><div className="world-shade"/><div className="world-content"><div className="world-icon"><EyeIcon/></div><div><span>DISCOVER</span><p>We show you what's happening.</p><small>Business · Culture · Travel · Food · People · Markets · Music · Places · Experiences · Opportunities</small></div><b className="round-arrow"><ArrowIcon/></b></div></a>
        <a className="world-card" href="#understand"><div className="world-image" style={{backgroundImage:"url(https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=86)"}}/><div className="world-shade"/><div className="world-content"><div className="world-icon"><UnderstandIcon/></div><div><span>UNDERSTAND</span><p>We explain what it means and how it works.</p><small>Playbooks · Guides · Market knowledge · Ask The Africa Plug · Practical intelligence</small></div><b className="round-arrow"><ArrowIcon/></b></div></a>
        <a className="world-card" href="#access" id="travel"><div className="world-image" style={{backgroundImage:"url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=86)"}}/><div className="world-shade"/><div className="world-content"><div className="world-icon"><AccessIcon/></div><div><span>ACCESS</span><p>We help you get closer to it.</p><small>Commercial consulting · Market navigation · Stay Finder · Verification · Relevant connections · Opportunities</small></div><b className="round-arrow"><ArrowIcon/></b></div></a>
      </div>
    </section>

    <section className="featured-section" id="stories"><div className="section-heading"><div><span className="eyebrow-line"/><span>FEATURED</span><h2>What's happening in Africa</h2></div><a href="#stories">View all <ArrowIcon/></a></div><div className="story-grid">{stories.map((story,index)=><a className={"story-card "+(index===0?"large":"")} href="#stories" key={story.title} id={index===2?"culture":undefined}><div className="story-image" style={{backgroundImage:"url("+story.image+")"}}/><div className="story-overlay"/><div className="story-content"><span>{story.tag}</span><h3>{story.title}</h3></div></a>)}</div></section>

    <section className="playbook" id="understand"><div className="playbook-image"/><div className="playbook-copy"><span className="eyebrow-line"/><p>THE AFRICA PLAYBOOK</p><h2>The knowledge you wish somebody gave you before you arrived.</h2><span>Practical guides, field notes and useful context for making better decisions across African markets and cities.</span><a className="btn yellow" href="#stories">Explore the Playbooks <ArrowIcon/></a></div></section>

    <section className="ask-section" id="ask"><div className="ask-inner"><div><span className="eyebrow-line"/><p>ASK THE AFRICA PLUG</p><h2>You have a question<br/>about Africa. <em>Ask.</em></h2></div><div><p>Not every question needs a full consulting engagement. Bring a specific question, challenge or decision and leave with clarity and practical next steps.</p><a className="btn dark" href="mailto:hello@theafricaplug.com">Book a 30-minute Ask FK <ArrowIcon/></a></div></div></section>

    <section className="access-section" id="access"><div className="access-copy"><span className="eyebrow-line"/><p>WORK WITH FK</p><h2>When the opportunity is bigger than a question.</h2><span>Commercial navigation for companies, investors, founders and organisations exploring African markets.</span></div><div className="service-grid"><article><h3>Commercial Deal Consulting</h3><p>Market-entry navigation, opportunity identification, partner mapping, verification and commercial relationship development.</p><a href="mailto:hello@theafricaplug.com">Start a conversation <ArrowIcon/></a></article><article><h3>Market &amp; Opportunity Navigation</h3><p>Understand the market, the structure, the people and how an opportunity actually works locally before you move.</p><a href="mailto:hello@theafricaplug.com">Explore <ArrowIcon/></a></article><article><h3>Stay Finder</h3><p>Accommodation discovery built around how you actually need to use a city, not just how a hotel looks online.</p><a href="#stories">Coming into focus <ArrowIcon/></a></article></div></section>

    <section className="closing" id="about"><div><span>AFRICA <b>→</b> WORLD</span><h2>Where the world<br/><em>plugs into Africa.</em></h2><p>Extraordinary things are happening across the continent. We show you what is worth knowing, how it works, where to experience it and, where relevant, how to access it.</p><a className="btn yellow" href="#discover">Start exploring <ArrowIcon/></a></div></section>

    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand-block">
          <div className="footer-brand-lockup"><BrandLockup/></div>
          <p>Your connection to Africa.</p>
          <a className="footer-email" href="mailto:hello@theafricaplug.com">hello@theafricaplug.com</a>
        </div>

        <div className="footer-column">
          <span className="footer-heading">EXPLORE</span>
          <a href="#discover">Discover</a>
          <a href="#understand">Understand</a>
          <a href="#access">Access</a>
          <a href="#stories">Media</a>
        </div>

        <div className="footer-column">
          <span className="footer-heading">COMPANY</span>
          <a href="#about">About</a>
          <a href="#ask">Ask The Africa Plug</a>
          <a href="#access">Work With FK</a>
          <a href="#welcome">Welcome</a>
        </div>

        <div className="footer-column footer-contact">
          <span className="footer-heading">THE AFRICA PLUG</span>
          <p>Business. Investment. Culture. Travel. Lifestyle. Opportunity.</p>
          <a className="footer-cta" href="#discover">Start exploring <ArrowIcon/></a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>KNOW AFRICA. &nbsp; ACCESS AFRICA. &nbsp; EXPERIENCE AFRICA.</span>
        <small>© 2026 The Africa Plug</small>
      </div>
    </footer>
  </main>
}
