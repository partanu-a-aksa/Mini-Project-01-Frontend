"use client";

import CTASection from "@/components/layout/landing/CTA";
import FeaturesSection from "@/components/layout/landing/FeaturesSection";
import HeroSection from "@/components/layout/landing/HeroSection";
import OngoingEvents from "@/components/layout/landing/OngoingEvents";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <OngoingEvents />
      <CTASection />
    </>
  );
}
