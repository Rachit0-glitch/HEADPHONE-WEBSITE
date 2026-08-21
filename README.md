# SONIC Hero Section — Next.js

A pixel-faithful port of the "Headphone Hero" Figma frame (1536×1024), read directly from the live file
after your manual adjustments — not from my earlier build.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's here

- `components/HeroSection.tsx` + `components/HeroSection.module.css` — the actual hero section. Fully
  self-contained; drop it into an existing Next.js App Router project (copy `components/HeroSection.*`
  and `public/hero/*`, and register the two fonts in your root layout the same way `app/layout.tsx` does).
- `app/layout.tsx` — loads **Antonio** (headline) and **Montserrat** (everything else) via
  `next/font/google`, exposed as CSS variables `--font-antonio` / `--font-montserrat`.
- `app/page.tsx` — wraps `<HeroSection />` in a `max-width: 1536px` container so it never exceeds its
  native design size on very large screens, but scales fluidly below that.
- `public/hero/*.png` — the exact source images, copied unmodified:
  - `background.png`, `arch.png`, `soundwave-left.png`, `soundwave-right.png` — from your
    `FIGMA/Headphone/` folder (the ones you said to use strictly).
  - `headphone.png` — from `FIGMA/assets_hp/` (the Headphone folder has no standalone headphone cutout,
    so this is the only transparent headphones asset that exists).

## How the scaling works

Every position/size is `calc(figma-px / 1536-or-1024 * 100vw)` (or `vh` for a couple of purely-vertical
values), so the whole section — images, type, spacing — scales together and keeps the exact Figma
proportions at any width, capped at its native 1536px size by the `page.tsx` wrapper.

## One thing worth knowing

While reading back the current Figma file, I found one extra, invisible leftover rectangle behind your
soundwave layers (positioned at 585,278, 915×390, using the older combined wave image) — a stray node
from an earlier build of mine that Figma's `sync` mode doesn't auto-delete. It isn't visible in the
current design and this code doesn't include it, but it's still sitting in the Figma file. Let me know if
you'd like me to clean it up.
