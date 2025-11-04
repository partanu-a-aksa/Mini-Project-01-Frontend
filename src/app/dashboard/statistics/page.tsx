"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Users, DollarSign, Loader2, AlertCircle } from "lucide-react";

export default function StatisticsPage() {
  const [data, setData] = useState<{
    totalAttendees: number;
    totalSales: number;
  } | null>(null);
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
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-semibold mb-4">Statistics Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Attendees */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="text-blue-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Attendees</p>
            <h2 className="text-2xl font-semibold">
              {data.totalAttendees?.toLocaleString("id-ID") ?? 0}
            </h2>
          </div>
        </div>

        {/* Total Sales */}
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <DollarSign className="text-green-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Sales</p>
            <h2 className="text-2xl font-semibold">
              Rp {data.totalSales?.toLocaleString("id-ID") ?? 0}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
