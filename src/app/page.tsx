import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 grain">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="intro-scan-line absolute left-0 right-0 h-px bg-primary/15" />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.04) 1px, transparent 1px)",
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
          <h1 className="font-display text-5xl leading-[0.9] tracking-tight text-foreground sm:text-7xl md:text-8xl glow-accent">
            PS WALKER
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px max-w-16 flex-1 bg-border" />
            <span className="font-body text-2xl font-medium tracking-[0.3em] text-primary sm:text-3xl md:text-4xl">
              #77992
            </span>
            <div className="h-px max-w-16 flex-1 bg-border" />
          </div>
        </div>

        <p className="animate-fade-up-delay-3 font-body text-sm uppercase tracking-[0.5em] text-muted-foreground">
          Coming Soon
        </p>

        <Link
          href="/edm-awards-miami"
          className="group animate-fade-up relative border border-border px-10 py-6 text-center transition-all duration-300 hover:border-primary/70 hover:glow-box-accent hover:-translate-y-0.5 sm:px-14 sm:py-8"
        >
          <div className="absolute -top-px -left-px h-3 w-3 border-l border-t border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute -top-px -right-px h-3 w-3 border-r border-t border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute -bottom-px -left-px h-3 w-3 border-l border-b border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute -bottom-px -right-px h-3 w-3 border-r border-b border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <span className="mb-2 block font-body text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            Open
          </span>
          <span className="block whitespace-nowrap font-display text-lg font-semibold uppercase tracking-[0.22em] text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl">
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
    </main>
  );
}
