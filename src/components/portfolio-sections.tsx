import type { ReactNode } from "react";

function Heading({ number, label, children, description }: { number: string; label: string; children: ReactNode; description?: string }) {
  return <div className="section-heading" data-reveal>
    <p className="section-kicker"><span>{number}</span> / {label}</p>
    <h2>{children}</h2>
    {description && <p className="section-description">{description}</p>}
  </div>;
}

function Tags({ items }: { items: string[] }) {
  return <ul className="tech-tags">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export function About() {
  return <div className="section-inner">
    <Heading number="01" label="Behind the code">An engineer.<br /><em>Always becoming.</em></Heading>
    <div className="about-grid">
      <div className="about-statement" data-reveal>
        <p>I build across the stack.<br />Now, I’m expanding what<br className="desktop-break" /> that stack can do.</p>
        <div className="signature-line"><span /> Yugam Kakkar</div>
      </div>
      <div className="about-story" data-reveal>
        <p>Nearly four years in professional software development have taken me from MERN applications to production systems, third-party integrations, and the details that make a product work in the real world.</p>
        <p>I’ve worked across frontend and backend, discussed requirements with clients, reviewed code, and mentored junior developers. I care about understanding the problem as much as writing the solution.</p>
        <p>My next chapter is Melbourne: a Master of Artificial Intelligence at La Trobe University, beginning November 2026. I’m bringing my software engineering foundation into practical AI products.</p>
      </div>
    </div>
    <div className="principle-grid">
      {[
        ["01", "Think in systems", "Interfaces, APIs, integrations. Understand how the pieces work together."],
        ["02", "Build for people", "Turn requirements into software that makes sense to the person using it."],
        ["03", "Keep exploring", "Apply new ideas through real projects. Question, build, and refine."],
      ].map(([n, title, text]) => <article className="principle-card" key={n} data-reveal><span className="card-index">{n}</span><h3>{title}</h3><p>{text}</p></article>)}
    </div>
  </div>;
}

export function Experience() {
  return <div className="section-inner">
    <Heading number="02" label="Professional experience" description="A foundation built through real development work, from early web applications to production engineering.">Beyond the<br /><em>code editor.</em></Heading>
    <div className="experience-timeline">
      {[
        { dates: "JUN 2024 — JUN 2026", role: "Software Developer", company: "Innovative Code Labs", note: "Professional software development", tags: ["Full-stack development", "Production engineering"] },
        { dates: "JUN 2023 — JUN 2024", role: "Associate Software Developer", company: "Innovative Code Labs", note: "Growing a full-stack engineering foundation", tags: ["Frontend", "Backend", "Team collaboration"] },
        { dates: "JUL 2022 — JUN 2023", role: "Early software-development role", company: "Omninos Solutions", note: "Started through an internship, working primarily in MERN and web development.", tags: ["MERN", "Web development"] },
      ].map(job => <article className="experience-row" key={job.dates} data-reveal>
        <p className="experience-date">{job.dates}</p>
        <div className="experience-body"><p className="company-name">{job.company}</p><h3>{job.role}</h3><p>{job.note}</p><Tags items={job.tags} /></div>
        
      </article>)}
    </div>
    <div className="experience-footnote" data-reveal><span className="section-kicker">Across these roles</span><p>REST APIs & webhooks · Third-party integrations · Production debugging & deployments · Client communication · Code reviews · Mentoring</p></div>
  </div>;
}

export function Projects() {
  return <div className="section-inner">
    <Heading number="03" label="Selected work" description="One focused product. A practical step toward software that uses AI with purpose.">Ideas, made<br /><em>real.</em></Heading>
    <article className="altair-feature" data-reveal>
      <div className="altair-cover">
        <div className="altair-cover-meta"><span>01 / SELECTED BUILD</span><span>EDUCATION & CAREER</span></div>
        <svg className="altair-landscape" viewBox="0 0 1000 540" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="altair-route" x1="220" y1="540" x2="740" y2="90" gradientUnits="userSpaceOnUse"><stop stopColor="#788acf" stopOpacity="0" /><stop offset=".6" stopColor="#c2d3ff" /><stop offset="1" stopColor="#ffffff" /></linearGradient>
            <radialGradient id="altair-halo"><stop stopColor="#b9caff" stopOpacity=".45" /><stop offset="1" stopColor="#718eff" stopOpacity="0" /></radialGradient>
          </defs>
          <circle cx="740" cy="118" r="160" fill="url(#altair-halo)" />
          {Array.from({length: 16}, (_, i) => <path key={i} d={`M${-150+i*14} ${510+i*16} C210 ${150+i*18}, 365 ${700-i*10}, 600 ${340+i*11} S870 ${80+i*15}, 1150 ${140+i*19}`} stroke="#8eabd0" strokeOpacity={.09+i*.008} />)}
          <path className="altair-trail" d="M300 580 C270 400 620 500 617 335 S670 175 740 118" stroke="url(#altair-route)" strokeWidth="2" pathLength="1" />
          <path d="M740 102L743 115L756 118L743 121L740 134L737 121L724 118L737 115Z" fill="#eef3ff" />
          <circle cx="740" cy="118" r="26" stroke="#cedbff" strokeOpacity=".25" />
        </svg>
        <div className="altair-cover-title"><h3>ALTAIR<span aria-hidden="true">✦</span></h3><p>A little clarity.<br /><em>A world of possibility.</em></p></div>
        <span className="altair-cover-note">YOUR NEXT CHAPTER STARTS WITH DIRECTION.</span>
      </div>
      <div className="altair-caption">
        <div><p className="section-kicker">THE IDEA</p><p className="altair-summary">Turn “what’s next?”<br />into a way forward.</p></div>
        <div className="altair-context"><p>Personalised education and career roadmaps, powered by AI and grounded in structured, validated guidance.</p><Tags items={["React", "TypeScript", "Node.js", "Gemini"]} /></div>
        <div className="altair-actions"><a className="hero-primary-link" href="https://altair-guide.vercel.app/" target="_blank" rel="noopener noreferrer">Explore ALTAIR</a><a className="text-link" href="https://github.com/yugam2001/altair" target="_blank" rel="noopener noreferrer">View source</a></div>
      </div>
    </article>
    <div className="project-details" data-reveal>
      <details><summary>01 <span>Structured, validated AI responses</span><b aria-hidden="true">+</b></summary><p>JSON and schema-driven responses give AI output a defined structure. Validation sits between the generated response and the product experience.</p></details>
      <details><summary>02 <span>Clear system boundaries</span><b aria-hidden="true">+</b></summary><p>The React frontend, TypeScript backend, and AI provider are separated, keeping application concerns distinct from model integration.</p></details>
      <details><summary>03 <span>Responsible product thinking</span><b aria-hidden="true">+</b></summary><p>Domain and journey mapping, responsible AI principles, and production deployment are part of the engineering approach behind ALTAIR.</p></details>
    </div>
  </div>;
}

export function Skills() {
  return <div className="section-inner">
    <Heading number="04" label="Engineering toolkit" description="Tools I’ve used in professional engineering, with AI capabilities growing through hands-on project work.">The tools change.<br /><em>The fundamentals stay.</em></Heading>
    <div className="toolkit-grid">
      {[
        { icon: "</>", name: "Interface engineering", detail: "Building the part people see, feel, and interact with.", items: ["JavaScript", "TypeScript", "React.js", "Redux", "HTML & CSS"] },
        { icon: "{ }", name: "Systems & APIs", detail: "Connecting interfaces to data and application logic.", items: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Webhooks"] },
        { icon: "⌘", name: "Product integrations", detail: "Making external services work as part of a product.", items: ["Algolia", "SendGrid", "Zapier", "Cronofy", "Nylas", "Payments"] },
        { icon: "✦", name: "AI & delivery", detail: "Project-based AI work, backed by engineering practice.", items: ["Gemini · ALTAIR", "Schema validation", "Git / GitHub", "Code reviews", "Deployments"] },
      ].map(group => <article className="toolkit-card" key={group.name} data-reveal><span className="toolkit-icon" aria-hidden="true">{group.icon}</span><h3>{group.name}</h3><p>{group.detail}</p><Tags items={group.items} /></article>)}
    </div>
    <div className="toolkit-strip" aria-hidden="true"><span>DESIGN</span><i>·</i><span>BUILD</span><i>·</i><span>DEBUG</span><i>·</i><span>REFINE</span><i>·</i><span>REPEAT</span></div>
  </div>;
}

export function AIJourney() {
  return <div className="section-inner">
    <Heading number="05" label="AI journey">A new chapter.<br /><em>The same curiosity.</em></Heading>
    <div className="journey-layout">
      <div className="journey-intro" data-reveal><span className="journey-symbol" aria-hidden="true">✳</span><p>Software engineering<br /><span>×</span><br />Artificial intelligence</p><p className="journey-note">Bringing production experience into a deeper study of intelligent systems.</p></div>
      <ol className="journey-steps">
        <li data-reveal><span className="journey-label">FOUNDATION / 2023</span><h3>B.E. in Computer Science Engineering</h3><p>Chitkara University</p><span className="journey-detail">CGPA: approximately 9.48 / 10</span></li>
        <li data-reveal><span className="journey-label">APPLYING / ALTAIR</span><h3>From AI output to a usable product</h3><p>Exploring structured generation, validation, and responsible AI through an education and career roadmap product.</p><a className="text-link" href="#projects">See the project</a></li>
        <li data-reveal><span className="journey-label">NEXT / NOVEMBER 2026</span><h3>Master of Artificial Intelligence</h3><p>La Trobe University · Melbourne, Australia</p><span className="journey-detail">Beginning November 2026</span></li>
      </ol>
    </div>
  </div>;
}

export function Contact() {
  return <div className="section-inner contact-inner">
    <Heading number="06" label="Let’s connect">Good work starts<br />with a <em>conversation.</em></Heading>
    <p className="contact-description" data-reveal>Melbourne-based software developer exploring opportunities in software engineering and artificial intelligence. Have a product, a role, or an idea to discuss?</p>
    <div className="contact-links" data-reveal>
      <a className="contact-main-link" href="mailto:yugam1102@gmail.com"><span><small>START A CONVERSATION</small>yugam1102@gmail.com</span></a>
      <a className="text-link" href="mailto:yugamk2001@gmail.com">Also at yugamk2001@gmail.com</a>
      <a className="contact-main-link" href="https://www.linkedin.com/in/yugam-kakkar" target="_blank" rel="noopener noreferrer"><span><small>CONNECT ON</small>LinkedIn</span></a><a className="contact-main-link" href="https://github.com/yugam2001" target="_blank" rel="noopener noreferrer"><span><small>FIND ME ON</small>GitHub / yugam2001</span></a><a className="text-link" href="https://altair-guide.vercel.app/" target="_blank" rel="noopener noreferrer">Explore what I’m building</a></div>
    <footer className="site-footer"><a href="#home" className="footer-name">Yugam Kakkar</a><span>Software × Intelligence</span><a className="text-link" href="#home">Back to top ↑</a></footer>
  </div>;
}
