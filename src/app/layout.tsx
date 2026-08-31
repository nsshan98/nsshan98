import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, AUTHOR_DEFAULT } from "@/lib/blog/metadata";
import GoogleAnalytics from "@/components/shared/google-analytics";
import { generatePersonJsonLd, generateWebSiteJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nazmus Sakib — Full-Stack Engineer & Technical Writer",
    template: "%s | Nazmus Sakib",
  },
  description:
    "Full-Stack Software Engineer specializing in backend architecture, PostgreSQL performance, Next.js applications, and browser-based developer tools.",
  keywords: [
    "Nazmus Sakib",
    "Full-Stack Engineer",
    "Software Architect",
    "Backend Developer",
    "PostgreSQL",
    "Next.js",
    "React",
    "TypeScript",
    "Developer Tools",
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
  },
  verification: {
    google: "p947cnm0CzaduoGfIeNJh5VTf19T-c47eRxwLEM9XP4",
  },
  openGraph: {
    title: "Nazmus Sakib — Full-Stack Engineer & Software Architect",
    description:
      "Full-Stack Software Engineer specializing in backend architecture, PostgreSQL performance, Next.js applications, and browser-based developer tools.",
    url: SITE_URL,
    siteName: "Nazmus Sakib Portfolio & Engineering Insights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/about-me.png`,
        width: 1200,
        height: 630,
        alt: "Nazmus Sakib — Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nazmus Sakib — Full-Stack Engineer & Technical Writer",
    description:
      "Full-Stack Software Engineer specializing in backend architecture, PostgreSQL performance, Next.js applications, and developer tools.",
    images: [`${SITE_URL}/about-me.png`],
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
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="p947cnm0CzaduoGfIeNJh5VTf19T-c47eRxwLEM9XP4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
