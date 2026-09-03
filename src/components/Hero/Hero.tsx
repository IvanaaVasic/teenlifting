"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import type { Hero as HeroType } from "@/sanity/sanity-utils";
import { normalizeHref } from "@/utils/href";
import styles from "./Hero.module.css";

import "swiper/css";
import "swiper/css/pagination";

export interface HeroProps {
    hero?: HeroType;
}

export function Hero({ hero }: HeroProps) {
    if (!hero?.slides?.length) {
        return null;
    }

    // Copy comes from the first slide and stays put; only the image cycles.
    const slide = hero.slides[0];
    const images = hero.slides
        .map((s) => s.image)
        .filter((img) => img?.asset?.url);
    const hasSlider = images.length > 1;
    const stats = slide.stats?.filter((stat) => stat.value || stat.label) ?? [];

    return (
        <section className={styles.hero}>
            <div className={styles.copy}>
                {slide.eyebrow && (
                    <p className={styles.eyebrow}>{slide.eyebrow}</p>
                )}

                {(slide.title || slide.titleItalic) && (
                    <h1 className={styles.title}>
                        {slide.title}
                        {slide.titleItalic && (
                            <>
                                {slide.title && <br />}
                                <em className={styles.titleItalic}>
                                    {slide.titleItalic}
                                </em>
                            </>
                        )}
                    </h1>
                )}

                {slide.subtitle && (
                    <p className={styles.subtitle}>{slide.subtitle}</p>
                )}

                {(slide.cta?.label || slide.secondaryCta?.label) && (
                    <div className={styles.actions}>
                        {slide.cta?.label && (
                            <Link
                                href={normalizeHref(slide.cta.href)}
                                className={styles.ctaPrimary}
                            >
                                {slide.cta.label}
                            </Link>
                        )}
                        {slide.secondaryCta?.label && (
                            <Link
                                href={normalizeHref(slide.secondaryCta.href)}
                                className={styles.ctaSecondary}
                            >
                                {slide.secondaryCta.label}
                            </Link>
                        )}
                    </div>
                )}

                {stats.length > 0 && (
                    <dl className={styles.stats}>
                        {stats.map((stat) => (
                            <div key={stat._key} className={styles.stat}>
                                <dt className={styles.statValue}>
                                    {stat.value}
                                </dt>
                                <dd className={styles.statLabel}>
                                    {stat.label}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}
            </div>

            <div className={styles.media}>
                {hasSlider ? (
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        pagination={{
                            clickable: true,
                            bulletClass: styles.bullet,
                            bulletActiveClass: styles.bulletActive,
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop
                        className={styles.swiper}
                        aria-label="Hero slike"
                    >
                        {hero.slides.map(
                            (s, index) =>
                                s.image?.asset?.url && (
                                    <SwiperSlide
                                        key={s._key}
                                        className={styles.mediaSlide}
                                    >
                                        <Image
                                            src={s.image.asset.url}
                                            alt={s.title || "Teenlifting"}
                                            fill
                                            priority={index === 0}
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className={styles.image}
                                            placeholder={
                                                s.image.asset.metadata?.lqip
                                                    ? "blur"
                                                    : "empty"
                                            }
                                            blurDataURL={
                                                s.image.asset.metadata?.lqip
                                            }
                                        />
                                    </SwiperSlide>
                                )
                        )}
                    </Swiper>
                ) : (
                    images[0]?.asset?.url && (
                        <Image
                            src={images[0].asset.url}
                            alt={slide.title || "Teenlifting"}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className={styles.image}
                            placeholder={
                                images[0].asset.metadata?.lqip
                                    ? "blur"
                                    : "empty"
                            }
                            blurDataURL={images[0].asset.metadata?.lqip}
                        />
                    )
                )}
            </div>
        </section>
    );
}
