"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-20 text-white text-center px-4 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/landing/bgstarhorizontal.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4">
          Ready to make your next event unforgettable?
        </h2>
        <p className="mb-6 text-lg opacity-90">
          Join thousands of organizers and attendees who trust Eventura.
        </p>
        <Link
          href="/auth/signup"
          className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all"
        >
          Sign Up Now
        </Link>
      </div>
    </section>
  );
}
