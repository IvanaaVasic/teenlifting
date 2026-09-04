import { createClient, groq } from "next-sanity";
import config from "./config/client-config";
import type { PortableTextBlock } from "next-sanity";

const client = createClient(config);

// ============================================
// FRAGMENTS (Reusable query parts)
// ============================================

const imageFragment = /* groq */ `
    asset->{
        _id,
        url,
        metadata { lqip, dimensions }
    }
`;

const ctaFragment = /* groq */ `
    cta {
        label,
        href
    }
`;

const heroFragment = /* groq */ `
    hero {
        slides[] {
            _key,
            image { ${imageFragment} },
            eyebrow,
            title,
            titleItalic,
            subtitle,
            cta { label, href },
            secondaryCta { label, href },
            stats[] { _key, value, label },
            overlay
        }
    }
`;

const contentSectionFragment = /* groq */ `
    sections[] {
        _key,
        title,
        content[] {
            ...,
            _type == "image" => {
                _type,
                _key,
                alt,
                caption,
                layout,
                asset-> {
                    _id,
                    url,
                    metadata { lqip, dimensions }
                }
            },
            _type == "imageGallery" => {
                _type,
                _key,
                columns,
                images[] {
                    _key,
                    alt,
                    asset-> {
                        _id,
                        url,
                        metadata { lqip, dimensions }
                    }
                }
            }
        }
    }
`;

// ============================================
// TYPES
// ============================================

export type Image = {
    _key?: string;
    asset: {
        _id: string;
        url: string;
        metadata?: {
            lqip?: string;
            dimensions?: { width: number; height: number };
        };
    };
};

export type CTA = {
    label: string;
    href: string;
};

export type HeroStat = {
    _key: string;
    value?: string;
    label?: string;
};

export type HeroSlide = {
    _key: string;
    image: Image;
    eyebrow?: string;
    title: string;
    titleItalic?: string;
    subtitle: string;
    cta: CTA;
    secondaryCta?: CTA;
    stats?: HeroStat[];
    overlay: boolean;
};

export type Hero = {
    slides: HeroSlide[];
};

export type ContentSection = {
    _key: string;
    title?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any[];
};

export type Card = {
    _key: string;
    title: string;
    text: string;
    image: Image;
    link: string;
};

export type Testimonial = {
    _id: string;
    name: string;
    role?: string;
    text: string;
    image?: Image;
};

export type TestimonialsSection = {
    title?: string;
    intro?: string;
    testimonials: Testimonial[];
};

export type NavItem = {
    _key: string;
    label: string;
    href: string;
    children?: { _key: string; label: string; href: string }[];
};

export type SanityColor = {
    hex: string;
    alpha?: number;
    hsl?: { h: number; s: number; l: number; a: number };
    hsv?: { h: number; s: number; v: number; a: number };
    rgb?: { r: number; g: number; b: number; a: number };
};

export type Announcement = {
    enabled: boolean;
    text: PortableTextBlock[];
    mobileText?: PortableTextBlock[];
    animated: boolean;
    animationSpeed: number;
    backgroundColor?: SanityColor;
    textColor?: SanityColor;
};

export type SiteSEO = {
    metaTitle: string;
    metaDescription: string;
    ogImage?: Image;
    keywords?: string[];
    siteUrl?: string;
    googleVerification?: string;
};

export type SiteSettings = {
    siteTitle: string;
    logo: Image;
    seo?: SiteSEO;
    announcement: Announcement;
    headerCta?: CTA;
    mainNav: NavItem[];
    footer: {
        about?: string;
        address: string;
        phone: string;
        email: string;
        workingHours?: { _key: string; days: string; hours: string }[];
    };
    socials: { _key: string; label: string; url: string }[];
};

export type MethodSection = {
    eyebrow?: string;
    title?: string;
    text?: string;
    chips?: string[];
};

export type BeforeAfterPair = {
    _key: string;
    label?: string;
    caption?: string;
    before?: Image;
    after?: Image;
};

export type BeforeAfterSection = {
    title?: string;
    eyebrow?: string;
    note?: string;
    pairs?: BeforeAfterPair[];
};

export type HomePage = {
    hero: Hero;
    promo: {
        text: string;
        link: string;
        active: boolean;
    };
    methodSection?: MethodSection;
    beforeAfterSection?: BeforeAfterSection;
    postsSection?: { title?: string };
    contactCta?: ContactCTAType;
    cardsSection: {
        title: string;
        intro: string;
        cards: Card[];
    };
    featuredPosts: BlogPost[];
    testimonialsSection?: TestimonialsSection;
};

export type AboutPage = {
    hero: Hero;
    sections: ContentSection[];
    testimonialsSection?: TestimonialsSection;
};

export type ContactPage = {
    hero?: Hero;
    eyebrow?: string;
    title?: string;
    intro?: string;
    infoTitle?: string;
    socialsTitle?: string;
    formTitle?: string;
    formDescription?: string;
    recipientEmail?: string;
    successMessage?: string;
    googleMapsEmbed?: string;
    mapTitle?: string;
};

export type ContactCTAType = {
    title?: string;
    text?: string;
    buttonLabel?: string;
    buttonHref?: string;
};

export type PriceAsideImage = Image & {
    alt?: string;
    caption?: string;
};

export type PriceAsideNote = {
    _key: string;
    label?: string;
    text?: string;
};

export type PriceAside = {
    images?: PriceAsideImage[];
    notes?: PriceAsideNote[];
};

export type PricePage = {
    hero: Hero;
    sections: ContentSection[];
    aside?: PriceAside;
    contactCta?: ContactCTAType;
};

export type BlogPage = {
    hero?: Hero;
    /** Badge beside the date on the newest post at the top of the listing. */
    featuredLabel?: string;
    /** Heading of the three related posts under an article. */
    relatedTitle?: string;
};

export type PromotionOffer = {
    label?: string;
    price?: string;
    currency?: string;
    oldPrice?: string;
    note?: string;
    buttonLabel?: string;
    buttonHref?: string;
    terms?: string;
};

export type PromotionPage = {
    active?: boolean;
    hero?: Hero;
    sections: ContentSection[];
    offer?: PromotionOffer;
    contactCta?: ContactCTAType;
};

export type TreatmentLink = {
    _id: string;
    title: string;
    slug: string;
    category: "face" | "body" | "pelvic";
};

export type TreatmentMetaItem = {
    _key: string;
    label?: string;
    value?: string;
};

export type TreatmentPage = {
    _id: string;
    title: string;
    slug: string;
    category: "face" | "body" | "pelvic";
    hero: Hero;
    meta?: TreatmentMetaItem[];
    sections: ContentSection[];
    disclaimer?: {
        text?: string;
        show?: boolean;
    };
    contactCta?: {
        title?: string;
        text?: string;
        buttonLabel?: string;
        buttonHref?: string;
    };
};

export type GalleryImage = Image & {
    alt?: string;
    caption?: string;
};

export type BlogPost = {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    mainImage: Image;
    gallery?: GalleryImage[];
    content: PortableTextBlock[];
    publishedAt: string;
    seo?: {
        metaTitle: string;
        metaDescription: string;
    };
};

// ============================================
// QUERIES
// ============================================

// Site Settings (for header/footer/nav)
export async function getSiteSettings(): Promise<SiteSettings> {
    return client.fetch(
        groq`*[_type == "siteSettings"][0] {
            siteTitle,
            logo { ${imageFragment} },
            seo {
                metaTitle,
                metaDescription,
                ogImage { ${imageFragment} },
                keywords,
                siteUrl,
                googleVerification
            },
            announcement {
                enabled,
                text,
                mobileText,
                animated,
                animationSpeed,
                backgroundColor,
                textColor
            },
            headerCta { label, href },
            mainNav[] {
                _key,
                label,
                href,
                children[] {
                    _key,
                    label,
                    href
                }
            },
            footer {
                about,
                address,
                phone,
                email,
                workingHours[] {
                    _key,
                    days,
                    hours
                }
            },
            socials[] {
                _key,
                label,
                url
            }
        }`
    );
}

// Home Page
export async function getHomePage(): Promise<HomePage> {
    return client.fetch(
        groq`*[_type == "homePage"][0] {
            ${heroFragment},
            promo {
                text,
                link,
                active
            },
            methodSection {
                eyebrow,
                title,
                text,
                chips
            },
            cardsSection {
                title,
                intro,
                cards[] {
                    _key,
                    title,
                    text,
                    image { ${imageFragment} },
                    link
                }
            },
            beforeAfterSection {
                title,
                eyebrow,
                note,
                pairs[] {
                    _key,
                    label,
                    caption,
                    before { ${imageFragment} },
                    after { ${imageFragment} }
                }
            },
            postsSection {
                title
            },
            contactCta {
                title,
                text,
                buttonLabel,
                buttonHref
            },
            "featuredPosts": featuredPosts[]-> {
                _id,
                title,
                "slug": slug.current,
                excerpt,
                mainImage { ${imageFragment} },
                gallery[] {
                    ${imageFragment},
                    alt,
                    caption
                },
                publishedAt
            },
            testimonialsSection {
                title,
                intro,
                testimonials[]-> {
                    _id,
                    name,
                    role,
                    text,
                    image { ${imageFragment} }
                }
            }
        }`
    );
}

// About Page
export async function getAboutPage(): Promise<AboutPage> {
    return client.fetch(
        groq`*[_type == "aboutPage"][0] {
            ${heroFragment},
            ${contentSectionFragment},
            testimonialsSection {
                title,
                intro,
                testimonials[]-> {
                    _id,
                    name,
                    role,
                    text,
                    image { ${imageFragment} }
                }
            }
        }`
    );
}

// Contact Page
export async function getContactPage(): Promise<ContactPage | null> {
    return client.fetch(
        groq`*[_type == "contactPage"][0] {
            ${heroFragment},
            eyebrow,
            title,
            intro,
            infoTitle,
            socialsTitle,
            formTitle,
            formDescription,
            recipientEmail,
            successMessage,
            googleMapsEmbed,
            mapTitle
        }`
    );
}

// Price Page
export async function getPricePage(): Promise<PricePage> {
    return client.fetch(
        groq`*[_type == "pricePage"][0] {
            ${heroFragment},
            ${contentSectionFragment},
            aside {
                images[] {
                    _key,
                    alt,
                    caption,
                    ${imageFragment}
                },
                notes[] {
                    _key,
                    label,
                    text
                }
            },
            contactCta {
                title,
                text,
                buttonLabel,
                buttonHref
            }
        }`
    );
}

// Blog Page (listing hero)
export async function getBlogPage(): Promise<BlogPage | null> {
    return client.fetch(
        groq`*[_type == "blogPage"][0] {
            ${heroFragment},
            featuredLabel,
            relatedTitle
        }`
    );
}

// Promo Page (single page, article-style)
export async function getPromoPage(): Promise<PromotionPage | null> {
    return client.fetch(
        groq`*[_type == "promotionPage"][0] {
            active,
            ${heroFragment},
            ${contentSectionFragment},
            offer {
                label,
                price,
                currency,
                oldPrice,
                note,
                buttonLabel,
                buttonHref,
                terms
            },
            contactCta {
                title,
                text,
                buttonLabel,
                buttonHref
            }
        }`
    );
}

/**
 * The promo page is seasonal. An unset flag counts as visible, so switching the
 * page off is always a deliberate act in the studio.
 */
export async function isPromoActive(): Promise<boolean> {
    const active = await client.fetch<boolean | null>(
        groq`*[_type == "promotionPage"][0].active`
    );
    return active !== false;
}

// Treatment Page (single by slug)
export async function getTreatmentPage(slug: string): Promise<TreatmentPage> {
    return client.fetch(
        groq`*[_type == "treatmentPage" && slug.current == $slug][0] {
            _id,
            title,
            "slug": slug.current,
            category,
            ${heroFragment},
            meta[] {
                _key,
                label,
                value
            },
            ${contentSectionFragment},
            disclaimer {
                text,
                show
            },
            contactCta {
                title,
                text,
                buttonLabel,
                buttonHref
            }
        }`,
        { slug }
    );
}

/**
 * Slug + title + category only — for subtype chip rows and nav-like lists.
 * Deliberately skips the hero fragment that getAllTreatments pulls in.
 */
export async function getTreatmentLinks(): Promise<TreatmentLink[]> {
    return client.fetch(
        groq`*[_type == "treatmentPage" && defined(slug.current)] | order(category asc, title asc) {
            _id,
            title,
            "slug": slug.current,
            category
        }`
    );
}

// Treatments by category
export async function getTreatmentsByCategory(
    category: "face" | "body" | "pelvic"
): Promise<TreatmentPage[]> {
    return client.fetch(
        groq`*[_type == "treatmentPage" && category == $category] | order(title asc) {
            _id,
            title,
            "slug": slug.current,
            category,
            ${heroFragment}
        }`,
        { category }
    );
}

// All Treatments (for sitemap/navigation)
export async function getAllTreatments(): Promise<TreatmentPage[]> {
    return client.fetch(
        groq`*[_type == "treatmentPage"] | order(category asc, title asc) {
            _id,
            title,
            "slug": slug.current,
            category,
            ${heroFragment}
        }`
    );
}

// Blog Post (single by slug)
export async function getBlogPost(slug: string): Promise<BlogPost> {
    return client.fetch(
        groq`*[_type == "post" && slug.current == $slug][0] {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            mainImage { ${imageFragment} },
            gallery[] {
                ${imageFragment},
                alt,
                caption
            },
            content[] {
                ...,
                _type == "image" => {
                    ${imageFragment},
                    alt,
                    caption
                }
            },
            publishedAt,
            seo {
                metaTitle,
                metaDescription
            }
        }`,
        { slug }
    );
}

// All Blog Posts (for listing)
export async function getAllBlogPosts(): Promise<BlogPost[]> {
    return client.fetch(
        groq`*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            mainImage { ${imageFragment} },
            gallery[] {
                ${imageFragment},
                alt,
                caption
            },
            publishedAt
        }`
    );
}

// Recent Blog Posts (for homepage or sidebar)
export async function getRecentBlogPosts(
    limit: number = 3
): Promise<BlogPost[]> {
    return client.fetch(
        groq`*[_type == "post"] | order(publishedAt desc)[0...$limit] {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            mainImage { ${imageFragment} },
            gallery[] {
                ${imageFragment},
                alt,
                caption
            },
            publishedAt
        }`,
        { limit }
    );
}

// Related Blog Posts ("Povezane novosti" under an article)
export async function getRelatedBlogPosts(
    currentId: string,
    limit: number = 3
): Promise<BlogPost[]> {
    return client.fetch(
        groq`*[_type == "post" && _id != $currentId] | order(publishedAt desc)[0...$limit] {
            _id,
            title,
            "slug": slug.current,
            mainImage { ${imageFragment} },
            publishedAt
        }`,
        { currentId, limit }
    );
}

// Blog Posts Slugs (for static generation)
export async function getBlogPostsSlugs(): Promise<{ slug: string }[]> {
    return client.fetch(
        groq`*[_type == "post" && defined(slug.current)] {
            "slug": slug.current
        }`
    );
}

// Treatment Slugs (for static generation)
export async function getTreatmentSlugs(): Promise<{ slug: string }[]> {
    return client.fetch(
        groq`*[_type == "treatmentPage" && defined(slug.current)] {
            "slug": slug.current
        }`
    );
}

// Promo page path (single page, no slug in schema)
export function getPromoPath(): string {
    return "promo";
}
