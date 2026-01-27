import Link from "next/link";
import Image from "next/image";
import {
    HiOutlineLocationMarker,
    HiOutlinePhone,
    HiOutlineMail,
} from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import type { SiteSettings } from "@/sanity/sanity-utils";
import styles from "./Footer.module.css";

export interface FooterProps {
    settings: SiteSettings;
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

export function Footer({ settings }: FooterProps) {
    if (!settings) return null;

    const { logo, footer, socials, mainNav, siteTitle } = settings;
    const currentYear = new Date().getFullYear();

    const hasFooterInfo = footer?.address || footer?.phone || footer?.email;
    const hasSocials = socials && socials.length > 0;
    const hasNav = mainNav && mainNav.length > 0;

    if (!logo && !hasFooterInfo && !hasSocials && !hasNav) return null;

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Logo & About */}
                    <div className={styles.column}>
                        {logo?.asset?.url && (
                            <Link href="/" className={styles.logoLink}>
                                <Image
                                    src={logo.asset.url}
                                    alt={siteTitle || "Logo"}
                                    width={160}
                                    height={40}
                                    className={styles.logo}
                                />
                            </Link>
                        )}
                        <p className={styles.about}>
                            Profesionalni tretmani za lice i telo. Vaša lepota
                            je naša misija.
                        </p>
                        {socials && socials.length > 0 && (
                            <ul className={styles.socials}>
                                {socials.map((social) => {
                                    const Icon =
                                        socialIcons[
                                            social.label.toLowerCase()
                                        ] || null;
                                    return (
                                        <li
                                            key={social._key}
                                            className={styles.socialItem}
                                        >
                                            <a
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.socialLink}
                                            >
                                                {Icon && (
                                                    <Icon
                                                        size={18}
                                                        className={
                                                            styles.socialIcon
                                                        }
                                                    />
                                                )}
                                                <span>{social.label}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Brzi linkovi</h3>
                        <nav className={styles.nav}>
                            {mainNav?.map((item) => (
                                <Link
                                    key={item._key}
                                    href={item.href}
                                    className={styles.navLink}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Kontakt</h3>
                        <ul className={styles.contactList}>
                            {footer?.address && (
                                <li className={styles.contactItem}>
                                    <HiOutlineLocationMarker
                                        className={styles.contactIcon}
                                        size={20}
                                    />
                                    <span>{footer.address}</span>
                                </li>
                            )}
                            {footer?.phone && (
                                <li className={styles.contactItem}>
                                    <HiOutlinePhone
                                        className={styles.contactIcon}
                                        size={20}
                                    />
                                    <a
                                        href={`tel:${footer.phone.replace(/\s/g, "")}`}
                                        className={styles.contactLink}
                                    >
                                        {footer.phone}
                                    </a>
                                </li>
                            )}
                            {footer?.email && (
                                <li className={styles.contactItem}>
                                    <HiOutlineMail
                                        className={styles.contactIcon}
                                        size={20}
                                    />
                                    <a
                                        href={`mailto:${footer.email}`}
                                        className={styles.contactLink}
                                    >
                                        {footer.email}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        Copyright &copy; {currentYear}{" "}
                        {siteTitle || "Teenlifting"}.
                    </p>
                </div>
            </div>
        </footer>
    );
}
