export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { getPricePage, getSiteSettings } from "@/sanity/sanity-utils";
import { Hero, PortableTextContent } from "@/components";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();

    return {
        title: `Cenovnik | ${settings?.siteTitle || "Teenlifting"}`,
        description: "Pregled cena tretmana i usluga TEENLIFTING studija.",
        openGraph: {
            title: `Cenovnik | ${settings?.siteTitle || "Teenlifting"}`,
            description: "Pregled cena tretmana i usluga TEENLIFTING studija.",
        },
    };
}

export default async function PricePage() {
    const pricePage = await getPricePage();

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.heroWrapper}>
                <Hero hero={pricePage?.hero} />
            </div>

            <article className={styles.article}>
                {pricePage?.sections?.map((section) => (
                    <section key={section._key} className={styles.section}>
                        <div className={styles.container}>
                            {section.title && (
                                <h2 className={styles.sectionTitle}>
                                    {section.title}
                                </h2>
                            )}
                            {section.content && (
                                <PortableTextContent value={section.content} />
                            )}
                        </div>
                    </section>
                ))}
            </article>
        </div>
    );
}
