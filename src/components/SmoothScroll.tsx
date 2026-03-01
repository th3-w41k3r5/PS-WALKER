"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2,
      easing: (t) => 1 - Math.pow(1 - t, 2.6),
      smoothWheel: true,
    });

    const handleLenisScroll = (event: { velocity?: number }) => {
      window.dispatchEvent(
        new CustomEvent("lenis-scroll", {
          detail: {
            velocity: event.velocity ?? 0,
          },
        })
      );
    };

    lenis.on("scroll", handleLenisScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.off("scroll", handleLenisScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
