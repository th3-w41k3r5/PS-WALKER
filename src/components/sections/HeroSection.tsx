"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HERO_BG_URL = "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772009407/rs_w_2320_h_1787_foav6w.webp";
const HERO_LOGO_URL = "https://res.cloudinary.com/dyfkvhvvk/image/upload/v1772009407/AW_WHITE_LOGO_ORIGINAL_zmfzqr.png";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(target: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const now = Date.now();
      const diff = Math.max(0, target.getTime() - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

const AWARD_DATE = new Date("2026-03-28T20:00:00");

export default function HeroSection() {
  const timeLeft = useCountdown(AWARD_DATE);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      id="hero"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_BG_URL}
          alt="EDM Miami concert atmosphere"
          fill
          sizes="100vw"
          priority
          className="h-full w-full object-cover object-center"
          style={{ opacity: 0.28 }}
        />
        <div className="absolute inset-0 bg-background" style={{ opacity: 0.68 }} />
      </div>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "70vw",
          height: "60vh",
          background: "radial-gradient(ellipse at center, hsl(189 100% 44% / 0.07) 0%, transparent 65%)",
        }}
      />

      {/*<div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="watermark-text" style={{ filter: "blur(1px)" }}>
          EDM MIAMI
        </span>
      </div>*/}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl mx-auto pt-16">
        <Image
          src={HERO_LOGO_URL}
          alt="Alan Walker"
          width={80}
          height={80}
          className="mb-6 animate-fade-up"
          style={{ width: "clamp(52px, 8vw, 80px)", height: "auto", opacity: 0.95 }}
        />

        <p
          className="font-display text-muted-foreground mb-2 tracking-[0.35em] text-xs uppercase animate-fade-up"
        >
          Vote For
        </p>

        <h1
          className="font-display text-foreground glow-accent animate-fade-up-delay-1"
          style={{
            fontSize: "clamp(3rem, 11vw, 7.5rem)",
            lineHeight: 0.92,
            letterSpacing: "0.05em",
          }}
        >
          ALAN
          <br />
          <span className="text-accent">WALKER</span>
        </h1>

        <p
          className="font-display text-muted-foreground mt-4 mb-8 tracking-[0.25em] text-xs md:text-sm uppercase animate-fade-up-delay-2"
        >
          EDM Awards Miami 2026
        </p>

        <p className="label-tag mb-3 animate-fade-up-delay-2" style={{ letterSpacing: "0.3em" }}>
          Deadline
        </p>

        <div className="flex items-start gap-3 md:gap-6 mb-8 animate-fade-up-delay-2">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Min", value: timeLeft.minutes },
            { label: "Sec", value: timeLeft.seconds },
          ].map((unit, i) => (
            <div key={unit.label} className="flex items-start">
              <div className="flex flex-col items-center">
                <span
                  className="font-display text-foreground"
                  style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1, letterSpacing: "0.04em" }}
                >
                  {pad(unit.value)}
                </span>
                <span className="label-tag mt-1" style={{ fontSize: "0.55rem" }}>{unit.label}</span>
              </div>
              {i < 3 && (
                <span
                  className="font-display text-accent colon-pulse mx-1"
                  style={{ fontSize: "clamp(1.2rem, 3.5vw, 2rem)" }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        <a
          href="#categories"
          className="btn-outline-accent inline-block px-8 py-3 text-xs md:text-sm rounded-sm animate-fade-up-delay-3"
        >
          Cast Your Vote
        </a>

        <div className="mt-8 flex flex-col items-center gap-2 opacity-40 animate-fade-up-delay-3">
          <span className="label-tag" style={{ fontSize: "0.55rem" }}>Scroll</span>
          <div
            className="w-px h-7"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--foreground) / 0.6), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
