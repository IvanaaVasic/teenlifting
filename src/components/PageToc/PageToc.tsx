"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { normalizeHref } from "@/utils/href";
import type { TocEntry } from "@/utils/toc";
import styles from "./PageToc.module.css";

type PageTocProps = {
    entries: TocEntry[];
    /** Optional button under the list - skipped when the CMS leaves it empty. */
    cta?: { label?: string; href?: string };
};

export function PageToc({ entries, cta }: PageTocProps) {
    const [activeId, setActiveId] = useState<string>("");
    const visible = useRef<Set<string>>(new Set());

    useEffect(() => {
        const elements = entries
            .map((entry) => document.getElementById(entry.id))
            .filter((el): el is HTMLElement => el !== null);

        if (!elements.length) return;

        /*
         * The margins leave a band just under the sticky header. A heading
         * counts as current while it sits in that band; when none does - long
         * stretches of body copy - the last match stays lit.
         */
        const observer = new IntersectionObserver(
            (records) => {
                for (const record of records) {
                    if (record.isIntersecting) {
                        visible.current.add(record.target.id);
                    } else {
                        visible.current.delete(record.target.id);
                    }
                }

                const current = entries.find((entry) =>
                    visible.current.has(entry.id)
                );
                if (current) setActiveId(current.id);
            },
            { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [entries]);

    if (!entries.length && !cta?.label) return null;

    return (
        <aside className={styles.toc}>
            {entries.length > 0 && (
                <>
                    <span className={styles.label}>Na ovoj strani</span>
                    <nav className={styles.list}>
                        {entries.map((entry) => (
                            <a
                                key={entry.id}
                                href={`#${entry.id}`}
                                className={`${styles.link} ${
                                    activeId === entry.id ? styles.active : ""
                                }`}
                            >
                                {entry.label}
                            </a>
                        ))}
                    </nav>
                </>
            )}

            {cta?.label && cta?.href && (
                <Link
                    href={normalizeHref(cta.href)}
                    className={styles.button}
                >
                    {cta.label}
                </Link>
            )}
        </aside>
    );
}
