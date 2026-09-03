"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { normalizeHref } from "@/utils/href";
import { blockAnchorId, blockText, slugify } from "@/utils/toc";
import { FaqAccordion } from "./FaqAccordion";
import styles from "./PortableTextContent.module.css";

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
                        href={normalizeHref(value.href)}
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
        dataTable: ({ value }) => {
            if (!value?.rows?.length) return null;

            return (
                <div className={styles.tableWrapper}>
                    {value.title && (
                        <h4 className={styles.tableTitle}>{value.title}</h4>
                    )}
                    <table className={styles.table}>
                        <tbody>
                            {value.rows.map(
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                (row: any, rowIndex: number) => (
                                    <tr
                                        key={row._key || rowIndex}
                                        className={
                                            row.isHeader
                                                ? styles.headerRow
                                                : undefined
                                        }
                                    >
                                        {row.cells?.map(
                                            (cell: string, cellIndex: number) =>
                                                row.isHeader ? (
                                                    <th
                                                        key={cellIndex}
                                                        className={
                                                            styles.headerCell
                                                        }
                                                    >
                                                        {cell}
                                                    </th>
                                                ) : (
                                                    <td
                                                        key={cellIndex}
                                                        className={
                                                            styles.dataCell
                                                        }
                                                    >
                                                        {cell}
                                                    </td>
                                                )
                                        )}
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            );
        },
        numberedSteps: ({ value }) => {
            const steps = (value?.steps || []).filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (step: any) => step?.title || step?.text
            );
            if (!steps.length) return null;

            return (
                <div className={styles.stepsBlock}>
                    {value.title && (
                        <h2
                            id={slugify(value.title)}
                            className={styles.heading2}
                        >
                            {value.title}
                        </h2>
                    )}
                    <div className={styles.stepsList}>
                        {steps.map(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (step: any, index: number) => (
                                <div
                                    key={step._key || index}
                                    className={styles.step}
                                >
                                    <span className={styles.stepNumber}>
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        {step.title && (
                                            <h3 className={styles.stepTitle}>
                                                {step.title}
                                            </h3>
                                        )}
                                        {step.text && (
                                            <p className={styles.stepText}>
                                                {step.text}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            );
        },
        faqSection: ({ value }) => (
            <FaqAccordion title={value?.title} items={value?.items} />
        ),
    },
    block: {
        // The id lets the sticky "Na ovoj strani" list scroll here; it is
        // derived from the heading text by the same helper the list uses.
        h2: ({ children, value }) => (
            <h2 id={blockAnchorId(value)} className={styles.heading2}>
                {children}
            </h2>
        ),
        h3: ({ children }) => <h3 className={styles.heading3}>{children}</h3>,
        h4: ({ children }) => <h4 className={styles.heading4}>{children}</h4>,
        blockquote: ({ children }) => (
            <blockquote className={styles.blockquote}>{children}</blockquote>
        ),
        // Editors leave blank lines between paragraphs; rendered, each one is
        // an empty 30px gap in the flow.
        normal: ({ children, value }) =>
            blockText(value) ? (
                <p className={styles.paragraph}>{children}</p>
            ) : null,
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
        // Separate classes: the bullet marker is an em dash, the number marker
        // is a CSS counter, and each needs its own grid column width.
        bullet: ({ children }) => (
            <li className={styles.listItemBullet}>
                <span>{children}</span>
            </li>
        ),
        number: ({ children }) => (
            <li className={styles.listItemNumber}>
                <span>{children}</span>
            </li>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <strong className={styles.strong}>{children}</strong>
        ),
        em: ({ children }) => <em className={styles.em}>{children}</em>,
        underline: ({ children }) => (
            <span className={styles.underline}>{children}</span>
        ),
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
