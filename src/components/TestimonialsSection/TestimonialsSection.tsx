import Image from "next/image";
import type { TestimonialsSection as TestimonialsSectionType } from "@/sanity/sanity-utils";
import styles from "./TestimonialsSection.module.css";

export interface TestimonialsSectionProps {
    data: TestimonialsSectionType;
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
    // The section title doubles as the eyebrow above the quote.
    const { title: eyebrow } = data ?? {};

    // A testimonial with no quote, name or photo has nothing to show.
    const testimonials = (data?.testimonials ?? []).filter(
        (t) => t.text || t.name || t.image?.asset?.url
    );
    if (!testimonials.length) {
        return null;
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
                {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

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
