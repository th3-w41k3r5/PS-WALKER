"use client";

import { useEffect, useRef, useState } from "react";

interface SpotlightProps {
  className?: string;
  fill?: string;
  size?: number;
}

export function Spotlight({ className = "", fill = "white", size = 350 }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;

      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const element = divRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={divRef} className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute transition-opacity duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 0.4 : 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: `radial-gradient(circle, rgba(0,224,255,0.15) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      </div>
    </div>
  );
}
