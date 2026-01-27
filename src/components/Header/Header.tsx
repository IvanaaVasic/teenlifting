"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";
import type { SiteSettings } from "@/sanity/sanity-utils";
import { urlFromThumbnail } from "@/utils/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./Header.module.css";

type HeaderProps = {
    settings: SiteSettings | null;
};

// Helper to normalize href - adds leading slash if missing and not external
function normalizeHref(href: string | undefined): string {
    if (!href) return "#";
    // If it's an external URL or already starts with /, return as is
    if (href.startsWith("http") || href.startsWith("/") || href.startsWith("#")) {
        return href;
    }
    // Add leading slash for internal paths
    return `/${href}`;
}

export function Header({ settings }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const isMobile = useMediaQuery(1024);

    if (!settings) return null;

    const { logo, mainNav } = settings;
    const logoUrl = logo ? urlFromThumbnail(logo) : null;

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
                            width={180}
                            height={43}
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
                                            className={styles.dropdownTrigger}
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
                                        className={styles.navLink}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>
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
                                        className={styles.mobileDropdownTrigger}
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
                                    className={styles.mobileNavLink}
                                    onClick={closeMobileMenu}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            )}

            {/* Mobile Overlay */}
            {isMobile && mobileMenuOpen && (
                <div className={styles.overlay} onClick={closeMobileMenu} />
            )}
        </header>
    );
}
