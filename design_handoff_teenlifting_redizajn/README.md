# Handoff: Teenlifting redizajn — pravac 1a „Klinika"

## Overview

Kompletan vizualni redizajn sajta [teenlifting.vercel.app](https://teenlifting.vercel.app) — Next.js 15 + Sanity CMS aplikacija za TEENLIFTING centar u Beogradu (elektrostimulacija mišića lica, tela i karličnog dna).

Cilj redizajna, po brifu klijenta: sajt trenutno izgleda generično i „bez duše", a strane tretmana čitaju se kao dosadni blog tekstovi. Redizajn treba da: donese više zakazanih konsultacija, izgleda premium / medicinski ozbiljno, jasnije objasni šta je TEENLIFTING metoda, i ojača brend identitet. Ton komunikacije: topao i ličan. Mešani srpski/hrvatski tekstovi se **ostavljaju kako su** — klijent to rešava sam.

Ključni pomak: strana tretmana prestaje da bude tekstualni članak i postaje **protokol** — meta red (trajanje / prvi rezultat / cena / invazivnost), sticky pod-navigacija, numerisani koraci, tabela cena, FAQ, kontraindikacije u posebnom okviru.

## About the Design Files

Fajlovi u ovom paketu su **dizajn reference napisane u HTML-u** — prototipovi koji pokazuju željeni izgled i ponašanje, **ne production kod za direktno kopiranje**.

Zadatak je da se ovi dizajni **rekreiraju u postojećem okruženju repozitorija** `IvanaaVasic/teenlifting` — Next.js 15 App Router, React 19, TypeScript, CSS Modules (jedan `.module.css` po komponenti), Sanity 3 kao CMS, `next/image`, `react-icons`, `swiper`, `react-hook-form` + `zod` + `@emailjs/browser`.

**Ne uvoditi nove biblioteke.** Ne prevoditi na Tailwind utility klase (Tailwind je u `package.json` i `globals.css` ga importuje, ali komponente ga ne koriste — sve je CSS Modules + CSS varijable iz `:root`). Držati se te podele: tokeni u `globals.css`, stilovi u `*.module.css`.

HTML prototipovi koriste inline stilove jer je to zahtev alata u kom su napravljeni — to **nije** uputstvo za implementaciju. Vrednosti prepisati u odgovarajuće CSS module.

## Fidelity

**High-fidelity.** Boje, tipografija, razmaci i rasteri su finalni i treba ih rekreirati precizno. Sve vrednosti su navedene u sekciji Design Tokens i po ekranu.

Dva mesta nisu finalna:
- **Pre/posle galerija** — prugasti placeholderi. Klijent treba da dostavi fotografije uz pismenu saglasnost klijenata.
- **Logo, tri dijagrama mišića i portret dr. Sanje** — placeholderi (logo je tekstualni wordmark). Prava verzija logotipa je već u Sanity-ju (`siteSettings.logo`), pa u implementaciji ide iz CMS-a kao i sada.

## Design Tokens

Zameniti vrednosti u `src/app/globals.css` `:root`. Imena promenljivih ostaju ista gde je moguće, da se ne lomi postojeći kod.

| Promenljiva | Sada | Novo | Uloga |
| --- | --- | --- | --- |
| `--color-background` | `#ffffff` | `#FBF7F4` | papir, blago topao |
| `--color-background-alt` | `#f9fafb` | `#F3EDE8` | alternativna sekcija |
| `--color-text-dark` | `#1a1a1a` | `#17201F` | tuš, tamni paneli |
| `--color-text` | `#404041` | `#3F3A36` | osnovni tekst |
| `--color-text-light` | `#6b6b6c` | `#8A827C` | prigušen tekst, oznake |
| `--color-border` | `#e5e7eb` | `#E4DCD5` | linije |
| `--color-primary` | `#00b4a5` | `#00b4a5` | **brend, nepromenjen** |
| `--color-primary-hover` | `#009d90` | `#00776C` | brend-dark, sitan tekst na svetlom |
| `--color-secondary` | `#4c81c1` | — | **izbaciti**, ne koristi se u redizajnu |

Dodatne vrednosti koje nemaju promenljivu:
- Sekundarni tekst na papiru: `#5A544F`
- Ivica dugmeta / okvira na papiru: `#C9BEB4`, svetlija varijanta `#D6CCC3`, kartica `#DDD4CC`
- Tekst na tamnom panelu: `#F4F1EC`, prigušen `rgba(244,241,236,0.72)`, najprigušeniji `rgba(244,241,236,0.45)`
- Placeholder u formi: `#B4ABA4`

### Radius i senke

**Svi radijusi su 0.** `--radius-sm/md/lg/xl` se ne koriste — kvadratne ivice su nosilac karaktera ovog pravca. Isto važi za senke: `--shadow-*` se ne koriste unutar strane; jedina senka je oko celog ekrana u prototipu, što je artefakt prezentacije.

Razdvajanje se postiže **linijama** (`1px solid #E4DCD5`), **površinama** (`#F3EDE8`, `#17201F`) i **gornjom akcentnom linijom** (`2px solid #00b4a5`) — ne senkama i ne rounded karticama.

### Tipografija

Dva Google fonta zamenjuju Titillium Web. U `src/app/layout.tsx`:

```ts
import { Newsreader, Archivo } from "next/font/google";

const newsreader = Newsreader({
    subsets: ["latin", "latin-ext"],
    weight: ["300", "400", "500"],
    style: ["normal", "italic"],
    variable: "--font-display",
    display: "swap",
});

const archivo = Archivo({
    subsets: ["latin", "latin-ext"],
    weight: ["400", "500", "600"],
    variable: "--font-ui",
    display: "swap",
});
```

U `globals.css`: `--font-family: var(--font-ui), "Archivo", sans-serif;` i novo `--font-display: var(--font-display), "Newsreader", serif;`

| Uloga | Font | Veličina / težina | Ostalo |
| --- | --- | --- | --- |
| H1 strane | Newsreader | 60px / 300 | line-height 1.04, letter-spacing −0.02em |
| H1 hero (Početna) | Newsreader | 74px / 300 | line-height 1.02, letter-spacing −0.02em |
| H2 sekcije | Newsreader | 40–44px / 300 | line-height 1.1 |
| H2 unutar teksta | Newsreader | 34px / 400 | line-height 1.2 |
| H3 kartice / stavke | Newsreader | 24–34px / 400 | line-height 1.25–1.3 |
| H4 | Archivo | 12px / 600 | uppercase, letter-spacing 0.14em |
| Pull quote / lead | Newsreader | 23–26px / 300 | italic za citate, line-height 1.45–1.6 |
| Osnovni tekst | Archivo | 16–17px / 400 | line-height 1.7–1.8, `text-wrap: pretty` |
| Sitan tekst | Archivo | 14–15px / 400 | line-height 1.65–1.7 |
| Oznake i eyebrow | Archivo | 11px / 600 | uppercase, letter-spacing 0.12–0.16em |
| Dugmad | Archivo | 12–13px / 600 | uppercase, letter-spacing 0.08em |
| Navigacija | Archivo | 12px / 500 | uppercase, letter-spacing 0.09em |
| Monospace napomene | `ui-monospace, monospace` | 11px | samo u prototipu, ne ide u produkciju |

Mera teksta u dugim tekstovima: **760px** (blog članak), 720px (strana tretmana), 640px (uvodni pasus strane).

### Razmaci

Sekcije: `72–96px` vertikalno, `40px` horizontalno unutar 1280px kontejnera. `--container-max-width` ostaje `1920px`, ali sadržaj strane se drži na 1280px raster mreži prikazanoj u prototipu. Header: 22px vertikalno. Utility traka: 40px visine.

## Screens / Views

Redizajn je isporučen kroz tri fajla. Svaki ekran je širine 1280px.

### Zajedničke komponente

**Utility traka** (nova, iznad Header-a, na svakoj strani)
`src/components/Header` ili nova `UtilityBar` komponenta.
Visina 40px, `background #00b4a5`, tekst `rgba(255,255,255,0.92)` 11px uppercase letter-spacing 0.1em, padding `0 40px`, `display:flex; justify-content:space-between`. Levo adresa, desno radno vreme i telefon (gap 28px). Podaci iz `settings.footer.address / workingHours / phone`.

**Header** — `src/components/Header/Header.tsx` + `.module.css`
`display:flex; justify-content:space-between; align-items:center`, padding `22px 40px`, `border-bottom: 1px solid #E4DCD5`, bez senke i bez `position: sticky` u prototipu (sticky može ostati). Logo visine 30px. Nav: gap 26px, 12px/500 uppercase letter-spacing 0.09em, boja `#3C3733`; aktivna stavka `#00776C` sa `border-bottom: 1px solid #00776C; padding-bottom: 2px`. CTA dugme desno: `padding 13px 22px; background #00b4a5; color #fff; 12px/600 uppercase letter-spacing 0.08em`, tekst „Zakaži konsultaciju".

Mobilna grana **ostaje kako je** — `useMediaQuery(1024)`, hamburger 44×44, off-canvas panel max-width 320px, `translateX(100%)`, overlay `rgba(0,0,0,0.3)`. Samo prestilizovati na nove tokene.

**Footer** — `src/components/Footer/Footer.tsx` + `.module.css`
`background #17201F`, tekst `rgba(244,241,236,0.72)`, padding `64px 40px 28px`. Grid `1.4fr 1fr 1fr 1fr`, gap 48px, `padding-bottom 44px`, `border-bottom: 1px solid rgba(244,241,236,0.14)`. Logo 28px sa `filter: brightness(0) invert(1)`. Naslovi kolona 11px/600 uppercase letter-spacing 0.14em u `#fff`. Linkovi 15px, gap 11px. Donji red: 12px `rgba(244,241,236,0.45)`, copyright levo, social linkovi desno (gap 22px).

**Četvrta kolona** je nova — footer sada ima Tretmani / Centar / Kontakt umesto Brzi linkovi / Kontakt.

**ContactCTA** — `src/components/ContactCTA/ContactCTA.tsx` + `.module.css`
Prop shape (`title`, `text`, `buttonLabel`, `buttonHref`) i `showDefault` ponašanje **ostaju nepromenjeni**. Novi izgled: `padding 64px 40px; background #17201F; color #F4F1EC; display:flex; align-items:center; justify-content:space-between; gap 48px`. Naslov Newsreader 38px/300, tekst 16px `rgba(244,241,236,0.72)` max-width 520px, dugme `padding 20px 34px; background #00b4a5` 13px/600 uppercase.

---

### 1. Početna — `Redizajn 1a - Klinika.dc.html` (prvi ekran)

**Namena:** objasniti metodu i odvesti na zakazivanje.

**Hero** (`src/components/Hero`) — grid `1fr 1fr`, bez slidera na desnoj strani slika.
Levo: padding `88px 56px 88px 40px`, vertikalno centrirano. Eyebrow 11px/600 uppercase letter-spacing 0.16em u `#00776C` („Magazin AS IF · šest najboljih metoda u svetu"). H1 Newsreader 74px/300, dve linije, druga u italiku („Aktiviraj, / ne plastificiraj."). Podnaslov 17px/1.65 `#5A544F` max-width 430px. Dva dugmeta, gap 12px: primarno `padding 16px 28px; background #00b4a5; color #fff`, sekundarno `border: 1px solid #C9BEB4; color #17201F`. Ispod, posle `border-top: 1px solid #E4DCD5` (margin-top 56px, padding-top 26px), tri statistike u Newsreader 36px/300 sa oznakom 11px uppercase `#8A827C`: **1990.** Razvijena metoda / **4** Centra u regionu / **100%** Vlakana mišića.
Desno: `min-height 640px; background #17201F`, slika `object-fit: cover` preko cele površine.

**Metoda** — grid `340px 1fr`, gap 80px, padding `96px 40px`, `border-top: 1px solid #E4DCD5`.
Levo eyebrow „01 — Metoda" + H2 Newsreader 44px/300. Desno pasus Newsreader 23px/300 `#2A2622` line-height 1.55, pa red čipova (flex-wrap, gap 8px): `padding 9px 15px; border: 1px solid #D6CCC3; font-size 12px; letter-spacing 0.05em; color #4A443F` — trening, lifting, pomlađivanje, oblikovanje, stimulacija akupunkturnih točaka, drenaža, jačanje koštane mase.

**Tretmani** (`src/components/CardSection` → editorial redovi, Swiper se skida)
Zaglavlje: H2 „Tretmani" 44px/300 levo, oznaka „02 — Četiri vrste, sa podvrstama" desno, `padding-bottom 22px; border-bottom: 1px solid #17201F`.
Četiri `<article>` naizmenično `1fr 480px` / `480px 1fr`, gap 64px, `padding 44px 0`, razdvojeni `1px solid #E4DCD5`, `align-items: center`. Slika `height 300px; object-fit: cover`. Broj Newsreader 22px `#00776C`, naslov Newsreader 34px/400, tekst 16px/1.7 `#5A544F` max-width 560px, pa red linkova podvrsta: `padding 9px 14px; font-size 13px`, aktivna `border: 1px solid #00b4a5; color #00776C`, ostale `border: 1px solid #D6CCC3; color #4A443F`.

Redosled i grupisanje po `treatment.category`:
1. **TEENLIFTING Lica** (`face`) — podvrste: Tretmani lica, Tretmani lica 3, Tretmani lica 4, Teenlifting platizme
2. **BellStim Tijela** (`body`) — Tretmani tela, BellStim tela 2, BellStim tela 3
3. **BellStim Zdjelice** (`pelvic`) — Tretmani za karlicno dno
4. **TEENLIFTING Platizme** — oznaka „Uz lice" pored naslova, jer je platizma podvrsta lica (`category: face`)

**Pre i posle** (nova sekcija, nema CMS polje)
`padding 96px 40px; background #F3EDE8`. Tri kartice u grid `repeat(3,1fr)` gap 20px, `aspect-ratio 4/5`, sa vertikalnom linijom `1px` u `#FBF7F4` na 50% širine (podela pre/posle). Naziv regije Newsreader 20px u donjem levom uglu.

**Ambasadori** (`src/components/TestimonialsSection` → veliki citat, Swiper se skida)
Grid `520px 1fr`, `background #17201F; color #F4F1EC`. Levo fotografija `min-height 420px; object-fit: cover`. Desno padding `80px 56px`: eyebrow „Ambasadori", citat Newsreader 38px/300 italic line-height 1.28, ime 12px/600 uppercase letter-spacing 0.1em sa ulogom u `rgba(244,241,236,0.55)`. Ispod `border-top: 1px solid rgba(244,241,236,0.18)`: tri avatara 52×52 `border-radius 50%` i tekst „Josipa Lisac, Tarik Filipović, Almira Osmanović i još 25 imena".

**Novosti** (`src/components/BlogSection`) — grid `repeat(3,1fr)` gap 28px, Swiper se skida.
Slika `height 230px`, datum 11px uppercase letter-spacing 0.1em `#8A827C`, naslov Newsreader 24px/400, excerpt 15px/1.65 `#6E6763`.

**CTA + Footer** — `padding 80px 40px; background #F3EDE8`, H2 „Prvi tretman je najvažniji." 40px/300.

---

### 2. Strana tretmana — `Redizajn 1a - Klinika.dc.html` (drugi ekran)

**Namena:** protokol jednog tretmana i zakazivanje. Isti šablon opslužuje sve podvrste (`/tretmani/[slug]`).

**Zaglavlje** — `padding 56px 40px 44px; border-bottom: 1px solid #E4DCD5`.
Breadcrumb 11px uppercase letter-spacing 0.12em `#8A827C`: „Tretmani → Lice → Tretmani lica". H1 Newsreader 60px/300 max-width 900px.
**Meta red** (novo): flex gap 44px, četiri stavke — oznaka 11px uppercase `#8A827C` + vrednost 13px/500. Trajanje 60 min / Prvi rezultat Posle 1. tretmana / Za koga Žene i muškarci / Invazivnost Bez igle i noža.
**Prekidač podvrsta** (novo): `margin-top 32px; padding-top 22px; border-top: 1px solid #E4DCD5`, flex gap 8px. Oznaka „Podvrste" pa dugmad `padding 11px 16px`, aktivna `background #00b4a5; color #fff`, ostale `border: 1px solid #D6CCC3`.

**Telo** — grid `240px 1fr`, gap 64px, padding `56px 40px 96px`.
Sticky aside (`top 24px`): oznaka „Na ovoj strani", pa linkovi `padding 9px 0; border-bottom: 1px solid #E4DCD5` 13px, aktivni `#00776C` težine 500. Na dnu dugme „Zakaži" `padding 15px 20px; background #00b4a5` centrirano.
Sadržaj: uvodni pasus Newsreader 24px/300 max-width 720px. Tri dijagrama u grid `repeat(3,1fr)` gap 16px, `aspect-ratio 1`, caption 12px letter-spacing 0.06em. H2 „Šta tretman radi" pa dvokolonska lista `1fr 1fr` gap `0 48px`, stavke `padding 11px 0; border-bottom: 1px solid #E4DCD5` 15px/1.5. Pull quote: `padding 36px 40px; background #17201F; color #F4F1EC; border-left: 3px solid #00b4a5`, Newsreader 26px/300 italic. „Rezultati po treningu": tri stavke grid `60px 1fr` gap 24px, `padding 22px 0`, razdvojene `1px solid #E4DCD5`, broj Newsreader 26px `#00776C`. Tabela cena: header red `border-bottom: 1px solid #17201F` sa 11px uppercase `#8A827C`, redovi `padding 15px 0; border-bottom: 1px solid #E4DCD5`, cena `font-weight 500` desno. FAQ: prva stavka otvorena sa „−", ostale zatvorene sa „+", naslov 17px/600, odgovor 15px/1.7 `#6E6763` max-width 660px. Kontraindikacije: `padding 22px 26px; border: 1px solid #C9BEB4; background #F3EDE8` — puni se iz `treatment.disclaimer.text`, prikaz uslovljen `disclaimer.show`.

---

### 3. O nama — `Redizajn 1a - Sve strane.dc.html`

Zaglavlje grid `1fr 520px` gap 64px padding `64px 40px`: H1 Newsreader 64px/300 u dve linije, uvod 17px/1.7 max-width 520px, slika `height 340px`.
Telo grid `240px 1fr` gap 64px padding `72px 40px` sa sticky sadržajem (isti stil kao strana tretmana).
Sekcije: **TEENLIFTING tim** (grid `280px 1fr` gap 40px — portret sa `aspect-ratio 370/408` i caption, pa dva pasusa 16px/1.8); **pull quote** na tamnom panelu; **Rezultati metode** (grid `repeat(3,1fr)` gap 20px, kartice `padding 26px; background #F3EDE8; border-top: 2px solid #00b4a5`, naslov 11px/600 uppercase `#00776C`); **Misija i vizija** (grid `1fr 1fr` gap 28px, `padding 32px; border: 1px solid #DDD4CC`, tekst Newsreader 21px/300); **Franšiza** (`padding 28px 32px; background #F3EDE8`, flex space-between, četiri grada Newsreader 20px, Beograd u `#00776C`).
**Ambasadori** — `padding 72px 40px; background #F3EDE8`, grid `repeat(4,1fr)` gap 20px, kartice `background #FBF7F4`, slika `height 200px`, citat Newsreader 18px/300 italic u margini 24px, ime 11px/600 uppercase `#00776C`.

### 4. Cenovnik — `Redizajn 1a - Sve strane.dc.html`

Zaglavlje `padding 56px 40px 40px; border-bottom: 1px solid #E4DCD5`, H1 60px/300, uvod max-width 640px.
Telo grid `1fr 380px` gap 64px padding `56px 40px 80px`.
Tri grupe tabela: naslov grupe `padding-bottom 16px; border-bottom: 1px solid #17201F` sa brojem Newsreader 20px `#00776C` i naslovom Newsreader 30px/400; redovi `padding 16px 0; border-bottom: 1px solid #E4DCD5`, tri kolone — naziv levo, trajanje desno 13px `#8A827C`, cena desno `font-weight 600` širine 130px. Grupe razdvojene `margin-top 56px`.
Sticky aside: dve figure `height 230px` sa caption 12px, pa kartica „Način plaćanja" `padding 24px; background #F3EDE8; border-top: 2px solid #00b4a5`.
Na dnu ContactCTA („Zainteresovani ste?").

### 5. Promo ponuda — `Redizajn 1a - Sve strane.dc.html`

Hero `height 420px`, slika `object-fit: cover; opacity 0.9`, overlay `linear-gradient(to right, rgba(23,32,31,0.78) 0%, rgba(23,32,31,0.25) 100%)`. Sadržaj levo poravnat, max-width 760px: badge `padding 7px 12px; background #00b4a5` 11px/600 uppercase letter-spacing 0.14em, H1 Newsreader 60px/300, tekst 17px/1.7.
Telo grid `1fr 420px` gap 64px padding `72px 40px 80px`. Levo „Šta ponuda uključuje" — tri numerisana koraka grid `60px 1fr` gap 24px, `padding 22px 0`, razdvojena `1px solid #E4DCD5`, broj Newsreader 24px `#00776C`.
Desno cena aside `border: 1px solid #17201F; padding 34px`: oznaka 11px uppercase, cena Newsreader 52px/300 sa valutom i precrtanom starom cenom 15px `#8A827C`, dva dugmeta (primarno `background #00b4a5`, sekundarno `border: 1px solid #C9BEB4`), pa uslovi 13px/1.7 `#8A827C` posle `border-top`.
Na dnu ContactCTA.

### 6. Blog lista — `Redizajn 1a - Sve strane.dc.html`

Zaglavlje isto kao Cenovnik, H1 „Novosti".
**Istaknut prvi post**: grid `620px 1fr` gap 48px, `padding 56px 40px`, `border-bottom: 1px solid #E4DCD5`, `align-items: center`. Slika `height 340px`. Badge „Najnovije" `padding 5px 10px; background #00b4a5; color #fff` 11px/600 uz datum. Naslov Newsreader 42px/300, excerpt 16px/1.75 max-width 520px, link „Pročitaj više →" 12px/600 uppercase `#00776C` sa `border-bottom`.
**Ostali**: grid `repeat(3,1fr)` gap 28px, padding `56px 40px 80px`. Slika `height 240px`, datum 11px uppercase, naslov Newsreader 25px/400, excerpt 15px/1.7.

### 7. Blog članak — `Redizajn 1a - Sve strane.dc.html`

Hero `height 520px`, overlay `linear-gradient(to bottom, rgba(23,32,31,0.15), rgba(23,32,31,0.8))`. Sadržaj dole levo, max-width 860px: datum 11px/600 uppercase letter-spacing 0.14em, H1 Newsreader 62px/300, excerpt 19px/1.7.
Telo grid `200px 760px` gap 64px, `justify-content: center`, padding `72px 40px 80px`. Sticky „Sadržaj" levo + „Podeli" linkovi. Mera teksta 760px.
**Ova strana je specimen svih PortableText blok stilova** — vidi sekciju PortableText ispod.
Na dnu „Povezane novosti": `padding 64px 40px; background #F3EDE8`, grid `repeat(3,1fr)` gap 24px, slika `height 180px`, naslov Newsreader 21px/400.

### 8. Kontakt — `Redizajn 1a - Sve strane.dc.html`

Zaglavlje isto kao Cenovnik, H1 „Kontaktirajte nas".
Telo grid `1fr 1fr` gap 64px padding `56px 40px 72px`.
**Info kolona**: četiri stavke grid `44px 1fr` gap 18px, `padding 22px 0`, razdvojene `1px solid #E4DCD5`. Ikonica u kvadratu 44×44 `border: 1px solid #00b4a5; color #00776C` (postojeće `react-icons/hi` ikonice: `HiOutlineLocationMarker`, `HiOutlinePhone`, `HiOutlineMail`, `HiOutlineClock`). Oznaka 11px/600 uppercase letter-spacing 0.12em, vrednost 17px, linkovi `#00776C`. Socials: kvadrati 46×46 `border: 1px solid #C9BEB4`.
**Forma**: `background #F3EDE8; padding 40px; border-top: 2px solid #00b4a5`. Naslov Newsreader 32px/300. Polja: label 11px/600 uppercase `#8A827C` sa obaveznim `*` u `#00776C`, input `padding 15px 16px; background #FBF7F4; border: 1px solid #DDD4CC; font-size 16px`, placeholder `#B4ABA4`. Greška: `border: 1px solid #00776C` + tekst 13px `#00776C`. Submit `padding 18px; background #00b4a5; color #fff` 12px/600 uppercase letter-spacing 0.1em sa `HiPaperAirplane` ikonicom.
**Mapa**: naslov Newsreader 32px/300, iframe `height 420px`, iz `contactPage.googleMapsEmbed`.

## Interactions & Behavior

Ponašanje se **ne menja** — menja se samo izgled. Sve što već radi ostaje:

- **Header dropdown**: hover otvara, `onMouseLeave` zatvara, chevron rotira 180°, tranzicija `0.15s ease` na `opacity`/`visibility`/`transform`.
- **Mobilni meni**: `useMediaQuery(1024)`, `translateX(100%)` → `translateX(0)` u `0.3s ease`, `document.body.style.overflow = "hidden"` dok je otvoren.
- **Hero Swiper** (samo Početna): autoplay 5000ms, `disableOnInteraction: false`, loop kad ima više od jednog slajda. Bullet: 12px krug, aktivni `background #00b4a5; transform: scale(1.2)`.
- **ContactForm**: `react-hook-form` + `zodResolver`, spinner na `isSubmitting`, `emailjs.send`, `react-toastify` toast, pa `successContainer` stanje sa `HiCheck` i dugmetom „Pošaljite još jednu poruku".
- **Hover na linkovima i karticama**: umesto senke i `scale`, koristiti promenu boje na `#00776C` i pomeranje `border-bottom`. Slike u karticama mogu zadržati `transform: scale(1.03)` u `0.3s ease`.
- **Tranzicije**: `--transition-fast 0.15s ease` za boje, `--transition-slow 0.3s ease` za pomeranje. Ostaju kako su.

**FAQ akordeon** je nov: prva stavka otvorena, ostale zatvorene, `+` / `−` desno, `max-height` tranzicija `0.3s ease`. Bez biblioteke — `useState` sa indeksom otvorene stavke, ili native `<details>`.

**Sticky in-page navigacija** je nova: `position: sticky; top: 24px; align-self: start`. Aktivna stavka se određuje `IntersectionObserver`-om nad naslovima.

**Responsive**: pratiti postojeće breakpointe iz CSS modula — 1024px, 768px, 480px. Dvokolonski rasteri (hero, telo strana, forma) prelaze u jednu kolonu na 1024px; sticky aside postaje statičan blok iznad sadržaja. Grid `repeat(3,1fr)` → `repeat(2,1fr)` na 1024px → `1fr` na 480px. Padding `40px` → `16px` na 768px. H1 60–74px → 40px na 768px, 32px na 480px. **Nijedan tekst ne ide ispod 14px**, a hit targeti ostaju najmanje 44px.

## State Management

Nema novog globalnog state-a. Lokalni state po komponenti:

| Komponenta | State | Trigger |
| --- | --- | --- |
| `Header` | `mobileMenuOpen`, `openDropdown` | postojeće, nepromenjeno |
| `Hero` | Swiper interni | postojeće, samo na Početnoj |
| `ContactForm` | `isSubmitting`, `isSuccess` + RHF `formState` | postojeće, nepromenjeno |
| FAQ akordeon (novo) | `openIndex: number \| null` | klik na stavku |
| Sticky TOC (novo) | `activeId: string` | `IntersectionObserver` nad h2/h3 |
| Prekidač podvrsta | nema — obični `<Link>`ovi | navigacija |

Data fetching ostaje `force-dynamic` server komponente sa `sanity-utils` upitima. Jedini novi upit je za „Povezane novosti" (poslednja tri posta osim tekućeg).

## Šta zahteva promenu koda, a ne samo stila

1. **Hero prestaje da bude slider na svim stranama osim Početne.** Sada je `Hero.tsx` Swiper visine 650px sa bullet-ima, i `o-nama/page.tsx` i `cenovnik/page.tsx` ga renderuju bez uslova, a promo/blog/kontakt uslovno. U redizajnu: O nama ima statični split band, Cenovnik / Blog lista / Kontakt tekstualni header band, Promo jednu full-bleed sliku bez bullet-a. **Odluka koja se traži:** šta sa `hero.slides[1..n]` koji su već upisani u Sanity. Predlog — na stranama osim Početne koristiti samo `slides[0]`.
2. **Sticky in-page navigacija** na O nama i Blog članku traži izvlačenje h2/h3 naslova iz PortableText-a i generisanje anchor id-jeva. Toga sada nema. Isti helper koristi i strana tretmana.
3. **Blog lista** traži `posts[0]` u velikom formatu sa badge-om „Najnovije" i ostatak u tri kolone. Sada `blog/page.tsx` mapira sve postove kroz isti `BlogCard`. Druga varijanta kartice, ne novo polje u šemi.
4. **Swiper se skida** sa `CardSection`, `BlogSection` i `TestimonialsSection`. Zavisnost `swiper` ostaje samo zbog Hero-a na Početnoj.
5. **Bug u postojećem kodu, popraviti u prolazu:** footer linkovi na `/tretmani/[slug]` su relativni (`item.href` bez vodeće kose crte) pa se rešavaju u `/tretmani/o-nama`. `Footer.tsx` treba da koristi isti `normalizeHref` helper koji već postoji u `Header.tsx` i `ContactCTA.tsx`.

## Nova Sanity polja

Sve postojeće šeme i polja **ostaju**. Dodaje se sledeće — svaka tvrdnja je proverena čitanjem šeme:

`contentSection.content` (`src/sanity/schemas/objects/section.ts`) trenutno nudi: `block` (normal, h2, h3, h4, blockquote; bullet i number liste; strong/em/underline/link), `image` (alt, caption, layout `full`/`half`/`third`), `ctaButton` (primary/secondary/outline), `dataTable` (title + rows[].cells + isHeader), `imageGallery` (images + columns 2–4). Strukturisani blokovi koje redizajn traži nisu među njima, pa se dodaju kao novi tipovi u isti array:

| Novo polje | Gde | Oblik |
| --- | --- | --- |
| `cardGrid` | `section.ts` | `{ cards: [{ title, text }] }` — O nama „Rezultati metode" |
| `twoColumnBlocks` | `section.ts` | `{ blocks: [{ label, text }] }` (2 stavke) — O nama Misija / Vizija |
| `statRow` | `section.ts` | `{ label, values: [string] }` — O nama Franšiza |
| `pricePage.aside` | `pages/price.ts` | `{ images: [{ asset, alt, caption }], notes: [{ label, text }] }` — Cenovnik sticky stubac |
| `promotion.offer` | `pages/promotion.ts` | `{ price, oldPrice, currency, note, buttonLabel, buttonHref, terms }` — Promo cena |
| `treatmentPage.meta` | `documents/treatment.ts` | `{ duration, firstResult, priceFrom, invasiveness }` — meta red strane tretmana |
| `post.relatedPosts` | `documents/blog.ts` | `[reference → post]`, opciono — alternativa je „poslednja tri" upit |

Provereno stanje šema: `about.ts` = hero + sections[] + testimonialsSection. `price.ts` i `promotion.ts` = hero + sections[] + contactCta. `treatment.ts` = title, slug, category, hero, sections[], disclaimer{text, show}, contactCta — **nema polja za cenu i trajanje**. `blog.ts` = title, slug, excerpt, mainImage, gallery[], content[], publishedAt, seo — **nema related posts**.

**Već u šemi i iskorišćeno u dizajnu:** `treatment.disclaimer` puni Kontraindikacije okvir, a `treatment.category` ima tačno tri vrednosti — `face`, `body`, `pelvic`. Platizma je podvrsta lica, pa se četiri reda na Početnoj grupišu pod te tri kategorije.

**Pre/posle galerija i FAQ** su nove sekcije bez CMS pandana. Ako treba da budu uređive, dodati `beforeAfterGallery` (`{ pairs: [{ before, after, label, caption }] }`) i `faqSection` (`{ items: [{ question, answer }] }`) u `section.ts`.

## PortableText — dva različita modela

Ovo je lako propustiti: **blog post i strane nisu isti sadržajni model.**

- `post.content` (`blog.ts`) dozvoljava samo `{ type: "block" }` sa **default** stilovima i `image` (alt, caption — **bez** `layout` polja).
- `contentSection.content` (`section.ts`) dodaje custom listu stilova, image `layout`, `ctaButton`, `dataTable` i `imageGallery`.

Znači: `ctaButton`, `dataTable`, `imageGallery` i image layout **ne postoje na blogu** dok se `post.content` ne izjednači sa `contentSection.content`. Blog članak u prototipu prikazuje sve blokove i eksplicitno označava koji su page-only — to je specimen stilova, ne tvrdnja da su svi dostupni na blogu.

Stilovi za `PortableTextContent.module.css`:

| Blok | Stil |
| --- | --- |
| `normal` | Archivo 17px/1.8 `#3F3A36`, `text-wrap: pretty` |
| `h2` | Newsreader 34px/400, line-height 1.2, `margin-top 48px` |
| `h3` | Newsreader 24px/500, line-height 1.3, `margin-top 36px` |
| `h4` | Archivo 12px/600 uppercase letter-spacing 0.14em `#8A827C`, `margin-top 32px` |
| `blockquote` | `padding 30px 34px; background #17201F; color #F4F1EC; border-left: 3px solid #00b4a5`, Newsreader 24px/300 italic |
| `strong` | težina 600, boja `#17201F` |
| `em` | Newsreader italic, 18px (jedan stepen veće zbog x-visine) |
| `underline` | `text-decoration: underline; text-underline-offset: 3px` |
| `link` | `#00776C` + `border-bottom: 1px solid rgba(0,119,108,0.4)` |
| `bulletList` | bez `list-style`; stavka grid `22px 1fr` gap 10px, marker `—` u `#00b4a5` |
| `numberList` | bez `list-style`; stavka grid `30px 1fr` gap 10px, broj Newsreader u `#00776C` |
| `listItem` | 17px/1.7, gap između stavki 10px |
| `figure` / `caption` | slika puna širina mere, caption 13px letter-spacing 0.04em `#8A827C`, `margin-top 12px` |
| `imageHalf` / `imageThird` | grid `1fr 1fr` gap 20px / `repeat(3,1fr)` gap 16px |
| `table` | header red `border-bottom: 1px solid #17201F` sa 11px/600 uppercase `#8A827C`; `dataCell` `padding 14px 0; border-bottom: 1px solid #E4DCD5` |
| `tableTitle` | isti stil kao `h4` |
| `gallery` | grid `repeat(var(--gallery-columns), 1fr)` gap 14px, bez caption-a |
| `ctaPrimary` | `padding 16px 26px; background #00b4a5; color #fff` 12px/600 uppercase |
| `ctaSecondary` | `background #17201F; color #F4F1EC` |
| `ctaOutline` | `border: 1px solid #17201F; color #17201F`, bez pozadine |

## Assets

Fotografije u `assets/` je dostavila klijentkinja iz postojećeg sajta. U produkciji **sve slike idu iz Sanity-ja** kao i sada (`cdn.sanity.io` preko `next/image`) — fajlovi u paketu su tu samo da prototip radi offline.

| Fajl | Šta je | Sanity izvor |
| --- | --- | --- |
| `hero-lica.jpg`, `hero-misici.jpg` | hero fotografije | `hero.slides[].image` |
| `tretman-lica.jpg`, `tretman-telo.jpg`, `tretman-zdjelice.jpg`, `tretman-platizme.png` | četiri tretmana | `homePage.cardsSection.cards[].image` |
| `amb-nina.jpg`, `amb-tarik.jpg`, `amb-josipa.jpg`, `amb-almira.jpg` | ambasadori | `testimonial.image` |
| `blog-1.jpg`, `blog-2.jpg`, `blog-3.jpg`, `blog-gnezdo.jpg` | blog naslovne | `post.mainImage` |
| `logo.png` | **placeholder** tekstualni wordmark | pravi logo je u `siteSettings.logo` |
| `misic-1.png`, `misic-2.png`, `misic-3.png` | **placeholderi** za dijagrame mišića | postoje na sajtu, nisu dostavljeni |
| `portret-sanja.png` | **placeholder** za portret dr. Sanje | postoji na sajtu, nije dostavljen |

Ikonice: nastaviti sa `react-icons` — `HiOutlineLocationMarker`, `HiOutlinePhone`, `HiOutlineMail`, `HiOutlineClock`, `HiChevronDown`, `HiOutlineMenuAlt3`, `HiX`, `HiStar`, `HiPaperAirplane`, `HiCheck`, `FaInstagram`, `FaFacebookF`, `FaYoutube`, `FaTiktok`. **Ne crtati nove ikonice** — kvadratići i strelice u prototipu (`◉ ☎ ✉ ◷ → ▾ ➤`) su zamena za postojeće `react-icons` glifove jer prototip ne može da ih uveze.

Fontovi: Newsreader i Archivo preko `next/font/google`, ne preko CDN linka.

## Files

| Fajl | Sadržaj |
| --- | --- |
| `Redizajn 1a - Klinika.dc.html` | Početna + strana tretmana |
| `Redizajn 1a - Sve strane.dc.html` | O nama, Cenovnik, Promo, Blog lista, Blog članak, Kontakt + konsolidovan spisak promena koda |
| `github.md` | mapa ekran → fajlovi u repozitoriju, tabela tokena, sync zapis |
| `assets/` | fotografije i placeholderi koje prototipovi koriste |
| `support.js` | runtime koji prototipovi zahtevaju da bi se prikazali; nije deo dizajna |
| `export/Redizajn-1a-Klinika.html` | Početna + strana tretmana u jednom fajlu sa ugrađenim slikama, za pregled bez internet konekcije |

Zajedno pokrivaju svih osam ekrana. HTML fajlovi se otvaraju direktno u browseru.

## Predlog redosleda implementacije

1. Tokeni i fontovi — `globals.css` + `layout.tsx`. Ceo sajt odmah dobija novi ton.
2. `Header` (+ nova utility traka) i `Footer` — vidljivo na svakoj strani.
3. `ContactCTA`, `PortableTextContent` — dele ih skoro sve strane.
4. Početna: `Hero`, `CardSection`, `BlogSection`, `TestimonialsSection`.
5. Strana tretmana — najveća promena strukture, uz `treatmentPage.meta` i prekidač podvrsta.
6. Cenovnik, O nama, Promo — uz nove `section.ts` tipove.
7. Blog lista i članak — uz featured varijantu kartice i sticky TOC.
8. Kontakt — `ContactForm` prestilizovan, polja nepromenjena.
9. Nove sekcije: pre/posle galerija i FAQ.
10. Popraviti relativne footer linkove.
