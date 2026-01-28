import { HiChatAlt2 } from "react-icons/hi";

const testimonial = {
    name: "testimonial",
    title: "Testimonial (Recenzija) blok",
    type: "document",
    icon: HiChatAlt2,
    fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "role", title: "Role / Title", type: "string" },
        { name: "text", title: "Message", type: "text" },
        { name: "image", title: "Image", type: "image" },
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "role",
            media: "image",
        },
    },
};

export default testimonial;
