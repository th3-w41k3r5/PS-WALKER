import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import HowToVoteSection from "@/components/sections/HowToVoteSection";
import ResultsSection from "@/components/sections/ResultsSection";
import GallerySection from "@/components/sections/GallerySection";
import ThrowbackSection from "@/components/sections/ThrowbackSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import FooterSection from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "Vote Alan Walker | EDM Awards Miami 2026",
  description:
    "Fan made Alan Walker EDM Awards Miami 2026 voting hub with all category voting links in one place.",
};

export default function EdmAwardsMiamiPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <CategoriesSection />
          <HowToVoteSection />
          <ResultsSection />
          <GallerySection />
          <ThrowbackSection />
          <FinalCTASection />
        </main>
        <FooterSection />
      </div>
    </div>
  );
}
