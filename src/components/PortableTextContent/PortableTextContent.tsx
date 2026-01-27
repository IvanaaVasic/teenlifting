"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import styles from "./PortableTextContent.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?.url) return null;
            const layout = value.layout || "full";
            const layoutClass =
                layout === "half"
                    ? styles.imageHalf
                    : layout === "third"
                      ? styles.imageThird
                      : styles.imageFull;

            return (
                <figure className={`${styles.figure} ${layoutClass}`}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={value.asset.url}
                            alt={value.alt || ""}
                            fill
                            className={styles.image}
                            sizes={
                                layout === "third"
                                    ? "33vw"
                                    : layout === "half"
                                      ? "50vw"
                                      : "100vw"
                            }
                            placeholder={
                                value.asset.metadata?.lqip ? "blur" : "empty"
                            }
                            blurDataURL={value.asset.metadata?.lqip}
                        />
                    </div>
                    {value.caption && (
                        <figcaption className={styles.caption}>
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
        ctaButton: ({ value }) => {
            if (!value?.label || !value?.href) return null;
            const styleClass =
                value.style === "secondary"
                    ? styles.ctaSecondary
                    : value.style === "outline"
                      ? styles.ctaOutline
                      : styles.ctaPrimary;

            return (
                <div className={styles.ctaWrapper}>
                    <Link
                        href={value.href}
                        className={`${styles.cta} ${styleClass}`}
                    >
                        {value.label}
                    </Link>
                </div>
            );
        },
        imageGallery: ({ value }) => {
            if (!value?.images?.length) return null;
            const columns = value.columns || 2;

            return (
                <div
                    className={styles.gallery}
                    style={
                        { "--gallery-columns": columns } as React.CSSProperties
                    }
                >
                    {value.images.map(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (img: any, index: number) =>
                            img.asset?.url && (
                                <div
                                    key={img._key || index}
                                    className={styles.galleryItem}
                                >
                                    <Image
                                        src={img.asset.url}
                                        alt={img.alt || ""}
                                        fill
                                        className={styles.image}
                                        sizes={`(max-width: 768px) 100vw, ${100 / columns}vw`}
                                        placeholder={
                                            img.asset.metadata?.lqip
                                                ? "blur"
                                                : "empty"
                                        }
                                        blurDataURL={img.asset.metadata?.lqip}
                                    />
                                </div>
                            )
                    )}
                </div>
            );
        },
    },
    block: {
        h2: ({ children }) => <h2 className={styles.heading2}>{children}</h2>,
        h3: ({ children }) => <h3 className={styles.heading3}>{children}</h3>,
        h4: ({ children }) => <h4 className={styles.heading4}>{children}</h4>,
        blockquote: ({ children }) => (
            <blockquote className={styles.blockquote}>{children}</blockquote>
        ),
        normal: ({ children }) => (
            <p className={styles.paragraph}>{children}</p>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className={styles.bulletList}>{children}</ul>
        ),
        number: ({ children }) => (
            <ol className={styles.numberList}>{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => (
            <li className={styles.listItem}>{children}</li>
        ),
        number: ({ children }) => (
            <li className={styles.listItem}>{children}</li>
        ),
    },
    marks: {
        link: ({ children, value }) => (
            <a
                href={value?.href}
                className={styles.link}
                target={value?.href?.startsWith("http") ? "_blank" : undefined}
                rel={
                    value?.href?.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                }
            >
                {children}
            </a>
        ),
    },
};

interface PortableTextContentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any[];
    className?: string;
}

export function PortableTextContent({
    value,
    className,
}: PortableTextContentProps) {
    if (!value) return null;

    return (
        <div className={`${styles.content} ${className || ""}`}>
            <PortableText value={value} components={portableTextComponents} />
        </div>
    );
}
