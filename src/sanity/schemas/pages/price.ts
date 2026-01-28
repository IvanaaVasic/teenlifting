const pricePage = {
    name: "pricePage",
    title: "Price list",
    type: "document",
    preview: {
        prepare() {
            return {
                title: "Price list",
            };
        },
    },
    fields: [
        { name: "hero", type: "hero" },
        {
            name: "sections",
            title: "Content Sections",
            description:
                "Add content sections with text, images, tables, etc.",
            type: "array",
            of: [{ type: "contentSection" }],
        },
    ],
};

export default pricePage;
