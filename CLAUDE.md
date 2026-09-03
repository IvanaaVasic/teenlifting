# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Teenlifting — Next.js 15 (App Router) + Sanity CMS website for a beauty/wellness business. Content is Serbian (`sr_RS`). Deployed on Vercel.

## Stack notes

- **Tailwind v4** via `@tailwindcss/postcss` — there is no `tailwind.config.*` file. Global styles + `@import "tailwindcss"` live in `src/app/globals.css`.
- **Styling**: CSS Modules per component (`Component.module.css`) alongside Tailwind utilities. Theme values are CSS custom properties in `globals.css`.
- **TypeScript**: `strict: true`. Path alias `@/*` → `./src/*` (single alias).
- **Forms**: `react-hook-form` + `zod` for validation, `@emailjs/browser` for submission. EmailJS keys are `NEXT_PUBLIC_*` on purpose (client-side service).

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (this is also how type errors surface — there is no separate `typecheck` script)
- `npm run lint` — ESLint (uses `eslint-config-next`). Run with `--fix` to auto-fix. There is no Prettier or standalone formatter.
- No test framework is installed.

## Sanity

- Project ID `wtkk9yjn`, dataset `production`. Config in `src/sanity/config/client-config.ts`.
- **Studio is mounted at `/admin`**, not the default `/studio`.
- Schemas live in `src/sanity/schemas/{pages,documents,objects}/` and are registered in `src/sanity/schemas/index.ts`. Adding a schema requires touching the index too.
- GROQ queries, fragments, and matching TypeScript types are colocated in `src/sanity/sanity-utils.ts`. Reuse existing fragments before adding new ones.
- Image URLs go through `src/utils/image.ts` (uses `@sanity/image-url`). `next.config.ts` whitelists `cdn.sanity.io` for `next/image`.

## Routing and rendering

- All main pages sit under `src/app/(main)/` (route group). Sanity Studio is under `src/app/(admin)/admin/`.
- **Every main page uses `export const dynamic = "force-dynamic"`** — this is intentional (content changes in Sanity should show up without a rebuild). Keep this on any new page.
- Route slugs are Serbian (`o-nama`, `kontakt`, `cenovnik`, `tretmani`, `promo`, `blog`). Match this style when adding routes.

## Content rule

Use judgment. Static UI chrome (buttons, nav labels, form field labels) can be hardcoded in Serbian. Page content, headings, and CTAs should come from Sanity so the client can edit them. When in doubt, add a schema field.

## Commit style

Conventional Commits, lowercase type: `feat: ...`, `fix: ...`. See `git log` for cadence.
