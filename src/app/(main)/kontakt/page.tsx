import { Metadata } from "next";
import {
    HiOutlineLocationMarker,
    HiOutlinePhone,
    HiOutlineMail,
    HiOutlineClock,
} from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { Hero, ContactForm } from "@/components";
import { getContactPage, getSiteSettings } from "@/sanity/sanity-utils";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
    const contactPage = await getContactPage();
    const settings = await getSiteSettings();

    return {
        title: contactPage?.title || "Kontakt" + " | " + settings?.siteTitle,
        description:
            contactPage?.intro ||
            "Kontaktirajte nas za sve informacije o tretmanima.",
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

export default async function ContactPage() {
    const [contactPage, settings] = await Promise.all([
        getContactPage(),
        getSiteSettings(),
    ]);

    const hasHero = contactPage?.hero?.slides?.length;

    return (
        <div className={styles.pageWrapper}>
            {hasHero ? (
                <>
                    <div className={styles.heroWrapper}>
                        <Hero hero={contactPage.hero} />
                    </div>
                    <main className={styles.main}>
                        <ContactPageContent
                            contactPage={contactPage}
                            settings={settings}
                        />
                    </main>
                </>
            ) : (
                <main className={styles.mainNoHero}>
                    <ContactPageContent
                        contactPage={contactPage}
                        settings={settings}
                    />
                </main>
            )}
        </div>
    );
}

interface ContactPageContentProps {
    contactPage: Awaited<ReturnType<typeof getContactPage>>;
    settings: Awaited<ReturnType<typeof getSiteSettings>>;
}

function ContactPageContent({
    contactPage,
    settings,
}: ContactPageContentProps) {
    return (
        <>
            {/* Header Section */}
            <section className={styles.headerSection}>
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>
                        {contactPage?.title || "Kontaktirajte nas"}
                    </h1>
                    {contactPage?.intro && (
                        <p className={styles.intro}>{contactPage.intro}</p>
                    )}
                </div>
            </section>

            {/* Contact Grid */}
            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.contactGrid}>
                        {/* Contact Info */}
                        <div className={styles.infoColumn}>
                            <h2 className={styles.columnTitle}>
                                Kontakt informacije
                            </h2>

                            <div className={styles.infoCards}>
                                {settings?.footer?.address && (
                                    <div className={styles.infoCard}>
                                        <div className={styles.infoIconWrapper}>
                                            <HiOutlineLocationMarker
                                                size={24}
                                            />
                                        </div>
                                        <div className={styles.infoContent}>
                                            <h3 className={styles.infoLabel}>
                                                Adresa
                                            </h3>
                                            <p className={styles.infoValue}>
                                                {settings.footer.address}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {settings?.footer?.phone && (
                                    <div className={styles.infoCard}>
                                        <div className={styles.infoIconWrapper}>
                                            <HiOutlinePhone size={24} />
                                        </div>
                                        <div className={styles.infoContent}>
                                            <h3 className={styles.infoLabel}>
                                                Telefon
                                            </h3>
                                            <a
                                                href={`tel:${settings.footer.phone.replace(/\s/g, "")}`}
                                                className={styles.infoLink}
                                            >
                                                {settings.footer.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {settings?.footer?.email && (
                                    <div className={styles.infoCard}>
                                        <div className={styles.infoIconWrapper}>
                                            <HiOutlineMail size={24} />
                                        </div>
                                        <div className={styles.infoContent}>
                                            <h3 className={styles.infoLabel}>
                                                Email
                                            </h3>
                                            <a
                                                href={`mailto:${settings.footer.email}`}
                                                className={styles.infoLink}
                                            >
                                                {settings.footer.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {settings?.footer?.workingHours &&
                                    settings.footer.workingHours.length > 0 && (
                                        <div className={styles.infoCard}>
                                            <div
                                                className={
                                                    styles.infoIconWrapper
                                                }
                                            >
                                                <HiOutlineClock size={24} />
                                            </div>
                                            <div className={styles.infoContent}>
                                                <h3 className={styles.infoLabel}>
                                                    Radno vreme
                                                </h3>
                                                <p className={styles.infoValue}>
                                                    {settings.footer.workingHours.map(
                                                        (wh, index) => (
                                                            <span key={wh._key}>
                                                                {wh.days}:{" "}
                                                                {wh.hours}
                                                                {index <
                                                                    settings
                                                                        .footer
                                                                        .workingHours!
                                                                        .length -
                                                                        1 && (
                                                                    <br />
                                                                )}
                                                            </span>
                                                        )
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                            </div>

                            {/* Social Links */}
                            {settings?.socials &&
                                settings.socials.length > 0 && (
                                    <div className={styles.socialsSection}>
                                        <h3 className={styles.socialsTitle}>
                                            Pratite nas
                                        </h3>
                                        <div className={styles.socials}>
                                            {settings.socials.map((social) => {
                                                const Icon =
                                                    socialIcons[
                                                        social.label.toLowerCase()
                                                    ] || null;
                                                return (
                                                    <a
                                                        key={social._key}
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={
                                                            styles.socialLink
                                                        }
                                                        aria-label={
                                                            social.label
                                                        }
                                                    >
                                                        {Icon && (
                                                            <Icon size={20} />
                                                        )}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                        </div>

                        {/* Contact Form */}
                        <div className={styles.formColumn}>
                            <div className={styles.formCard}>
                                <h2 className={styles.formTitle}>
                                    {contactPage?.formTitle ||
                                        "Pošaljite nam poruku"}
                                </h2>
                                {contactPage?.formDescription && (
                                    <p className={styles.formDescription}>
                                        {contactPage.formDescription}
                                    </p>
                                )}
                                <ContactForm
                                    successMessage={contactPage?.successMessage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Map */}
            {contactPage?.googleMapsEmbed && (
                <section className={styles.mapSection}>
                    <div className={styles.container}>
                        {contactPage.mapTitle && (
                            <h2 className={styles.mapTitle}>
                                {contactPage.mapTitle}
                            </h2>
                        )}
                        <div className={styles.mapWrapper}>
                            <iframe
                                src={contactPage.googleMapsEmbed}
                                className={styles.map}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Lokacija na mapi"
                            />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
