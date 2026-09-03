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
     * "paper" is the default because this section always sits directly above
     * the footer, and the footer is the same ink as the "ink" variant: the two
     * dark bands read as one block. "ink" stays for a placement mid-page.
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
    variant = "paper",
}: ContactCTAProps) {
    // If showDefault is false and no data exists, don't render
    const hasData =
        data &&
        (data.title || data.text || data.buttonLabel || data.buttonHref);
    if (!showDefault && !hasData) {
        return null;
    }

    /*
     * The defaults only apply when showDefault is on. With it off, an empty
     * field renders nothing rather than falling back to copy baked into the
     * component — what is not filled in Sanity does not appear on the site.
     */
    const title = data?.title || (showDefault ? defaultTitle : undefined);
    const text = data?.text || (showDefault ? defaultText : undefined);
    const buttonLabel =
        data?.buttonLabel || (showDefault ? defaultButtonLabel : undefined);
    const buttonHref =
        data?.buttonHref || (showDefault ? defaultButtonHref : undefined);

    return (
        <section
            className={`${styles.contactCta} ${
                variant === "paper" ? styles.paper : ""
            }`}
        >
            {(title || text) && (
                <div className={styles.copy}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    {text && <p className={styles.text}>{text}</p>}
                </div>
            )}
            {buttonLabel && (
                <Link
                    href={normalizeHref(buttonHref)}
                    className={styles.button}
                >
                    {buttonLabel}
                </Link>
            )}
        </section>
    );
}
