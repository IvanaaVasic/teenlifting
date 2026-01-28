const aboutPage = {
    name: "aboutPage",
    title: "About page",
    type: "document",
    preview: {
        prepare() {
            return {
                title: "About page",
            };
        },
    },
    fields: [
        { name: "hero", type: "hero" },
        {
            name: "sections",
            type: "array",
            of: [{ type: "contentSection" }],
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

export default aboutPage;
