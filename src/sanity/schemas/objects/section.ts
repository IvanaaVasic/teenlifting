const section = {
    name: "contentSection",
    title: "Content section",
    type: "object",
    fields: [
        { name: "title", type: "string", title: "Section Title (optional)" },
        {
            name: "content",
            title: "Content",
            type: "array",
            of: [
                // Text blocks
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "H4", value: "h4" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    lists: [
                        { title: "Bullet", value: "bullet" },
                        { title: "Numbered", value: "number" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Bold", value: "strong" },
                            { title: "Italic", value: "em" },
                            { title: "Underline", value: "underline" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "URL",
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        validation: (Rule: any) =>
                                            Rule.uri({
                                                allowRelative: true,
                                                scheme: [
                                                    "http",
                                                    "https",
                                                    "mailto",
                                                    "tel",
                                                ],
                                            }),
                                    },
                                ],
                            },
                        ],
                    },
                },
                // Inline image
                {
                    type: "image",
                    title: "Image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Alt text",
                            description: "Opis slike za SEO i pristupačnost",
                        },
                        {
                            name: "caption",
                            type: "string",
                            title: "Caption",
                            description: "Tekst ispod slike (opciono)",
                        },
                        {
                            name: "layout",
                            type: "string",
                            title: "Layout",
                            description:
                                "Izaberi širinu slike. „Pored teksta“ stavlja sliku u uzak stubac levo, a pasuse odmah ispod nje u kolonu desno - do prvog naslova ili sledećeg bloka.",
                            options: {
                                list: [
                                    { title: "Full width (100%)", value: "full" },
                                    { title: "Split half (50%) - dve slike u redu", value: "half" },
                                    { title: "Split third (33%) - tri slike u redu", value: "third" },
                                    { title: "Pored teksta - slika levo, pasusi desno", value: "aside" },
                                ],
                                layout: "radio",
                            },
                            initialValue: "full",
                        },
                    ],
                },
                // CTA Button
                {
                    type: "object",
                    name: "ctaButton",
                    title: "CTA Button",
                    fields: [
                        { name: "label", type: "string", title: "Button text" },
                        { name: "href", type: "string", title: "Link" },
                        {
                            name: "style",
                            type: "string",
                            title: "Style",
                            options: {
                                list: [
                                    { title: "Primary", value: "primary" },
                                    { title: "Secondary", value: "secondary" },
                                    { title: "Outline", value: "outline" },
                                ],
                            },
                            initialValue: "primary",
                        },
                    ],
                    preview: {
                        select: { title: "label" },
                        prepare({ title }: { title: string }) {
                            return { title: `Button: ${title || "Untitled"}` };
                        },
                    },
                },
                // Table
                {
                    type: "object",
                    name: "dataTable",
                    title: "Table",
                    fields: [
                        {
                            name: "title",
                            title: "Table title (optional)",
                            type: "string",
                        },
                        {
                            name: "rows",
                            title: "Rows",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    name: "row",
                                    fields: [
                                        {
                                            name: "cells",
                                            title: "Cells",
                                            type: "array",
                                            of: [{ type: "string" }],
                                        },
                                        {
                                            name: "isHeader",
                                            title: "Header row?",
                                            type: "boolean",
                                            initialValue: false,
                                        },
                                    ],
                                    preview: {
                                        select: {
                                            cells: "cells",
                                            isHeader: "isHeader",
                                        },
                                        prepare({
                                            cells,
                                            isHeader,
                                        }: {
                                            cells: string[];
                                            isHeader: boolean;
                                        }) {
                                            return {
                                                title: cells?.slice(0, 3).join(" | ") || "Empty row",
                                                subtitle: isHeader ? "Header" : "Data row",
                                            };
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: { title: "title", rows: "rows" },
                        prepare({
                            title,
                            rows,
                        }: {
                            title: string;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            rows: any[];
                        }) {
                            return {
                                title: title || `Table (${rows?.length || 0} rows)`,
                            };
                        },
                    },
                },
                // Numbered steps
                {
                    type: "object",
                    name: "numberedSteps",
                    title: "Numerisani koraci",
                    description:
                        "Npr. Rezultati po treningu, ili Šta ponuda uključuje",
                    fields: [
                        {
                            name: "title",
                            title: "Naslov (opciono)",
                            type: "string",
                            description:
                                "Ako je popunjen, ulazi u navigaciju „Na ovoj strani“",
                        },
                        {
                            name: "steps",
                            title: "Koraci",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    name: "step",
                                    fields: [
                                        {
                                            name: "title",
                                            title: "Naslov koraka",
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
                                        select: {
                                            title: "title",
                                            subtitle: "text",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: { title: "title", steps: "steps" },
                        prepare({
                            title,
                            steps,
                        }: {
                            title: string;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            steps: any[];
                        }) {
                            return {
                                title:
                                    title ||
                                    `Koraci (${steps?.length || 0})`,
                                subtitle: "Numerisani koraci",
                            };
                        },
                    },
                },
                // FAQ accordion
                {
                    type: "object",
                    name: "faqSection",
                    title: "Česta pitanja (akordeon)",
                    fields: [
                        {
                            name: "title",
                            title: "Naslov (opciono)",
                            type: "string",
                            description:
                                "Ako je popunjen, ulazi u navigaciju „Na ovoj strani“",
                        },
                        {
                            name: "items",
                            title: "Pitanja",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    name: "faqItem",
                                    fields: [
                                        {
                                            name: "question",
                                            title: "Pitanje",
                                            type: "string",
                                        },
                                        {
                                            name: "answer",
                                            title: "Odgovor",
                                            type: "text",
                                            rows: 4,
                                        },
                                    ],
                                    preview: {
                                        select: {
                                            title: "question",
                                            subtitle: "answer",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: { title: "title", items: "items" },
                        prepare({
                            title,
                            items,
                        }: {
                            title: string;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            items: any[];
                        }) {
                            return {
                                title:
                                    title ||
                                    `Česta pitanja (${items?.length || 0})`,
                                subtitle: "FAQ akordeon",
                            };
                        },
                    },
                },
                // Card grid
                {
                    type: "object",
                    name: "cardGrid",
                    title: "Kartice u mreži",
                    description:
                        "Tri kartice sa oznakom i kratkim tekstom. Npr. Rezultati metode.",
                    fields: [
                        {
                            name: "title",
                            title: "Naslov (opciono)",
                            type: "string",
                            description:
                                "Ako je popunjen, ulazi u navigaciju „Na ovoj strani“",
                        },
                        {
                            name: "cards",
                            title: "Kartice",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    name: "card",
                                    fields: [
                                        {
                                            name: "title",
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
                                        select: {
                                            title: "title",
                                            subtitle: "text",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: { title: "title", cards: "cards" },
                        prepare({
                            title,
                            cards,
                        }: {
                            title: string;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            cards: any[];
                        }) {
                            return {
                                title:
                                    title || `Kartice (${cards?.length || 0})`,
                                subtitle: "Kartice u mreži",
                            };
                        },
                    },
                },
                // Two column blocks
                {
                    type: "object",
                    name: "twoColumnBlocks",
                    title: "Dva bloka jedan pored drugog",
                    description: "Npr. Misija i Vizija.",
                    fields: [
                        {
                            name: "title",
                            title: "Naslov (opciono)",
                            type: "string",
                            description:
                                "Ako je popunjen, ulazi u navigaciju „Na ovoj strani“",
                        },
                        {
                            name: "blocks",
                            title: "Blokovi",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    name: "columnBlock",
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
                                            rows: 4,
                                        },
                                    ],
                                    preview: {
                                        select: {
                                            title: "label",
                                            subtitle: "text",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: { title: "title", blocks: "blocks" },
                        prepare({
                            title,
                            blocks,
                        }: {
                            title: string;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            blocks: any[];
                        }) {
                            return {
                                title:
                                    title || `Blokovi (${blocks?.length || 0})`,
                                subtitle: "Dva bloka jedan pored drugog",
                            };
                        },
                    },
                },
                // Stat row
                {
                    type: "object",
                    name: "statRow",
                    title: "Red sa vrednostima",
                    description:
                        "Oznaka i tekst levo, niz vrednosti desno. Npr. Franšiza i gradovi.",
                    fields: [
                        {
                            name: "label",
                            title: "Oznaka",
                            type: "string",
                            description:
                                "Ako je popunjena, ulazi u navigaciju „Na ovoj strani“",
                        },
                        {
                            name: "text",
                            title: "Tekst (opciono)",
                            type: "text",
                            rows: 2,
                        },
                        {
                            name: "values",
                            title: "Vrednosti",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    name: "statValue",
                                    fields: [
                                        {
                                            name: "value",
                                            title: "Vrednost",
                                            type: "string",
                                        },
                                        {
                                            name: "highlight",
                                            title: "Istaknuto",
                                            type: "boolean",
                                            description:
                                                "Prikazuje se u brend boji. Npr. grad u kom je centar.",
                                            initialValue: false,
                                        },
                                    ],
                                    preview: {
                                        select: {
                                            title: "value",
                                            highlight: "highlight",
                                        },
                                        prepare({
                                            title,
                                            highlight,
                                        }: {
                                            title: string;
                                            highlight: boolean;
                                        }) {
                                            return {
                                                title: title || "Bez vrednosti",
                                                subtitle: highlight
                                                    ? "Istaknuto"
                                                    : undefined,
                                            };
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: { title: "label", values: "values" },
                        prepare({
                            title,
                            values,
                        }: {
                            title: string;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            values: any[];
                        }) {
                            return {
                                title: title || "Red sa vrednostima",
                                subtitle: `${values?.length || 0} vrednosti`,
                            };
                        },
                    },
                },
                // Image gallery
                {
                    type: "object",
                    name: "imageGallery",
                    title: "Image Gallery",
                    fields: [
                        {
                            name: "images",
                            type: "array",
                            of: [
                                {
                                    type: "image",
                                    options: { hotspot: true },
                                    fields: [
                                        {
                                            name: "alt",
                                            type: "string",
                                            title: "Alt text",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "columns",
                            type: "number",
                            title: "Columns",
                            description: "Broj kolona (2-4)",
                            initialValue: 2,
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            validation: (Rule: any) => Rule.min(2).max(4),
                        },
                    ],
                    preview: {
                        select: { images: "images" },
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        prepare({ images }: { images: any[] }) {
                            return {
                                title: `Gallery: ${images?.length || 0} images`,
                            };
                        },
                    },
                },
            ],
        },
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare({ title }: { title: string }) {
            return { title: title || "Content Section" };
        },
    },
};

export default section;
