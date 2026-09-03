"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HiOutlineMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";
import type { SiteSettings } from "@/sanity/sanity-utils";
import { urlFromThumbnail } from "@/utils/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { normalizeHref } from "@/utils/href";
import styles from "./Header.module.css";

type HeaderProps = {
    settings: SiteSettings | null;
};

export function Header({ settings }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const isMobile = useMediaQuery(1024);
    const pathname = usePathname();

    // Lock body scroll when mobile menu is open (must run before any early return)
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    if (!settings) return null;

    const { logo, mainNav, headerCta } = settings;
    const logoUrl = logo ? urlFromThumbnail(logo) : null;
    const cta = headerCta?.label ? headerCta : null;

    /*
     * Pass the asset's real pixel dimensions so next/image knows the true
     * aspect ratio; CSS then scales it to the 30px header height. Using made-up
     * numbers here is what triggered the "width or height modified" warning.
     */
    const logoDims = logo?.asset?.metadata?.dimensions;

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        setOpenDropdown(null);
    };

    const toggleDropdown = (key: string) => {
        setOpenDropdown(openDropdown === key ? null : key);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
    };

    // A nav item is active on its own route and on anything nested under it,
    // so "Tretmani lica" stays marked while a subtype page is open.
    const isActive = (href: string | undefined) => {
        const target = normalizeHref(href);
        if (!pathname || target === "/" || target.startsWith("http")) {
            return pathname === target;
        }
        return pathname === target || pathname.startsWith(`${target}/`);
    };

    const isGroupActive = (item: (typeof mainNav)[number]) =>
        isActive(item.href) ||
        (item.children?.some((child) => isActive(child.href)) ?? false);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <Link
                    href="/"
                    className={styles.logo}
                    onClick={closeMobileMenu}
                >
                    {logoUrl ? (
                        <Image
                            src={logoUrl}
                            alt={settings.siteTitle || "Logo"}
                            width={logoDims?.width ?? 521}
                            height={logoDims?.height ?? 121}
                            className={styles.logoImage}
                            priority
                        />
                    ) : (
                        <span className={styles.logoText}>
                            {settings.siteTitle || "Teenlifting"}
                        </span>
                    )}
                </Link>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <nav className={styles.desktopNav}>
                        {mainNav?.map((item) => (
                            <div key={item._key} className={styles.navItem}>
                                {item.children && item.children.length > 0 ? (
                                    <div className={styles.dropdown}>
                                        <button
                                            className={`${styles.dropdownTrigger} ${
                                                isGroupActive(item)
                                                    ? styles.navLinkActive
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                toggleDropdown(item._key)
                                            }
                                            onMouseEnter={() =>
                                                setOpenDropdown(item._key)
                                            }
                                        >
                                            {item.label}
                                            <HiChevronDown
                                                className={`${styles.chevron} ${
                                                    openDropdown === item._key
                                                        ? styles.chevronOpen
                                                        : ""
                                                }`}
                                            />
                                        </button>
                                        <div
                                            className={`${styles.dropdownMenu} ${
                                                openDropdown === item._key
                                                    ? styles.dropdownOpen
                                                    : ""
                                            }`}
                                            onMouseLeave={() =>
                                                setOpenDropdown(null)
                                            }
                                        >
                                            {item.href && (
                                                <Link
                                                    href={normalizeHref(item.href)}
                                                    className={
                                                        styles.dropdownLink
                                                    }
                                                    onClick={() =>
                                                        setOpenDropdown(null)
                                                    }
                                                >
                                                    {item.label}
                                                </Link>
                                            )}
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child._key}
                                                    href={normalizeHref(child.href)}
                                                    className={
                                                        styles.dropdownLink
                                                    }
                                                    onClick={() =>
                                                        setOpenDropdown(null)
                                                    }
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={normalizeHref(item.href)}
                                        className={`${styles.navLink} ${
                                            isActive(item.href)
                                                ? styles.navLinkActive
                                                : ""
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>
                )}

                {/* Desktop CTA */}
                {!isMobile && cta && (
                    <Link
                        href={normalizeHref(cta.href)}
                        className={styles.cta}
                    >
                        {cta.label}
                    </Link>
                )}

                {/* Mobile Menu Button */}
                {isMobile && (
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={toggleMobileMenu}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? (
                            <HiX size={28} />
                        ) : (
                            <HiOutlineMenuAlt3 size={28} />
                        )}
                    </button>
                )}
            </div>

            {/* Mobile Navigation */}
            {isMobile && (
                <nav
                    className={`${styles.mobileNav} ${
                        mobileMenuOpen ? styles.mobileNavOpen : ""
                    }`}
                >
                    {mainNav?.map((item) => (
                        <div key={item._key} className={styles.mobileNavItem}>
                            {item.children && item.children.length > 0 ? (
                                <>
                                    <button
                                        className={`${styles.mobileDropdownTrigger} ${
                                            isGroupActive(item)
                                                ? styles.mobileNavLinkActive
                                                : ""
                                        }`}
                                        onClick={() =>
                                            toggleDropdown(item._key)
                                        }
                                    >
                                        {item.label}
                                        <HiChevronDown
                                            className={`${styles.chevron} ${
                                                openDropdown === item._key
                                                    ? styles.chevronOpen
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                    <div
                                        className={`${styles.mobileDropdownMenu} ${
                                            openDropdown === item._key
                                                ? styles.mobileDropdownOpen
                                                : ""
                                        }`}
                                    >
                                        {item.href && (
                                            <Link
                                                href={normalizeHref(item.href)}
                                                className={
                                                    styles.mobileDropdownLink
                                                }
                                                onClick={closeMobileMenu}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                        {item.children.map((child) => (
                                            <Link
                                                key={child._key}
                                                href={normalizeHref(child.href)}
                                                className={
                                                    styles.mobileDropdownLink
                                                }
                                                onClick={closeMobileMenu}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={normalizeHref(item.href)}
                                    className={`${styles.mobileNavLink} ${
                                        isActive(item.href)
                                            ? styles.mobileNavLinkActive
                                            : ""
                                    }`}
                                    onClick={closeMobileMenu}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}

                    {cta && (
                        <div className={styles.mobileCtaWrapper}>
                            <Link
                                href={normalizeHref(cta.href)}
                                className={styles.mobileCta}
                                onClick={closeMobileMenu}
                            >
                                {cta.label}
                            </Link>
                        </div>
                    )}
                </nav>
            )}

            {/* Mobile Overlay */}
            {isMobile && mobileMenuOpen && (
                <div className={styles.overlay} onClick={closeMobileMenu} />
            )}
        </header>
    );
}
