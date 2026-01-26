const pricePage = {
    name: "pricePage",
    title: "Price list",
    type: "document",
    fields: [
        { name: "hero", type: "hero" },
        {
            name: "categories",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", type: "string" },
                        {
                            name: "items",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    fields: [
                                        { name: "name", type: "string" },
                                        { name: "description", type: "text" },
                                        { name: "price", type: "string" },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

export default pricePage;
