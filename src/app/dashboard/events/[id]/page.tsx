"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface IEvent {
  id: number;
  name: string;
  description: string;
  category: string;
  location: string;
  startDate: string;
  endDate: string;
  price: number;
  totalSeats: number;
  remainingSeats: number;
}

export default function EventDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEventDetail() {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/event/${id}`,
          { withCredentials: true }
        );
        setEvent(data.event);
      } catch (err) {
        console.error("Error fetching event detail:", err);
        setError("Failed to load event detail.");
      } finally {
        setLoading(false);
      }
    }

    fetchEventDetail();
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="p-8">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
      <p className="text-gray-700 mb-3">{event.description}</p>
      <p>Category: {event.category}</p>
      <p>Location: {event.location}</p>
      <p>
        Date: {new Date(event.startDate).toLocaleString()} -{" "}
        {new Date(event.endDate).toLocaleString()}
      </p>
      <p>Price: {`Rp${event.price}`}</p>
      <p>
        Seats: {event.remainingSeats}/{event.totalSeats}
      </p>
    </div>
  );
}
