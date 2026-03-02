"use client";

import { useInView } from "@/hooks/useInView";
import { ExternalLink } from "lucide-react";

export default function FinalCTASection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative section-padding flex flex-col items-center justify-center text-center overflow-hidden"
      id="support"
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "60vw",
          height: "60vh",
          background: "radial-gradient(ellipse at center, hsl(189 100% 44% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="divider-line w-full mb-16" />

      <div
        className="relative z-10 max-w-2xl mx-auto"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="label-tag mb-6">Final Call</div>

        <h2
          className="font-display text-foreground mb-4"
          style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", letterSpacing: "0.04em", lineHeight: 1 }}
        >
          Support
          <br />
          <span className="text-accent">Alan Walker</span>
        </h2>

          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed tracking-[0.015em] mb-12 max-w-md mx-auto">
          Every vote counts. Together, we can help Alan win all four EDM Awards Miami categories he is nominated for. So, vote now and share with fellow Walkers.
        </p>

        <a
          href="#categories"
          className="btn-solid-accent inline-flex items-center gap-3 px-12 py-5 rounded-sm text-sm md:text-base"
        >
          <span>Vote Now</span>
          <ExternalLink size={15} />
        </a>

        <p className="text-accent text-sm md:text-base font-medium-ui mt-7 tracking-[0.14em] uppercase motion-safe:animate-pulse">
          Voting closes March 28, 2026
        </p>
      </div>

      <div className="divider-line w-full mt-16" />
    </section>
  );
}
