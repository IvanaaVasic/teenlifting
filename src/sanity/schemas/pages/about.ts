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
    ],
};

export default aboutPage;
