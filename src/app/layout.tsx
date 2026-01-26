import type { Metadata, Viewport } from "next";
import { Titillium_Web } from "next/font/google";
import { getSiteSettings } from "@/sanity/sanity-utils";
import "./globals.css";

const titillium = Titillium_Web({
    subsets: ["latin", "latin-ext"],
    weight: ["300", "400", "600", "700"],
    variable: "--font-titillium",
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#00b4a5",
};

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    const seo = settings?.seo;
    const siteUrl = seo?.siteUrl || "https://teenlifting.com.hr";

    return {
        metadataBase: new URL(siteUrl),
        title: {
            default: seo?.metaTitle || settings?.siteTitle || "Teenlifting",
            template: `%s | ${settings?.siteTitle || "Teenlifting"}`,
        },
        description:
            seo?.metaDescription ||
            "Teenlifting - Profesionalni tretmani za lice i telo",
        keywords: seo?.keywords || [
            "teenlifting",
            "tretmani lica",
            "masaža tjela",
        ],
        authors: [{ name: "Teenlifting" }],
        creator: "Teenlifting",
        publisher: "Teenlifting",
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        openGraph: {
            type: "website",
            locale: "sr_RS",
            url: siteUrl,
            siteName: settings?.siteTitle || "Teenlifting",
            title: seo?.metaTitle || settings?.siteTitle || "Teenlifting",
            description:
                seo?.metaDescription ||
                "Teenlifting - Profesionalni tretmani za lice i telo",
            images: seo?.ogImage?.asset?.url
                ? [
                      {
                          url: seo.ogImage.asset.url,
                          width: 1200,
                          height: 630,
                          alt: settings?.siteTitle || "Teenlifting",
                      },
                  ]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title: seo?.metaTitle || settings?.siteTitle || "Teenlifting",
            description:
                seo?.metaDescription ||
                "Teenlifting - Profesionalni tretmani za lice i telo",
            images: seo?.ogImage?.asset?.url ? [seo.ogImage.asset.url] : [],
        },
        verification: {
            google: seo?.googleVerification,
        },
        alternates: {
            canonical: siteUrl,
        },
        icons: {
            icon: "/favicon.ico",
            apple: "/apple-touch-icon.png",
        },
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="sr" className={titillium.variable} suppressHydrationWarning>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
