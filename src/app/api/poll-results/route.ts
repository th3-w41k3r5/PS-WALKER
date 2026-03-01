import { NextResponse } from "next/server";

const POLL_RESULTS = [
  { id: "best-fan-army", url: "https://poll.fm/16632912/results" },
  { id: "best-performance", url: "https://poll.fm/16632932/results" },
  { id: "favourite-album", url: "https://poll.fm/16632820/results" },
  { id: "best-collaboration", url: "https://poll.fm/16632867/results" },
] as const;

type PollResultItem = {
  name: string;
  percentage: number;
};

type PollResult = {
  id: string;
  title: string;
  items: PollResultItem[];
  sourceUrl: string;
};

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\r/g, "");
}

function parseResults(html: string): { title: string; items: PollResultItem[] } {
  const titleMatch =
    html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) ||
    html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);

  const title = decodeHtml(titleMatch?.[1] ?? "Live Results");

  const structuredItems: PollResultItem[] = [];
  const rowRegex =
    /<label[^>]*class=["'][^"']*pds-feedback-label[^"']*["'][^>]*>[\s\S]*?<span[^>]*class=["'][^"']*pds-answer-text[^"']*["'][^>]*>([\s\S]*?)<\/span>[\s\S]*?<span[^>]*class=["'][^"']*pds-feedback-per[^"']*["'][^>]*>([\s\S]*?)<\/span>[\s\S]*?<\/label>/gi;

  let rowMatch: RegExpExecArray | null = rowRegex.exec(html);
  while (rowMatch) {
    const name = decodeHtml(rowMatch[1]);
    const percentageText = decodeHtml(rowMatch[2]);
    const percentageMatch = percentageText.match(/(\d{1,3})%/);
    const percentage = percentageMatch ? Number(percentageMatch[1]) : Number.NaN;

    if (name && !Number.isNaN(percentage) && percentage >= 0 && percentage <= 100) {
      structuredItems.push({ name, percentage });
    }

    rowMatch = rowRegex.exec(html);
  }

  if (structuredItems.length) {
    return { title, items: structuredItems };
  }

  const text = stripHtml(html);
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const items: PollResultItem[] = [];

  for (const line of lines) {
    const match = line.match(/^(.+?)\s+(\d{1,3})%$/);
    if (!match) {
      continue;
    }

    const name = decodeHtml(match[1]);
    const percentage = Number(match[2]);

    if (!name || Number.isNaN(percentage)) {
      continue;
    }

    if (percentage < 0 || percentage > 100) {
      continue;
    }

    items.push({ name, percentage });
  }

  const dedupedItems = items.filter(
    (item, index) => items.findIndex((candidate) => candidate.name === item.name) === index,
  );

  return { title, items: dedupedItems };
}

export async function GET() {
  try {
    const fetchedPolls = await Promise.all(
      POLL_RESULTS.map(async (poll): Promise<PollResult | null> => {
        const response = await fetch(poll.url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
          },
          next: { revalidate: 300 },
        });

        if (!response.ok) {
          return null;
        }

        const html = await response.text();
        const { title, items } = parseResults(html);

        if (!items.length) {
          return null;
        }

        return {
          id: poll.id,
          title,
          items,
          sourceUrl: poll.url,
        };
      }),
    );

    const polls = fetchedPolls.filter((poll): poll is PollResult => Boolean(poll));

    if (!polls.length) {
      return NextResponse.json(
        { error: "Unable to load poll results right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      polls,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch poll results." },
      { status: 500 },
    );
  }
}
