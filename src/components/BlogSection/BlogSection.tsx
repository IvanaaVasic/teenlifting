"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { BlogPost, Image as ImageType } from "@/sanity/sanity-utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./BlogSection.module.css";

import "swiper/css";
import "swiper/css/pagination";

export interface BlogSectionProps {
    title?: string;
    posts: BlogPost[];
}

function BlogCard({ post }: { post: BlogPost }) {
    // Combine main image with gallery images
    const allImages: ImageType[] = [
        ...(post.mainImage ? [post.mainImage] : []),
        ...(post.gallery || []),
    ].filter((img) => img?.asset?.url);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const hasMultipleImages = allImages.length > 2;

    const handlePrevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("sr-Latn-RS", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : null;

    const currentImage = allImages[currentImageIndex];

    return (
        <article className={styles.card}>
            {currentImage?.asset?.url && (
                <div className={styles.imageWrapper}>
                    <Link
                        href={`/blog/${post.slug}`}
                        className={styles.imageLink}
                    >
                        <Image
                            src={currentImage.asset.url}
                            alt={post.title || "Blog slika"}
                            fill
                            className={styles.image}
                            placeholder={
                                currentImage.asset.metadata?.lqip
                                    ? "blur"
                                    : "empty"
                            }
                            blurDataURL={currentImage.asset.metadata?.lqip}
                        />
                    </Link>
                    {hasMultipleImages && (
                        <>
                            <button
                                type="button"
                                className={classNames(
                                    styles.imageNav,
                                    styles.imageNavPrev
                                )}
                                onClick={handlePrevImage}
                                aria-label="Prethodna slika"
                            >
                                <HiChevronLeft size={20} />
                            </button>
                            <button
                                type="button"
                                className={classNames(
                                    styles.imageNav,
                                    styles.imageNavNext
                                )}
                                onClick={handleNextImage}
                                aria-label="Sledeća slika"
                            >
                                <HiChevronRight size={20} />
                            </button>
                            <div className={styles.imageIndicators}>
                                {allImages.map((_, index) => (
                                    <span
                                        key={index}
                                        className={classNames(
                                            styles.imageIndicator,
                                            {
                                                [styles.imageIndicatorActive]:
                                                    index === currentImageIndex,
                                            }
                                        )}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
            <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                <div className={styles.cardContent}>
                    {formattedDate && (
                        <time
                            className={styles.date}
                            dateTime={post.publishedAt}
                        >
                            {formattedDate}
                        </time>
                    )}
                    {post.title && (
                        <h3 className={styles.cardTitle}>{post.title}</h3>
                    )}
                    {post.excerpt && (
                        <p className={styles.excerpt}>{post.excerpt}</p>
                    )}
                    <span className={styles.readMore}>
                        Pročitaj više
                        <HiArrowRight className={styles.arrow} size={16} />
                    </span>
                </div>
            </Link>
        </article>
    );
}

export function BlogSection({ title = "Novosti", posts }: BlogSectionProps) {
    const isMobile = useMediaQuery(768);

    if (!posts?.length) {
        return null;
    }

    // Mobile: swiper if more than 1 post, Desktop: swiper if more than 3 posts
    const useSwiper = isMobile ? posts.length > 1 : posts.length > 3;

    return (
        <section className={styles.section} aria-label="Blog sekcija">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <Link href="/blog" className={styles.viewAll}>
                        Pogledaj sve
                        <HiArrowRight size={20} />
                    </Link>
                </div>

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
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            480: {
                                slidesPerView: 1.5,
                                spaceBetween: 16,
                            },
                            640: {
                                slidesPerView: 2.2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3.2,
                                spaceBetween: 24,
                            },
                        }}
                        className={styles.swiper}
                    >
                        {posts.map((post) => (
                            <SwiperSlide
                                key={post._id}
                                className={styles.slide}
                            >
                                <BlogCard post={post} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className={styles.grid}>
                        {posts.map((post) => (
                            <BlogCard key={post._id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
