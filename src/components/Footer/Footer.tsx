import Link from "next/link";
import Image from "next/image";
import type { SiteSettings, NavItem } from "@/sanity/sanity-utils";
import { normalizeHref } from "@/utils/href";
import styles from "./Footer.module.css";

export interface FooterProps {
    settings: SiteSettings;
}

/**
 * Splits mainNav into the two link columns the redesign asks for.
 * Treatment pages are detected by their route, not by their label, so
 * renaming a nav item in Sanity can't move it into the wrong column.
 */
function isTreatmentItem(item: NavItem): boolean {
    if (item.children && item.children.length > 0) return true;
    return normalizeHref(item.href).startsWith("/tretmani");
}

export function Footer({ settings }: FooterProps) {
    if (!settings) return null;

    const { logo, footer, socials, mainNav, siteTitle } = settings;
    const currentYear = new Date().getFullYear();

    const hasFooterInfo =
        footer?.address ||
        footer?.phone ||
        footer?.email ||
        (footer?.workingHours && footer.workingHours.length > 0);
    const hasSocials = socials && socials.length > 0;
    const hasNav = mainNav && mainNav.length > 0;

    if (!logo && !footer?.about && !hasFooterInfo && !hasSocials && !hasNav)
        return null;

    // Treatment column lists the groups, not every subtype — a group without
    // its own href falls back to the first subtype under it.
    const treatmentLinks = (mainNav ?? []).filter(isTreatmentItem).map((item) => ({
        _key: item._key,
        label: item.label,
        href: item.href || item.children?.[0]?.href,
    }));
    const centerLinks = (mainNav ?? []).filter((item) => !isTreatmentItem(item));

    return (
        <footer className={styles.footer}>
            <div className={styles.grid}>
                {/* Brand */}
                <div className={styles.column}>
                    {logo?.asset?.url ? (
                        <Link href="/" className={styles.logoLink}>
                            <Image
                                src={logo.asset.url}
                                alt={siteTitle || "Logo"}
                                width={
                                    logo.asset.metadata?.dimensions?.width ??
                                    521
                                }
                                height={
                                    logo.asset.metadata?.dimensions?.height ??
                                    121
                                }
                                className={styles.logo}
                            />
                        </Link>
                    ) : (
                        <Link href="/" className={styles.logoText}>
                            {siteTitle || "Teenlifting"}
                        </Link>
                    )}
                    {footer?.about && (
                        <p className={styles.about}>{footer.about}</p>
                    )}
                </div>

                {/* Treatments */}
                {treatmentLinks.length > 0 && (
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Tretmani</h3>
                        <nav className={styles.nav}>
                            {treatmentLinks.map((item) => (
                                <Link
                                    key={item._key}
                                    href={normalizeHref(item.href)}
                                    className={styles.navLink}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}

                {/* Center */}
                {centerLinks.length > 0 && (
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Centar</h3>
                        <nav className={styles.nav}>
                            {centerLinks.map((item) => (
                                <Link
                                    key={item._key}
                                    href={normalizeHref(item.href)}
                                    className={styles.navLink}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}

                {/* Contact */}
                {hasFooterInfo && (
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Kontakt</h3>
                        <ul className={styles.contactList}>
                            {footer?.address && (
                                <li className={styles.contactItem}>
                                    {footer.address}
                                </li>
                            )}
                            {footer?.phone && (
                                <li className={styles.contactItem}>
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
                                    <a
                                        href={`mailto:${footer.email}`}
                                        className={styles.contactLink}
                                    >
                                        {footer.email}
                                    </a>
                                </li>
                            )}
                            {footer?.workingHours &&
                                footer.workingHours.length > 0 && (
                                    <li className={styles.hours}>
                                        {footer.workingHours.map((wh) => (
                                            <span key={wh._key}>
                                                {wh.days}: {wh.hours}
                                            </span>
                                        ))}
                                    </li>
                                )}
                        </ul>
                    </div>
                )}
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottom}>
                <p className={styles.copyright}>
                    Copyright &copy; {currentYear}{" "}
                    {siteTitle || "Teenlifting"}.
                </p>
                {hasSocials && (
                    <ul className={styles.socials}>
                        {socials.map((social) => (
                            <li key={social._key}>
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                >
                                    {social.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </footer>
    );
}
