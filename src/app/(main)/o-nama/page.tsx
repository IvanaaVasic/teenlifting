export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { getAboutPage, getSiteSettings } from "@/sanity/sanity-utils";
import { Hero, PortableTextContent, TestimonialsSection } from "@/components";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();

    return {
        title: `O nama | ${settings?.siteTitle || "Teenlifting"}`,
        description:
            "Saznajte više o nama, našem timu i našoj misiji da vam pružimo najbolje tretmane.",
        openGraph: {
            title: `O nama | ${settings?.siteTitle || "Teenlifting"}`,
            description:
                "Saznajte više o nama, našem timu i našoj misiji da vam pružimo najbolje tretmane.",
        },
    };
}

export default async function AboutPage() {
    const aboutPage = await getAboutPage();

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.heroWrapper}>
                <Hero hero={aboutPage?.hero} />
            </div>

            <article className={styles.article}>
                {aboutPage?.sections?.map((section) => (
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

                {aboutPage?.testimonialsSection &&
                    aboutPage.testimonialsSection.testimonials?.length > 0 && (
                        <TestimonialsSection
                            data={aboutPage.testimonialsSection}
                        />
                    )}
            </article>
        </div>
    );
}
