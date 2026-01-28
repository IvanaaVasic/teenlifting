import { HiSparkles } from "react-icons/hi";

const promotionPage = {
    name: "promotionPage",
    title: "Promo ponuda page",
    type: "document",
    icon: HiSparkles,
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
            description:
                "Opciono. Ako ostavite prazno, stranica počinje direktno sa sadržajem.",
        },
        {
            name: "sections",
            title: "Sekcije sadržaja",
            description:
                "Dodajte sekcije sa tekstom, slikama, tabelama, CTA i sl.",
            type: "array",
            of: [{ type: "contentSection" }],
        },
        {
            name: "contactCta",
            title: "Contact CTA",
            type: "contactCta",
            description: "Sekcija za poziv na akciju na dnu stranice",
        },
    ],
};

export default promotionPage;
