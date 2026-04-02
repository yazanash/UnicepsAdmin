import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uniceps - Smart Management System",
  description: "The official management platform for Uniceps organizations",
  verification: {
    google: "dzl1melVzoDh7oLqAxXrWwu3y4YLdUCSsOjB87dIPyo",
  },
  alternates: {
    canonical: "https://uniceps.trio-verse.com",
  },

  openGraph: {
    title: "Uniceps - Smart Management System",
    description:
      "All-in-one gym management system for fitness clubs, coaches, and athletes. Offline-first, desktop and mobile ready.",
    url: "https://uniceps.trio-verse.com",
    siteName: "Uniceps",
    images: [
      {
        url: "https://uniceps.trio-verse.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Uniceps Fitness Management System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uniceps - Smart Management System",
    description:
      "Manage gyms, athletes, workouts, nutrition plans, and subscriptions with Uniceps.",
    images: ["https://uniceps.trio-verse.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Uniceps",
    url: "https://uniceps.trio-verse.com",
    alternateName: ["يونسيبس", "Uniceps App"],
    description: "Smart Gym Management System",
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextTopLoader
          color="#0095A6"
          showSpinner={false}
          shadow="0 0 10px #0095A6,0 0 5px #0095A6"
        />
        {children}
      </body>
    </html>
  );
}
