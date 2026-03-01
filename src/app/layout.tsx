import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "PS WALKER #77992",
  description: "PS WALKER intro and EDM Awards Miami experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="font-sans antialiased overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
