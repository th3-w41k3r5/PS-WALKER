import Link from "next/link";
import React from "react";
import { Vortex } from "@/components/ui/vortex";

export default function VortexDemoSecond() {
  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      <Vortex
        backgroundColor="hsl(214 32% 5%)"
        rangeY={820}
        particleCount={980}
        baseHue={189}
        baseSpeed={0.1}
        rangeSpeed={1.45}
        baseRadius={1}
        rangeRadius={1.9}
        className="relative flex items-center flex-col justify-center px-6 md:px-10 py-4 w-full h-full text-center"
      >
        <div className="pointer-events-none absolute inset-0 bg-background/20" />
        <div className="pointer-events-none absolute inset-0 backdrop-blur-[1.5px] bg-background/8" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="intro-scan-line absolute left-0 right-0 h-px bg-primary/22" />
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary) / 0.075) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.075) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px intro-line-gradient" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px intro-line-gradient" />

        <div className="pointer-events-none absolute top-6 left-6 h-8 w-8 border-l border-t border-primary/30" />
        <div className="pointer-events-none absolute top-6 right-6 h-8 w-8 border-r border-t border-primary/30" />
        <div className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-l border-b border-primary/30" />
        <div className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-r border-b border-primary/30" />

        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-12 text-center">
          <div className="animate-fade-up-delay-1 flex items-center gap-3">
            <div className="h-px w-8 bg-primary/50" />
            <span className="font-body text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Launching Soon
            </span>
            <div className="h-px w-8 bg-primary/50" />
          </div>

          <div className="animate-fade-up-delay-2">
            <h2
              className="font-display text-5xl leading-[0.9] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-cyan-200 to-primary sm:text-7xl md:text-8xl drop-shadow-[0_0_16px_hsl(var(--primary)/0.25)]"
              style={{ backgroundSize: "100% 100%" }}
            >
              PS WALKER
            </h2>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="h-px max-w-16 flex-1 bg-border" />
              <span className="font-body text-2xl font-medium tracking-[0.3em] text-primary sm:text-3xl md:text-4xl">
                #77992
              </span>
              <div className="h-px max-w-16 flex-1 bg-border" />
            </div>
          </div>

          <p
            className="font-body text-base sm:text-lg uppercase tracking-[0.56em] text-primary"
            style={{ animation: "fadeUp 0.7s ease 0.45s both, comingSoonGlow 2.8s ease-in-out 1.2s infinite" }}
          >
            Coming Soon
          </p>

          <div className="animate-fade-up-delay-3 relative max-w-2xl rounded-sm border border-primary/20 bg-background/24 backdrop-blur-[2px] px-3 py-2 sm:px-6 sm:py-3">
            <div className="pointer-events-none absolute -top-px -left-px h-2 w-2 sm:h-2.5 sm:w-2.5 border-l border-t border-primary/55" />
            <div className="pointer-events-none absolute -top-px -right-px h-2 w-2 sm:h-2.5 sm:w-2.5 border-r border-t border-primary/55" />
            <div className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 sm:h-2.5 sm:w-2.5 border-l border-b border-primary/55" />
            <div className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 sm:h-2.5 sm:w-2.5 border-r border-b border-primary/55" />
            <p className="font-body text-[0.83rem] sm:text-sm leading-relaxed tracking-[0.035em] text-foreground/85">
              The digital base of Walker #77992, coming soon with helpful tools, fun experiences, and community-powered projects for Walkers.
            </p>
          </div>

          <Link
            href="/edm-awards-miami"
            className="group animate-fade-up relative border border-border px-7 py-4 text-center transition-all duration-300 hover:border-primary/70 hover:glow-box-accent hover:-translate-y-0.5 sm:px-11 sm:py-6"
          >
            <div className="absolute -top-px -left-px h-3 w-3 border-l border-t border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute -top-px -right-px h-3 w-3 border-r border-t border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute -bottom-px -left-px h-3 w-3 border-l border-b border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute -bottom-px -right-px h-3 w-3 border-r border-b border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="mb-2 block font-body text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
              Open
            </span>
            <span className="block whitespace-nowrap font-display text-base font-semibold uppercase tracking-[0.22em] text-foreground transition-colors duration-300 group-hover:text-primary sm:text-lg">
              EDM Awards Miami
            </span>
          </Link>

          <div className="animate-fade-up-delay-3 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Stay Tuned
            </span>
          </div>
        </div>
      </Vortex>
    </div>
  );
}
