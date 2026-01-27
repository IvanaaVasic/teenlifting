export const dynamic = "force-dynamic";
import { getHomePage } from "@/sanity/sanity-utils";
import {
    Hero,
    CardSection,
    BlogSection,
    TestimonialsSection,
} from "@/components";

export default async function Home() {
    const homePage = await getHomePage();

    return (
        <>
            <Hero hero={homePage?.hero} />
            <CardSection
                title={homePage?.cardsSection?.title}
                intro={homePage?.cardsSection?.intro}
                cards={homePage?.cardsSection?.cards}
            />
            {homePage?.featuredPosts?.length > 0 && (
                <BlogSection title="Novosti" posts={homePage.featuredPosts} />
            )}
            {homePage?.testimonialsSection &&
                homePage.testimonialsSection.testimonials?.length > 0 && (
                    <TestimonialsSection data={homePage.testimonialsSection} />
                )}
        </>
    );
}
