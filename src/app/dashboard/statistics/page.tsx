"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  DollarSign,
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface EventStat {
  id: number;
  name: string;
  totalSeats: number;
  remainingSeats: number;
  soldSeats: number;
  attendees: number;
  revenue: number;
  startDate: string;
  endDate: string;
}

interface StatisticsData {
  overview: {
    totalEvents: number;
    activeEvents: number;
    totalAttendees: number;
    totalRevenue: number;
    pendingTransactions: number;
  };
  eventStats: EventStat[];
}

export default function StatisticsPage() {
  const [data, setData] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/statistics/data`,
          {
            withCredentials: true,
          }
        );

        setData(res.data);
      } catch (error: any) {
        console.error("Error fetching statistics:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load statistics. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-gray-500">
        <AlertCircle className="text-red-500 mb-2" size={48} />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-8">
      <h1 className="text-3xl font-semibold mb-4">Statistics Overview</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Events */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Calendar className="text-purple-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Events</p>
            <h2 className="text-2xl font-semibold">
              {data.overview.totalEvents}
            </h2>
          </div>
        </div>

        {/* Active Events */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <Clock className="text-orange-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Events</p>
            <h2 className="text-2xl font-semibold">
              {data.overview.activeEvents}
            </h2>
          </div>
        </div>

        {/* Total Attendees */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="text-blue-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Attendees</p>
            <h2 className="text-2xl font-semibold">
              {data.overview.totalAttendees.toLocaleString("id-ID")}
            </h2>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <DollarSign className="text-green-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-2xl font-semibold">
              Rp {data.overview.totalRevenue.toLocaleString("id-ID")}
            </h2>
          </div>
        </div>

        {/* Pending Transactions */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <Clock className="text-yellow-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pending Transactions</p>
            <h2 className="text-2xl font-semibold">
              {data.overview.pendingTransactions}
            </h2>
          </div>
        </div>
      </div>

      {/* Event Statistics Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Event Performance</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Event Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Attendees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Available Seats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.eventStats.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No events found
                  </td>
                </tr>
              ) : (
                data.eventStats.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {event.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {event.attendees} / {event.totalSeats}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {event.remainingSeats}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      Rp {event.revenue.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
