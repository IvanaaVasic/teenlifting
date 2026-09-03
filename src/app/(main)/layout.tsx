import {
    getSiteSettings,
    isPromoActive,
    type SiteSettings,
} from "@/sanity/sanity-utils";
import { normalizeHref } from "@/utils/href";
import {
    AnnouncementBar,
    UtilityBar,
    Header,
    Footer,
    OrganizationJsonLd,
} from "@/components";

const PROMO_PATH = "/promo";

/**
 * The promo page is seasonal: switched off in Sanity its route 404s, so the
 * link has to leave the menu with it - the header and the footer both build
 * their links from `mainNav`, so one filter here covers both.
 */
function withoutPromoLinks(settings: SiteSettings): SiteSettings {
    if (!settings?.mainNav?.length) return settings;

    const isPromo = (item: { href?: string }) =>
        normalizeHref(item.href) === PROMO_PATH;

    return {
        ...settings,
        mainNav: settings.mainNav
            .filter((item) => !isPromo(item))
            .map((item) =>
                item.children?.some(isPromo)
                    ? {
                          ...item,
                          children: item.children.filter(
                              (child) => !isPromo(child)
                          ),
                      }
                    : item
            ),
    };
}

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [settings, promoActive] = await Promise.all([
        getSiteSettings(),
        isPromoActive(),
    ]);

    const navSettings = promoActive ? settings : withoutPromoLinks(settings);

    return (
        <>
            <OrganizationJsonLd settings={settings} />
            <UtilityBar settings={settings} />
            <Header settings={navSettings} />
            <AnnouncementBar announcement={settings?.announcement} />
            <main>{children}</main>
            <Footer settings={navSettings} />
        </>
    );
}
