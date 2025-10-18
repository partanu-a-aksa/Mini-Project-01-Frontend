"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Header() {
  // 🔍 State untuk search bar
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState(query);

  // 🧠 debounce 400ms
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(query), 400);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debounced.trim() !== "") {
      console.log("Searching for:", debounced);
      // nanti bisa fetch API event disini
    }
  }, [debounced]);

  return (
    <header className="bg-red-50 shadow-sm sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 gap-4">
        {/* LOGO */}
        <div className="relative group w-[150px] h-[50px] flex items-center justify-center">
          <div className=" absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient" />
          <Image
            src="/Navbar/Eventura.svg"
            alt="Eventura logo"
            fill
            className="scale-150 object-contain relative z-10 transition-transform duration-500"
          />
        </div>

        {/* 🔍 SEARCH BAR */}
        <div className="relative w-64 hidden md:block">
          <input
            type="text"
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
          />
          <div className="absolute right-3 top-2.5 text-gray-400">🔍</div>
        </div>

        {/* 🌈 NAVIGATION + SIGN IN */}
        <div className="flex items-center space-x-4">
          <Navbar />

          {/* 🔐 SIGN IN BUTTON */}
          <Link
            href="/auth/login"
            className="relative inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 animate-gradient"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
