"use client";

import { useInView } from "@/hooks/useInView";
import { MousePointer2, Search, CheckSquare, Mail, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MousePointer2,
    step: "01",
    title: "Open the Voting Portal",
    desc: "Click any 'Vote Now' button on this page to go directly to the official EDM Miami Awards voting site.",
  },
  {
    icon: Mail,
    step: "02",
    title: "Submit Your Email",
    desc: "Enter your email address to proceed with voting.",
  },
  {
    icon: Search,
    step: "03",
    title: "Find the Nominee",
    desc: "Search for the respective nominee from the list of nominees.",
  },
  {
    icon: CheckSquare,
    step: "04",
    title: "Choose and Vote",
    desc: "Select the nominee and click the Vote button.",
  },
  {
    icon: CheckCircle,
    step: "05",
    title: "Confirm via Email",
    desc: "Check your inbox and confirm your vote through the email link.",
    accent: true,
  },
];

export default function HowToVoteSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="section-padding max-w-3xl mx-auto" id="how-to-vote">
      <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="mb-16 md:mb-20">
          <div className="label-tag mb-4">Step by Step</div>
          <div className="divider-line mb-8 max-w-xs" />
          <h2
            className="font-display text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", lineHeight: 1.05 }}
          >
            How to
            <br />
            <span className="text-accent">Cast Your Vote</span>
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            return (
              <div
                key={step.step}
                className="relative flex gap-6 pb-10"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-20px)",
                  transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
                }}
              >
                {!isLast && (
                  <div
                    className="absolute left-5 top-12 bottom-0 w-px"
                    style={{
                      background: "linear-gradient(to bottom, hsl(var(--accent) / 0.25), transparent)",
                    }}
                  />
                )}

                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center"
                    style={{
                      background: step.accent
                        ? "hsl(var(--accent) / 0.12)"
                        : "hsl(var(--surface))",
                      border: step.accent
                        ? "1px solid hsl(var(--accent) / 0.4)"
                        : "1px solid hsl(var(--border))",
                    }}
                  >
                    <Icon
                      size={16}
                      className={step.accent ? "text-accent" : "text-muted-foreground"}
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <div className="label-tag mb-2">Step {step.step}</div>
                  <h3
                    className={`font-display mb-2 ${step.accent ? "text-accent" : "text-foreground"}`}
                    style={{ fontSize: "1.15rem", letterSpacing: "0.04em" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                  {step.accent && (
                    <div
                      className="mt-4 inline-flex items-center gap-2 rounded-sm px-4 py-2.5"
                      style={{
                        background: "hsl(var(--accent) / 0.07)",
                        border: "1px solid hsl(var(--accent) / 0.2)",
                      }}
                    >
                      <CheckCircle size={13} className="text-accent" />
                      <span className="text-accent text-xs font-medium-ui tracking-widest uppercase">
                        Confirmation email required
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
