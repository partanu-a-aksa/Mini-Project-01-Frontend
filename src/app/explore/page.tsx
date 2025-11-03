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
    const timer = setTimeout(() => setSearch(searchInput), 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <section className="text-center py-14 bg-white shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">
          Explore Awesome Events
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-xl mx-auto">
          Find something that sparks your curiosity — concerts, workshops,
          conferences, and more.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white w-full sm:w-2/3">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full outline-none text-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white sm:w-1/3">
          <Filter size={18} className="text-gray-500" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          >
            <option value="">All categories</option>
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            <option value="Workshop">Workshop</option>
            <option value="Festival">Festival</option>
          </select>
        </div>
      </section>

      {/* Event List */}
      <section className="max-w-6xl mx-auto pb-10">
        <OngoingEvents search={search} category={category} />
      </section>

      <Footer />
    </main>
  );
}
