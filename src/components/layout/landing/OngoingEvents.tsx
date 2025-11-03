"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, MapPin, Loader2 } from "lucide-react";

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

interface IProps {
  search?: string;
  category?: string;
}

export default function OngoingEvents({ search = "", category = "" }: IProps) {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/event/ongoing`,
          {
            params: { search, category },
          }
        );
        setEvents(res.data.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [search, category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="animate-spin text-gray-500" size={28} />
        <p className="ml-3 text-gray-500">Loading event...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-16 text-gray-600">
        <p>No event currently ongoing.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-bold text-center mb-8">Ongoing Events</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}
