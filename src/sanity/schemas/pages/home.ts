// import type { Rule } from "sanity";

const homePage = {
    name: "homePage",
    title: "Home page",
    type: "document",
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
            name: "featuredPosts",
            title: "Featured blog posts",
            type: "array",
            of: [{ type: "reference", to: [{ type: "post" }] }],
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
                    of: [{ type: "testimonial" }],
                },
            ],
        },
    ],
};

export default homePage;
