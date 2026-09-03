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

Never hardcode visible copy. Headings, section titles, CTA labels and body text come from Sanity so the client can edit them without a deploy — if no field exists, add one rather than putting the string in code. Prefer letting a section not render when its field is empty, over falling back to a string baked into the component.

Text in a design file is an *illustration* of how existing CMS content would look, not a string to paste. The production text does not have to match the design; it has to come from the CMS.

Only genuine static chrome may stay in code: form field labels, `aria-label`s, and small nav words like "Pogledaj sve".

## Typography convention

Use a plain hyphen `-` in UI text, never an em dash `—` or `&mdash;` — including where a design file shows one. Applies to eyebrow separators, list markers, name/role separators, and Sanity Studio field labels. Code comments are exempt.

## Sanity is shared with production

`main` and any feature branch read the same Sanity project (`wtkk9yjn`, dataset `production`), and every page is `force-dynamic`. So:

- **Adding** a schema field is safe — other branches ignore it.
- **Never remove** a schema type, field, or dependency; the live site may read it.
- Editing an existing field's content appears on the live site immediately. Seed new fields only.

The Sanity MCP connector is not authorized for this project. To write content, use a throwaway `.cjs` script with `getCliClient` from `sanity/cli` (CJS-only in Sanity 3.52) run via `npx sanity exec ./script.cjs --with-user-token`.

## Commit style

Conventional Commits, lowercase type: `feat: ...`, `fix: ...`. See `git log` for cadence.
