import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/sanity/sanity-utils";
import styles from "./BlogSection.module.css";

export interface BlogSectionProps {
    title?: string;
    posts: BlogPost[];
}

export function formatPostDate(publishedAt?: string): string | null {
    if (!publishedAt) return null;
    return new Date(publishedAt).toLocaleDateString("sr-Latn-RS", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

/**
 * `teaser` is the three-up row on the home page. `list` is the same card one
 * step larger on the blog listing, where it also carries the read-more link.
 * `featured` is the newest post at the top of that listing - an image beside
 * the text instead of above it, and a badge next to the date.
 */
export type BlogCardVariant = "teaser" | "list" | "featured";

export function BlogCard({
    post,
    variant = "teaser",
    badge,
}: {
    post: BlogPost;
    variant?: BlogCardVariant;
    /** Label beside the date on the featured card - `blogPage.featuredLabel`. */
    badge?: string;
}) {
    const formattedDate = formatPostDate(post.publishedAt);
    const isFeatured = variant === "featured";
    const href = `/blog/${post.slug}`;

    return (
        <article
            className={`${styles.card} ${
                variant === "list"
                    ? styles.cardList
                    : isFeatured
                      ? styles.cardFeatured
                      : ""
            }`}
        >
            {post.mainImage?.asset?.url && (
                <Link href={href} className={styles.imageWrapper}>
                    <Image
                        src={post.mainImage.asset.url}
                        alt={post.title || "Blog slika"}
                        fill
                        sizes={
                            isFeatured
                                ? "(max-width: 1024px) 100vw, 620px"
                                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        }
                        className={styles.image}
                        placeholder={
                            post.mainImage.asset.metadata?.lqip
                                ? "blur"
                                : "empty"
                        }
                        blurDataURL={post.mainImage.asset.metadata?.lqip}
                        priority={isFeatured}
                    />
                </Link>
            )}

            <div className={styles.cardContent}>
                {(formattedDate || (isFeatured && badge)) && (
                    <div className={styles.meta}>
                        {isFeatured && badge && (
                            <span className={styles.badge}>{badge}</span>
                        )}
                        {formattedDate && (
                            <time
                                className={styles.date}
                                dateTime={post.publishedAt}
                            >
                                {formattedDate}
                            </time>
                        )}
                    </div>
                )}
                {post.title && (
                    <h3 className={styles.cardTitle}>
                        <Link href={href} className={styles.cardTitleLink}>
                            {post.title}
                        </Link>
                    </h3>
                )}
                {post.excerpt && (
                    <p className={styles.excerpt}>{post.excerpt}</p>
                )}
                {variant !== "teaser" && (
                    <Link href={href} className={styles.readMore}>
                        Pročitaj više <span aria-hidden="true">&rarr;</span>
                    </Link>
                )}
            </div>
        </article>
    );
}

export function BlogSection({ title, posts }: BlogSectionProps) {
    if (!posts?.length) {
        return null;
    }

    return (
        <section className={styles.section} aria-label={title || "Novosti"}>
            <div className={styles.header}>
                {title && <h2 className={styles.title}>{title}</h2>}
                <Link href="/blog" className={styles.viewAll}>
                    Pogledaj sve <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>

            <div className={styles.grid}>
                {posts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                ))}
            </div>
        </section>
    );
}
