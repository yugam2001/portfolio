<div align="center">

# Yugam Kakkar — Portfolio

### Software Engineering × Artificial Intelligence

A personal engineering portfolio built to showcase my professional software-development experience, selected work, technical toolkit, and journey into practical artificial intelligence.

[LinkedIn](https://www.linkedin.com/in/yugam-kakkar) · [GitHub](https://github.com/yugam2001) · [ALTAIR](https://altair-guide.vercel.app/)

</div>

---

## About the Portfolio

This portfolio is more than a collection of links. It is an interactive representation of my journey from full-stack software development into software engineering and AI.

The experience is designed around a dark, editorial interface with an interactive robot companion, cursor-responsive eye movement, subtle motion, and focused sections covering my experience, projects, engineering toolkit, and AI journey.

## Highlights

- Interactive hero with a custom robot companion
- Cursor-responsive eye and orbit behaviour
- Custom Canvas/WebGL rendering for the robot interaction
- Scroll-based reveal effects and reading progress
- Responsive navigation and mobile layouts
- Reduced-motion support for accessibility
- Professional experience timeline
- Featured ALTAIR project and engineering decisions
- Software engineering and AI skills overview
- Contact links for GitHub, LinkedIn, and email

## Built With

- **Next.js 16** — App Router and application structure
- **React 19** — component-based interface
- **TypeScript** — typed application code
- **Tailwind CSS 4** — styling foundation
- **Canvas API** — eye compositing and interactive rendering
- **WebGL** — subtle robot/head rendering effects
- **Intersection Observer** — section awareness and reveal behaviour
- **Web Animations API** — lightweight motion effects

## Interactive Robot

One of the main experiments in this portfolio is the robot companion in the hero section.

Rather than treating the artwork as a purely static image, the interface combines custom rendering layers and pointer input to create responsive eye movement, blinking, subtle expression changes, and cursor-aware orbital motion.

The implementation lives primarily in:

```text
src/components/eye-tracking-study.tsx
src/components/robot-companion.tsx
src/lib/eye-renderer.ts
src/lib/head-renderer.ts
src/lib/robot-renderer.ts
```

The interaction also respects `prefers-reduced-motion` and avoids unnecessary animation work when relevant content is off-screen.

## Portfolio Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── sections.css
├── components/
│   ├── hero.tsx
│   ├── portfolio-sections.tsx
│   ├── site-header.tsx
│   ├── section-effects.tsx
│   ├── robot-companion.tsx
│   └── eye-tracking-study.tsx
└── lib/
    ├── navigation.ts
    ├── eye-renderer.ts
    ├── head-renderer.ts
    └── robot-renderer.ts
```

## Featured Project — ALTAIR

**ALTAIR — Find your way forward.**

ALTAIR is an AI-powered product for generating personalised education and career roadmaps. It combines a React/TypeScript frontend, Node.js/Express backend, Gemini integration, structured AI outputs, schema validation, and responsible-AI product thinking.

**Live product:** https://altair-guide.vercel.app/  
**Source:** https://github.com/yugam2001/altair

## Local Development

The project uses Node.js 24. The required version is also defined in `.nvmrc`.

```bash
git clone https://github.com/yugam2001/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open `http://localhost:3000`.

### Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

To run the production build locally:

```bash
npm start
```

## Deployment

The portfolio is designed to be deployed as a standard Next.js application. Vercel is the simplest deployment target because it supports Next.js directly and can automatically redeploy whenever changes are pushed to the connected GitHub repository.

No environment variables or backend services are currently required by the portfolio.

## Status

The main portfolio experience is built and usable. I am continuing to refine content, responsive behaviour, performance, accessibility, and presentation as the portfolio evolves.

---

<div align="center">

Built by **Yugam Kakkar**

Software Engineering · Artificial Intelligence · Melbourne, Australia

</div>
