import { EyeTrackingStudy } from "./eye-tracking-study";
import { RobotCompanion } from "./robot-companion";

const facts = [
  { title: "Nearly 4 Years", detail: "Professional Experience", icon: "M8 6 2 12l6 6m8-12 6 6-6 6m-3-15-2 18" },
  { title: "Master of AI", detail: "La Trobe · Starting Oct 2026", icon: "m2 9 10-5 10 5-10 5L2 9Zm4 3v6l6 3 6-3v-6m4-3v8" },
  { title: "ALTAIR", detail: "Featured Project", icon: "m13 2-9 12h7l-1 8 10-13h-8l1-7Z" },
  { title: "Melbourne", detail: "Australia", icon: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" },
];

export function Hero() {
  return (
    <div className="hero-layout">
      <EyeTrackingStudy hero />
      <RobotCompanion />
      <nav className="hero-explore" aria-label="Explore portfolio">
        <p>Explore</p>
        {[['01','Work','projects'],['02','Skills','skills'],['03','Journey','ai-journey'],['04','Contact','contact']].map(([n,label,id]) => <a key={id} href={`#${id}`}><span>{n}</span>{label}</a>)}
      </nav>
      <div className="hero-copy">
        <p className="hero-eyebrow">
          <span className="hero-status-dot" aria-hidden="true" />
          <span>Software Engineer</span>
          <span className="hero-eyebrow-divider" aria-hidden="true">·</span>
          <span>Software meets intelligence</span>
        </p>

        <h1 className="hero-name">
          <span>Yugam</span>
          <span>Kakkar</span>
        </h1>

        <p className="hero-introduction">
          Software Developer
          <br />
          Exploring a more <span>intelligent</span> tomorrow.
        </p>

        <p className="hero-description">
          Nearly four years of professional experience building web products
          with React, Node.js, and TypeScript. Now expanding into practical AI,
          starting a Master of Artificial Intelligence at La Trobe University,
          Melbourne, in October 2026.
        </p>

        <div className="hero-actions">
          <a className="hero-primary-link" href="#projects">
            Explore My Work
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </a>
          <a className="hero-secondary-link" href="#about">
            About Me
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 4v15m-6-6 6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>
      <div className="hero-facts">
        {facts.map(fact => <div className="hero-fact" key={fact.title}>
          <span className="hero-fact-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={fact.icon} /></svg></span>
          <div><p>{fact.title}</p><span>{fact.detail}</span></div>
        </div>)}
      </div>
      <div className="hero-bottom-strip">
        <span className="hero-mantra"><span className="hero-status-dot" /> Build · Learn · Impact</span>
        <a href="#about" className="hero-scroll-link">Scroll to explore <span className="mouse-outline" aria-hidden="true"><span /></span></a>
      </div>
    </div>
  );
}
