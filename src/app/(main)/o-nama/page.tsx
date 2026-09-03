export const dynamic = "force-dynamic";

import Image from "next/image";
import { Metadata } from "next";
import { getAboutPage, getSiteSettings } from "@/sanity/sanity-utils";
import {
    PortableTextContent,
    PageToc,
    TestimonialsSection,
} from "@/components";
import { extractToc, slugify } from "@/utils/toc";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();

    return {
        title: `O nama | ${settings?.siteTitle || "Teenlifting"}`,
        description:
            "Saznajte više o nama, našem timu i našoj misiji da vam pružimo najbolje tretmane.",
        openGraph: {
            title: `O nama | ${settings?.siteTitle || "Teenlifting"}`,
            description:
                "Saznajte više o nama, našem timu i našoj misiji da vam pružimo najbolje tretmane.",
        },
    };
}

export default async function AboutPage() {
    const aboutPage = await getAboutPage();

    // The header band is a static split, not a slider - only the first slide of
    // `hero` is read here, the rest belong to the home page.
    const slide = aboutPage?.hero?.slides?.[0];
    const headerImage = slide?.image?.asset?.url ? slide.image : null;

    const testimonials = aboutPage?.testimonialsSection;
    const hasTestimonials = Boolean(testimonials?.testimonials?.length);

    const tocEntries = extractToc(aboutPage?.sections);
    if (hasTestimonials && testimonials?.title) {
        // The ambassadors band sits outside the body grid but is still a stop
        // in the list; the section carries the matching id.
        tocEntries.push({
            id: slugify(testimonials.title),
            label: testimonials.title,
        });
    }

    return (
        <>
            <div
                className={
                    headerImage ? styles.pageHeader : styles.pageHeaderPlain
                }
            >
                <div>
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

                {headerImage && (
                    <div className={styles.media}>
                        <Image
                            src={headerImage.asset.url}
                            alt={slide?.title || "TEENLIFTING"}
                            fill
                            sizes="(max-width: 1024px) 100vw, 520px"
                            className={styles.image}
                            placeholder={
                                headerImage.asset.metadata?.lqip
                                    ? "blur"
                                    : "empty"
                            }
                            blurDataURL={headerImage.asset.metadata?.lqip}
                            priority
                        />
                    </div>
                )}
            </div>

            <div className={styles.body}>
                <PageToc entries={tocEntries} />

                <div className={styles.main}>
                    {aboutPage?.sections?.map((section) =>
                        section.content?.length ? (
                            <PortableTextContent
                                key={section._key}
                                value={section.content}
                                className={styles.content}
                            />
                        ) : null
                    )}
                </div>
            </div>

            {hasTestimonials && (
                <TestimonialsSection data={testimonials!} variant="grid" />
            )}
        </>
    );
}
