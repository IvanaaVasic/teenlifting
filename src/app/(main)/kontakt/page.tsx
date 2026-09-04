export const dynamic = "force-dynamic";

import { Metadata } from "next";
import {
    HiOutlineLocationMarker,
    HiOutlinePhone,
    HiOutlineMail,
    HiOutlineClock,
} from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { ContactForm } from "@/components";
import {
    getContactPage,
    getSiteSettings,
    type ContactPage as ContactPageType,
    type SiteSettings,
} from "@/sanity/sanity-utils";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
    const [contactPage, settings] = await Promise.all([
        getContactPage(),
        getSiteSettings(),
    ]);

    const title = `${contactPage?.title || "Kontakt"} | ${
        settings?.siteTitle || "Teenlifting"
    }`;

    return {
        title,
        description:
            contactPage?.intro ||
            "Kontaktirajte nas za sve informacije o tretmanima.",
        openGraph: {
            title,
            description:
                contactPage?.intro ||
                "Kontaktirajte nas za sve informacije o tretmanima.",
            locale: "sr_RS",
        },
    };
}

const socialIcons: Record<
    string,
    React.ComponentType<{ size?: number; className?: string }>
> = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    tiktok: FaTiktok,
    youtube: FaYoutube,
};

/**
 * One row of the contact list. The label is a field name rather than editorial
 * copy - the same class as the form's own labels - so it stays in code while
 * the value comes from `settings.footer`.
 */
function InfoRow({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className={styles.infoRow}>
            <span className={styles.infoIcon} aria-hidden="true">
                {icon}
            </span>
            <div>
                <h3 className={styles.infoLabel}>{label}</h3>
                {children}
            </div>
        </div>
    );
}

export default async function ContactPage() {
    const [contactPage, settings] = await Promise.all([
        getContactPage(),
        getSiteSettings(),
    ]);

    const footer: SiteSettings["footer"] | undefined = settings?.footer;
    const workingHours = footer?.workingHours || [];
    const socials = settings?.socials || [];

    const page: ContactPageType | null = contactPage;

    return (
        <>
            <div className={styles.pageHeader}>
                {page?.eyebrow && (
                    <p className={styles.eyebrow}>{page.eyebrow}</p>
                )}

                {page?.title && <h1 className={styles.title}>{page.title}</h1>}

                {page?.intro && <p className={styles.lead}>{page.intro}</p>}
            </div>

            <div className={styles.body}>
                <div className={styles.info}>
                    {page?.infoTitle && (
                        <h2 className={styles.columnLabel}>{page.infoTitle}</h2>
                    )}

                    <div className={styles.infoList}>
                        {footer?.address && (
                            <InfoRow
                                icon={<HiOutlineLocationMarker size={20} />}
                                label="Adresa"
                            >
                                <p className={styles.infoValue}>
                                    {footer.address}
                                </p>
                            </InfoRow>
                        )}

                        {footer?.phone && (
                            <InfoRow
                                icon={<HiOutlinePhone size={20} />}
                                label="Telefon"
                            >
                                <a
                                    href={`tel:${footer.phone.replace(/\s/g, "")}`}
                                    className={styles.infoLink}
                                >
                                    {footer.phone}
                                </a>
                            </InfoRow>
                        )}

                        {footer?.email && (
                            <InfoRow
                                icon={<HiOutlineMail size={20} />}
                                label="Email"
                            >
                                <a
                                    href={`mailto:${footer.email}`}
                                    className={styles.infoLink}
                                >
                                    {footer.email}
                                </a>
                            </InfoRow>
                        )}

                        {workingHours.length > 0 && (
                            <InfoRow
                                icon={<HiOutlineClock size={20} />}
                                label="Radno vreme"
                            >
                                <p
                                    className={`${styles.infoValue} ${styles.infoValueLines}`}
                                >
                                    {workingHours.map((wh, index) => (
                                        <span key={wh._key}>
                                            {wh.days}: {wh.hours}
                                            {index < workingHours.length - 1 && (
                                                <br />
                                            )}
                                        </span>
                                    ))}
                                </p>
                            </InfoRow>
                        )}
                    </div>

                    {socials.length > 0 && (
                        <div className={styles.socials}>
                            {page?.socialsTitle && (
                                <h3 className={styles.columnLabel}>
                                    {page.socialsTitle}
                                </h3>
                            )}
                            <div className={styles.socialsList}>
                                {socials.map((social) => {
                                    const Icon =
                                        socialIcons[
                                            social.label.toLowerCase()
                                        ] || null;
                                    if (!Icon) return null;
                                    return (
                                        <a
                                            key={social._key}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.socialLink}
                                            aria-label={social.label}
                                        >
                                            <Icon size={18} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.formPanel}>
                    {page?.formTitle && (
                        <h2 className={styles.formTitle}>{page.formTitle}</h2>
                    )}
                    {page?.formDescription && (
                        <p className={styles.formDescription}>
                            {page.formDescription}
                        </p>
                    )}
                    <div className={styles.formBody}>
                        <ContactForm successMessage={page?.successMessage} />
                    </div>
                </div>
            </div>

            {page?.googleMapsEmbed && (
                <section className={styles.map}>
                    {page.mapTitle && (
                        <h2 className={styles.mapTitle}>{page.mapTitle}</h2>
                    )}
                    <div className={styles.mapFrame}>
                        <iframe
                            src={page.googleMapsEmbed}
                            className={styles.mapEmbed}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokacija na mapi"
                        />
                    </div>
                </section>
            )}
        </>
    );
}
