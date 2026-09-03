export const dynamic = "force-dynamic";

import Image from "next/image";
import { Metadata } from "next";
import { getPricePage, getSiteSettings } from "@/sanity/sanity-utils";
import { PortableTextContent, ContactCTA } from "@/components";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();

    return {
        title: `Cenovnik | ${settings?.siteTitle || "Teenlifting"}`,
        description: "Pregled cena tretmana i usluga TEENLIFTING studija.",
        openGraph: {
            title: `Cenovnik | ${settings?.siteTitle || "Teenlifting"}`,
            description: "Pregled cena tretmana i usluga TEENLIFTING studija.",
        },
    };
}

export default async function PricePage() {
    const pricePage = await getPricePage();

    // The header band is a text band, not a slider - only the first slide of
    // `hero` is read here, the rest belong to the home page.
    const slide = pricePage?.hero?.slides?.[0];

    const asideImages = (pricePage?.aside?.images || []).filter(
        (image) => image.asset?.url
    );
    const asideNotes = (pricePage?.aside?.notes || []).filter(
        (note) => note.label || note.text
    );
    const hasAside = asideImages.length > 0 || asideNotes.length > 0;

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

            <div className={hasAside ? styles.body : styles.bodyWide}>
                <div className={styles.main}>
                    {pricePage?.sections?.map((section) =>
                        section.content?.length ? (
                            <PortableTextContent
                                key={section._key}
                                value={section.content}
                                className={styles.content}
                            />
                        ) : null
                    )}
                </div>

                {hasAside && (
                    <aside className={styles.aside}>
                        {asideImages.map((image, index) => (
                            <figure
                                key={image._key || image.asset._id}
                                className={styles.figure}
                            >
                                <div className={styles.figureImage}>
                                    <Image
                                        src={image.asset.url}
                                        alt={image.alt || ""}
                                        fill
                                        className={styles.image}
                                        sizes="(max-width: 1024px) 50vw, 380px"
                                        placeholder={
                                            image.asset.metadata?.lqip
                                                ? "blur"
                                                : "empty"
                                        }
                                        blurDataURL={image.asset.metadata?.lqip}
                                        priority={index === 0}
                                    />
                                </div>
                                {image.caption && (
                                    <figcaption className={styles.caption}>
                                        {image.caption}
                                    </figcaption>
                                )}
                            </figure>
                        ))}

                        {asideNotes.map((note) => (
                            <div key={note._key} className={styles.note}>
                                {note.label && (
                                    <p className={styles.noteLabel}>
                                        {note.label}
                                    </p>
                                )}
                                {note.text && (
                                    <p className={styles.noteText}>
                                        {note.text}
                                    </p>
                                )}
                            </div>
                        ))}
                    </aside>
                )}
            </div>

            <ContactCTA data={pricePage?.contactCta} showDefault={false} />
        </>
    );
}
