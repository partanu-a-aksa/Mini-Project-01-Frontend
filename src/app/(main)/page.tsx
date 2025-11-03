"use client";

import CTASection from "@/components/layout/landing/CTA";
import FeaturesSection from "@/components/layout/landing/FeaturesSection";
import HeroSection from "@/components/layout/landing/HeroSection";
import OngoingEvents from "@/components/layout/landing/OngoingEvents";
import { motion } from "motion/react";

export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <HeroSection />
        <FeaturesSection />
        <OngoingEvents />
        <CTASection />
      </motion.div>
    </>
  );
}
