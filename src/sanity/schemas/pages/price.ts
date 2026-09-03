import { HiCurrencyDollar } from "react-icons/hi";

const pricePage = {
    name: "pricePage",
    title: "Price list (Cenovnik)",
    type: "document",
    icon: HiCurrencyDollar,
    preview: {
        prepare() {
            return {
                title: "Price list",
            };
        },
    },
    fields: [
        { name: "hero", type: "hero" },
        {
            name: "sections",
            title: "Content Sections",
            description: "Add content sections with text, images, tables, etc.",
            type: "array",
            of: [{ type: "contentSection" }],
        },
        {
            name: "aside",
            title: "Bočni stubac",
            description:
                "Stoji desno od tabela i prati skrolovanje. Sve je opciono - prazna polja se ne prikazuju.",
            type: "object",
            fields: [
                {
                    name: "images",
                    title: "Slike",
                    type: "array",
                    of: [
                        {
                            type: "image",
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: "alt",
                                    title: "Alt tekst",
                                    type: "string",
                                    description:
                                        "Opis slike za SEO i pristupačnost",
                                },
                                {
                                    name: "caption",
                                    title: "Tekst ispod slike",
                                    type: "string",
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "notes",
                    title: "Napomene",
                    description: "Npr. Način plaćanja.",
                    type: "array",
                    of: [
                        {
                            type: "object",
                            name: "asideNote",
                            title: "Napomena",
                            fields: [
                                {
                                    name: "label",
                                    title: "Oznaka",
                                    type: "string",
                                },
                                {
                                    name: "text",
                                    title: "Tekst",
                                    type: "text",
                                    rows: 3,
                                },
                            ],
                            preview: {
                                select: { title: "label", subtitle: "text" },
                            },
                        },
                    ],
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

export default pricePage;
