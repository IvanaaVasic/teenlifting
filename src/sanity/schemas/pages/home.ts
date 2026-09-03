// import type { Rule } from "sanity";
import { HiHome } from "react-icons/hi";

const homePage = {
    name: "homePage",
    title: "Home page (Početna)",
    type: "document",
    icon: HiHome,
    preview: {
        prepare() {
            return {
                title: "Home page",
            };
        },
    },
    fields: [
        { name: "hero", type: "hero" },

        // {
        //     name: "promo",
        //     title: "Promo announcement",
        //     type: "object",
        //     fields: [
        //         { name: "text", type: "string" },
        //         { name: "link", type: "string" },
        //         { name: "active", type: "boolean" },
        //     ],
        // },

        {
            name: "methodSection",
            title: "Method section (Metoda)",
            type: "object",
            fields: [
                {
                    name: "eyebrow",
                    title: "Eyebrow",
                    description: "Npr. „01 - Metoda”.",
                    type: "string",
                },
                { name: "title", title: "Title", type: "string" },
                { name: "text", title: "Text", type: "text", rows: 4 },
                {
                    name: "chips",
                    title: "Chips",
                    description:
                        "Red oznaka u okvirima. Npr. trening, lifting, pomlađivanje.",
                    type: "array",
                    of: [{ type: "string" }],
                    options: { layout: "tags" },
                },
            ],
        },

        {
            name: "cardsSection",
            title: "Cards section (Tretmani)",
            type: "object",
            fields: [
                { name: "title", type: "string" },
                { name: "intro", type: "text" },
                {
                    name: "cards",
                    type: "array",
                    of: [{ type: "card" }],
                    // validation: (rule: Rule) => rule.length(3),
                },
            ],
        },

        {
            name: "beforeAfterSection",
            title: "Before / after (Pre i posle)",
            type: "beforeAfterSection",
        },

        {
            name: "postsSection",
            title: "Posts section (Novosti)",
            type: "object",
            fields: [{ name: "title", title: "Title", type: "string" }],
        },

        {
            name: "featuredPosts",
            title: "Featured blog posts",
            description:
                "Na Početnoj se prikazuju najviše tri; ostatak je na /blog.",
            type: "array",
            of: [{ type: "reference", to: [{ type: "post" }] }],
        },

        {
            name: "contactCta",
            title: "Contact CTA",
            type: "contactCta",
        },

        {
            name: "testimonialsSection",
            title: "Testimonials section",
            type: "object",
            fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "intro", title: "Intro", type: "text" },
                {
                    name: "testimonials",
                    title: "Testimonials",
                    type: "array",
                    of: [{ type: "reference", to: [{ type: "testimonial" }] }],
                },
            ],
        },
    ],
};

export default homePage;
