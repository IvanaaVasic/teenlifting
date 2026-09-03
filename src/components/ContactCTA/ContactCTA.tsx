import Link from "next/link";
import { normalizeHref } from "@/utils/href";
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
    /**
     * Presentation only — the data shape is identical either way.
     * "ink" is the dark panel used on inner pages; "paper" is the lighter
     * band the homepage closes on, so it doesn't collide with the footer.
     */
    variant?: "ink" | "paper";
}

export function ContactCTA({
    data,
    defaultTitle = "Zainteresovani ste?",
    defaultText = "Zakažite konsultaciju i saznajte više o tome kako vam možemo pomoći.",
    defaultButtonLabel = "Kontaktirajte nas",
    defaultButtonHref = "/kontakt",
    showDefault = true,
    variant = "ink",
}: ContactCTAProps) {
    // If showDefault is false and no data exists, don't render
    const hasData =
        data &&
        (data.title || data.text || data.buttonLabel || data.buttonHref);
    if (!showDefault && !hasData) {
        return null;
    }

    return (
        <section
            className={`${styles.contactCta} ${
                variant === "paper" ? styles.paper : ""
            }`}
        >
            <div className={styles.copy}>
                <h2 className={styles.title}>{data?.title || defaultTitle}</h2>
                <p className={styles.text}>{data?.text || defaultText}</p>
            </div>
            <Link
                href={normalizeHref(data?.buttonHref || defaultButtonHref)}
                className={styles.button}
            >
                {data?.buttonLabel || defaultButtonLabel}
            </Link>
        </section>
    );
}
