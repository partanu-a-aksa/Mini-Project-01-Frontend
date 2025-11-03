"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20 flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-white to-purple-50 text-gray-800">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
        Discover. Create. Experience Events with Eventura.
      </h1>
      <p className="max-w-xl text-gray-600 text-lg mb-6">
        The all-in-one platform for event organizers and attendees. Explore
        exciting events or start creating your own.
      </p>

      <div className="flex gap-4">
        <Link
          href="/auth/login"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-all"
        >
          Get Started
        </Link>
        <Link
          href="/explore"
          className="px-6 py-3 rounded-full border border-purple-400 text-purple-600 font-semibold hover:bg-purple-50 transition-all"
        >
          Explore Events
        </Link>
      </div>
    </section>
  );
}
