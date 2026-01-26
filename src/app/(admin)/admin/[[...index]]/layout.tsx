import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Teenlifting Admin",
    description: "Teenlifting Admin",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
