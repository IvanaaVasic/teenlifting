export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { getTreatmentPage, getSiteSettings } from "@/sanity/sanity-utils";
import { Hero, PortableTextContent, ContactCTA } from "@/components";
import styles from "./page.module.css";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const treatment = await getTreatmentPage(slug);
    const settings = await getSiteSettings();

    if (!treatment) {
        return {
            title: "Tretman nije pronađen",
        };
    }

    return {
        title: `${treatment.title} | ${settings?.siteTitle || "Teenlifting"}`,
        description: treatment.hero?.slides?.[0]?.subtitle || treatment.title,
        openGraph: {
            title: treatment.title,
            description:
                treatment.hero?.slides?.[0]?.subtitle || treatment.title,
            images: treatment.hero?.slides?.[0]?.image?.asset?.url
                ? [treatment.hero.slides[0].image.asset.url]
                : [],
        },
    };
}

export default async function TreatmentPage({ params }: Props) {
    const { slug } = await params;
    const treatment = await getTreatmentPage(slug);

    if (!treatment) {
        notFound();
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.heroWrapper}>
                <Hero hero={treatment.hero} />
            </div>

            <article className={styles.article}>
                {treatment.sections?.map((section) => (
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

                {/* Disclaimer */}
                {treatment.disclaimer?.show && treatment.disclaimer?.text && (
                    <div className={styles.disclaimerWrapper}>
                        <div className={styles.disclaimer}>
                            <HiOutlineInformationCircle
                                className={styles.disclaimerIcon}
                                size={24}
                            />
                            <p className={styles.disclaimerText}>
                                {treatment.disclaimer.text}
                            </p>
                        </div>
                    </div>
                )}

                {/* Contact CTA */}
                <ContactCTA
                    data={treatment.contactCta}
                    showDefault={false}
                />
            </article>
        </div>
    );
}
