"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

const BRAND_LOGO = "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772009407/AW_WHITE_LOGO_ORIGINAL_zmfzqr.png";
const BRAND_TEXTS = ["PS WALKER", "#77992"];

const NAV_LINKS = [
  { href: "#categories", label: "Categories" },
  { href: "#how-to-vote", label: "How to Vote" },
  { href: "#results", label: "Results" },
  { href: "#gallery", label: "Gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled
          ? "hsl(var(--background) / 0.92)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid hsl(var(--border) / 0.5)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-foreground hover:text-accent transition-colors duration-300"
        >
          <img
            src={BRAND_LOGO}
            alt="Alan Walker logo"
            className="h-10 w-auto"
          />
          <GooeyText
            texts={BRAND_TEXTS}
            morphTime={1}
            cooldownTime={2.5}
            className="h-10 w-[152px] pl-1"
            textClassName="font-display whitespace-nowrap uppercase tracking-[0.11em] text-sm md:text-base leading-none text-accent"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-tag opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300"
              style={{ fontSize: "0.65rem" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#categories"
            className="hidden md:inline-flex btn-outline-accent px-5 py-2 rounded-sm text-xs"
          >
            Vote Now
          </a>

          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/70 text-foreground hover:text-accent hover:border-accent/60 transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X size={18} strokeWidth={2.2} /> : <Menu size={18} strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden px-6 pb-6 pt-3"
          style={{
            background: "linear-gradient(180deg, hsl(var(--background) / 0.98) 0%, hsl(var(--surface-raised) / 0.96) 100%)",
            borderTop: "1px solid hsl(var(--border) / 0.35)",
            borderBottom: "1px solid hsl(var(--border) / 0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="rounded-xl border border-border/55 card-surface-raised overflow-hidden">
            <div className="px-4 py-2 border-b border-border/50">
              <p className="label-tag opacity-80">Navigation</p>
            </div>

            <div className="py-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-foreground/85 hover:text-accent hover:bg-background/40 transition-all duration-300"
                >
                  <span className="label-tag opacity-80">{link.label}</span>
                  <ChevronRight size={14} className="opacity-70" />
                </a>
              ))}
            </div>

            <div className="px-4 pb-4 pt-2 border-t border-border/50">
              <a
                href="#categories"
                onClick={() => setMenuOpen(false)}
                className="btn-outline-accent inline-flex w-full items-center justify-center px-6 py-3 rounded-sm text-xs text-center"
              >
                Vote Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
