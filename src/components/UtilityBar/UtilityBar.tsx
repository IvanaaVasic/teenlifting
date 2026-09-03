import type { SiteSettings } from "@/sanity/sanity-utils";
import styles from "./UtilityBar.module.css";

type UtilityBarProps = {
    settings: SiteSettings | null;
};

export function UtilityBar({ settings }: UtilityBarProps) {
    const footer = settings?.footer;
    if (!footer) return null;

    const { address, phone, workingHours } = footer;
    if (!address && !phone && !workingHours?.length) return null;

    const hours = workingHours?.length
        ? workingHours.map((wh) => `${wh.days} ${wh.hours}`).join(" · ")
        : null;

    return (
        <div className={styles.bar}>
            {address && <span className={styles.address}>{address}</span>}
            <div className={styles.right}>
                {hours && <span className={styles.hours}>{hours}</span>}
                {phone && (
                    <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className={styles.phone}
                    >
                        {phone}
                    </a>
                )}
            </div>
        </div>
    );
}
