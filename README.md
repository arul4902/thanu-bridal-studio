# Thanushiya Bridal Studio

Responsive static brand website with bridal-look filters, browser-local favourites and a WhatsApp enquiry handoff.

## Deploy on Vercel

Import `arul4902/thanu-bridal-studio` into Vercel and select the `main` branch. Leave Root Directory at the repository root. The included `vercel.json` configures:

- Framework: Other
- Output directory: `dist`
- Build and install commands: empty (no build or dependencies required)

No environment variables are needed. Vercel serves only `dist`; the strategy documents and existing Sites metadata are not website assets.

## Local preview

With Node.js installed, run `node serve.cjs`, then open http://127.0.0.1:4173.

## Check functionality

Run `node test-brand.cjs`. Checks cover filters, favourites, storage failure, occasion synchronisation, WhatsApp message preparation and unique image references. No WhatsApp messages are sent by the checks.

## Content

- `build-pages.cjs`: shared page templates; run `node build-pages.cjs` after editing
- `dist/brand.css`: responsive styles, contact icons and reduced-motion-aware animations
- `dist/brand.js`: mobile navigation, cross-page favourites and enquiry behaviour
- `BRAND-BRIEF.md`: brand brief
- `FEATURE-ROADMAP.md`: proposed features

Review videos need accessible original material. Supplied inspiration portraits are not presented as verified endorsements. Confirm image permissions, business details and package terms before a public business launch.

