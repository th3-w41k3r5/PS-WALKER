import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-2xl space-y-4">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
          PS WALKER #77992
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold">Coming Soon</h1>
        <div>
          <Link
            href="/edm-awards-miami"
            className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            Open EDM Awards Miami
          </Link>
        </div>
      </div>
    </main>
  );
}
