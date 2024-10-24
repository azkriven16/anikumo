import { Navbar } from "@/components/custom/navbar";
import ReactQueryProvider from "@/components/custom/react-query-provider";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { Footer } from "@/components/custom/footer";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Anikumo | Free Minimal Anime Streaming Platform",
    description:
        "Discover and stream anime for free on Anikumo, the ultimate minimal anime site. Enjoy a vast collection of popular and classic anime series with a clean, user-friendly interface.",
    keywords: [
        "Anikumo",
        "free anime",
        "minimal anime site",
        "anime streaming",
        "watch anime online",
        "anime discovery platform",
    ],
    openGraph: {
        title: "Anikumo | Free Minimal Anime Streaming Platform",
        description:
            "Stream anime for free on Anikumo. Discover popular and classic series with our minimal, user-friendly interface.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Anikumo - Free Minimal Anime Streaming",
            },
        ],
        type: "website",
        url: "https://anikumo.com",
    },
    twitter: {
        card: "summary_large_image",
        title: "Anikumo | Free Minimal Anime Streaming",
        description:
            "Discover and stream anime for free on Anikumo. Enjoy a vast collection with our clean, minimal interface.",
        images: [
            {
                url: "/twitter-image.jpg",
                width: 1200,
                height: 600,
                alt: "Anikumo - Free Minimal Anime Streaming",
            },
        ],
        site: "@anikumo",
        creator: "@anikumo",
    },
    robots: "index, follow",
    alternates: {
        types: {
            "application/rss+xml": "https://anikumo.com/rss.xml",
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ReactQueryProvider>
                        <Navbar />
                        <Toaster />
                        {children}
                        <Footer />
                    </ReactQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
