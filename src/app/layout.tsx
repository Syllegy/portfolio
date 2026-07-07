import type { Metadata } from "next";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlobalBackground } from "@/components/GlobalBackground";
import { personal } from "@/data/personal";

// Space Mono for headings — Space Grotesk (its designed pairing) for body copy.
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucastavole.dev"),
  title: {
    default: `${personal.name} — ${personal.title}`,
    template: `%s | ${personal.name}`,
  },
  description: personal.subheading,
  keywords: [
    "Web Developer",
    "Technical SEO",
    "Next.js",
    "Shopify",
    "WordPress",
    "Freelance Developer",
    "Luca Stavole",
  ],
  authors: [{ name: personal.name, url: personal.domain }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: personal.domain,
    siteName: personal.name,
    title: `${personal.name} — ${personal.title}`,
    description: personal.subheading,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.title}`,
    description: personal.subheading,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: personal.domain,
  jobTitle: personal.title,
  description: personal.subheading,
  sameAs: [personal.github].filter(Boolean),
  email: personal.email,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceMono.variable} ${spaceGrotesk.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <GlobalBackground />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
