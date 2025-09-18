# Repository Guidelines

## Project Structure & Module Organization
This Vite + React TypeScript app boots from `index.tsx`, injecting `App` into `index.html`. `App.tsx` manages state and wires DropZone, StyleGrid, and ImageViewer components. `components/` contains interactive modules; keep shareable primitives in `components/ui/`, and aggregate SVG exports in `components/icons.tsx`. Gemini calls run through the serverless function in `api/stylize.ts`; reuse this layer for every request that needs to originate from Vercel. `constants.ts` holds the style catalog, while `types.ts` centralizes enums such as `AppState`. Path alias `@/*` resolves to the repository root via `tsconfig.json`.

## Build, Test, and Development Commands
Run `npm install` once to pull dependencies. `vercel dev` spins up the local Vercel simulation (client + API) on port 3000. `npm run dev` starts the Vite-only server—use it only when `VITE_API_BASE_URL` targets a reachable backend. `npm run build` outputs a production bundle in `dist/`, and `npm run preview` serves that bundle for smoke testing before deploy.

## Coding Style & Naming Conventions
Write components as typed function components with React hooks. Follow the existing two-space indentation, single quotes, and trailing semicolons. Use PascalCase for component files (`StyleGrid.tsx`), camelCase for functions and variables, and UPPER_SNAKE_CASE for constant collections like `STYLES`. Co-locate component helpers next to their component; promote shared utilities into `services/`, `components/ui/`, or `api/` when server-side execution is required.

## Testing Guidelines
Automated tests are not yet configured. Introduce Vitest with React Testing Library when adding coverage. Place component tests alongside source as `ComponentName.test.tsx` and mock Gemini responses via fixtures or a fake API handler. Keep snapshots stable by mocking time-based calls such as `Date.now` in download flows, and add integration coverage for `/api/stylize` once the proxy layer expands.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commits (e.g., `feat: rename project`). Keep subject lines ≤50 characters, lowercase the type, and use present-tense verbs. Each PR should include a concise summary, manual test notes (`vercel dev`, `npm run build`), screenshots or GIFs for UI changes, and links to related issues. Request review before merging and ensure CI (when added) is green.

## Configuration & Security Tips
Store `GEMINI_API_KEY` in `.env.local` locally and configure it with `vercel env add` in each environment; never commit secrets. If you check in example values, keep them in `.env.local.example` with placeholders. Document new environment variables in `README.md` and guard fallback logic inside `api/stylize.ts` to fail fast when keys are missing.
