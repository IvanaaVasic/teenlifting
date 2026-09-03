import Image from "next/image";
import type {
    BeforeAfterSection as BeforeAfterSectionType,
    Image as ImageType,
} from "@/sanity/sanity-utils";
import styles from "./BeforeAfterSection.module.css";

export interface BeforeAfterSectionProps {
    data?: BeforeAfterSectionType;
    /** Sequence number for the label, e.g. "03". Computed by the page. */
    number?: string;
}

/** A pair with no label, caption or image is not worth a placeholder card. */
function isFilledPair(pair: BeforeAfterSectionType["pairs"] extends
    | (infer P)[]
    | undefined
    ? P
    : never): boolean {
    return Boolean(
        pair.label ||
            pair.caption ||
            pair.before?.asset?.url ||
            pair.after?.asset?.url
    );
}

export function hasBeforeAfterSection(
    data?: BeforeAfterSectionType
): boolean {
    return Boolean(data?.pairs?.some(isFilledPair));
}

/**
 * One half of a pair. Photos need written client consent, so a missing image
 * falls back to the striped placeholder the design uses until they arrive.
 */
function Half({
    image,
    alt,
    side,
}: {
    image?: ImageType;
    alt: string;
    side: "before" | "after";
}) {
    if (!image?.asset?.url) {
        return (
            <div className={styles.placeholder} aria-hidden="true">
                <span className={styles.placeholderLabel}>
                    {side === "before" ? "pre" : "posle"}
                </span>
            </div>
        );
    }

    return (
        <div className={styles.half}>
            <Image
                src={image.asset.url}
                alt={alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 17vw"
                className={styles.image}
                placeholder={image.asset.metadata?.lqip ? "blur" : "empty"}
                blurDataURL={image.asset.metadata?.lqip}
            />
        </div>
    );
}

export function BeforeAfterSection({
    data,
    number,
}: BeforeAfterSectionProps) {
    if (!hasBeforeAfterSection(data)) {
        return null;
    }

    const pairs = data!.pairs!.filter(isFilledPair);
    const label = [number, data!.eyebrow].filter(Boolean).join(" - ");

    return (
        <section className={styles.section}>
            {data!.title && (
                <div className={styles.header}>
                    <h2 className={styles.title}>{data!.title}</h2>
                    {label && <p className={styles.label}>{label}</p>}
                </div>
            )}

            <div className={styles.grid}>
                {pairs.map((pair) => (
                    <figure key={pair._key} className={styles.pair}>
                        <div className={styles.halves}>
                            <Half
                                image={pair.before}
                                alt={
                                    pair.label
                                        ? `${pair.label} - pre tretmana`
                                        : "Pre tretmana"
                                }
                                side="before"
                            />
                            <Half
                                image={pair.after}
                                alt={
                                    pair.label
                                        ? `${pair.label} - posle tretmana`
                                        : "Posle tretmana"
                                }
                                side="after"
                            />
                        </div>

                        {(pair.label || pair.caption) && (
                            <figcaption className={styles.caption}>
                                {pair.label && (
                                    <span className={styles.captionLabel}>
                                        {pair.label}
                                    </span>
                                )}
                                {pair.caption && (
                                    <span className={styles.captionText}>
                                        {pair.caption}
                                    </span>
                                )}
                            </figcaption>
                        )}
                    </figure>
                ))}
            </div>

            {data!.note && <p className={styles.note}>{data!.note}</p>}
        </section>
    );
}
