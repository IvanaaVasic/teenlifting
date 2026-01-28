import { HiMail } from "react-icons/hi";

const contactPage = {
    name: "contactPage",
    title: "Contact page (Kontakt)",
    type: "document",
    icon: HiMail,
    fields: [
        { name: "hero", type: "hero" },
        { name: "text", type: "array", of: [{ type: "block" }] },
    ],
};

export default contactPage;
