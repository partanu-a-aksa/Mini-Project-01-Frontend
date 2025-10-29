"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            withCredentials: true,
          }
        );
        setRole(res.data.user.role);
      } catch {
        setRole("");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <Loader2 className="animate-spin" size={24} />
        <span className="ml-2">Loading Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {role === "ORGANIZER" ? "Organizer Dashboard" : "Attendee Dashboard"}
      </h1>

      {role === "ORGANIZER" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Organizer widgets */}
          <DashboardCard
            title="Event Management"
            desc="View and manage your events (Add / Edit / Delete)."
          />
          <DashboardCard
            title="Transaction Management"
            desc="Accept, reject, or view payment proofs from users."
          />
          <DashboardCard
            title="Statistics Overview"
            desc="View event statistics and performance metrics."
          />
          <DashboardCard
            title="Attendee List"
            desc="See who is attending your events, with ticket quantity and price paid."
          />
          <DashboardCard
            title="Notification Emails"
            desc="Email customers when transactions are accepted or rejected."
          />
          <DashboardCard
            title="Seat & Points Restoration"
            desc="Restore available seats and points for rejected transactions."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Attendee widgets */}
          <DashboardCard
            title="My Tickets"
            desc="View your purchased tickets and check event schedules."
          />
          <DashboardCard
            title="Upcoming Events"
            desc="Explore events you might like to attend next."
          />
          <DashboardCard
            title="Reward Points"
            desc="Track your reward points and referral bonuses."
          />
        </div>
      )}
    </div>
  );
}

function DashboardCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
