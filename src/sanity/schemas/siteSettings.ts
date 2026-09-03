import { HiCog } from "react-icons/hi";

const siteSettings = {
    name: "siteSettings",
    title: "Site settings",
    type: "document",
    icon: HiCog,
    groups: [
        {
            name: "general",
            title: "General",
            default: true,
        },
        {
            name: "seo",
            title: "SEO",
        },
        {
            name: "announcement",
            title: "Announcement",
        },
    ],
    fields: [
        { name: "siteTitle", type: "string", group: "general" },
        { name: "logo", type: "image", group: "general" },

        // SEO
        {
            name: "seo",
            title: "SEO Settings",
            type: "object",
            group: "seo",
            options: {
                collapsible: true,
            },
            fields: [
                {
                    name: "metaTitle",
                    title: "Meta Title",
                    type: "string",
                    description: "Default title for pages (50-60 characters)",
                },
                {
                    name: "metaDescription",
                    title: "Meta Description",
                    type: "text",
                    rows: 3,
                    description:
                        "Default description for pages (150-160 characters)",
                },
                {
                    name: "ogImage",
                    title: "Open Graph Image",
                    type: "image",
                    description:
                        "Default image for social sharing (1200x630px recommended)",
                },
                {
                    name: "keywords",
                    title: "Keywords",
                    type: "array",
                    of: [{ type: "string" }],
                    options: { layout: "tags" },
                },
                {
                    name: "siteUrl",
                    title: "Site URL",
                    type: "url",
                    description:
                        "Full URL of the website (e.g., https://teenlifting.com.hr)",
                },
                {
                    name: "googleVerification",
                    title: "Google Site Verification",
                    type: "string",
                    description: "Google Search Console verification code",
                },
            ],
        },

        // Announcement Bar
        { name: "announcement", type: "announcement", group: "announcement" },

        {
            name: "headerCta",
            title: "Header CTA",
            description:
                "Dugme u desnom uglu header-a. Npr. „Zakaži konsultaciju” → /kontakt.",
            type: "cta",
            group: "general",
        },

        // Navigation
        {
            name: "mainNav",
            title: "Main navigation",
            type: "array",
            group: "general",
            of: [
                {
                    type: "object",
                    name: "navItem",
                    fields: [
                        { name: "label", type: "string" },
                        { name: "href", type: "string" },
                        {
                            name: "children",
                            title: "Dropdown items",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    fields: [
                                        { name: "label", type: "string" },
                                        { name: "href", type: "string" },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },

        // Footer
        {
            name: "footer",
            type: "object",
            fields: [
                {
                    name: "about",
                    title: "Kratak opis",
                    description:
                        "Tekst ispod logotipa u footeru. Npr. „Profesionalni tretmani za lice i telo.”",
                    type: "text",
                    rows: 2,
                },
                { name: "address", title: "Adresa", type: "text" },
                { name: "phone", title: "Telefon", type: "string" },
                { name: "email", title: "Email", type: "string" },
                {
                    name: "workingHours",
                    title: "Radno vreme",
                    type: "array",
                    of: [
                        {
                            type: "object",
                            fields: [
                                {
                                    name: "days",
                                    title: "Dani",
                                    type: "string",
                                    description: "npr. Pon - Pet, Sub, Ned",
                                },
                                {
                                    name: "hours",
                                    title: "Sati",
                                    type: "string",
                                    description: "npr. 09:00 - 20:00",
                                },
                            ],
                            preview: {
                                select: {
                                    days: "days",
                                    hours: "hours",
                                },
                                prepare({ days, hours }: { days: string; hours: string }) {
                                    return {
                                        title: `${days}: ${hours}`,
                                    };
                                },
                            },
                        },
                    ],
                },
            ],
            group: "general",
        },

        // Socials
        {
            name: "socials",
            type: "array",
            group: "general",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "label", type: "string" },
                        { name: "url", type: "string" },
                    ],
                },
            ],
        },
    ],
};

export default siteSettings;
