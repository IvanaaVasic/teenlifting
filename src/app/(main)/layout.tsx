import { getSiteSettings } from "@/sanity/sanity-utils";
import {
    AnnouncementBar,
    UtilityBar,
    Header,
    Footer,
    OrganizationJsonLd,
} from "@/components";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSiteSettings();

    return (
        <>
            <OrganizationJsonLd settings={settings} />
            <UtilityBar settings={settings} />
            <Header settings={settings} />
            <AnnouncementBar announcement={settings?.announcement} />
            <main>{children}</main>
            <Footer settings={settings} />
        </>
    );
}
