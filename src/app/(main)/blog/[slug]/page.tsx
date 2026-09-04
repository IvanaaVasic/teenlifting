export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    getBlogPage,
    getBlogPost,
    getRelatedBlogPosts,
    getSiteSettings,
} from "@/sanity/sanity-utils";
import { PageToc, PortableTextContent, formatPostDate } from "@/components";
import { extractPostToc } from "@/utils/toc";
import styles from "./page.module.css";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const [settings, post] = await Promise.all([
        getSiteSettings(),
        getBlogPost(slug),
    ]);

    if (!post) {
        return { title: "Novost nije pronađena" };
    }

    const title =
        post.seo?.metaTitle ||
        `${post.title} | ${settings?.siteTitle || "Teenlifting"}`;
    const description = post.seo?.metaDescription || post.excerpt || post.title;

    const ogImage = post.mainImage?.asset?.url
        ? [post.mainImage.asset.url]
        : [];

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: ogImage,
            locale: "sr_RS",
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    // The related band's heading is blog chrome, so it lives on the blog page
    // document rather than on each post.
    const [related, blogPage] = await Promise.all([
        getRelatedBlogPosts(post._id, 3),
        getBlogPage(),
    ]);

    const published = formatPostDate(post.publishedAt);

    /*
     * A blog post is one flat array rather than a list of sections, and its
     * headings sit at h1/h3 as often as h2 - `extractPostToc` reads all three.
     * A post with no headings at all simply gets no sticky column.
     */
    const tocEntries = extractPostToc(post.content);
    const hasToc = tocEntries.length > 0;

    const gallery = (post.gallery || []).filter((img) => img?.asset?.url);

    return (
        <article>
            <header className={styles.hero}>
                {post.mainImage?.asset?.url ? (
                    <>
                        <Image
                            src={post.mainImage.asset.url}
                            alt={post.title || ""}
                            fill
                            priority
                            className={styles.heroImage}
                            placeholder={
                                post.mainImage.asset.metadata?.lqip
                                    ? "blur"
                                    : "empty"
                            }
                            blurDataURL={post.mainImage.asset.metadata?.lqip}
                            sizes="100vw"
                        />
                        <div className={styles.heroOverlay} aria-hidden="true" />
                    </>
                ) : null}

                <div className={styles.heroContent}>
                    {published ? (
                        <time
                            className={styles.heroDate}
                            dateTime={post.publishedAt}
                        >
                            {published}
                        </time>
                    ) : null}
                    <h1 className={styles.heroTitle}>{post.title}</h1>
                    {post.excerpt ? (
                        <p className={styles.heroExcerpt}>{post.excerpt}</p>
                    ) : null}
                </div>
            </header>

            <div className={hasToc ? styles.body : styles.bodyNoToc}>
                {hasToc && <PageToc entries={tocEntries} label="Sadržaj" />}

                <div className={styles.main}>
                    <PortableTextContent
                        value={post.content || []}
                        className={styles.content}
                    />

                    {gallery.length > 0 ? (
                        <section
                            className={styles.gallery}
                            aria-label="Galerija slika"
                        >
                            {gallery.map((img, idx) => (
                                <figure
                                    key={img._key || idx}
                                    className={styles.galleryItem}
                                >
                                    <div className={styles.galleryImage}>
                                        <Image
                                            src={img.asset.url}
                                            alt={img.alt || post.title || ""}
                                            fill
                                            className={styles.galleryImg}
                                            placeholder={
                                                img.asset.metadata?.lqip
                                                    ? "blur"
                                                    : "empty"
                                            }
                                            blurDataURL={
                                                img.asset.metadata?.lqip
                                            }
                                            sizes="(max-width: 1024px) 100vw, 760px"
                                        />
                                    </div>
                                    {img.caption ? (
                                        <figcaption
                                            className={styles.galleryCaption}
                                        >
                                            {img.caption}
                                        </figcaption>
                                    ) : null}
                                </figure>
                            ))}
                        </section>
                    ) : null}
                </div>
            </div>

            {related.length > 0 ? (
                <section className={styles.related}>
                    {blogPage?.relatedTitle && (
                        <div className={styles.relatedHeader}>
                            <h2 className={styles.relatedTitle}>
                                {blogPage.relatedTitle}
                            </h2>
                            <Link
                                href="/blog"
                                className={styles.relatedViewAll}
                            >
                                Pogledaj sve{" "}
                                <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    )}

                    <div className={styles.relatedGrid}>
                        {related.map((item) => (
                            <Link
                                key={item._id}
                                href={`/blog/${item.slug}`}
                                className={styles.relatedCard}
                            >
                                {item.mainImage?.asset?.url ? (
                                    <span className={styles.relatedImage}>
                                        <Image
                                            src={item.mainImage.asset.url}
                                            alt={item.title || ""}
                                            fill
                                            className={styles.relatedImg}
                                            placeholder={
                                                item.mainImage.asset.metadata
                                                    ?.lqip
                                                    ? "blur"
                                                    : "empty"
                                            }
                                            blurDataURL={
                                                item.mainImage.asset.metadata
                                                    ?.lqip
                                            }
                                            sizes="(max-width: 1024px) 50vw, 400px"
                                        />
                                    </span>
                                ) : null}
                                <h3 className={styles.relatedCardTitle}>
                                    {item.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </section>
            ) : null}
        </article>
    );
}
