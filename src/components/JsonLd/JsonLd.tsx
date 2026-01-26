import type { SiteSettings } from "@/sanity/sanity-utils";

interface JsonLdProps {
    settings: SiteSettings;
}

export function OrganizationJsonLd({ settings }: JsonLdProps) {
    const siteUrl = settings?.seo?.siteUrl || "https://teenlifting.com.hr";

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#organization`,
        name: settings?.siteTitle || "Teenlifting",
        url: siteUrl,
        logo: settings?.logo?.asset?.url,
        image: settings?.seo?.ogImage?.asset?.url || settings?.logo?.asset?.url,
        description: settings?.seo?.metaDescription,
        address: settings?.footer?.address
            ? {
                  "@type": "PostalAddress",
                  streetAddress: settings.footer.address,
                  addressCountry: "HR",
              }
            : undefined,
        telephone: settings?.footer?.phone,
        email: settings?.footer?.email,
        sameAs: settings?.socials?.map((social) => social.url).filter(Boolean),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema),
            }}
        />
    );
}

interface WebPageJsonLdProps {
    title: string;
    description: string;
    url: string;
    image?: string;
}

export function WebPageJsonLd({
    title,
    description,
    url,
    image,
}: WebPageJsonLdProps) {
    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description: description,
        url: url,
        image: image,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(webPageSchema),
            }}
        />
    );
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbJsonLdProps {
    items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema),
            }}
        />
    );
}

interface ServiceJsonLdProps {
    name: string;
    description: string;
    url: string;
    image?: string;
    provider: {
        name: string;
        url: string;
    };
}

export function ServiceJsonLd({
    name,
    description,
    url,
    image,
    provider,
}: ServiceJsonLdProps) {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: name,
        description: description,
        url: url,
        image: image,
        provider: {
            "@type": "LocalBusiness",
            name: provider.name,
            url: provider.url,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(serviceSchema),
            }}
        />
    );
}
