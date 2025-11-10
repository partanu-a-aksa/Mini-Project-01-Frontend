"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen py-20 flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/landing/bgaurora.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        viewport={{ once: false, amount: 0.3 }}
        className="relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
          Discover. Create. Experience Events with Eventura.
        </h1>
        <p className="text-white text-lg mb-6 drop-shadow-lg">
          The all-in-one platform for event organizers and attendees. Explore
          exciting events or start creating your own.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/login"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-all"
          >
            Get Started
          </Link>
          <Link
            href="/explore"
            className="px-6 py-3 rounded-full border border-purple-400 text-white font-semibold hover:bg-white/10 backdrop-blur-sm transition-all"
          >
            Explore Events
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
