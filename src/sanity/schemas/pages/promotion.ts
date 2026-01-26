const promotionPage = {
    name: "promotionPage",
    title: "Promotion",
    type: "document",
    fields: [
        { name: "title", type: "string" },
        { name: "slug", type: "slug", options: { source: "title" } },
        { name: "hero", type: "hero" },
        {
            name: "content",
            type: "array",
            of: [{ type: "block" }],
        },
    ],
};

export default promotionPage;
