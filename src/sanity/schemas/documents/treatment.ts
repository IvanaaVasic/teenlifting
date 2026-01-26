const treatmentPage = {
    name: "treatmentPage",
    title: "Treatment page",
    type: "document",
    fields: [
        { name: "title", type: "string" },
        { name: "slug", type: "slug", options: { source: "title" } },

        {
            name: "category",
            type: "string",
            options: {
                list: [
                    { title: "Lice", value: "face" },
                    { title: "Telo", value: "body" },
                    { title: "Karlično dno", value: "pelvic" },
                ],
            },
        },

        { name: "hero", type: "hero" },

        {
            name: "sections",
            type: "array",
            of: [{ type: "contentSection" }],
        },
    ],
};

export default treatmentPage;
