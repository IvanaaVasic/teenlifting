---
name: add-sanity-schema
description: Use when adding a new Sanity schema type (page, document, or object) to make sure every wiring point is touched — schema file, index registration, GROQ query/fragment, and matching TypeScript type.
---

Adding a schema in this repo requires updating four places. Missing any one causes silent breakage (missing type, empty query result, or Studio not showing the type).

## Steps

1. **Pick the category** and create the file:
   - `src/sanity/schemas/pages/<name>.ts` — top-level page documents (home, about, contact, price, promo, blog listing)
   - `src/sanity/schemas/documents/<name>.ts` — repeating documents (treatment, blog post)
   - `src/sanity/schemas/objects/<name>.ts` — embedded objects reused across schemas (hero, card, cta, testimonial)

   Follow the shape of the nearest neighbor in the same folder.

2. **Register it** in `src/sanity/schemas/index.ts` — add the import and append to the `schemas` array. Without this, the type will not appear in Studio.

3. **Add the GROQ + TS type** in `src/sanity/sanity-utils.ts`:
   - If it's a page or document fetched at runtime, add a query (or update an existing one).
   - Reuse existing fragments where possible instead of duplicating projections.
   - Define the matching TypeScript type next to the query.

4. **Wire it into a route** if the schema drives a page: verify the corresponding `src/app/(main)/<route>/page.tsx` fetches the new query server-side and keeps `export const dynamic = "force-dynamic"`.

## Checklist

- [ ] Schema file created in the right subfolder
- [ ] Registered in `schemas/index.ts`
- [ ] GROQ query/fragment + TS type in `sanity-utils.ts`
- [ ] Route fetches it (if applicable)
- [ ] Verified in Studio at `/admin` that the type appears
