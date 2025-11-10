"use client";

import { useState, useEffect } from "react";
import OngoingEvents from "@/components/layout/landing/OngoingEvents";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ExplorePage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9; // Items per page

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // Reset to page 1 when search changes
    }, 800);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    // Reset to page 1 when category changes
    setPage(1);
  }, [category]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (pageNum: number) => {
    setPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (page > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

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

      <section className="max-w-6xl mx-auto pb-10">
        <OngoingEvents
          search={search}
          category={category}
          page={page}
          limit={limit}
          onPaginationChange={setTotalPages}
        />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 px-4">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:border-blue-500"
              }`}
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {getPageNumbers().map((pageNum, idx) =>
                pageNum === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-3 py-2 text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => handlePageClick(pageNum as number)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      page === pageNum
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 hover:bg-gray-50 hover:border-blue-500"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
                page === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:border-blue-500"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
