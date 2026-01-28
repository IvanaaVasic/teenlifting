const contactCta = {
    name: "contactCta",
    title: "Contact CTA",
    type: "object",
    fields: [
        {
            name: "title",
            title: "Naslov",
            type: "string",
            description: "Naslov CTA sekcije",
        },
        {
            name: "text",
            title: "Tekst",
            type: "text",
            rows: 2,
            description: "Kratak tekst ispod naslova",
        },
        {
            name: "buttonLabel",
            title: "Tekst dugmeta",
            type: "string",
            description: 'npr. "Kontaktirajte nas"',
        },
        {
            name: "buttonHref",
            title: "Link dugmeta",
            type: "string",
            description: 'npr. "kontakt" ili "/kontakt"',
        },
    ],
};

export default contactCta;
