<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and ship it to Vercel.

View your app in AI Studio: https://ai.studio/apps/drive/1TjRflZko8f7QZ_8YAG3cg0N7AX8fCRtS

## Prerequisites

- Node.js 18+
- Vercel CLI (`npm i -g vercel`)
- Gemini API key with access to `gemini-2.5-flash-image-preview`

## Environment Variables

Create `.env.local` from the provided example and set your keys:

```
cp .env.local.example .env.local
```

```
GEMINI_API_KEY=your-gemini-key
# Optional: uncomment to point the client at a remote deployment
# VITE_API_BASE_URL=https://your-project.vercel.app
```

`GEMINI_API_KEY` is consumed only inside the Vercel function so the secret never ships to the browser.

## Run Locally

1. Install dependencies: `npm install`
2. Start the integrated Vercel dev server (client + API): `vercel dev`
3. Open http://localhost:3000

When the Vercel CLI is unavailable, you can fall back to `npm run dev`, but you must also provide a reachable API endpoint via `VITE_API_BASE_URL`.

## Deploy to Vercel

1. Authenticate once: `vercel login`
2. Set the production secret: `vercel env add GEMINI_API_KEY production`
3. (Optional) mirror the value for preview: `vercel env copy production preview`
4. Deploy: `vercel --prod`

Vercel will build the static client with `npm run build`, host it from `dist/`, and execute the `/api/stylize` serverless function close to end users so Gemini requests originate from Vercel regions.
