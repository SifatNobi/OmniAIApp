import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackgroundEffects } from "@/components/animations/BackgroundEffects";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "OmniAIApp | One Platform. Every AI.",
    template: "%s | OmniAIApp",
  },
  description:
    "OmniAIApp is an AI-native platform for Desktop and Android that unifies the world's best AI models, AI agents, AI extensions, MCP servers, workflows, and an open marketplace into one seamless experience.",
  keywords: [
    "AI",
    "Artificial Intelligence",
    "AI Platform",
    "AI Models",
    "AI Agents",
    "AI Extensions",
    "Marketplace",
    "MCP Servers",
    "Desktop App",
    "Android App",
    "BYOK",
    "Workflow Automation",
  ],
  authors: [{ name: "OmniAIApp" }],
  creator: "OmniAIApp",
  publisher: "OmniAIApp",
  metadataBase: new URL("https://omniai.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omniai.app",
    siteName: "OmniAIApp",
    title: "OmniAIApp | One Platform. Every AI.",
    description:
      "OmniAIApp is an AI-native platform for Desktop and Android that unifies the world's best AI models, AI agents, AI extensions, MCP servers, workflows, and an open marketplace into one seamless experience.",
    images: [
      {
        url: "https://omniai.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmniAIApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniAIApp | One Platform. Every AI.",
    description:
      "OmniAIApp is an AI-native platform for Desktop and Android that unifies the world's best AI models, AI agents, AI extensions, MCP servers, workflows, and an open marketplace into one seamless experience.",
    images: ["https://omniai.app/og-image.png"],
    creator: "@OmniAIApp",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-primary font-sans antialiased">
        <LoadingScreen />
        <BackgroundEffects />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
