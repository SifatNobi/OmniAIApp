"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Facebook, MessageCircle, Instagram, Youtube } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { siteConfig, navItems, socialLinks } from "@/constants";

const iconMap: Record<string, React.ReactNode> = {
  twitter: <Twitter className="h-5 w-5" />,
  facebook: <Facebook className="h-5 w-5" />,
  discord: <MessageCircle className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
};

const footerLinks = [
  { label: "Home", href: "/" },
  ...navItems,
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-text-secondary">
              {siteConfig.tagline}
            </p>
            <p className="text-xs text-text-secondary/60">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-white">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-white">Connect</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    {iconMap[link.icon]}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Get Updates</h3>
            <p className="text-sm text-text-secondary">
              Stay informed about the latest features and releases.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                  aria-label={link.name}
                >
                  {iconMap[link.icon]}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-text-secondary/60">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
