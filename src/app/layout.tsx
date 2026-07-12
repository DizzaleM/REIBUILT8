import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlobalOverlays } from "@/components/layout/GlobalOverlays";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dieselway.vercel.app"),
  title: {
    default: "The Diesel Way | Strength Through Discipline",
    template: "%s | The Diesel Way",
  },
  description:
    "Train with Dem Diesel through structured workout programs, live fitness classes, personal coaching, membership options and performance-focused resources.",
  openGraph: {
    title: "The Diesel Way | Strength Through Discipline",
    description:
      "Train with Dem Diesel through structured workout programs, live fitness classes, personal coaching, membership options and performance-focused resources.",
    type: "website",
    siteName: "The Diesel Way",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Diesel Way | Strength Through Discipline",
    description:
      "Train with Dem Diesel through structured workout programs, live fitness classes, personal coaching, membership options and performance-focused resources.",
  },
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
    apple: "/brand/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Diesel Way",
    url: "https://dieselway.vercel.app",
    description: "Online fitness training, programs, live classes, and coaching with Dem Diesel.",
  };

  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} h-full`}>
      <body className="min-h-full bg-r8-black font-sans text-r8-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <GlobalOverlays />
        </AppProviders>
      </body>
    </html>
  );
}
