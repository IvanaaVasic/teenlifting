import { HiCollection } from "react-icons/hi";

const treatmentPage = {
    name: "treatmentPage",
    title: "Treatment page (Tretmani)",
    type: "document",
    icon: HiCollection,
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
            name: "meta",
            title: "Meta red",
            type: "array",
            description:
                "Red ispod naslova strane - trajanje, prvi rezultat, za koga, invazivnost. Stavke bez vrednosti se ne prikazuju.",
            of: [
                {
                    type: "object",
                    name: "metaItem",
                    title: "Stavka",
                    fields: [
                        {
                            name: "label",
                            title: "Oznaka",
                            type: "string",
                            description: "Npr: Trajanje",
                        },
                        {
                            name: "value",
                            title: "Vrednost",
                            type: "string",
                            description: "Npr: 60 min",
                        },
                    ],
                    preview: {
                        select: { title: "label", subtitle: "value" },
                    },
                },
            ],
            initialValue: [
                { _type: "metaItem", _key: "duration", label: "Trajanje" },
                {
                    _type: "metaItem",
                    _key: "firstResult",
                    label: "Prvi rezultat",
                },
                { _type: "metaItem", _key: "forWhom", label: "Za koga" },
                {
                    _type: "metaItem",
                    _key: "invasiveness",
                    label: "Invazivnost",
                },
            ],
        },

        {
            name: "sections",
            type: "array",
            of: [{ type: "contentSection" }],
        },

        {
            name: "disclaimer",
            title: "Disclaimer / Kontraindikacije",
            type: "object",
            description: "Info box sa upozorenjem ili kontraindikacijama",
            fields: [
                {
                    name: "text",
                    title: "Text",
                    type: "text",
                    rows: 2,
                    description:
                        "Npr: Kontraindikacije za TEENLIFTING su: Pace maker, Epilepsija, Trudnoća...",
                },
                {
                    name: "show",
                    title: "Prikaži disclaimer",
                    type: "boolean",
                    initialValue: true,
                },
            ],
        },

        {
            name: "contactCta",
            title: "Contact CTA",
            type: "contactCta",
            description: "Sekcija za poziv na akciju na dnu stranice",
        },
    ],
};

export default treatmentPage;
