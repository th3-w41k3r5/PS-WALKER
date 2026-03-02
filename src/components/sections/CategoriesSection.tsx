"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { X, ExternalLink, AlertCircle, Star, Music2, Globe, Radio } from "lucide-react";

const categories = [
  {
    id: "best-fan-army",
    icon: Globe,
    tag: "Category 01",
    title: "Best Fan Army",
    subtitle: "Honoring the most dedicated global fan community supporting every release and live show",
    nominee: "THE WALKERS",
    bgImage:
      "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772372913/DSC05066_qaalji.jpg",
    voteUrl: "https://poll.fm/16632912",
  },
  {
    id: "best-performance",
    icon: Star,
    tag: "Category 02",
    title: "Best Performance",
    subtitle: "Celebrating the standout live set that defined festival energy and stage impact in 2025",
    nominee: "Alan Walker - Tomorrowland 2025",
    bgImage:
      "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772009594/photo_2026-02-25_13-52-26_r8gobb.jpg",
    voteUrl: "https://poll.fm/16632932",
  },
  {
    id: "favourite-album",
    icon: Music2,
    tag: "Category 03",
    title: "Favourite Album",
    subtitle: "Honors the album that delivered the biggest impact with fans this year.",
    nominee: "Quantum Beats",
    bgImage:
      "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772009594/https___images.genius.com_2e809ceb74b4c33497e68b450a38f4d8.1000x1000x1_ntp15o.png",
    voteUrl: "https://poll.fm/16632820",
  },
  {
    id: "best-collaboration",
    icon: Radio,
    tag: "Category 04",
    title: "Best Collaboration",
    subtitle: "Recognizes the strongest artist collaboration with standout chemistry and influence.",
    nominee: "Welcome To The Lonely Club",
    bgImage:
      "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772009592/https___images.genius.com_ef0c15d5613c3bdbe9c37ca6d3a46447.640x640x1_mbv3ni.jpg",
    voteUrl: "https://poll.fm/16632867",
  },
];

type Category = (typeof categories)[0];

function VoteModal({ cat, onClose }: { cat: Category; onClose: () => void }) {
  const Icon = cat.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4 py-2 sm:py-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-lg card-surface rounded-sm p-5 sm:p-8 md:p-10 max-h-[calc(100dvh-1rem)] sm:max-h-[90vh] overflow-hidden"
        style={{ border: "1px solid hsl(var(--accent) / 0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-5 sm:right-5 h-8 w-8 sm:h-auto sm:w-auto inline-flex items-center justify-center rounded-sm border border-accent/25 bg-background/55 text-muted-foreground hover:text-foreground hover:border-accent/45 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8 pr-9 sm:pr-8">
          <div
            className="w-9 h-9 sm:w-12 sm:h-12 rounded-sm flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(var(--accent) / 0.08)", border: "1px solid hsl(var(--accent) / 0.2)" }}
          >
            <Icon size={15} className="text-accent sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="label-tag mb-0.5">{cat.tag}</div>
            <h3 className="font-display text-foreground text-[1.6rem] sm:text-xl tracking-wide leading-tight">{cat.title}</h3>
          </div>
        </div>

        <div className="divider-line mb-5 sm:mb-8" />

        <div className="space-y-4 sm:space-y-5 mb-5 sm:mb-8">
          <div className="label-tag mb-3 sm:mb-4">How to Vote</div>
          {[
            "Click the official voting button below to open the EDM Miami Awards portal.",
            "Submit your email address.",
            "Search for the category where the respective nominee is listed.",
            "Choose the nominee and click the Vote button.",
            "Confirm your vote through the email confirmation link.",
          ].map((step, i) => (
            <div
              key={i}
              className="flex gap-3.5 sm:gap-4 items-start"
            >
              <span
                className="font-display text-accent flex-shrink-0 mt-0.5"
                style={{ fontSize: "0.74rem", letterSpacing: "0.07em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={`text-[0.88rem] sm:text-sm font-body leading-snug sm:leading-relaxed ${
                  i === 4 ? "text-accent underline decoration-accent/70 underline-offset-3" : "text-muted-foreground"
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        <div
          className="flex gap-3 rounded-sm p-3.5 sm:p-4 mb-5 sm:mb-8"
          style={{ background: "hsl(var(--accent) / 0.05)", border: "1px solid hsl(var(--accent) / 0.15)" }}
        >
          <AlertCircle size={14} className="text-accent flex-shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-[0.74rem] sm:text-xs font-body leading-snug sm:leading-relaxed">
            <span className="text-foreground font-medium-ui tracking-[0.015em]">Important:</span> Your vote only counts after you confirm it via the email link. Unconfirmed votes are not counted.
          </p>
        </div>

        <a
          href={cat.voteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-solid-accent flex items-center justify-center gap-2.5 sm:gap-3 w-full py-3.5 sm:py-4 rounded-sm text-xs sm:text-sm"
        >
          <span>Vote Now</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

export default function CategoriesSection() {
  const { ref, inView } = useInView<HTMLElement>();
  const [active, setActive] = useState<Category | null>(null);

  return (
    <section ref={ref} className="section-padding max-w-6xl mx-auto" id="categories">
      <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="mb-16">
          <div className="label-tag mb-4">Award Categories</div>
          <div className="divider-line mb-8 max-w-xs" />
          <h2
            className="font-display text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", lineHeight: 1.05 }}
          >
            Vote in Every
            <br />
            <span className="text-accent">Category</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const hasImageBackground = Boolean(cat.bgImage);
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat)}
                className="group relative overflow-hidden text-left card-surface rounded-sm p-5 sm:p-6 md:p-8 glow-box-hover cursor-pointer w-full"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  background: hasImageBackground ? "hsl(var(--surface) / 0.22)" : "hsl(var(--surface))",
                  border:
                    hasImageBackground
                      ? "1px solid hsl(var(--accent) / 0.24)"
                      : "1px solid hsl(var(--border))",
                  transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, box-shadow 0.4s ease, transform 0.4s ease`,
                }}
              >
                {hasImageBackground && (
                  <>
                    <div
                      className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      style={{
                        background: `url('${cat.bgImage}') center / cover no-repeat`,
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(155deg, hsl(var(--background) / 0.84) 0%, hsl(var(--background) / 0.7) 40%, hsl(var(--background) / 0.8) 100%)",
                      }}
                    />
                  </>
                )}

                <div className="relative z-10 flex items-start justify-between mb-5 sm:mb-6 gap-3">
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm flex items-center justify-center"
                    style={{ background: "hsl(var(--accent) / 0.08)", border: "1px solid hsl(var(--accent) / 0.18)" }}
                  >
                    <Icon size={16} className="text-accent sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <span className="label-tag">{cat.tag}</span>
                </div>

                <h3
                  className="relative z-10 font-display text-foreground mb-2 group-hover:text-accent transition-colors duration-300"
                  style={{ fontSize: "clamp(1.65rem, 5vw, 2.1rem)", letterSpacing: "0.02em", lineHeight: 1.05 }}
                >
                  {cat.title}
                </h3>
                <p
                  className="relative z-10 text-[0.84rem] sm:text-[0.9rem] font-body leading-relaxed tracking-[0.01em] mb-5 sm:mb-6"
                  style={{
                    color: hasImageBackground ? "hsl(var(--foreground) / 0.86)" : "hsl(var(--muted-foreground))",
                    wordSpacing: "0.04em",
                  }}
                >
                  {cat.subtitle}
                </p>

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4">
                  <span
                    className="inline-flex items-center font-display text-[0.8rem] sm:text-sm uppercase px-3 py-1.5 rounded-sm w-full sm:w-[22rem] min-h-[3.1rem]"
                    style={{
                      letterSpacing: "0.08em",
                      lineHeight: 1.15,
                      background: hasImageBackground
                        ? "linear-gradient(180deg, hsl(var(--background) / 0.58) 0%, hsl(var(--background) / 0.42) 100%)"
                        : "linear-gradient(180deg, hsl(var(--accent) / 0.14) 0%, hsl(var(--accent) / 0.08) 100%)",
                      border: "1px solid hsl(var(--accent) / 0.26)",
                      color: "hsl(var(--foreground) / 0.95)",
                      boxShadow: "inset 2px 0 0 hsl(var(--accent) / 0.72)",
                    }}
                  >
                    {cat.nominee}
                  </span>
                  <span
                    className="label-tag border border-accent/30 px-3 py-1.5 rounded-sm group-hover:bg-accent/10 transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
                  >
                    Vote Now →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {active && <VoteModal cat={active} onClose={() => setActive(null)} />}
    </section>
  );
}
