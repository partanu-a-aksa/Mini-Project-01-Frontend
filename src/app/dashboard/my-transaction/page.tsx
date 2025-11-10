"use client";

import axios from "axios";
import {
  Loader2,
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

type Transaction = {
  id: number;
  event: { name: string };
  ticketQuantity: number;
  totalPrice: number;
  usedPoint: number;
  status: string;
  paymentProof?: string | null;
  createdAt: string;
};

export default function UserTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [countdowns, setCountdowns] = useState<Record<number, number>>({});

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/user`,
        { withCredentials: true }
      );
      setTransactions(res.data);

      // Initialize countdowns untuk transactions yang WAITING_FOR_PAYMENT
      const newCountdowns: Record<number, number> = {};
      res.data.forEach((tx: Transaction) => {
        if (tx.status === "WAITING_FOR_PAYMENT") {
          const createdAt = new Date(tx.createdAt).getTime();
          const now = Date.now();
          const elapsed = now - createdAt;
          const twoHours = 2 * 60 * 60 * 1000;
          const remaining = Math.max(0, twoHours - elapsed);
          newCountdowns[tx.id] = remaining;
        }
      });
      setCountdowns(newCountdowns);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const updated = { ...prev };
        let hasChanges = false;

        Object.keys(updated).forEach((key) => {
          const id = Number(key);
          if (updated[id] > 0) {
            updated[id] = Math.max(0, updated[id] - 1000);
            hasChanges = true;
          } else if (updated[id] === 0) {
            // Auto-refresh ketika countdown habis
            delete updated[id];
            fetchTransactions();
          }
        });

        return hasChanges ? updated : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format countdown ke HH:MM:SS
  const formatCountdown = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle upload payment proof
  const handleUpload = async (id: number, file: File) => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Only JPEG, PNG, or PDF files are allowed");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("paymentProof", file);

    setUploadingId(id);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/${id}/upload-proof`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Payment proof uploaded successfully!");

      // Refresh transactions list
      await fetchTransactions();
    } catch (error) {
      console.error("Upload error:", error);
      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message || "Failed to upload payment proof"
        );
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setUploadingId(null);
    }
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      { icon: any; color: string; text: string }
    > = {
      WAITING_FOR_PAYMENT: {
        icon: Clock,
        color: "bg-yellow-100 text-yellow-800",
        text: "Waiting for Payment",
      },
      WAITING_FOR_ADMIN_CONFIRMATION: {
        icon: AlertCircle,
        color: "bg-blue-100 text-blue-800",
        text: "Pending Confirmation",
      },
      DONE: {
        icon: CheckCircle,
        color: "bg-green-100 text-green-800",
        text: "Completed",
      },
      REJECTED: {
        icon: XCircle,
        color: "bg-red-100 text-red-800",
        text: "Rejected",
      },
      EXPIRED: {
        icon: XCircle,
        color: "bg-gray-100 text-gray-800",
        text: "Expired",
      },
      CANCELED: {
        icon: XCircle,
        color: "bg-gray-100 text-gray-800",
        text: "Canceled",
      },
    };

    const config = statusMap[status] || {
      icon: AlertCircle,
      color: "bg-gray-100 text-gray-800",
      text: status.replace(/_/g, " "),
    };

    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon size={14} />
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Transactions</h1>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No transactions found.</p>
          <p className="text-sm text-gray-400 mt-2">
            Purchase event tickets to see your transactions here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Transactions</h1>

      <div className="space-y-4">
        {transactions.map((tx) => {
          const countdown = countdowns[tx.id];
          const isExpiringSoon = countdown && countdown < 30 * 60 * 1000; // < 30 menit

          return (
            <div
              key={tx.id}
              className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{tx.event.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Transaction ID: #{tx.id}
                  </p>
                </div>
                {getStatusBadge(tx.status)}
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Tickets</p>
                  <p className="font-medium">{tx.ticketQuantity}x</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Price</p>
                  <p className="font-medium">
                    Rp {tx.totalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
                {tx.usedPoint > 0 && (
                  <div>
                    <p className="text-gray-500">Points Used</p>
                    <p className="font-medium text-green-600">
                      -{tx.usedPoint.toLocaleString("id-ID")} pts
                    </p>
                  </div>
                )}
              </div>

              {/* Countdown Timer */}
              {countdown !== undefined && countdown > 0 && (
                <div
                  className={`mb-4 p-3 rounded-lg ${
                    isExpiringSoon
                      ? "bg-red-50 border border-red-200"
                      : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock
                      size={16}
                      className={
                        isExpiringSoon ? "text-red-600" : "text-blue-600"
                      }
                    />
                    <p
                      className={`text-sm font-medium ${
                        isExpiringSoon ? "text-red-700" : "text-blue-700"
                      }`}
                    >
                      Time remaining to upload payment proof:{" "}
                      <span className="font-mono">
                        {formatCountdown(countdown)}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Action Button / Payment Proof Link */}
              <div className="flex items-center gap-3">
                {tx.status === "WAITING_FOR_PAYMENT" ? (
                  <>
                    <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      {uploadingId === tx.id ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={18} />
                          Upload Payment Proof
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUpload(tx.id, file);
                            }}
                            disabled={uploadingId !== null}
                          />
                        </>
                      )}
                    </label>
                    <p className="text-xs text-gray-500">
                      JPEG, PNG, or PDF (max 5MB)
                    </p>
                  </>
                ) : tx.paymentProof ? (
                  <a
                    href={tx.paymentProof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    <CheckCircle size={16} />
                    View Payment Proof
                  </a>
                ) : (
                  <p className="text-gray-400 text-sm italic">
                    No action required
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
