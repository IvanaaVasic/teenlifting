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
            // "aside" only reaches here when nothing followed it to pair with.
            const layoutClass =
                layout === "half"
                    ? styles.imageHalf
                    : layout === "third" || layout === "aside"
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
        imageAside: ({ value }) => {
            const image = value?.image;
            if (!image?.asset?.url) return null;

            return (
                <div className={styles.imageAside}>
                    <figure className={styles.imageAsideFigure}>
                        <div className={styles.imageAsideWrapper}>
                            <Image
                                src={image.asset.url}
                                alt={image.alt || ""}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 280px"
                                placeholder={
                                    image.asset.metadata?.lqip
                                        ? "blur"
                                        : "empty"
                                }
                                blurDataURL={image.asset.metadata?.lqip}
                            />
                        </div>
                        {image.caption && (
                            <figcaption className={styles.caption}>
                                {image.caption}
                            </figcaption>
                        )}
                    </figure>
                    <div className={styles.imageAsideText}>
                        <PortableText
                            value={value.blocks}
                            components={portableTextComponents}
                        />
                    </div>
                </div>
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

            /*
             * A price table right-aligns its last column and keeps it on one
             * line; a table whose last column is prose must not. Nothing in the
             * schema says which this is, so go by the cells.
             */
            const isValueTable = value.rows.every(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (row: any) =>
                    !row.cells?.length ||
                    String(row.cells[row.cells.length - 1] || "").length <= 24
            );

            /*
             * The data attributes are the hook a page needs to restyle a table
             * without reaching for a hashed CSS module class - the price list
             * turns these titles into numbered group headings.
             */
            return (
                <div className={styles.tableWrapper} data-block="table">
                    {value.title && (
                        <h4
                            className={styles.tableTitle}
                            data-block="table-title"
                        >
                            {value.title}
                        </h4>
                    )}
                    <table
                        className={`${styles.table} ${
                            isValueTable ? styles.valueTable : ""
                        }`}
                    >
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
        cardGrid: ({ value }) => {
            const cards = (value?.cards || []).filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (card: any) => card?.title || card?.text
            );
            if (!cards.length) return null;

            return (
                <div className={styles.cardGrid}>
                    {value.title && (
                        <h2
                            id={slugify(value.title)}
                            className={styles.heading2}
                        >
                            {value.title}
                        </h2>
                    )}
                    <div className={styles.cardGridList}>
                        {cards.map(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (card: any, index: number) => (
                                <div
                                    key={card._key || index}
                                    className={styles.card}
                                >
                                    {card.title && (
                                        <h3 className={styles.cardTitle}>
                                            {card.title}
                                        </h3>
                                    )}
                                    {card.text && (
                                        <p className={styles.cardText}>
                                            {card.text}
                                        </p>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            );
        },
        twoColumnBlocks: ({ value }) => {
            const blocks = (value?.blocks || []).filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (block: any) => block?.label || block?.text
            );
            if (!blocks.length) return null;

            return (
                <div className={styles.columnBlocks}>
                    {value.title && (
                        <h2
                            id={slugify(value.title)}
                            className={styles.heading2}
                        >
                            {value.title}
                        </h2>
                    )}
                    <div className={styles.columnBlocksList}>
                        {blocks.map(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (block: any, index: number) => (
                                <div
                                    key={block._key || index}
                                    className={styles.columnBlock}
                                >
                                    {block.label && (
                                        <p
                                            className={styles.columnBlockLabel}
                                        >
                                            {block.label}
                                        </p>
                                    )}
                                    {block.text && (
                                        <p className={styles.columnBlockText}>
                                            {block.text}
                                        </p>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            );
        },
        statRow: ({ value }) => {
            const values = (value?.values || []).filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (item: any) => item?.value
            );
            if (!value?.label && !value?.text && !values.length) return null;

            // The label doubles as the anchor, so the row can be a stop in the
            // "Na ovoj strani" list without carrying a heading of its own.
            return (
                <div
                    id={value.label ? slugify(value.label) : undefined}
                    className={styles.statRow}
                >
                    {(value.label || value.text) && (
                        <div>
                            {value.label && (
                                <p className={styles.statRowLabel}>
                                    {value.label}
                                </p>
                            )}
                            {value.text && (
                                <p className={styles.statRowText}>
                                    {value.text}
                                </p>
                            )}
                        </div>
                    )}
                    {values.length > 0 && (
                        <ul className={styles.statRowValues}>
                            {values.map(
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                (item: any, index: number) => (
                                    <li
                                        key={item._key || index}
                                        className={`${styles.statRowValue} ${
                                            item.highlight
                                                ? styles.statRowValueActive
                                                : ""
                                        }`}
                                    >
                                        {item.value}
                                    </li>
                                )
                            )}
                        </ul>
                    )}
                </div>
            );
        },
    },
    block: {
        // The id lets the sticky "Na ovoj strani" list scroll here; it is
        // derived from the heading text by the same helper the list uses.
        // A blog post keeps Sanity's default block styles, so its section
        // headings arrive as h1 where a page section would use h2. Rendered as
        // an h2 - the page already has its own h1 - one step larger.
        h1: ({ children, value }) => (
            <h2 id={blockAnchorId(value)} className={styles.heading1}>
                {children}
            </h2>
        ),
        h2: ({ children, value }) => (
            <h2 id={blockAnchorId(value)} className={styles.heading2}>
                {children}
            </h2>
        ),
        h3: ({ children, value }) => (
            <h3 id={blockAnchorId(value)} className={styles.heading3}>
                {children}
            </h3>
        ),
        h4: ({ children, value }) => (
            <h4 id={blockAnchorId(value)} className={styles.heading4}>
                {children}
            </h4>
        ),
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

/**
 * PortableText hands the renderer a flat list, so an image and the paragraphs
 * that follow it are siblings and cannot share a row. An image marked
 * `layout: "aside"` is folded here into a single block together with its run of
 * paragraphs, which the `imageAside` renderer then lays out as two columns.
 *
 * The run ends at the first block that is not a plain paragraph - a heading, a
 * quote, a list, another image - or at a blank line, the gesture editors
 * already use to end a passage.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function groupAsideImages(value: any[]): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isPlainParagraph = (block: any) =>
        block?._type === "block" &&
        (!block.style || block.style === "normal") &&
        !block.listItem &&
        blockText(block) !== "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const grouped: any[] = [];

    for (let i = 0; i < value.length; i++) {
        const node = value[i];

        if (node?._type !== "image" || node.layout !== "aside") {
            grouped.push(node);
            continue;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blocks: any[] = [];
        let next = i + 1;
        while (next < value.length && isPlainParagraph(value[next])) {
            blocks.push(value[next]);
            next += 1;
        }

        // Nothing to stand beside - leave the image to the normal renderer.
        if (!blocks.length) {
            grouped.push(node);
            continue;
        }

        grouped.push({
            _type: "imageAside",
            _key: `aside-${node._key || i}`,
            image: node,
            blocks,
        });
        i = next - 1;
    }

    return grouped;
}

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
            <PortableText
                value={groupAsideImages(value)}
                components={portableTextComponents}
            />
        </div>
    );
}
