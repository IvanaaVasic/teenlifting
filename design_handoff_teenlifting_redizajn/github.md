repo: IvanaaVasic/teenlifting
branch: main

## Last sync

date: 2026-09-03T12:12:18Z

### Updated in this project

- Recreated the current homepage from source as a baseline
- Two redesign directions (1a Klinika, 1b Atelje) on the homepage and treatment page
- 1a extended to all remaining pages: O nama, Cenovnik, Promo, Blog list, Blog article, Kontakt
- Brand teal #00b4a5 retained as the accent; #00776C is its darker shade for small text on light paper

## Design tokens (1a Klinika)

| Token | Value | Replaces in globals.css |
| --- | --- | --- |
| paper | #FBF7F4 | --color-background |
| paper-alt | #F3EDE8 | --color-background-alt |
| ink | #17201F | --color-text-dark |
| text | #3F3A36 / #5A544F | --color-text |
| muted | #8A827C | --color-text-light |
| line | #E4DCD5 | --color-border |
| brand | #00b4a5 | --color-primary (unchanged) |
| brand-dark | #00776C | --color-primary-hover |
| display font | Newsreader 300/400/500 + italic | replaces Titillium for headings |
| ui font | Archivo 400/500/600 | replaces Titillium for UI/labels |

Radii: none (square corners). Labels: 11px / 600 / uppercase / letter-spacing 0.12–0.16em.

## Screen map

| Screen | Repo files |
| --- | --- |
| Trenutno stanje - Početna.dc.html | src/app/globals.css, src/app/layout.tsx, src/app/(main)/layout.tsx, src/app/(main)/page.tsx, src/components/Header/*, src/components/AnnouncementBar/*, src/components/Hero/*, src/components/CardSection/*, src/components/BlogSection/*, src/components/TestimonialsSection/*, src/components/InstagramFeed/*, src/components/Footer/* |
| Redizajn - dva pravca.dc.html (1a + 1b: Početna, Tretman) | src/app/(main)/page.tsx, src/app/(main)/tretmani/[slug]/page.tsx + page.module.css, src/components/Hero/*, src/components/CardSection/*, src/components/BlogSection/*, src/components/TestimonialsSection/*, src/components/Header/*, src/components/Footer/* |
| Redizajn 1a - Sve strane.dc.html → O nama | src/app/(main)/o-nama/page.tsx + page.module.css, src/components/PortableTextContent/*, src/components/TestimonialsSection/* |
| Redizajn 1a - Sve strane.dc.html → Cenovnik | src/app/(main)/cenovnik/page.tsx + page.module.css, src/components/PortableTextContent/* (table block), src/components/ContactCTA/* |
| Redizajn 1a - Sve strane.dc.html → Promo | src/app/(main)/promo/page.tsx + page.module.css, src/components/ContactCTA/* |
| Redizajn 1a - Sve strane.dc.html → Blog lista | src/app/(main)/blog/page.tsx + page.module.css, src/components/BlogSection/BlogSection.tsx (BlogCard) |
| Redizajn 1a - Sve strane.dc.html → Blog članak | src/app/(main)/blog/[slug]/page.tsx + page.module.css, src/components/PortableTextContent/* (all block styles) |
| Redizajn 1a - Sve strane.dc.html → Kontakt | src/app/(main)/kontakt/page.tsx + page.module.css, src/components/ContactForm/* |
| Header / Footer (shared, shown once) | src/components/Header/*, src/components/Footer/* |

## Notes for implementation

- `contentSection.content` (src/sanity/schemas/objects/section.ts) offers exactly: `block` (normal, h2, h3, h4, blockquote; bullet + number lists; strong/em/underline/link), `image` (alt, caption, layout full|half|third), `ctaButton` (primary|secondary|outline), `dataTable` (title + rows[].cells + isHeader), `imageGallery` (images + columns 2-4). The Blog članak screen is a specimen of exactly that list — no invented blocks.
- Blog posts are NOT the same content model. `blog.ts` `post.content` allows only `{type:"block"}` (default styles, no custom style list) + `image` (alt, caption — no `layout` field). `ctaButton`, `dataTable`, `imageGallery` and image layouts exist ONLY in `contentSection.content`, i.e. on pages. The specimen screen labels which blocks are page-only.
- **New schema fields ARE required.** Verified by reading the page/document schemas: `about.ts` = hero + sections[] + testimonialsSection; `price.ts` and `promotion.ts` = hero + sections[] + contactCta; `treatment.ts` = title, slug, category, hero, sections[], disclaimer{text, show}, contactCta; `blog.ts` = title, slug, excerpt, mainImage, gallery[], content[], publishedAt, seo. None of them carry the structured blocks the design needs:
  - `cardGrid` (title + text per card) — O nama "Rezultati metode"
  - `twoColumnBlocks` (label + text × 2) — O nama Misija / Vizija
  - `statRow` (label + values[]) — O nama Franšiza
  - `pricePage.aside` { images[] (alt, caption), notes[] (label, text) } — Cenovnik sticky column
  - `promotion.offer` { price, oldPrice, currency, note, buttonLabel, buttonHref, terms } — Promo price aside
  - `treatmentPage.meta` { duration, firstResult, priceFrom, invasiveness } — treatment page meta row (treatment.ts has no duration or price field today)
  - `post.relatedPosts` reference array, or a "latest 3" query — Blog article "Povezane novosti" (`getBlogPost(slug)` returns one post)
  - Heading extraction from PortableText for the article's sticky TOC — code-side, no schema change
- Already in the schema and reused by the design: `treatment.disclaimer` drives the Kontraindikacije box, and `treatment.category` has exactly three values (`face`, `body`, `pelvic`) — platizma is a face subtype, so the homepage's four rows group under those three categories.
- ContactForm keeps its exact field set from ContactForm.tsx: name, email / phone, subject (select with 6 fixed options: Opšte informacije, Zakazivanje termina, Tretmani lica, Tretmani tela, Cene i promocije, Drugo) / message (rows 6). Only styling changes — no new fields. Error text comes from the zod `contactSchema` messages; the success state replaces the form (`successContainer` + HiCheck + `successMessage` + "Pošaljite još jednu poruku").
- ContactCTA keeps its data shape (title, text, buttonLabel, buttonHref) and its `showDefault` behaviour; only the band styling changes (dark ink panel, teal button).
- Swiper is dropped on the homepage treatment section and Novosti in favour of editorial rows / a 3-col grid.
- **Hero stops being a slider on every page except the homepage.** `Hero.tsx` is currently a 650px Swiper with bullets, rendered unconditionally by `o-nama/page.tsx` and `cenovnik/page.tsx` and conditionally by promo/blog/kontakt. In the redesign: O nama = static split text+image band, Cenovnik / Blog list / Kontakt = plain text header band, Promo = one full-bleed image without bullets, homepage = Swiper as before. Decide what happens to `hero.slides[1..n]` already authored in Sanity — the proposal is to use `slides[0]` only on non-homepage pages.
- Sticky in-page TOCs on O nama and the Blog article need h2/h3 extraction from PortableText plus anchor ids; no such logic exists today. The same helper also serves the treatment pages.
- Blog list needs `posts[0]` as a featured full-width card with a "Najnovije" badge and the rest in a 3-col grid; `blog/page.tsx` currently maps every post through the same `BlogCard`. Code change, not a schema change.
- New sections in the design that have no CMS counterpart yet: before/after gallery and FAQ accordion (both on the homepage and treatment page).
- Known bug in current code: footer links on `/tretmani/[slug]` are relative, so they resolve to `/tretmani/o-nama`. Use `normalizeHref` from Header.tsx in Footer.tsx too.
- Assets in `assets/` were supplied by the user; logo is a placeholder wordmark, and `misic-1..3.png` + `portret-sanja.png` are striped placeholders awaiting real files.
