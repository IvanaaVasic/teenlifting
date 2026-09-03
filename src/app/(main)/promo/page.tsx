export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPromoPage, getSiteSettings } from "@/sanity/sanity-utils";
import { PortableTextContent, ContactCTA } from "@/components";
import { normalizeHref } from "@/utils/href";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();

    return {
        title: `Promo ponuda | ${settings?.siteTitle || "Teenlifting"}`,
        description: "Aktuelna promotivna ponuda TEENLIFTING studija.",
        openGraph: {
            title: `Promo ponuda | ${settings?.siteTitle || "Teenlifting"}`,
            description: "Aktuelna promotivna ponuda TEENLIFTING studija.",
        },
    };
}

export default async function PromoPage() {
    const [promoPage, settings] = await Promise.all([
        getPromoPage(),
        getSiteSettings(),
    ]);

    /*
     * The offer is seasonal. Switched off in Sanity the route 404s rather than
     * showing a stale page to anyone holding the link; the menu drops the link
     * in the layout.
     */
    if (!promoPage || promoPage.active === false) {
        notFound();
    }

    // One full bleed image, not a slider - the rest of the slides belong to the
    // home page.
    const slide = promoPage.hero?.slides?.[0];
    const heroImage = slide?.image?.asset?.url ? slide.image : null;
    const hasHero = Boolean(slide?.title || slide?.subtitle || heroImage);

    const offer = promoPage.offer;
    const hasOffer = Boolean(
        offer &&
            (offer.price ||
                offer.label ||
                offer.note ||
                offer.terms ||
                (offer.buttonLabel && offer.buttonHref))
    );

    const phone = settings?.footer?.phone;

    return (
        <>
            {hasHero && (
                <div className={styles.hero}>
                    {heroImage && (
                        <Image
                            src={heroImage.asset.url}
                            alt={slide?.title || "Promo ponuda"}
                            fill
                            sizes="100vw"
                            className={styles.heroImage}
                            placeholder={
                                heroImage.asset.metadata?.lqip
                                    ? "blur"
                                    : "empty"
                            }
                            blurDataURL={heroImage.asset.metadata?.lqip}
                            priority
                        />
                    )}
                    <div className={styles.heroOverlay} aria-hidden="true" />

                    <div className={styles.heroContent}>
                        {slide?.eyebrow && (
                            <span className={styles.badge}>
                                {slide.eyebrow}
                            </span>
                        )}

                        {slide?.title && (
                            <h1 className={styles.heroTitle}>
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
                            <p className={styles.heroText}>{slide.subtitle}</p>
                        )}
                    </div>
                </div>
            )}

            <div className={hasOffer ? styles.body : styles.bodyWide}>
                <div className={styles.main}>
                    {promoPage.sections?.map((section) =>
                        section.content?.length ? (
                            <PortableTextContent
                                key={section._key}
                                value={section.content}
                                className={styles.content}
                            />
                        ) : null
                    )}
                </div>

                {hasOffer && offer && (
                    <aside className={styles.offer}>
                        {offer.label && (
                            <p className={styles.offerLabel}>{offer.label}</p>
                        )}

                        {offer.price && (
                            <p className={styles.priceRow}>
                                <span className={styles.price}>
                                    {offer.price}
                                </span>
                                {offer.currency && (
                                    <span className={styles.currency}>
                                        {offer.currency}
                                    </span>
                                )}
                                {offer.oldPrice && (
                                    <s className={styles.oldPrice}>
                                        {offer.oldPrice}
                                    </s>
                                )}
                            </p>
                        )}

                        {offer.note && (
                            <p className={styles.offerNote}>{offer.note}</p>
                        )}

                        {offer.buttonLabel && offer.buttonHref && (
                            <Link
                                href={normalizeHref(offer.buttonHref)}
                                className={styles.offerButton}
                            >
                                {offer.buttonLabel}
                            </Link>
                        )}

                        {/* The phone is chrome, so it comes from site settings
                            rather than a field of its own on the offer. */}
                        {phone && (
                            <a
                                href={`tel:${phone.replace(/\s/g, "")}`}
                                className={styles.offerPhone}
                            >
                                {phone}
                            </a>
                        )}

                        {offer.terms && (
                            <p className={styles.offerTerms}>{offer.terms}</p>
                        )}
                    </aside>
                )}
            </div>

            <ContactCTA data={promoPage.contactCta} showDefault={false} />
        </>
    );
}
