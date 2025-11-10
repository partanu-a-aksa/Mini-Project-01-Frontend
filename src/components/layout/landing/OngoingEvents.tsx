"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import { motion } from "motion/react";

interface IEvent {
  id: string;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  location?: string;
  price?: number;
  organizer?: {
    fullName: string;
    profilePicture?: string | null;
  };
}

interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface IProps {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  onPaginationChange?: (totalPages: number) => void;
}

export default function OngoingEvents({
  search = "",
  category = "",
  page = 1,
  limit = 3,
  onPaginationChange,
}: IProps) {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<IPagination | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        console.error("API URL not found!");
        return;
      }
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/event/ongoing`,
          {
            params: {
              search,
              category,
              page,
              limit,
            },
          }
        );
        setEvents(res.data.data || []);
        const paginationData = res.data.pagination || null;
        setPagination(paginationData);

        // Notify parent component about total pages
        if (onPaginationChange && paginationData) {
          onPaginationChange(paginationData.totalPages);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [search, category, page, limit, onPaginationChange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="animate-spin text-gray-500" size={28} />
        <p className="ml-3 text-gray-500">Loading events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-16 text-gray-600">
        <p>No events found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {pagination && (
        <div className="mb-6 text-center text-sm text-gray-600">
          Showing {(pagination.page - 1) * pagination.limit + 1}-
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
          {pagination.total} events
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        key={page}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl border bg-white shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {event.name}
                </h3>
                <p className="text-sm text-indigo-600 font-medium">
                  {event.category}
                </p>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>
                    {new Date(event.startDate).toLocaleDateString()} to{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                  </span>
                </div>

                {event.location ? (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-600" />
                    <span>{event.location}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-400 italic">
                    <MapPin size={16} />
                    <span>Location decided later.</span>
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between text-sm">
                <p className="font-semibold text-gray-700">
                  {event.price && event.price > 0
                    ? `Rp ${event.price.toLocaleString()}`
                    : "Free"}
                </p>

                {event.organizer?.fullName && (
                  <p className="text-gray-500 italic">
                    by {event.organizer.fullName}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
