"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import type { Hero as HeroType } from "@/sanity/sanity-utils";
import styles from "./Hero.module.css";
// import classNames from 'classnames';

import "swiper/css";
import "swiper/css/pagination";

export interface HeroProps {
    hero: HeroType;
}

export function Hero({ hero }: HeroProps) {
    if (!hero?.slides?.length) {
        return null;
    }

    return (
        <section className={styles.hero} aria-label="Hero slider">
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
                loop={hero.slides.length > 1}
                className={styles.swiper}
            >
                {hero.slides.map((slide) => (
                    <SwiperSlide key={slide._key} className={styles.slide}>
                        {slide.image?.asset?.url && (
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={slide.image.asset.url}
                                    alt={slide.title || "Hero image"}
                                    fill
                                    priority
                                    sizes="100vw"
                                    className={styles.image}
                                    placeholder={
                                        slide.image.asset.metadata?.lqip
                                            ? "blur"
                                            : "empty"
                                    }
                                    blurDataURL={
                                        slide.image.asset.metadata?.lqip
                                    }
                                />
                                {slide.overlay && (
                                    <div className={styles.overlay} />
                                )}
                            </div>
                        )}

                        <div className={styles.content}>
                            <div className={styles.contentInner}>
                                {slide.title && (
                                    <h1 className={styles.title}>
                                        {slide.title}
                                    </h1>
                                )}
                                {slide.subtitle && (
                                    <p className={styles.subtitle}>
                                        {slide.subtitle}
                                    </p>
                                )}
                                {slide.cta?.href && slide.cta?.label && (
                                    <Link
                                        href={slide.cta.href}
                                        className={styles.cta}
                                    >
                                        {slide.cta.label}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
