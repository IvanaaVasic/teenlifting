const aboutPage = {
    name: "aboutPage",
    title: "About page",
    type: "document",
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
