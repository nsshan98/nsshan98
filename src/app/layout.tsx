import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
import { SITE_URL, AUTHOR_DEFAULT } from "@/lib/blog/metadata";
import GoogleAnalytics from "@/components/shared/google-analytics";
import { generatePersonJsonLd, generateWebSiteJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nazmus Sakib — Frontend-Focused Full-Stack Engineer",
    template: "%s | Nazmus Sakib",
  },
  description:
    "Frontend-Focused Full-Stack Engineer specializing in modern Next.js, React, TypeScript, high-performance UI systems, and scalable backend architectures.",
  keywords: [
    "Nazmus Sakib",
    "Frontend Engineer",
    "Senior Frontend Developer",
    "Full-Stack Engineer",
    "Next.js Developer",
    "React Specialist",
    "TypeScript",
    "Web Performance",
    "Core Web Vitals",
    "Backend Developer",
    "Node.js",
    "PostgreSQL",
    "Software Architect",
    "Developer Tools",
    "Cross-Device Clipboard",
    "Image Compressor",
    "JSON Toolkit",
    "Markdown Viewer",
    "Technical Blog",
  ],
  authors: [{ name: AUTHOR_DEFAULT, url: SITE_URL }],
  creator: AUTHOR_DEFAULT,
  publisher: AUTHOR_DEFAULT,
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  verification: {
    google: "p947cnm0CzaduoGfIeNJh5VTf19T-c47eRxwLEM9XP4",
  },
  openGraph: {
    title: "Nazmus Sakib — Frontend-Focused Full-Stack Engineer",
    description:
      "Frontend-Focused Full-Stack Engineer specializing in modern Next.js, React, TypeScript, high-performance UI systems, and scalable backend architectures.",
    url: SITE_URL,
    siteName: "Nazmus Sakib",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Nazmus Sakib — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nazmus Sakib — Frontend-Focused Full-Stack Engineer",
    description:
      "Frontend-Focused Full-Stack Engineer specializing in modern Next.js, React, TypeScript, and scalable backend architectures.",
    images: [`${SITE_URL}/og-image.png`],
    creator: "@nsshan98",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = generatePersonJsonLd();
  const websiteJsonLd = generateWebSiteJsonLd();

  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${poppins.className} antialiased`} suppressHydrationWarning>
        <GoogleAnalytics gaId="G-WY41S17HKR" />
        {children}
      </body>
    </html>
  );
}
