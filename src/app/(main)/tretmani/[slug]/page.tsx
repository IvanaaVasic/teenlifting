export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { getTreatmentPage, getSiteSettings } from "@/sanity/sanity-utils";
import { Hero, PortableTextContent } from "@/components";
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
        <>
            <Hero hero={treatment.hero} />

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
                <section className={styles.contactCta}>
                    <div className={styles.contactContainer}>
                        <h2 className={styles.contactTitle}>
                            {treatment.contactCta?.title ||
                                "Zainteresovani ste za ovaj tretman?"}
                        </h2>
                        <p className={styles.contactText}>
                            {treatment.contactCta?.text ||
                                "Zakažite konsultaciju i saznajte više o tome kako vam možemo pomoći."}
                        </p>
                        <Link
                            href={
                                treatment.contactCta?.buttonHref || "/kontakt"
                            }
                            className={styles.contactButton}
                        >
                            {treatment.contactCta?.buttonLabel ||
                                "Kontaktirajte nas"}
                        </Link>
                    </div>
                </section>
            </article>
        </>
    );
}
