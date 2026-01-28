import { HiMail } from "react-icons/hi";

const contactPage = {
    name: "contactPage",
    title: "Contact page (Kontakt)",
    type: "document",
    icon: HiMail,
    groups: [
        { name: "content", title: "Sadržaj", default: true },
        { name: "form", title: "Kontakt forma" },
        { name: "map", title: "Google Mapa" },
    ],
    fields: [
        { name: "hero", type: "hero", group: "content" },
        {
            name: "title",
            title: "Page Title",
            type: "string",
            group: "content",
            initialValue: "Kontaktirajte nas",
        },
        {
            name: "intro",
            title: "Intro Text",
            type: "text",
            rows: 3,
            group: "content",
            description: "Kratak uvodni tekst ispod naslova",
        },

        // Contact Form Settings
        {
            name: "formTitle",
            title: "Form Title",
            type: "string",
            group: "form",
            initialValue: "Pošaljite nam poruku",
        },
        {
            name: "formDescription",
            title: "Form Description",
            type: "text",
            rows: 2,
            group: "form",
        },
        {
            name: "successMessage",
            title: "Success Message",
            type: "text",
            rows: 2,
            group: "form",
            initialValue:
                "Hvala na poruci! Odgovorićemo vam u najkraćem mogućem roku.",
        },

        // Google Maps
        {
            name: "googleMapsEmbed",
            title: "Google Maps Embed URL",
            type: "url",
            group: "map",
            description:
                "Unesite embed URL sa Google Maps (src iz iframe koda). Primer: https://www.google.com/maps/embed?pb=...",
        },
        {
            name: "mapTitle",
            title: "Map Section Title",
            type: "string",
            group: "map",
            initialValue: "Gde se nalazimo",
        },
    ],
    preview: {
        prepare() {
            return {
                title: "Kontakt stranica",
            };
        },
    },
};

export default contactPage;
