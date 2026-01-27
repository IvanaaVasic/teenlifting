"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { HiStar } from "react-icons/hi";
import type { TestimonialsSection as TestimonialsSectionType } from "@/sanity/sanity-utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./TestimonialsSection.module.css";

import "swiper/css";
import "swiper/css/pagination";

export interface TestimonialsSectionProps {
    data: TestimonialsSectionType;
}

function TestimonialCard({
    testimonial,
}: {
    testimonial: TestimonialsSectionType["testimonials"][0];
}) {
    return (
        <article className={styles.card}>
            <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className={styles.star} size={20} />
                ))}
            </div>
            <blockquote className={styles.quote}>
                <p className={styles.text}>&ldquo;{testimonial.text}&rdquo;</p>
            </blockquote>
            <div className={styles.author}>
                {testimonial.image?.asset?.url && (
                    <div className={styles.avatarWrapper}>
                        <Image
                            src={testimonial.image.asset.url}
                            alt={testimonial.name || "Testimonial"}
                            fill
                            className={styles.avatar}
                            placeholder={
                                testimonial.image.asset.metadata?.lqip
                                    ? "blur"
                                    : "empty"
                            }
                            blurDataURL={testimonial.image.asset.metadata?.lqip}
                        />
                    </div>
                )}
                <div className={styles.authorInfo}>
                    <span className={styles.name}>{testimonial.name}</span>
                    {testimonial.role && (
                        <span className={styles.role}>{testimonial.role}</span>
                    )}
                </div>
            </div>
        </article>
    );
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
    const isMobile = useMediaQuery(768);

    if (!data?.testimonials?.length) {
        return null;
    }

    const { title, intro, testimonials } = data;

    const useSwiper = isMobile
        ? testimonials.length > 1
        : testimonials.length > 3;

    return (
        <section className={styles.section} aria-label="Testimonials">
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
                        slidesPerView={1.15}
                        spaceBetween={12}
                        pagination={{
                            clickable: true,
                            bulletClass: styles.bullet,
                            bulletActiveClass: styles.bulletActive,
                        }}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            400: {
                                slidesPerView: 1.3,
                                spaceBetween: 14,
                            },
                            540: {
                                slidesPerView: 1.8,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 2.3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3.2,
                                spaceBetween: 24,
                            },
                        }}
                        className={styles.swiper}
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide
                                key={testimonial._key}
                                className={styles.slide}
                            >
                                <TestimonialCard testimonial={testimonial} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div
                        className={styles.grid}
                        data-count={testimonials.length}
                    >
                        {testimonials.map((testimonial) => (
                            <TestimonialCard
                                key={testimonial._key}
                                testimonial={testimonial}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
