import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/sanity/sanity-utils";
import { urlFromThumbnail } from "@/utils/image";
import styles from "./not-found.module.css";

export default async function NotFound() {
    const settings = await getSiteSettings();
    const logoUrl = settings?.logo ? urlFromThumbnail(settings.logo) : null;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {logoUrl ? (
                    <Image
                        src={logoUrl}
                        alt={settings?.siteTitle || "Logo"}
                        width={200}
                        height={80}
                        className={styles.logo}
                        priority
                    />
                ) : (
                    <span className={styles.logoText}>
                        {settings?.siteTitle || "Teenlifting"}
                    </span>
                )}

                <h1 className={styles.errorCode}>404</h1>

                <p className={styles.message}>
                    Stranica koju tražite ne postoji ili je njen sadržaj u
                    međuvremenu promenjen.
                </p>

                <Link href="/" className={styles.button}>
                    Povratak na početnu
                </Link>
            </div>
        </div>
    );
}
