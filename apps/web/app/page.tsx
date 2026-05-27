"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AnalyticsSection from "~/components/landing/AnalyticsSection";
import Atmosphere from "~/components/landing/Atmosphere";
import CTASection from "~/components/landing/CTASection";
import FeaturesSection from "~/components/landing/FeaturesSection";
import Footer from "~/components/landing/Footer";
import HeroSection from "~/components/landing/HeroSection";
import Navbar from "~/components/landing/Navbar";
import ThemesSection from "~/components/landing/ThemesSection";
import { useUser } from "~/hooks/api/auth";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <main className="relative overflow-hidden bg-[#050505] text-[#F3EBDD]">
      {/* Global Atmosphere */}
      <Atmosphere />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <HeroSection />

        <FeaturesSection />

        <AnalyticsSection />

        <ThemesSection />

        <CTASection />

        <Footer />
      </div>
    </main>
  );
}
