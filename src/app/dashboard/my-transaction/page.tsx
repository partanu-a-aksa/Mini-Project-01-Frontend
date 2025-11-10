"use client";

import axios from "axios";
import { Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";

type Transaction = {
  id: number;
  event: { name: string };
  totalPrice: number;
  status: string;
  paymentProof?: string | null;
};

export default function UserTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/transaction/user`, {
        withCredentials: true,
      })
      .then((res) => setTransactions(res.data))
      .catch(() => console.log("Failed to fetch transaction."))
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (id: number, file: File) => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("paymentProof", file);

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
    } catch (error) {
      console.error(error);
      alert("Failed to upload payment proof");
    }
  };

  if (loading)
    return <p className="p-6 text-gray-500">Loading transactions...</p>;

  if (!transactions.length)
    return <p className="p-6">No transactions found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Transactions</h1>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="border p-4 rounded flex justify-between items-center bg-white"
          >
            <div>
              <h2 className="font-semibold">{tx.event.name}</h2>
              <p className="text-sm text-gray-500">
                Total: Rp {tx.totalPrice.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-gray-500">
                Status: {tx.status.replaceAll("_", " ").toLowerCase()}
              </p>
            </div>

            {tx.status === "WAITING_FOR_PAYMENT" ? (
              <label className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-3 py-1 rounded hover:scale-105">
                {uploadingId === tx.id ? (
                  <>
                    <Loader2 className="animate-spin" size={16} /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={16} /> Upload
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(tx.id, file);
                      }}
                    />
                  </>
                )}
              </label>
            ) : tx.paymentProof ? (
              <a
                href={`${tx.paymentProof}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline"
              >
                View proof
              </a>
            ) : (
              <p className="text-gray-400 text-sm">No action</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
