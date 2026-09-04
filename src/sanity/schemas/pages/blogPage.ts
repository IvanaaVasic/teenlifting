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
        {
            name: "featuredLabel",
            title: "Oznaka na istaknutoj novosti",
            description:
                "Sitna oznaka uz datum najnovije novosti na vrhu liste. Npr. „Najnovije”. Prazno - oznaka se ne prikazuje.",
            type: "string",
        },
        {
            name: "relatedTitle",
            title: "Naslov „Povezane novosti”",
            description:
                "Naslov sekcije sa druge tri novosti na dnu članka. Prazno - naslov se ne prikazuje.",
            type: "string",
        },
    ],
};

export default blogPage;
