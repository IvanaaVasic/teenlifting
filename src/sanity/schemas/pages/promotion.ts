const promotionPage = {
    name: "promotionPage",
    title: "Promo stranica",
    type: "document",
    preview: {
        prepare() {
            return {
                title: "Promo stranica",
            };
        },
    },
    fields: [
        {
            name: "hero",
            title: "Hero",
            type: "hero",
            description: "Opciono. Ako ostavite prazno, stranica počinje direktno sa sadržajem.",
        },
        {
            name: "sections",
            title: "Sekcije sadržaja",
            description: "Dodajte sekcije sa tekstom, slikama, tabelama, CTA i sl.",
            type: "array",
            of: [{ type: "contentSection" }],
        },
    ],
};

export default promotionPage;
