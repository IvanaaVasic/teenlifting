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

export function BlogCard({ post }: { post: BlogPost }) {
    const formattedDate = formatPostDate(post.publishedAt);

    return (
        <article className={styles.card}>
            {post.mainImage?.asset?.url && (
                <Link
                    href={`/blog/${post.slug}`}
                    className={styles.imageWrapper}
                >
                    <Image
                        src={post.mainImage.asset.url}
                        alt={post.title || "Blog slika"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={styles.image}
                        placeholder={
                            post.mainImage.asset.metadata?.lqip
                                ? "blur"
                                : "empty"
                        }
                        blurDataURL={post.mainImage.asset.metadata?.lqip}
                    />
                </Link>
            )}

            <div className={styles.cardContent}>
                {formattedDate && (
                    <time className={styles.date} dateTime={post.publishedAt}>
                        {formattedDate}
                    </time>
                )}
                {post.title && (
                    <h3 className={styles.cardTitle}>
                        <Link
                            href={`/blog/${post.slug}`}
                            className={styles.cardTitleLink}
                        >
                            {post.title}
                        </Link>
                    </h3>
                )}
                {post.excerpt && (
                    <p className={styles.excerpt}>{post.excerpt}</p>
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
