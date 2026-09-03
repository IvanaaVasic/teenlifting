/**
 * Before / after results gallery.
 *
 * A reusable object so the homepage and, later, the treatment pages can both
 * carry one. Photos need written client consent, so pairs render as striped
 * placeholders until the images are supplied.
 */
const beforeAfterSection = {
    name: "beforeAfterSection",
    title: "Before / after (Pre i posle)",
    type: "object",
    fields: [
        {
            name: "title",
            title: "Title",
            description: "Npr. „Pre i posle”.",
            type: "string",
        },
        {
            name: "eyebrow",
            title: "Eyebrow",
            description:
                "Oznaka desno od naslova. Broj sekcije se dodaje automatski. Npr. „Rezultati klijenata”.",
            type: "string",
        },
        {
            name: "note",
            title: "Note",
            description:
                "Sitna napomena pod galerijom. Npr. o pismenoj saglasnosti klijenata.",
            type: "string",
        },
        {
            name: "pairs",
            title: "Pairs",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "beforeAfterPair",
                    title: "Pair",
                    fields: [
                        {
                            name: "label",
                            title: "Label",
                            description: "Npr. „Lice i vrat”.",
                            type: "string",
                        },
                        {
                            name: "before",
                            title: "Before",
                            type: "image",
                            options: { hotspot: true },
                        },
                        {
                            name: "after",
                            title: "After",
                            type: "image",
                            options: { hotspot: true },
                        },
                        {
                            name: "caption",
                            title: "Caption",
                            description: "Npr. „posle 8 tretmana”.",
                            type: "string",
                        },
                    ],
                    preview: {
                        select: {
                            title: "label",
                            subtitle: "caption",
                            media: "before",
                        },
                        prepare({
                            title,
                            subtitle,
                            media,
                        }: {
                            title?: string;
                            subtitle?: string;
                            media?: unknown;
                        }) {
                            return {
                                title: title || "Bez oznake",
                                subtitle,
                                media,
                            };
                        },
                    },
                },
            ],
        },
    ],
};

export default beforeAfterSection;
