export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { getAllBlogPosts, getBlogPage, getSiteSettings } from "@/sanity/sanity-utils";
import { BlogCard } from "@/components";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return {
        title: `Novosti | ${settings?.siteTitle || "Teenlifting"}`,
        description: "Najnovije novosti i tekstovi.",
        openGraph: {
            title: `Novosti | ${settings?.siteTitle || "Teenlifting"}`,
            description: "Najnovije novosti i tekstovi.",
        },
    };
}

export default async function BlogPage() {
    const [blogPage, posts] = await Promise.all([getBlogPage(), getAllBlogPosts()]);

    // The header band is a text band, not a slider - only the first slide of
    // `hero` is read here, the rest belong to the home page.
    const slide = blogPage?.hero?.slides?.[0];

    // Posts arrive newest first, so the first one is the featured row.
    const [featured, ...rest] = posts;

    return (
        <>
            <div className={styles.pageHeader}>
                {slide?.eyebrow && (
                    <p className={styles.eyebrow}>{slide.eyebrow}</p>
                )}

                {slide?.title && (
                    <h1 className={styles.title}>
                        {slide.title}
                        {slide.titleItalic && (
                            <>
                                <br />
                                <em className={styles.titleItalic}>
                                    {slide.titleItalic}
                                </em>
                            </>
                        )}
                    </h1>
                )}

                {slide?.subtitle && (
                    <p className={styles.lead}>{slide.subtitle}</p>
                )}
            </div>

            {featured && (
                <div className={styles.featured}>
                    <BlogCard
                        post={featured}
                        variant="featured"
                        badge={blogPage?.featuredLabel}
                    />
                </div>
            )}

            {rest.length > 0 && (
                <div className={styles.grid}>
                    {rest.map((post) => (
                        <BlogCard key={post._id} post={post} variant="list" />
                    ))}
                </div>
            )}
        </>
    );
}
