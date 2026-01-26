const contactPage = {
    name: "contactPage",
    title: "Contact page",
    type: "document",
    fields: [
        { name: "hero", type: "hero" },
        { name: "text", type: "array", of: [{ type: "block" }] },
    ],
};

export default contactPage;
