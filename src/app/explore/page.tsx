"use client";

import { useState, useEffect } from "react";
import OngoingEvents from "@/components/layout/landing/OngoingEvents";
import { Search, Filter } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ExplorePage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <section className="text-center py-14 bg-white shadow-sm">
        <h1 className="text-5xl font-bold text-gray-800">
          Explore Awesome Events
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-xl mx-auto">
          Find something that sparks your curiosity — concerts, workshops,
          conferences, and more.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        {/* Search Bar */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white w-full sm:w-2/3 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search events by name, location..."
            className="w-full outline-none text-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white sm:w-1/3 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <Filter size={18} className="text-gray-500" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-transparent outline-none text-sm cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="FESTIVAL">Festival</option>
            <option value="MUSIC">Music</option>
            <option value="ART">Art</option>
            <option value="EDUCATION">Education</option>
          </select>
        </div>
      </section>

      <section className="max-w-6xl mx-auto pb-10 px-6">
        <OngoingEvents search={search} category={category} />
      </section>

      <Footer />
    </main>
  );
}
