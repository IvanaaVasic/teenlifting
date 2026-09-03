import Image from "next/image";
import Link from "next/link";
import type { Card, TreatmentLink } from "@/sanity/sanity-utils";
import { normalizeHref } from "@/utils/href";
import styles from "./CardSection.module.css";

export interface CardSectionProps {
    title?: string;
    /** Sequence number shown opposite the title, e.g. "02". Computed by the page. */
    number?: string;
    cards: Card[];
    /** Drives the subtype chip row under each card. */
    treatments?: TreatmentLink[];
    /**
     * Set when no section sits above this one — Metoda normally supplies the
     * gap with its own bottom padding.
     */
    withTopPadding?: boolean;
}

/** Trailing slug of an internal href, so a card can be matched to a treatment. */
function slugFromHref(href: string | undefined): string | null {
    if (!href) return null;
    const parts = normalizeHref(href).split("/").filter(Boolean);
    return parts.length ? parts[parts.length - 1] : null;
}

function CardRow({
    card,
    index,
    treatments,
    isCategoryLead,
}: {
    card: Card;
    index: number;
    treatments: TreatmentLink[];
    isCategoryLead: boolean;
}) {
    const cardSlug = slugFromHref(card.link);
    const own = treatments.find((t) => t.slug === cardSlug);
    /*
     * Only the card that leads a category lists that category's subtypes.
     * A card that is itself a subtype — Platizma sits under `face` — shows
     * just itself, instead of repeating the whole face group.
     */
    const subtypes =
        own && isCategoryLead
            ? treatments.filter((t) => t.category === own.category)
            : own
              ? [own]
              : [];

    return (
        <article className={styles.row}>
            <div className={styles.rowBody}>
                <div className={styles.rowHeading}>
                    <span className={styles.rowNumber}>
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    {card.title && (
                        <h3 className={styles.rowTitle}>{card.title}</h3>
                    )}
                </div>

                {card.text && <p className={styles.rowText}>{card.text}</p>}

                {subtypes.length > 0 ? (
                    <ul className={styles.subtypes}>
                        {subtypes.map((treatment) => (
                            <li key={treatment._id}>
                                <Link
                                    href={`/tretmani/${treatment.slug}`}
                                    className={`${styles.subtype} ${
                                        treatment.slug === cardSlug
                                            ? styles.subtypeActive
                                            : ""
                                    }`}
                                >
                                    {treatment.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    card.link && (
                        <ul className={styles.subtypes}>
                            <li>
                                <Link
                                    href={normalizeHref(card.link)}
                                    className={`${styles.subtype} ${styles.subtypeActive}`}
                                >
                                    Saznaj više
                                </Link>
                            </li>
                        </ul>
                    )
                )}
            </div>

            {card.image?.asset?.url && (
                <Link
                    href={normalizeHref(card.link)}
                    className={styles.rowMedia}
                >
                    <Image
                        src={card.image.asset.url}
                        alt={card.title || "Slika tretmana"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 480px"
                        className={styles.rowImage}
                        placeholder={
                            card.image.asset.metadata?.lqip ? "blur" : "empty"
                        }
                        blurDataURL={card.image.asset.metadata?.lqip}
                    />
                </Link>
            )}
        </article>
    );
}

export function CardSection({
    title,
    number,
    cards,
    treatments = [],
    withTopPadding = false,
}: CardSectionProps) {
    if (!cards?.length) {
        return null;
    }

    // The first card of each category leads it; the rest are its subtypes.
    const seenCategories = new Set<string>();
    const categoryLead = cards.map((card) => {
        const treatment = treatments.find(
            (t) => t.slug === slugFromHref(card.link)
        );
        if (!treatment) return false;
        if (seenCategories.has(treatment.category)) return false;
        seenCategories.add(treatment.category);
        return true;
    });

    return (
        <section
            className={`${styles.section} ${
                withTopPadding ? styles.withTopPadding : ""
            }`}
        >
            {(title || number) && (
                <div className={styles.header}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    {number && <p className={styles.label}>{number}</p>}
                </div>
            )}

            <div className={styles.rows}>
                {cards.map((card, index) => (
                    <CardRow
                        key={card._key}
                        card={card}
                        index={index}
                        treatments={treatments}
                        isCategoryLead={categoryLead[index]}
                    />
                ))}
            </div>
        </section>
    );
}
