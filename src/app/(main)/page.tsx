export const dynamic = "force-dynamic";
import { getHomePage, getTreatmentLinks } from "@/sanity/sanity-utils";
import {
    Hero,
    MethodSection,
    hasMethodSection,
    CardSection,
    BeforeAfterSection,
    hasBeforeAfterSection,
    BlogSection,
    TestimonialsSection,
    ContactCTA,
} from "@/components";

/** Novosti shows at most three on desktop; the rest live on /blog. */
const MAX_FEATURED_POSTS = 3;

/**
 * Eyebrow numbers ("01 - Metoda", "02") run over the numbered sections that
 * actually render, so switching one off in Sanity renumbers the rest instead
 * of leaving a hole. Ambasadori and Novosti are unnumbered by design.
 */
function sectionNumbering(present: Record<string, boolean>) {
    const order = Object.keys(present).filter((key) => present[key]);
    return (key: string) => {
        const index = order.indexOf(key);
        return index === -1
            ? undefined
            : String(index + 1).padStart(2, "0");
    };
}

export default async function Home() {
    const [homePage, treatments] = await Promise.all([
        getHomePage(),
        getTreatmentLinks(),
    ]);

    const hasMethod = hasMethodSection(homePage?.methodSection);

    const numberOf = sectionNumbering({
        method: hasMethod,
        treatments: Boolean(homePage?.cardsSection?.cards?.length),
        beforeAfter: hasBeforeAfterSection(homePage?.beforeAfterSection),
    });

    const featuredPosts =
        homePage?.featuredPosts?.slice(0, MAX_FEATURED_POSTS) ?? [];

    return (
        <>
            <Hero hero={homePage?.hero} />

            <MethodSection
                data={homePage?.methodSection}
                number={numberOf("method")}
            />

            <CardSection
                title={homePage?.cardsSection?.title}
                number={numberOf("treatments")}
                cards={homePage?.cardsSection?.cards}
                treatments={treatments}
                withTopPadding={!hasMethod}
            />

            <BeforeAfterSection
                data={homePage?.beforeAfterSection}
                number={numberOf("beforeAfter")}
            />

            {homePage?.testimonialsSection &&
                homePage.testimonialsSection.testimonials?.length > 0 && (
                    <TestimonialsSection data={homePage.testimonialsSection} />
                )}

            {featuredPosts.length > 0 && (
                <BlogSection
                    title={homePage?.postsSection?.title}
                    posts={featuredPosts}
                />
            )}

            <ContactCTA data={homePage?.contactCta} showDefault={false} />
        </>
    );
}
