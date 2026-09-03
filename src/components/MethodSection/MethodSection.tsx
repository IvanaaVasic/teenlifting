import type { MethodSection as MethodSectionType } from "@/sanity/sanity-utils";
import styles from "./MethodSection.module.css";

export interface MethodSectionProps {
    data?: MethodSectionType;
    /** Sequence number for the eyebrow, e.g. "01". Computed by the page. */
    number?: string;
}

/** True when there is enough content for the section to be worth rendering. */
export function hasMethodSection(data?: MethodSectionType): boolean {
    return Boolean(data?.title || data?.text || data?.chips?.length);
}

export function MethodSection({ data, number }: MethodSectionProps) {
    if (!hasMethodSection(data)) {
        return null;
    }

    const chips = data!.chips?.filter(Boolean) ?? [];
    const eyebrow = [number, data!.eyebrow].filter(Boolean).join(" - ");

    return (
        <section id="metoda" className={styles.section}>
            <div className={styles.aside}>
                {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
                {data!.title && (
                    <h2 className={styles.title}>{data!.title}</h2>
                )}
            </div>

            <div className={styles.body}>
                {data!.text && <p className={styles.text}>{data!.text}</p>}
                {chips.length > 0 && (
                    <ul className={styles.chips}>
                        {chips.map((chip) => (
                            <li key={chip} className={styles.chip}>
                                {chip}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
