const announcement = {
    name: "announcement",
    title: "Announcement Bar",
    type: "object",
    options: {
        collapsible: true,
    },
    fields: [
        {
            name: "enabled",
            title: "Enable",
            type: "boolean",
            initialValue: false,
        },
        {
            name: "text",
            title: "Text (Desktop)",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                    marks: {
                        decorators: [
                            { title: "Bold", value: "strong" },
                            { title: "Italic", value: "em" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    { name: "href", type: "url", title: "URL" },
                                ],
                            },
                        ],
                    },
                },
            ],
        },
        {
            name: "mobileText",
            title: "Text (Mobile)",
            description: "Optional shorter text for mobile devices",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                    marks: {
                        decorators: [
                            { title: "Bold", value: "strong" },
                            { title: "Italic", value: "em" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    { name: "href", type: "url", title: "URL" },
                                ],
                            },
                        ],
                    },
                },
            ],
        },
        {
            name: "animated",
            title: "Animated",
            type: "boolean",
            initialValue: false,
        },
        {
            name: "animationSpeed",
            title: "Animation speed",
            description: "Speed in pixels/second (recommended: 40)",
            type: "number",
            initialValue: 50,
        },
        {
            name: "backgroundColor",
            title: "Background Color",
            type: "color",
        },
        {
            name: "textColor",
            title: "Text Color",
            type: "color",
        },
    ],
};

export default announcement;
