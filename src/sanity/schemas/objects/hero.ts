const hero = {
    name: "hero",
    title: "Hero",
    type: "object",
    fields: [
        {
            name: "slides",
            title: "Slides",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "heroSlide",
                    title: "Slide",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                            options: { hotspot: true },
                        },
                        {
                            name: "title",
                            title: "Title",
                            type: "string",
                        },
                        {
                            name: "subtitle",
                            title: "Subtitle",
                            type: "text",
                            rows: 2,
                        },
                        {
                            name: "cta",
                            title: "Call to Action",
                            type: "cta",
                        },
                        {
                            name: "overlay",
                            title: "Overlay",
                            type: "boolean",
                            initialValue: true,
                        },
                    ],
                    preview: {
                        select: {
                            title: "title",
                            media: "image",
                        },
                        prepare({
                            title,
                            media,
                        }: {
                            title?: string;
                            media?: unknown;
                        }) {
                            return {
                                title: title || "Untitled slide",
                                media,
                            };
                        },
                    },
                },
            ],
        },
    ],
};

export default hero;
