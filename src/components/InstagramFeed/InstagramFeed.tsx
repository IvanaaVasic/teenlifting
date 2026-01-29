import Script from "next/script";
import styles from "./InstagramFeed.module.css";

interface InstagramFeedProps {
    title?: string;
    embedId?: string;
}

export function InstagramFeed({
    title = "Pratite nas na Instagramu (trenutno je moj profil povezan za testiranje :) )",
    embedId = "1117064",
}: InstagramFeedProps) {
    return (
        <>
            <Script
                src="https://snapwidget.com/js/snapwidget.js"
                strategy="lazyOnload"
            />
            <section className={styles.section} aria-label="Instagram feed">
                <div className={styles.container}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.feedWrapper}>
                        <iframe
                            src={`https://snapwidget.com/embed/${embedId}`}
                            className={`snapwidget-widget ${styles.feed}`}
                            allowTransparency={true}
                            frameBorder={0}
                            scrolling="no"
                            title="Objave sa Instagrama - Teenlifting Beograd"
                            loading="lazy"
                            aria-label="Instagram galerija slika"
                        />
                    </div>
                    <a
                        href="https://www.instagram.com/teenlifting.bg/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.followButton}
                    >
                        @teenlifting_beograd
                    </a>
                </div>
            </section>
        </>
    );
}
