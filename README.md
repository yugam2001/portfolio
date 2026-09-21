# Yugam Kakkar — Portfolio

Personal software engineering and artificial intelligence portfolio. Currently at the initialization stage; the page is a temporary placeholder, not the approved visual design.

## Local development

Use Node.js 24 (see `.nvmrc`) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

To serve a production build locally, run `npm start` after `npm run build`.

If a restricted execution environment blocks Turbopack's local worker port with `Operation not permitted`, use `npm run build -- --webpack` to verify a production build with Next.js's supported alternative bundler. The default scripts retain Turbopack. At initialization, linting, type checking, and the Webpack production build passed; Turbopack could not complete in the agent's restricted environment.

## Foundation

- Next.js App Router and React
- TypeScript with strict checking
- Tailwind CSS via PostCSS
- ESLint with Next.js, accessibility, and TypeScript rules
- npm lockfile for reproducible installs
- `@/*` imports resolve to `src/*`

`src/app/page.tsx` contains the home page, `src/app/layout.tsx` the root document and metadata, and `src/app/globals.css` the global styles. Static assets belong in `public/`. Add further component and content folders as they become necessary.

React and Next.js use current stable releases at initialization. TypeScript is on 6.x because the lint parser does not yet support 7.x. ESLint remains on 9.x because several plugins bundled with the current Next.js lint configuration do not support 10.x; npm marks 9.x as unsupported upstream. Revisit these tooling versions when the plugins support newer majors.

No environment variables or backend services are required. Typography, visual design, animation, 3D assets, and deployment will be handled in subsequent steps.
