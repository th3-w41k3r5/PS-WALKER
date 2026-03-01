"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

const images = [
  {
    src: "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772009616/photo_2026-02-25_13-30-54_sndt3i.jpg",
    caption: "Alan won EDM Miami Awards 2024 in four categories.",
    label: "EDM Miami Awards 2024",
  },
  {
    src: "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772392095/photo_2026-03-02_00-33-22_b6v641.jpg",
    caption: "Alan Walker and Steve Aoki shared the stage.",
    label: "Electric Love Festival 2025",
  },
  {
    src: "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772392095/photo_2026-03-02_00-29-29_qrssn1.jpg",
    caption: "Tomorrowland 2025 was unforgettable - crowd energy made it legendary.",
    label: "Tomorrowland 2025",
  },
  {
    src: "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772392095/photo_2026-03-02_00-36-56_p1hcra.jpg",
    caption: "Alan with The Walkers before a Walkerworld show.",
    label: "Alan X The Walkers",
  },
  {
    src: "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772392097/photo_2026-03-02_00-29-51_tqsylv.jpg",
    caption: "An electrifying set for an electrifying Tomorrowland crowd.",
    label: "Tomorrowland 2025",
  },
  {
    src: "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772392094/photo_2026-03-02_00-37-18_genwgo.jpg",
    caption: "Alan with a young Walker at a Walkerworld show.",
    label: "Alan X The Walkers",
  },
  {
    src: "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772392094/photo_2026-03-02_00-37-55_snbg5f.jpg",
    caption: "Alan with The Walkers at the grand opening of Villa Walker.",
    label: "Alan X The Walkers",
  },
  {
    src: "https://res.cloudinary.com/dyfkvhvvk/image/upload/c_fill,ar_16:10,g_north,f_auto,q_auto/v1772392095/photo_2026-03-02_00-32-08_mtwekv.jpg",
    caption: "The Lonely Club duo at Electric Love Festival 2025.",
    label: "Alan X Steve Aoki - Lonely Club",
  },
  {
    src: "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772392097/photo_2026-03-02_00-29-51_tqsylv.jpg",
    caption: "Alan performing for the epic crowd of Tomorrowland.",
    label: "Tomorrowland 2025",
  },
];

const loopedImages = [...images, ...images, ...images];
const baseIndex = images.length;

export default function GallerySection() {
  const { ref, inView } = useInView<HTMLElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInitialScroll = useRef(true);
  const [activeIndex, setActiveIndex] = useState(baseIndex);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior) => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    const cards = container.querySelectorAll<HTMLElement>("[data-gallery-item]");
    const target = cards[index];

    if (!target) {
      return;
    }

    const centeredLeft = target.offsetLeft - (container.clientWidth - target.clientWidth) / 2;
    container.scrollTo({ left: Math.max(0, centeredLeft), behavior });
  }, []);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const behavior = isInitialScroll.current ? "auto" : "smooth";
    scrollToIndex(activeIndex, behavior);
    isInitialScroll.current = false;
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    if (activeIndex >= images.length * 2) {
      const resetIndex = activeIndex - images.length;
      const resetTimer = window.setTimeout(() => {
        isInitialScroll.current = true;
        setActiveIndex(resetIndex);
      }, 500);

      return () => window.clearTimeout(resetTimer);
    }

    if (activeIndex < images.length) {
      const resetIndex = activeIndex + images.length;
      const resetTimer = window.setTimeout(() => {
        isInitialScroll.current = true;
        setActiveIndex(resetIndex);
      }, 500);

      return () => window.clearTimeout(resetTimer);
    }
  }, [activeIndex]);

  const handleNext = () => setActiveIndex((prev) => prev + 1);
  const handlePrev = () => setActiveIndex((prev) => prev - 1);

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden" id="gallery">
      <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="px-6 md:px-12 lg:px-20 mb-12 flex items-end justify-between gap-4">
          <div className="text-left">
            <div className="label-tag mb-4">Visual Archive</div>
            <div className="divider-line mb-8 max-w-xs" />
            <h2
              className="font-display text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", lineHeight: 1.05 }}
            >
              Defining
              <br />
              <span className="text-accent">Moments</span>
            </h2>
          </div>
          <div className="flex gap-2 self-start md:self-end">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous gallery image"
              className="btn-outline-accent h-10 w-10 px-0 text-2xl leading-none font-semibold"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next gallery image"
              className="btn-outline-accent h-10 w-10 px-0 text-2xl leading-none font-semibold"
            >
              ›
            </button>
          </div>
        </div>

        <div className="relative fade-edges">
          <div
            ref={scrollRef}
            className="scroll-gallery flex gap-4 overflow-x-auto px-6 md:px-12 lg:px-20 pb-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {loopedImages.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                data-gallery-item
                className="gallery-item flex-shrink-0 relative overflow-hidden rounded-sm group"
                style={{
                  width: "clamp(280px, 50vw, 520px)",
                  height: "clamp(180px, 32vw, 320px)",
                  border: "1px solid hsl(var(--border))",
                  scrollSnapAlign: "center",
                }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.85 }}
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5"
                  style={{
                    background:
                      "linear-gradient(to top, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.65) 35%, hsl(var(--background) / 0.25) 60%, transparent 82%)",
                  }}
                >
                  <div className="label-tag mb-1">{img.label}</div>
                  <p className="font-display text-foreground text-sm tracking-wide">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
