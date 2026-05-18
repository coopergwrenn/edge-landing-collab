# Edge Agent Village — landing page (collab)

Standalone copy of the `instaclaw.io/edge` landing page and `/edge/sponsors` page, extracted so you can iterate on copy and layout without touching the InstaClaw backend.

It runs locally with one command, ships zero secrets, and re-renders every PR as a Vercel preview URL so anyone can click and review.

```bash
git clone <this repo>
cd edge-landing-collab
npm install
npm run dev
# → http://localhost:3000  (auto-redirects to /edge)
```

---

## What's in here

```
app/edge/
  page.tsx              the landing page
  layout.tsx            Edge palette + smooth-scroll wrapper
  edge-city-client.tsx  the CTA card (claim / complete / live)
  edge-user-state.ts    stub that picks which CTA shape to render
  sponsors/page.tsx     the sponsors detail page

components/
  json-ld.tsx           SEO schema.org helper
  lenis-provider.tsx    smooth scroll, matches live site

lib/
  seo.ts                metadata builder for OG cards

public/edge/            brand assets (wordmark, OG card, background, hero)
```

The real `instaclaw.io/edge` page hits Supabase + the InstaClaw auth layer to pick which CTA the visitor sees. None of that comes with this repo — it's been replaced by a single URL-driven preview switch (see below). All copy and layout is byte-identical to the live page; only the auth/data plumbing is stubbed.

---

## Preview all three CTA states

The landing has three flavors of the primary CTA depending on visitor state. You can preview each one by adding a URL param:

| URL                                | Who sees this on the live site                                   |
| ---------------------------------- | ---------------------------------------------------------------- |
| `/edge`                            | First-time visitor — claim CTA + email notify-me form            |
| `/edge?state=in_progress`          | Started signup, hasn't finished — single "Complete setup" pill   |
| `/edge?state=live`                 | Already has an agent — bot username + "Open in Telegram" button  |

Iterate on all three. Each renders the corresponding hero CTA and the corresponding closing CTA.

---

## How to propose changes back

Fork, branch, edit, open a PR. That's it.

1. Fork this repo into your account.
2. `git checkout -b <descriptive-branch-name>`
3. Make changes. `npm run dev` to preview. `npm run build` to verify the page still compiles.
4. Push and open a PR back to `main`.
5. Vercel will auto-deploy a preview URL on the PR — Cooper clicks the URL, sees the change, comments inline, merges if approved.

Cooper will lift merged changes into the real InstaClaw repo (file paths are identical — copying back is mechanical). No further work needed from you.

---

## Editing notes

**Copy lives at the top of `app/edge/page.tsx`.** Hero headline, feature blocks (`edgeFeatures`), privacy bullets (`privacyPrinciples`), FAQ (`faqs`), and the overnight loop (`overnightLoop`) are all data-driven arrays near the top of the file. Edit there rather than chasing strings through JSX.

**Palette is centralized.** The Edge CSS variables (olive, sage, ink, line, etc.) live in one place — `app/edge/layout.tsx`. Change them once and every component picks them up.

**Sponsors page** lives at `app/edge/sponsors/page.tsx`. Same shape, separate file — edit independently of the landing.

**Type signatures matter.** `EdgeUserState` in `edge-user-state.ts` is intentionally kept identical to the production type. If you rename a field there, Cooper will need to mirror it in the live codebase — try not to without a heads-up.

**Mock API calls.** The Claim and Notify-me buttons in `edge-city-client.tsx` simulate a fake delay and `console.log` what would happen in prod. You can use them to verify loading / submitted states render correctly, but no real network call happens.

---

## What's intentionally NOT included

- No Supabase, no Stripe, no Telegram, no analytics.
- No InstaClaw auth or onboarding flow — the `?state=` switch replaces it.
- No InstaClaw backend code, `lib/auth.ts`, `lib/supabase.ts`, or any `app/api/*` routes.
- No env vars. No tokens. No keys. There is literally nothing here that requires credentials to run.

If you find anything that looks like a credential, secret, internal URL, or production identifier in this repo — flag it. There shouldn't be any.

---

## Versions

Pinned to match the live stack exactly so what you see locally is what users see on instaclaw.io:

- Next.js **16.1.6** (App Router)
- React **19.2.3**
- Tailwind CSS **v4** (via `@tailwindcss/postcss`)
- Lenis **1.3** (smooth scroll)
- Inter + Instrument Serif (via `next/font/google`)

Node 20+ recommended.
