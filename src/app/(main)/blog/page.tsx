export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { getAllBlogPosts, getBlogPage, getSiteSettings } from "@/sanity/sanity-utils";
import { BlogCard, Hero } from "@/components";
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

    const hasHero = !!blogPage?.hero?.slides?.length;

    return (
        <div className={styles.pageWrapper}>
            {hasHero ? (
                <div className={styles.heroWrapper}>
                    <Hero hero={blogPage!.hero} />
                </div>
            ) : (
                <header className={styles.simpleHeader}>
                    <div className={styles.container}>
                        <h1 className={styles.h1}>Novosti</h1>
                        <p className={styles.lead}>
                            Najnovije novosti i tekstovi.
                        </p>
                    </div>
                </header>
            )}

            <main className={hasHero ? styles.main : styles.mainNoHero}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {posts.map((post) => (
                            <BlogCard key={post._id} post={post} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

