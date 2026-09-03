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
                            name: "eyebrow",
                            title: "Eyebrow",
                            description:
                                "Sitan tekst iznad naslova, verzalom. Npr. „Magazin AS IF · šest najboljih metoda u svetu”.",
                            type: "string",
                        },
                        {
                            name: "title",
                            title: "Title",
                            type: "string",
                        },
                        {
                            name: "titleItalic",
                            title: "Title - second line (italic)",
                            description:
                                "Druga linija naslova, renderuje se u italiku. Npr. naslov „Aktiviraj,” + ovo polje „ne plastificiraj.”",
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
                            name: "secondaryCta",
                            title: "Secondary Call to Action",
                            description:
                                "Drugo dugme, sa okvirom umesto pune pozadine. Opciono.",
                            type: "cta",
                        },
                        {
                            name: "stats",
                            title: "Stats",
                            description:
                                "Red statistika ispod dugmadi. Npr. 1990. / Razvijena metoda.",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    name: "heroStat",
                                    title: "Stat",
                                    fields: [
                                        {
                                            name: "value",
                                            title: "Value",
                                            type: "string",
                                        },
                                        {
                                            name: "label",
                                            title: "Label",
                                            type: "string",
                                        },
                                    ],
                                    preview: {
                                        select: {
                                            title: "value",
                                            subtitle: "label",
                                        },
                                    },
                                },
                            ],
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
