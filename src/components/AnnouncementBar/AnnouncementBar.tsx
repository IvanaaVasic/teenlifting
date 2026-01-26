"use client";

import Marquee from "react-fast-marquee";
import { PortableText } from "next-sanity";
import type { Announcement } from "@/sanity/sanity-utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./AnnouncementBar.module.css";

type AnnouncementBarProps = {
    announcement: Announcement | null;
};

export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
    const isMobile = useMediaQuery(768);

    // Don't render if not enabled or no text
    if (!announcement?.enabled || !announcement?.text) {
        return null;
    }

    const { text, mobileText, animated, animationSpeed = 40 } = announcement;

    // Extract hex color from Sanity color object, with fallbacks
    const backgroundColor = announcement.backgroundColor?.hex ?? "#668077";
    const textColor = announcement.textColor?.hex ?? "#FFFFFF";

    // Use mobile text if available and on mobile, otherwise use desktop text
    const displayText = isMobile && mobileText?.length ? mobileText : text;

    const content = (
        <span className={styles.content}>
            <PortableText
                value={displayText}
                components={{
                    marks: {
                        link: ({ children, value }) => (
                            <a
                                href={value?.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "inherit",
                                    textDecoration: "underline",
                                }}
                            >
                                {children}
                            </a>
                        ),
                    },
                }}
            />
        </span>
    );

    return (
        <section
            className={styles.section}
            style={
                {
                    backgroundColor,
                    color: textColor,
                    "--announcement-text-color": textColor,
                } as React.CSSProperties
            }
        >
            {animated ? (
                <Marquee
                    speed={animationSpeed}
                    pauseOnHover
                    pauseOnClick
                    gradient={false}
                    className={styles.marquee}
                >
                    {content}
                </Marquee>
            ) : (
                <div className={styles.staticContent}>{content}</div>
            )}
        </section>
    );
}
