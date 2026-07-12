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
  metadataBase: new URL("https://reibuilt8.vercel.app"),
  title: {
    default: "REIBUILT 8 | Online Fitness Training with Rei",
    template: "%s | REIBUILT 8",
  },
  description:
    "Train with Rei through structured workout programs, live fitness classes, personal coaching, membership options and performance-focused resources.",
  openGraph: {
    title: "REIBUILT 8 | Online Fitness Training with Rei",
    description:
      "Train with Rei through structured workout programs, live fitness classes, personal coaching, membership options and performance-focused resources.",
    type: "website",
    siteName: "REIBUILT 8",
  },
  twitter: {
    card: "summary_large_image",
    title: "REIBUILT 8 | Online Fitness Training with Rei",
    description:
      "Train with Rei through structured workout programs, live fitness classes, personal coaching, membership options and performance-focused resources.",
  },
  icons: {
    icon: "/brand/reibuilt8-r8-mark.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "REIBUILT 8",
    url: "https://reibuilt8.vercel.app",
    description: "Online fitness training, programs, live classes, and coaching with Rei.",
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
