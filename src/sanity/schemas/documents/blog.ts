const blogPost = {
    name: "post",
    title: "Blog post",
    type: "document",
    fields: [
        { name: "title", type: "string" },
        { name: "slug", type: "slug", options: { source: "title" } },
        { name: "excerpt", type: "text", rows: 3 },
        {
            name: "mainImage",
            title: "Glavna slika",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "gallery",
            title: "Galerija slika",
            description: "Dodatne slike za blog post",
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
                            description: "Opis slike za SEO i pristupačnost",
                        },
                        {
                            name: "caption",
                            title: "Naslov slike",
                            type: "string",
                        },
                    ],
                },
            ],
        },
        {
            name: "content",
            title: "Sadržaj",
            type: "array",
            of: [
                { type: "block" },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            title: "Alt tekst",
                            type: "string",
                        },
                        {
                            name: "caption",
                            title: "Naslov slike",
                            type: "string",
                        },
                    ],
                },
            ],
        },
        { name: "publishedAt", title: "Datum objave", type: "datetime" },

        // SEO
        {
            name: "seo",
            title: "SEO",
            type: "object",
            options: { collapsible: true },
            fields: [
                { name: "metaTitle", type: "string", title: "Meta title" },
                {
                    name: "metaDescription",
                    type: "text",
                    title: "Meta description",
                    rows: 3,
                },
            ],
        },
    ],
};

export default blogPost;
