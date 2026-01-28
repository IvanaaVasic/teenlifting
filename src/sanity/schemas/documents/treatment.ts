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
            type: "object",
            description: "Sekcija za poziv na akciju na dnu stranice",
            fields: [
                {
                    name: "title",
                    title: "Heading",
                    type: "string",
                    initialValue: "Zainteresovani ste za ovaj tretman?",
                },
                {
                    name: "text",
                    title: "Text",
                    type: "text",
                    rows: 2,
                    initialValue:
                        "Zakažite konsultaciju i saznajte više o tome kako vam možemo pomoći.",
                },
                {
                    name: "buttonLabel",
                    title: "Button label",
                    type: "string",
                    initialValue: "Kontaktirajte nas",
                },
                {
                    name: "buttonHref",
                    title: "Button link",
                    type: "string",
                    initialValue: "kontakt",
                },
            ],
        },
    ],
};

export default treatmentPage;
