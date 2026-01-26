"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import type { Card } from "@/sanity/sanity-utils";
import styles from "./CardSection.module.css";

import "swiper/css";
import "swiper/css/pagination";

export interface CardSectionProps {
    title?: string;
    intro?: string;
    cards: Card[];
}

function CardItem({ card }: { card: Card }) {
    return (
        <article className={styles.card}>
            {card.image?.asset?.url && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={card.image.asset.url}
                        alt={card.title || "Slika tretmana"}
                        fill
                        className={styles.image}
                        placeholder={
                            card.image.asset.metadata?.lqip ? "blur" : "empty"
                        }
                        blurDataURL={card.image.asset.metadata?.lqip}
                    />
                    <div className={styles.imageOverlay} />
                </div>
            )}
            <div className={styles.cardContent}>
                {card.title && (
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                )}
                {card.text && <p className={styles.cardText}>{card.text}</p>}
                {card.link && (
                    <Link href={card.link} className={styles.cardButton}>
                        Saznaj više
                    </Link>
                )}
            </div>
        </article>
    );
}

export function CardSection({ title, intro, cards }: CardSectionProps) {
    if (!cards?.length) {
        return null;
    }

    const useSwiper = cards.length > 3;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {(title || intro) && (
                    <div className={styles.header}>
                        {title && <h2 className={styles.title}>{title}</h2>}
                        {intro && <p className={styles.intro}>{intro}</p>}
                    </div>
                )}

                {useSwiper ? (
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{
                            clickable: true,
                            bulletClass: styles.bullet,
                            bulletActiveClass: styles.bulletActive,
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            375: {
                                slidesPerView: 1.2,
                                spaceBetween: 16,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3.5,
                                spaceBetween: 24,
                            },
                        }}
                        className={styles.swiper}
                    >
                        {cards.map((card) => (
                            <SwiperSlide
                                key={card._key}
                                className={styles.slide}
                            >
                                <CardItem card={card} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className={styles.grid}>
                        {cards.map((card) => (
                            <CardItem key={card._key} card={card} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
