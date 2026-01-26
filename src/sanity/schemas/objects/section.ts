const section = {
    name: "contentSection",
    title: "Content section",
    type: "object",
    fields: [
        { name: "title", type: "string" },
        {
            name: "text",
            type: "array",
            of: [{ type: "block" }],
        },
        { name: "image", type: "image" },
        { name: "cta", type: "cta" },
    ],
};

export default section;
