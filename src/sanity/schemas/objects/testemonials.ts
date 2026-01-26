const testimonial = {
    name: "testimonial",
    title: "Testimonial",
    type: "object",
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
