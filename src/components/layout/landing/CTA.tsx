"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to make your next event unforgettable?
      </h2>
      <p className="mb-6 text-lg opacity-90">
        Join thousands of organizers and attendees who trust Eventura.
      </p>
      <Link
        href="/auth/signup"
        className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all"
      >
        Sign Up Now
      </Link>
    </section>
  );
}
