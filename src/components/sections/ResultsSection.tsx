"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { RefreshCw } from "lucide-react";

type ResultItem = {
  name: string;
  percentage: number;
};

type PollResult = {
  id: string;
  title: string;
  items: ResultItem[];
};

type ResultsPayload = {
  polls: PollResult[];
  updatedAt: string;
};

export default function ResultsSection() {
  const { ref, inView } = useInView<HTMLElement>();
  const [results, setResults] = useState<ResultsPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/poll-results", { cache: "no-store" });
        const data = await response.json();

        if (!response.ok) {
          setError(data?.error ?? "Unable to load results.");
          return;
        }

        setResults(data as ResultsPayload);
      } catch {
        setError("Unable to load results.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchResults();
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-20 overflow-hidden" id="results">
      <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="px-6 md:px-12 lg:px-20 mb-8">
          <div className="label-tag mb-4">Live Results</div>
          <div className="divider-line mb-6 max-w-xs" />
          <h2
            className="font-display text-foreground"
            style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.8rem)", letterSpacing: "0.04em", lineHeight: 1.05 }}
          >
            Results
            <br />
            <span className="text-accent">Snapshot</span>
          </h2>
        </div>

        <div className="px-6 md:px-12 lg:px-20">
          <div
            className="rounded-sm p-4 md:p-6"
            style={{
              background: "hsl(var(--surface) / 0.4)",
              border: "1px solid hsl(var(--border))",
            }}
          >
            {isLoading ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <RefreshCw size={16} className="animate-spin" />
                <span className="text-sm tracking-wide">Loading latest results...</span>
              </div>
            ) : null}

            {!isLoading && error ? (
              <p className="text-sm text-muted-foreground">{error}</p>
            ) : null}

            {!isLoading && !error && results ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  {results.polls.map((poll) => (
                    <div
                      key={poll.id}
                      className="rounded-sm p-3 md:p-4"
                      style={{
                        border: "1px solid hsl(var(--accent) / 0.2)",
                        background: "hsl(var(--background) / 0.45)",
                      }}
                    >
                      <h3 className="font-display text-accent text-lg md:text-xl tracking-wide mb-3">{poll.title}</h3>

                      <div className="space-y-3">
                        {poll.items.slice(0, 5).map((item) => (
                          <div key={item.name}>
                            <div className="mb-1.5 flex items-center justify-between gap-3">
                              <p className="text-foreground text-xs md:text-sm font-body truncate">{item.name}</p>
                              <p className="font-display text-accent text-xs md:text-sm tracking-wide">{item.percentage}%</p>
                            </div>
                            <div className="h-2 w-full rounded-sm" style={{ background: "hsl(var(--border) / 0.5)" }}>
                              <div
                                className="h-2 rounded-sm"
                                style={{
                                  width: `${item.percentage}%`,
                                  background: "linear-gradient(90deg, hsl(var(--accent) / 0.6) 0%, hsl(var(--accent)) 100%)",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="mt-3 text-[10px] text-muted-foreground uppercase tracking-[0.16em] opacity-70">
                        Top 5 shown
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-xs text-muted-foreground uppercase tracking-widest opacity-70">
                  Updated {new Date(results.updatedAt).toLocaleString()}
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
