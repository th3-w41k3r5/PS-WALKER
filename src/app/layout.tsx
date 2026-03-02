import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "PS WALKER #77992",
  description:
    "The digital base of Walker #77992, coming soon with helpful tools, fun experiences, and community-powered projects for Walkers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="font-sans antialiased overflow-x-hidden">
        <GoogleAnalytics />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
