"use client";

import { useEffect, useRef, useState } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particleOpacity, setParticleOpacity] = useState(0);
  const particleOpacityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    type Dot = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      hue: number;
      twinkle: number;
      twinkleSpeed: number;
    };

    type Streak = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      alpha: number;
      active: boolean;
    };

    const dots: Dot[] = [];
    const streaks: Streak[] = [];
    const targetCount = 62;
    const streakCount = 2;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let targetBoost = 0;
    let boost = 0;
    let isScrollSignalActive = false;
    let streakWasActive = false;
    let isStreakExitActive = false;
    let streakExitSpeed = 0;
    let rafId = 0;
    let decayTimeout: ReturnType<typeof setTimeout> | undefined;

    const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

    const resetDot = (dot: Dot) => {
      dot.x = randomBetween(0, width);
      dot.y = randomBetween(0, height);
      dot.vx = randomBetween(-0.9, 0.9);
      dot.vy = randomBetween(-0.9, 0.9);
      dot.size = randomBetween(0.55, 1.35);
      dot.alpha = randomBetween(0.22, 0.58);
      dot.hue = randomBetween(186, 202);
      dot.twinkle = randomBetween(0, Math.PI * 2);
      dot.twinkleSpeed = randomBetween(0.0009, 0.0023);
    };

    const resetStreak = (streak: Streak) => {
      const side = Math.floor(randomBetween(0, 4));
      const speed = randomBetween(4.2, 5.8);

      if (side === 0) {
        streak.x = randomBetween(-260, -40);
        streak.y = randomBetween(-40, height + 40);
        streak.vx = speed;
        streak.vy = randomBetween(-1.8, 1.8);
      } else if (side === 1) {
        streak.x = randomBetween(width + 40, width + 260);
        streak.y = randomBetween(-40, height + 40);
        streak.vx = -speed;
        streak.vy = randomBetween(-1.8, 1.8);
      } else if (side === 2) {
        streak.x = randomBetween(-40, width + 40);
        streak.y = randomBetween(-260, -40);
        streak.vx = randomBetween(-1.8, 1.8);
        streak.vy = speed;
      } else {
        streak.x = randomBetween(-40, width + 40);
        streak.y = randomBetween(height + 40, height + 260);
        streak.vx = randomBetween(-1.8, 1.8);
        streak.vy = -speed;
      }

      streak.length = randomBetween(86, 162);
      streak.alpha = randomBetween(0.1, 0.22);
      streak.active = true;
    };

    const deactivateStreak = (streak: Streak) => {
      streak.active = false;
      streak.x = -9999;
      streak.y = -9999;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (dots.length === 0) {
        for (let index = 0; index < targetCount; index += 1) {
          const dot = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            size: 1,
            alpha: 0.5,
            hue: 192,
            twinkle: 0,
            twinkleSpeed: 0.001,
          };
          resetDot(dot);
          dots.push(dot);
        }
      }

      if (streaks.length === 0) {
        for (let index = 0; index < streakCount; index += 1) {
          const streak = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            length: 120,
            alpha: 0.3,
            active: false,
          };
          deactivateStreak(streak);
          streaks.push(streak);
        }
      }
    };

    const animate = (time: number) => {
      boost += (targetBoost - boost) * 0.14;

      context.clearRect(0, 0, width, height);

      if (particleOpacityRef.current <= 0.001) {
        streakWasActive = false;
        isStreakExitActive = false;
        streakExitSpeed = 0;
        rafId = window.requestAnimationFrame(animate);
        return;
      }

      const speedMultiplier = 1 + boost * 6.0;

      for (const dot of dots) {
        dot.x += dot.vx * speedMultiplier;
        dot.y += dot.vy * speedMultiplier;

        if (dot.y > height + 20 || dot.y < -20 || dot.x < -20 || dot.x > width + 20) {
          resetDot(dot);
        }

        const twinkleFactor = 0.72 + 0.28 * Math.sin(time * dot.twinkleSpeed + dot.twinkle);
        const starAlpha = Math.min(1, dot.alpha * twinkleFactor);

        context.fillStyle = `hsla(${dot.hue} 100% 72% / ${starAlpha * 0.35})`;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size * 2.2, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = `hsla(${dot.hue} 100% 84% / ${starAlpha})`;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        context.fill();
      }

      const streakActive = isScrollSignalActive;

      if (streakActive && !streakWasActive) {
        isStreakExitActive = false;
        streakExitSpeed = 0;
        for (const streak of streaks) {
          resetStreak(streak);
        }
      }

      if (!streakActive && streakWasActive) {
        isStreakExitActive = true;
        streakExitSpeed = 30;
      }

      if (streakActive || isStreakExitActive) {
        const streakSpeedMultiplier = streakActive ? 10 + boost * 14 : streakExitSpeed;
        const alphaBoost = streakActive ? boost * 0.36 : 0.06;
        let activeStreakCount = 0;

        for (const streak of streaks) {
          if (!streak.active) {
            continue;
          }

          const fromX = streak.x;
          const fromY = streak.y;
          streak.x += streak.vx * streakSpeedMultiplier;
          streak.y += streak.vy * streakSpeedMultiplier;

          const offscreenPadding = streak.length + 240;
          if (
            streak.x > width + offscreenPadding ||
            streak.y > height + offscreenPadding ||
            streak.x < -offscreenPadding ||
            streak.y < -offscreenPadding
          ) {
            if (streakActive) {
              resetStreak(streak);
            } else {
              deactivateStreak(streak);
            }
            continue;
          }

          activeStreakCount += 1;

          const toX = streak.x + streak.vx * streak.length;
          const toY = streak.y + streak.vy * streak.length;
          const streakAlpha = Math.min(0.58, streak.alpha + alphaBoost);

          context.strokeStyle = `hsla(192 100% 78% / ${streakAlpha})`;
          context.lineWidth = 0.36;
          context.lineCap = "round";
          context.beginPath();
          context.moveTo(fromX, fromY);
          context.lineTo(toX, toY);
          context.stroke();
        }

        if (!streakActive) {
          if (activeStreakCount === 0) {
            isStreakExitActive = false;
            streakExitSpeed = 0;
          } else {
            streakExitSpeed += (42 - streakExitSpeed) * 0.1;
          }
        }
      }

      streakWasActive = streakActive;

      rafId = window.requestAnimationFrame(animate);
    };

    const triggerScrollSignal = (magnitude: number) => {
      isScrollSignalActive = true;
      targetBoost = Math.min(0.76, 0.16 + magnitude * 0.00135);

      if (decayTimeout) {
        clearTimeout(decayTimeout);
      }

      decayTimeout = setTimeout(() => {
        isScrollSignalActive = false;
        targetBoost = 0;
      }, 130);
    };

    const handleWheel = (event: WheelEvent) => {
      const magnitude = Math.abs(event.deltaY) + Math.abs(event.deltaX) * 0.8;
      triggerScrollSignal(magnitude);
    };

    const handleTouchMove = () => {
      triggerScrollSignal(260);
    };

    const handleLenisScroll = (event: Event) => {
      const customEvent = event as CustomEvent<{ velocity?: number }>;
      const velocity = Math.abs(customEvent.detail?.velocity ?? 0);

      if (velocity <= 0.01) {
        return;
      }

      triggerScrollSignal(velocity * 85);
    };

    const updateAfterHeroState = () => {
      const heroElement = document.getElementById("hero");
      const heroHeight = heroElement?.offsetHeight ?? window.innerHeight;
      const startFadeAt = heroHeight * 0.55;
      const endFadeAt = heroHeight * 0.95;
      const progress = (window.scrollY - startFadeAt) / Math.max(1, endFadeAt - startFadeAt);
      const nextOpacity = Math.max(0, Math.min(1, progress));

      if (Math.abs(nextOpacity - particleOpacityRef.current) > 0.01) {
        particleOpacityRef.current = nextOpacity;
        setParticleOpacity(nextOpacity);
      }
    };

    resize();
    updateAfterHeroState();

    rafId = window.requestAnimationFrame(animate);
    window.addEventListener("lenis-scroll", handleLenisScroll as EventListener);
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateAfterHeroState, { passive: true });

    return () => {
      window.removeEventListener("lenis-scroll", handleLenisScroll as EventListener);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateAfterHeroState);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      if (decayTimeout) {
        clearTimeout(decayTimeout);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: particleOpacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        className="absolute -top-44 -left-24 h-[34rem] w-[34rem] rounded-full blur-3xl ambient-glow-pulse-a"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)" }}
      />

      <div
        className="absolute -bottom-48 -right-24 h-[30rem] w-[30rem] rounded-full blur-3xl ambient-glow-pulse-b"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 72%)" }}
      />
    </div>
  );
}
