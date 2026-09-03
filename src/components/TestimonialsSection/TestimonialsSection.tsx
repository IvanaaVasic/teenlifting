import Image from "next/image";
import type { TestimonialsSection as TestimonialsSectionType } from "@/sanity/sanity-utils";
import styles from "./TestimonialsSection.module.css";

export interface TestimonialsSectionProps {
    data: TestimonialsSectionType;
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
    if (!data?.testimonials?.length) {
        return null;
    }

    // The section title doubles as the eyebrow above the quote.
    const { testimonials, title: eyebrow } = data;

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

                <p className={styles.author}>
                    <span className={styles.name}>{featured.name}</span>
                    {featured.role && (
                        <>
                            <span className={styles.dash} aria-hidden="true">
                                -
                            </span>
                            <span className={styles.role}>
                                {featured.role}
                            </span>
                        </>
                    )}
                </p>

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
