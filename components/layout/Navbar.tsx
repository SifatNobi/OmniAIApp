"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className={cn(
            "fixed inset-x-0 top-0 z-50 transition-all duration-700",
            isScrolled
              ? "bg-black/85 backdrop-blur-2xl border-b border-border/80 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
              : "bg-gradient-to-b from-black/40 to-transparent"
          )}
        >
          <div className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-700",
            isScrolled ? "h-14" : "h-16"
          )}>
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                  pathname === item.href
                    ? "text-white"
                    : "text-text-secondary hover:text-white"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full bg-white/5"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="secondary" size="sm" asChild>
              <a href="https://forms.gle/p9pwFxEpWPxrKCDx8" target="_blank" rel="noopener noreferrer">Join Waitlist</a>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <a href="https://19f5fa36.kickoffpages.com/" target="_blank" rel="noopener noreferrer">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Get Early Access
              </a>
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center rounded-full p-2 text-white md:hidden hover:bg-white/5 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border bg-black/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-white/5 text-white"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="my-2 border-border" />
              <Button variant="secondary" size="default" asChild className="w-full">
                <a href="https://forms.gle/p9pwFxEpWPxrKCDx8" target="_blank" rel="noopener noreferrer">Join Waitlist</a>
              </Button>
              <Button variant="primary" size="default" asChild className="w-full">
                <Link href="/#early-access">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Get Early Access
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
