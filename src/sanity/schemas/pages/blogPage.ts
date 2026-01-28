import { HiNewspaper } from "react-icons/hi";

const blogPage = {
    name: "blogPage",
    title: "Blog (Novosti) page",
    type: "document",
    icon: HiNewspaper,
    preview: {
        prepare() {
            return {
                title: "Blog (Novosti) page",
            };
        },
    },
    fields: [
        {
            name: "hero",
            title: "Hero",
            type: "hero",
            description:
                "Hero za blog listing stranicu. Opciono (ako je prazno, prikazaće se samo naslov).",
        },
    ],
};

export default blogPage;
