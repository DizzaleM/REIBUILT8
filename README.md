# REIBUILT 8

Premium online fitness brand front-end mockup built with Next.js, TypeScript, and Tailwind CSS.

**Built Different.**

This repository is a visual and functional front-end only. There is no database, authentication, payments, CMS, or livestream backend connected yet.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Use default Next.js settings.
4. Deploy — no environment variables are required for this mockup.

## Replace Brand Assets

### Logo files

Add files to `/public/brand/`:

- `reibuilt8-logo-full.png`
- `reibuilt8-r8-mark.png`
- `reibuilt8-logo-white.png`

Until those files exist, the site uses a styled `R8` / `REIBUILT 8` text fallback.

### Rei photos

Add files to `/public/images/rei/`:

- `hero-rei.jpg`
- `about-rei.jpg`
- `coaching-rei.jpg`
- `program-strength.jpg`
- `program-fat-loss.jpg`
- `program-athletic.jpg`
- `program-home.jpg`
- `live-class.jpg`
- `workout-preview-1.jpg`
- `workout-preview-2.jpg`
- `workout-preview-3.jpg`

Missing images automatically fall back to a dark placeholder with an “Add Rei Photo” label.

## Edit Mock Data

All catalog content lives in `/src/data/`:

- `programs.ts`
- `products.ts`
- `classes.ts`
- `meals.ts`
- `testimonials.ts`
- `memberships.ts`
- `faqs.ts`
- `assessmentQuestions.ts`

Assessment scoring and recommendations:

- `/src/lib/assessmentScoring.ts`
- `/src/lib/programRecommendations.ts`

AI coach mock layer:

- `/src/services/aiCoach.ts`

## Future Integrations

### Payments

Checkout buttons open a mock modal. Later connect Stripe (or another processor) through server-side routes only. Never collect card data in the browser mockup.

### Authentication

Login actions show a notice toast/modal. Later connect your auth provider through secure server configuration.

### Livestream

Live class reserve actions are mocked. Later connect an integrated streaming platform and member replay access.

### AI Coach

`services/aiCoach.ts` currently returns mocked coach copy. Later call a server route that holds OpenAI/Anthropic keys. Do not expose API keys in the browser.

### Email / PDF assessment delivery

The assessment lead-capture step is ready for email + PDF delivery once a backend and email provider are connected.

## Project Structure

```text
src/
  app/                 # Routes and pages
  components/          # UI, layout, cards, forms, providers
  data/                # Mock catalogs and assessment questions
  lib/                 # Scoring, recommendations, analytics hooks, utils
  services/            # AI coach abstraction
  types/               # Shared TypeScript types
public/
  brand/               # Logo files
  images/rei/          # Rei photo placeholders
```

## Content Still Needed

See [`CONTENT-NEEDED.md`](./CONTENT-NEEDED.md) for the full launch checklist.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
