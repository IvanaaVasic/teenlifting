import Link from "next/link";
import styles from "./ContactCTA.module.css";

export interface ContactCTAData {
    title?: string;
    text?: string;
    buttonLabel?: string;
    buttonHref?: string;
}

interface ContactCTAProps {
    data?: ContactCTAData;
    defaultTitle?: string;
    defaultText?: string;
    defaultButtonLabel?: string;
    defaultButtonHref?: string;
    /** If true, always shows with defaults. If false, only shows if data exists. Default: true */
    showDefault?: boolean;
}

// Helper to normalize href - ensures internal links start with /
function normalizeHref(href: string): string {
    if (!href) return "/";
    if (
        href.startsWith("/") ||
        href.startsWith("http") ||
        href.startsWith("#")
    ) {
        return href;
    }
    return `/${href}`;
}

export function ContactCTA({
    data,
    defaultTitle = "Zainteresovani ste?",
    defaultText = "Zakažite konsultaciju i saznajte više o tome kako vam možemo pomoći.",
    defaultButtonLabel = "Kontaktirajte nas",
    defaultButtonHref = "/kontakt",
    showDefault = true,
}: ContactCTAProps) {
    // If showDefault is false and no data exists, don't render
    const hasData =
        data &&
        (data.title || data.text || data.buttonLabel || data.buttonHref);
    if (!showDefault && !hasData) {
        return null;
    }

    return (
        <section className={styles.contactCta}>
            <div className={styles.container}>
                <h2 className={styles.title}>{data?.title || defaultTitle}</h2>
                <p className={styles.text}>{data?.text || defaultText}</p>
                <Link
                    href={normalizeHref(data?.buttonHref || defaultButtonHref)}
                    className={styles.button}
                >
                    {data?.buttonLabel || defaultButtonLabel}
                </Link>
            </div>
        </section>
    );
}
