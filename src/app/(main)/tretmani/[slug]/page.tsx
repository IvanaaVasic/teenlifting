export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
    getTreatmentPage,
    getTreatmentLinks,
    getSiteSettings,
} from "@/sanity/sanity-utils";
import { PortableTextContent, PageToc, ContactCTA } from "@/components";
import { extractToc, slugify } from "@/utils/toc";
import styles from "./page.module.css";

type Props = {
    params: Promise<{ slug: string }>;
};

/** Mirrors the option titles on `treatmentPage.category` in the schema. */
const CATEGORY_LABELS: Record<string, string> = {
    face: "Lice",
    body: "Telo",
    pelvic: "Karlično dno",
};

const CONTRAINDICATIONS_LABEL = "Kontraindikacije";

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
    const [treatment, allTreatments] = await Promise.all([
        getTreatmentPage(slug),
        getTreatmentLinks(),
    ]);

    if (!treatment) {
        notFound();
    }

    const categoryLabel = CATEGORY_LABELS[treatment.category];

    // Subtypes are the other treatments filed under the same category.
    const subtypes = allTreatments.filter(
        (item) => item.category === treatment.category
    );

    const metaItems = (treatment.meta || []).filter(
        (item) => item.label && item.value
    );

    const showDisclaimer = Boolean(
        treatment.disclaimer?.show && treatment.disclaimer?.text
    );

    const tocEntries = extractToc(treatment.sections);
    if (showDisclaimer) {
        tocEntries.push({
            id: slugify(CONTRAINDICATIONS_LABEL),
            label: CONTRAINDICATIONS_LABEL,
        });
    }

    return (
        <>
            <div className={styles.pageHeader}>
                <p className={styles.breadcrumb}>
                    <span>Tretmani</span>
                    {categoryLabel && (
                        <>
                            <span aria-hidden="true">→</span>
                            <span>{categoryLabel}</span>
                        </>
                    )}
                    <span aria-hidden="true">→</span>
                    <span>{treatment.title}</span>
                </p>

                <h1 className={styles.title}>{treatment.title}</h1>

                {metaItems.length > 0 && (
                    <dl className={styles.metaRow}>
                        {metaItems.map((item) => (
                            <div key={item._key} className={styles.metaItem}>
                                <dt className={styles.metaLabel}>
                                    {item.label}
                                </dt>
                                <dd className={styles.metaValue}>
                                    {item.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}

                {subtypes.length > 1 && (
                    <div className={styles.subtypes}>
                        <span className={styles.subtypesLabel}>Podvrste</span>
                        {subtypes.map((item) => {
                            const isCurrent = item.slug === treatment.slug;
                            return (
                                <Link
                                    key={item._id}
                                    href={`/tretmani/${item.slug}`}
                                    className={`${styles.subtype} ${
                                        isCurrent ? styles.subtypeActive : ""
                                    }`}
                                    aria-current={
                                        isCurrent ? "page" : undefined
                                    }
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className={styles.body}>
                <PageToc
                    entries={tocEntries}
                    cta={{
                        label: treatment.contactCta?.buttonLabel,
                        href: treatment.contactCta?.buttonHref,
                    }}
                />

                <div className={styles.main}>
                    {treatment.sections?.map((section) =>
                        section.content?.length ? (
                            <PortableTextContent
                                key={section._key}
                                value={section.content}
                                className={styles.content}
                            />
                        ) : null
                    )}

                    {showDisclaimer && (
                        <div
                            id={slugify(CONTRAINDICATIONS_LABEL)}
                            className={styles.disclaimer}
                        >
                            <p className={styles.disclaimerLabel}>
                                {CONTRAINDICATIONS_LABEL}
                            </p>
                            <p className={styles.disclaimerText}>
                                {treatment.disclaimer?.text}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <ContactCTA data={treatment.contactCta} showDefault={false} />
        </>
    );
}
