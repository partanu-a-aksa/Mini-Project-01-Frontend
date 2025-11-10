"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardCard } from "../page";

interface IEvent {
  id: string | number;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
}

interface IUser {
  id: string;
  role: string;
}

export default function OrganizerEvents() {
  const [user, setUser] = useState<IUser | null>(null);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrganizerEvents() {
      try {
        setLoading(true);

        const userRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          { withCredentials: true }
        );

        const currentUser: IUser = userRes.data.user;
        setUser(currentUser);

        if (currentUser.role !== "ORGANIZER") {
          setError("Unauthorized: Only organizers can access this page.");
          return;
        }

        const eventsRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/event/organizer/${currentUser.id}`,
          { withCredentials: true }
        );

        setEvents(eventsRes.data.organizerEvents || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrganizerEvents();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading events...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );

  if (!events.length)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500">You haven`t created any events yet.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="border rounded-2xl p-4 shadow-sm bg-white"
        >
          <h2 className="text-lg font-semibold mb-2">{event.name}</h2>
          <p className="text-gray-600 text-sm mb-3">
            {event.category} | {new Date(event.startDate).toLocaleDateString()}
          </p>
          <div className="flex justify-between">
            <a
              href={`/dashboard/events/${event.id}`}
              className="text-blue-600 hover:underline"
            >
              View
            </a>
            <a
              href={`/dashboard/events/${event.id}/edit`}
              className="text-yellow-600 hover:underline"
            >
              Edit
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
