"use client";

import { useState } from "react";
import { slugify } from "@/utils/toc";
import styles from "./PortableTextContent.module.css";

type FaqItem = {
    _key?: string;
    question?: string;
    answer?: string;
};

type FaqAccordionProps = {
    title?: string;
    items?: FaqItem[];
};

/**
 * No library: one index of the open item, `null` when everything is collapsed.
 * The first question opens on load, as in the design.
 */
export function FaqAccordion({ title, items }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const questions = (items || []).filter((item) => item.question);
    if (!questions.length) return null;

    return (
        <div className={styles.faqBlock}>
            {title && (
                <h2 id={slugify(title)} className={styles.heading2}>
                    {title}
                </h2>
            )}
            <div className={styles.faqList}>
                {questions.map((item, index) => {
                    const isOpen = openIndex === index;
                    const key = item._key || String(index);

                    return (
                        <div key={key} className={styles.faqItem}>
                            <button
                                type="button"
                                className={styles.faqQuestion}
                                aria-expanded={isOpen}
                                aria-controls={`faq-answer-${key}`}
                                onClick={() =>
                                    setOpenIndex(isOpen ? null : index)
                                }
                            >
                                <span className={styles.faqQuestionText}>
                                    {item.question}
                                </span>
                                <span
                                    className={styles.faqToggle}
                                    aria-hidden="true"
                                >
                                    {isOpen ? "−" : "+"}
                                </span>
                            </button>
                            {item.answer && (
                                <div
                                    id={`faq-answer-${key}`}
                                    className={`${styles.faqAnswerWrapper} ${
                                        isOpen ? styles.faqAnswerOpen : ""
                                    }`}
                                >
                                    <p className={styles.faqAnswer}>
                                        {item.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
