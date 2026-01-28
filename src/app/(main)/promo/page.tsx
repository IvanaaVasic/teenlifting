export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { getPromoPage, getSiteSettings } from "@/sanity/sanity-utils";
import { Hero, PortableTextContent } from "@/components";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();

    return {
        title: `Promo ponuda | ${settings?.siteTitle || "Teenlifting"}`,
        description: "Aktuelna promotivna ponuda TEENLIFTING studija.",
        openGraph: {
            title: `Promo ponuda | ${settings?.siteTitle || "Teenlifting"}`,
            description: "Aktuelna promotivna ponuda TEENLIFTING studija.",
        },
    };
}

export default async function PromoPage() {
    const promoPage = await getPromoPage();

    if (!promoPage) {
        return null;
    }

    const hasHero = promoPage?.hero?.slides?.length;

    return (
        <div className={styles.pageWrapper}>
            {hasHero ? (
                <div className={styles.heroWrapper}>
                    <Hero hero={promoPage.hero!} />
                </div>
            ) : null}

            <article
                className={hasHero ? styles.article : styles.articleNoHero}
            >
                {promoPage?.sections?.map((section) => (
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
