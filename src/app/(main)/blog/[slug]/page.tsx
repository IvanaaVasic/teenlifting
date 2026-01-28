export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, getSiteSettings } from "@/sanity/sanity-utils";
import { PortableTextContent } from "@/components";
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

    const published = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("sr-Latn-RS", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : null;

    return (
        <article className={styles.article}>
            <header className={styles.hero}>
                {post.mainImage?.asset?.url ? (
                    <>
                        <div className={styles.heroImage}>
                            <Image
                                src={post.mainImage.asset.url}
                                alt={post.title || "Blog slika"}
                                fill
                                priority
                                className={styles.heroImg}
                                placeholder={
                                    post.mainImage.asset.metadata?.lqip
                                        ? "blur"
                                        : "empty"
                                }
                                blurDataURL={
                                    post.mainImage.asset.metadata?.lqip
                                }
                                sizes="100vw"
                            />
                        </div>
                        <div className={styles.heroOverlay} />
                    </>
                ) : null}

                <div className={styles.heroContent}>
                    <div className={styles.container}>
                        {published ? (
                            <time
                                className={styles.date}
                                dateTime={post.publishedAt}
                            >
                                {published}
                            </time>
                        ) : null}
                        <h1 className={styles.title}>{post.title}</h1>
                        {post.excerpt ? (
                            <p className={styles.excerpt}>{post.excerpt}</p>
                        ) : null}
                    </div>
                </div>
            </header>

            <div className={styles.body}>
                <div className={styles.container}>
                    <PortableTextContent value={post.content || []} />

                    {post.gallery?.length ? (
                        <section
                            className={styles.gallery}
                            aria-label="Galerija slika"
                        >
                            {post.gallery
                                .filter((img) => img?.asset?.url)
                                .map((img, idx) => (
                                    <figure
                                        key={img._key || idx}
                                        className={styles.galleryItem}
                                    >
                                        <div className={styles.galleryImage}>
                                            <Image
                                                src={img.asset.url}
                                                alt={
                                                    img.alt || post.title || ""
                                                }
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
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                        {img.caption ? (
                                            <figcaption
                                                className={
                                                    styles.galleryCaption
                                                }
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
        </article>
    );
}
