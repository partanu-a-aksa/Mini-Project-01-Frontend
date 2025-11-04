"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function MyEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/event/ongoing`)
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data?.events)
          ? res.data.events
          : [];
        setEvents(data);
      })
      .catch(() => console.log("Failed to fetch events"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading events...</p>;

  if (!events || events.length === 0)
    return <p className="p-6">No events available.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Available Events</h1>

      <div className="space-y-4">
        {events.map((event: any) => (
          <div
            key={event.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-500">
                {event.category} | Rp {event.price?.toLocaleString("id-ID")}
              </p>
            </div>

            <button
              onClick={() =>
                axios
                  .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/transaction/buy`,
                    {
                      eventId: event.id,
                      ticketQuantity: 1,
                      price: event.price,
                      totalPrice: event.price,
                    },
                    {
                      withCredentials: true,
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  )
                  .then(() => alert("Ticket purchased!"))
                  .catch((err) => {
                    console.log(err.response?.data || err.message);
                    alert("Failed to buy ticket");
                  })
              }
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
