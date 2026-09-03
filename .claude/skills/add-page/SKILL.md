---
name: add-page
description: Use when adding a new route under src/app/(main)/ — scaffolds the folder, sets force-dynamic, and wires the Sanity page schema and navigation if the page is content-driven.
---

New routes in this project follow a consistent pattern. Skipping steps causes stale content (missing `force-dynamic`), broken Studio editing (missing schema), or orphaned pages (not in nav).

## Steps

1. **Create the route folder** under `src/app/(main)/<slug>/`. Slugs are Serbian and lowercase-hyphenated — see existing routes (`o-nama`, `kontakt`, `cenovnik`, `tretmani`, `promo`, `blog`) for style.

2. **Add `page.tsx`** with:
   ```ts
   export const dynamic = "force-dynamic";
   ```
   This is mandatory on every main page — content edited in Sanity should appear without a rebuild.

3. **If the page is content-driven** (headings, sections, CTAs come from Sanity):
   - Use the `add-sanity-schema` skill to create a new schema under `src/sanity/schemas/pages/`.
   - Fetch the data server-side in `page.tsx` using the query from `sanity-utils.ts`.
   - Render sections through existing components (`Hero`, `CardSection`, `TestimonialsSection`, `ContactCTA`, `PortableTextContent`, etc.) before creating new ones.

4. **Add SEO** via `src/components/JsonLd/` if the page needs structured data (Organization, WebPage, Breadcrumb, or Service).

5. **Wire navigation** if the page should be reachable from the site chrome — update the `siteSettings` schema and/or `Header`/`Footer` components as needed.

## Checklist

- [ ] Folder under `src/app/(main)/<slug>/`
- [ ] `page.tsx` with `export const dynamic = "force-dynamic"`
- [ ] Sanity page schema created + registered (if content-driven)
- [ ] GROQ query + TS type in `sanity-utils.ts` (if content-driven)
- [ ] Server-side fetch in `page.tsx`
- [ ] JSON-LD added if SEO-relevant
- [ ] Header/Footer/siteSettings updated if the page appears in nav
