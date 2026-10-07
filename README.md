# Muhammad Umer Mujtaba — Portfolio

A personal portfolio site built with **Next.js 14 (App Router)**, **TypeScript**,
**Tailwind CSS**, and **Firebase** (Firestore for the contact form). Fonts are
self-hosted via Fontsource, so the site has no runtime dependency on Google's
font CDN.

## Stack

- Next.js 14 (App Router, static generation)
- TypeScript
- Tailwind CSS
- Firebase (Firestore)
- Self-hosted fonts: Space Grotesk, IBM Plex Mono, Inter

## Project structure

```
app/
  layout.tsx          Root layout, global metadata, JSON-LD structured data
  page.tsx             Home page — composes all sections
  globals.css          Design tokens, base styles, reduced-motion handling
  sitemap.ts           Auto-generated /sitemap.xml
  robots.ts            Auto-generated /robots.txt
  manifest.ts          Auto-generated web app manifest
  icon.tsx             Auto-generated favicon (no static image needed)
  opengraph-image.tsx  Auto-generated social share image

components/
  Nav.tsx              Top navigation with mobile menu
  Hero.tsx             Landing section with the device-stack visual
  About.tsx            Bio section
  Skills.tsx           Grouped technical skills
  Experience.tsx       Work history timeline
  Projects.tsx         Selected projects
  Education.tsx        Education history
  Contact.tsx          Contact form (writes to Firestore)
  Footer.tsx           Footer with social links

lib/
  types.ts             Shared TypeScript types for portfolio content
  data.ts              Imports local seed JSON (fallback only)
  portfolio.ts         Loads portfolio/content from Firestore
  firebase.ts          Firebase client initialization
  site-config.ts       Thin shim around seed site config

scripts/
  seed-payload.json    Source content pushed to Firestore via `npm run seed`
  seed.mjs             Seed script
```

### Why it's structured this way

All resume content lives in **Firestore** (`portfolio/content`). The repo keeps
a copy in **`scripts/seed-payload.json`** so you can seed a new project or
recover data. Components are presentational — they receive props from
`app/page.tsx`, which fetches once from Firebase (with a 60s revalidate).
Site-wide details (name, email, URL, keywords) are part of that same document
and drive metadata, JSON-LD, the sitemap, and the contact section.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Firebase

All page content (site info, hero, about, skills, experience, projects,
education) and contact messages live in Firestore.

1. Go to the [Firebase console](https://console.firebase.google.com/) and create a project (or use an existing one).
2. Add a **Web app** to the project (Project settings → General → "Your apps" → Web).
3. Copy the config values Firebase gives you.
4. Enable **Firestore Database** (Build → Firestore Database → Create database). Start in production mode.
5. Under Firestore → Rules, use:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Public read of portfolio content; writes only via Console / seed script
       match /portfolio/{doc} {
         allow read: if true;
         allow write: if false;
       }
       match /messages/{messageId} {
         allow create: if request.resource.data.keys().hasAll(['name', 'email', 'message'])
                       && request.resource.data.name is string
                       && request.resource.data.email is string
                       && request.resource.data.message is string;
         allow read, update, delete: if false;
       }
     }
   }
   ```

6. Copy `.env.example` to `.env.local` (dev) and `.env.production` (prod builds):

   ```bash
   cp .env.example .env.local
   cp .env.example .env.production
   ```

7. Fill both files with the values from step 3.

8. Seed portfolio content once (temporarily allow write on `portfolio/{doc}` if
   the seed fails with permission-denied, then lock writes again):

   ```bash
   npm run seed
   ```

   This writes `scripts/seed-payload.json` → Firestore `portfolio/content`.
   Edit that document in the Firebase Console to update the live site
   (page revalidates about every 60 seconds).

Submitted contact messages appear under
**Firestore Database → Data → messages**.

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

### 4. Update your content

- **Live site**: edit Firestore → `portfolio` → `content` in the Firebase Console.
- **Re-seed from repo**: edit `scripts/seed-payload.json`, then run `npm run seed`
  (needs temporary write access on `portfolio/{doc}`).
- Update `site.url` in Firestore to your real production domain before going live.

### 5. Build for production

```bash
npm run build
npm start
```

## Deployment

The easiest option is [Vercel](https://vercel.com/) (built by the Next.js
team):

1. Push this project to a GitHub repository.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Add the same environment variables from `.env.production` in the Vercel project
   settings (Settings → Environment Variables). Use the `NEXT_PUBLIC_FIREBASE_*`
   keys listed in `.env.example`.
4. Deploy. Vercel rebuilds automatically on every push.

Any other Node.js host (Netlify, Firebase Hosting with a Cloud Function,
Render, your own server) works too — just make sure the same environment
variables are set there.

## SEO checklist (already handled)

- Per-page `<title>` and meta description via the Next.js Metadata API
- Open Graph and Twitter card tags, with a dynamically generated share image
  (`app/opengraph-image.tsx`) — no manual image asset required
- JSON-LD `Person` structured data in `app/layout.tsx` for rich results
- Auto-generated `sitemap.xml` and `robots.txt`
- Dynamically generated favicon (`app/icon.tsx`)
- Semantic HTML (`<section>`, `<nav>`, `<main>`, `<article>`), one `<h1>` per
  page, and a logical heading order
- Fully static output — every route pre-renders at build time for fast load
  and easy crawling
- Visible focus states and `prefers-reduced-motion` support for accessibility,
  which also factors into Core Web Vitals / search ranking

Before going live, update `lib/site-config.ts` → `url` to your real domain,
then re-run `npm run build` so the sitemap and canonical URLs point to it.

## Customizing the design

Design tokens (colors, fonts) live in `tailwind.config.ts` and
`app/globals.css`. The palette is a dark navy background (`#10151C`) with
amber (`#E3A34E`) and teal (`#55C8B8`) accents, paired with Space Grotesk
(display), Inter (body), and IBM Plex Mono (labels/platform tags/dates).
Change the `colors` block in `tailwind.config.ts` to re-theme the whole site.
