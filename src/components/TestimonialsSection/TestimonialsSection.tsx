import Image from "next/image";
import type { TestimonialsSection as TestimonialsSectionType } from "@/sanity/sanity-utils";
import { slugify } from "@/utils/toc";
import styles from "./TestimonialsSection.module.css";

export interface TestimonialsSectionProps {
    data: TestimonialsSectionType;
    /**
     * "panel" is the home page - one large quote on the dark band, the rest of
     * the ambassadors reduced to an avatar row. "grid" is the about page, where
     * every ambassador gets a card of their own.
     */
    variant?: "panel" | "grid";
}

export function TestimonialsSection({
    data,
    variant = "panel",
}: TestimonialsSectionProps) {
    const { title, intro } = data ?? {};

    // A testimonial with no quote, name or photo has nothing to show.
    const testimonials = (data?.testimonials ?? []).filter(
        (t) => t.text || t.name || t.image?.asset?.url
    );
    if (!testimonials.length) {
        return null;
    }

    if (variant === "grid") {
        return (
            <section
                id={title ? slugify(title) : undefined}
                className={styles.gridSection}
                aria-label={title || "Ambasadori"}
            >
                {title && (
                    <div className={styles.gridHeader}>
                        <h2 className={styles.gridTitle}>{title}</h2>
                    </div>
                )}

                {intro && <p className={styles.gridIntro}>{intro}</p>}

                <div className={styles.grid}>
                    {testimonials.map((testimonial) => (
                        <figure key={testimonial._id} className={styles.card}>
                            {testimonial.image?.asset?.url && (
                                <div className={styles.cardMedia}>
                                    <Image
                                        src={testimonial.image.asset.url}
                                        alt={testimonial.name || "Ambasador"}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className={styles.image}
                                        placeholder={
                                            testimonial.image.asset.metadata
                                                ?.lqip
                                                ? "blur"
                                                : "empty"
                                        }
                                        blurDataURL={
                                            testimonial.image.asset.metadata
                                                ?.lqip
                                        }
                                    />
                                </div>
                            )}

                            {testimonial.text && (
                                <blockquote className={styles.cardQuote}>
                                    &ldquo;{testimonial.text}&rdquo;
                                </blockquote>
                            )}

                            {(testimonial.name || testimonial.role) && (
                                <figcaption className={styles.cardAuthor}>
                                    {testimonial.name}
                                    {testimonial.name && testimonial.role && (
                                        <span aria-hidden="true"> - </span>
                                    )}
                                    {testimonial.role}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
            </section>
        );
    }

    // First one carries the quote; the rest become the avatar row beneath it.
    const [featured, ...rest] = testimonials;
    const avatars = rest.filter((t) => t.image?.asset?.url).slice(0, 3);
    const names = rest.map((t) => t.name).filter(Boolean);

    return (
        <section className={styles.section} aria-label="Ambasadori">
            {featured.image?.asset?.url && (
                <div className={styles.media}>
                    <Image
                        src={featured.image.asset.url}
                        alt={featured.name || "Ambasador"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 520px"
                        className={styles.image}
                        placeholder={
                            featured.image.asset.metadata?.lqip
                                ? "blur"
                                : "empty"
                        }
                        blurDataURL={featured.image.asset.metadata?.lqip}
                    />
                </div>
            )}

            <div className={styles.body}>
                {/* The section title doubles as the eyebrow above the quote. */}
                {title && <p className={styles.eyebrow}>{title}</p>}

                {featured.text && (
                    <blockquote className={styles.quote}>
                        &ldquo;{featured.text}&rdquo;
                    </blockquote>
                )}

                {(featured.name || featured.role) && (
                    <p className={styles.author}>
                        {featured.name && (
                            <span className={styles.name}>
                                {featured.name}
                            </span>
                        )}
                        {featured.name && featured.role && (
                            <span className={styles.dash} aria-hidden="true">
                                -
                            </span>
                        )}
                        {featured.role && (
                            <span className={styles.role}>
                                {featured.role}
                            </span>
                        )}
                    </p>
                )}

                {names.length > 0 && (
                    <div className={styles.others}>
                        {avatars.length > 0 && (
                            <ul className={styles.avatars}>
                                {avatars.map((testimonial) => (
                                    <li
                                        key={testimonial._id}
                                        className={styles.avatarItem}
                                    >
                                        <Image
                                            src={
                                                testimonial.image!.asset.url
                                            }
                                            alt={testimonial.name || ""}
                                            width={52}
                                            height={52}
                                            className={styles.avatar}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                        <p className={styles.othersText}>
                            {names.join(", ")}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
