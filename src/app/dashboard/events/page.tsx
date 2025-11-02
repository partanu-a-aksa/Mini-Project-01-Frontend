"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { DashboardCard } from "../page";

interface IEvent {
  id: string | number;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
}

export default function Events() {
  const [role, setRole] = useState("");
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDataEvents() {
      try {
        const [userRes, eventsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
            withCredentials: true,
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/event/all`, {
            withCredentials: true,
          }),
        ]);

        setRole(userRes.data.user.role);
        setEvents(eventsRes.data.allEvents);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setRole("");
      } finally {
        setLoading(false);
      }
    }

    fetchDataEvents();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URL}/event/all`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log("API Response: ", res.data);
  //       setEvents(res.data.allEvents);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setLoading(false);
  //     });
  // }, []);

  if (loading) return <p>Loading Events...</p>;
  //   if (!events.length) return <p>No events found.</p>;

  return (
    <div className="relative min-h-screen p-8">
      {role === "ORGANIZER" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <DashboardCard
              key={event.id}
              title={event.name}
              desc={`${event.category} | ${new Date(
                event.startDate
              ).toLocaleDateString()}`}
            />
          ))}
        </div>
      ) : (
        "Unauthorized Access."
      )}
    </div>
  );
}
