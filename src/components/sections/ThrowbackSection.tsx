"use client";

import { useInView } from "@/hooks/useInView";

const throwbackVideoUrl =
  "https://res.cloudinary.com/dyfkvhvvk/video/upload/v1772009619/3sss0y8ibxk6pitbv8gq_f5g1uo.mp4";

export default function ThrowbackSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden" id="throwback">
      <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="px-6 md:px-12 lg:px-20 mb-10 text-left md:text-center">
          <div className="label-tag mb-4 text-left md:text-center">Video Archive</div>
          <div className="divider-line mb-8 max-w-xs md:mx-auto" />
          <h2
            className="font-display text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", lineHeight: 1.05 }}
          >
            Throwback To
            <br />
            <span className="text-accent">EDM Awards Miami 2024</span>
          </h2>
        </div>

        <div className="px-6 md:px-12 lg:px-20 lg:max-w-5xl lg:mx-auto">
          <div
            className="relative overflow-hidden rounded-sm"
            style={{ border: "1px solid hsl(var(--accent) / 0.24)" }}
          >
            <video
              controls
              preload="metadata"
              playsInline
              className="w-full h-auto bg-black object-cover object-center"
            >
              <source src={throwbackVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
