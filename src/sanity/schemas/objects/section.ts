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
                            description: "Izaberi širinu slike",
                            options: {
                                list: [
                                    { title: "Full width (100%)", value: "full" },
                                    { title: "Split half (50%) - dve slike u redu", value: "half" },
                                    { title: "Split third (33%) - tri slike u redu", value: "third" },
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
