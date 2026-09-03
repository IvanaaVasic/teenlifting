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
            name: "active",
            title: "Prikaži promo ponudu",
            description:
                "Kad je isključeno, strana /promo vraća 404 i link nestaje iz menija i footera. Uključi kad ponuda kreće, isključi kad istekne.",
            type: "boolean",
            initialValue: true,
        },
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
            name: "offer",
            title: "Cena ponude",
            description:
                "Okvir sa cenom desno od sadržaja. Sve je opciono - prazna polja se ne prikazuju, a ako je ceo okvir prazan, sadržaj uzima punu širinu.",
            type: "object",
            fields: [
                {
                    name: "label",
                    title: "Oznaka iznad cene",
                    type: "string",
                },
                { name: "price", title: "Cena", type: "string" },
                {
                    name: "currency",
                    title: "Valuta",
                    type: "string",
                },
                {
                    name: "oldPrice",
                    title: "Stara cena",
                    description: "Prikazuje se precrtano pored cene.",
                    type: "string",
                },
                {
                    name: "note",
                    title: "Napomena ispod cene",
                    type: "text",
                    rows: 2,
                },
                {
                    name: "buttonLabel",
                    title: "Tekst dugmeta",
                    type: "string",
                },
                {
                    name: "buttonHref",
                    title: "Link dugmeta",
                    type: "string",
                },
                {
                    name: "terms",
                    title: "Uslovi",
                    description:
                        "Sitan tekst na dnu okvira, ispod linije.",
                    type: "text",
                    rows: 3,
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

export default promotionPage;
