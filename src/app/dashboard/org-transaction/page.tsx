"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Check, X } from "lucide-react";

type User = {
  name: string;
  email: string;
};

type Event = {
  name: string;
};

type Transaction = {
  id: number;
  user: User;
  event: Event;
  ticketQuantity: number;
  totalPrice: number;
  paymentProof: string | null;
  status: string;
};

export default function OrganizerTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch pending transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/transaction/pending`
        );
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Handle Accept or Reject
  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/${id}/status`,
        { status }
      );

      // Refresh list
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));

      alert(
        `Transaction ${
          status === "DONE" ? "accepted" : "rejected"
        } successfully!`
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Something went wrong!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading transactions...
      </div>
    );

  if (transactions.length === 0)
    return (
      <div className="text-center py-10 text-gray-600">
        No pending transactions found.
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Pending Transactions</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 border">Event</th>
              <th className="p-3 border">Attendee</th>
              <th className="p-3 border">Tickets</th>
              <th className="p-3 border">Total (IDR)</th>
              <th className="p-3 border">Payment Proof</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t hover:bg-gray-50">
                <td className="p-3 border">{tx.event.name}</td>
                <td className="p-3 border">
                  <div className="font-medium">{tx.user.name}</div>
                  <div className="text-xs text-gray-500">{tx.user.email}</div>
                </td>
                <td className="p-3 border text-center">{tx.ticketQuantity}</td>
                <td className="p-3 border">{tx.totalPrice.toLocaleString()}</td>
                <td className="p-3 border text-center">
                  {tx.paymentProof ? (
                    <a
                      href={tx.paymentProof}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No proof</span>
                  )}
                </td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleUpdateStatus(tx.id, "DONE")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 inline-flex items-center gap-1"
                  >
                    <Check size={16} /> Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(tx.id, "REJECTED")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 inline-flex items-center gap-1"
                  >
                    <X size={16} /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
