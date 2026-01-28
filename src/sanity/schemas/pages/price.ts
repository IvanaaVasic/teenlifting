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
            name: "contactCta",
            title: "Contact CTA",
            type: "contactCta",
            description: "Sekcija za poziv na akciju na dnu stranice",
        },
    ],
};

export default pricePage;
