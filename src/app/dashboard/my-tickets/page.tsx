"use client";

import axios from "axios";
import { Loader2, Ticket, Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

type TicketTransaction = {
  id: number;
  event: {
    name: string;
    location: string;
    startDate: string;
    endDate: string;
  };
  ticketQuantity: number;
  totalPrice: number;
  status: string;
};

export default function MyTickets() {
  const [tickets, setTickets] = useState<TicketTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/transaction/user`, {
        withCredentials: true,
      })
      .then((res) => {
        // Filter hanya transaksi dengan status DONE
        const doneTickets = res.data.filter(
          (tx: TicketTransaction) => tx.status === "DONE"
        );
        setTickets(doneTickets);
      })
      .catch(() => console.log("Failed to fetch tickets."))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <Loader2 className="animate-spin" size={40} />
        <span className="ml-2">Loading tickets...</span>
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Tickets</h1>
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Belum Ada Tiket
          </h3>
          <p className="text-gray-500">
            Anda belum memiliki tiket event yang telah dikonfirmasi.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Tickets</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Ticket size={18} />
                  <span className="text-sm font-semibold">EVENTURA</span>
                </div>
                <h3 className="text-lg font-bold">{ticket.event.name}</h3>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="text-purple-600 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700">
                    {ticket.event.location}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar
                    size={18}
                    className="text-purple-600 mt-0.5 flex-shrink-0"
                  />
                  <div className="text-sm text-gray-700">
                    <div className="font-semibold">Tanggal Event</div>
                    <div>{formatDate(ticket.event.startDate)}</div>
                    {ticket.event.endDate !== ticket.event.startDate && (
                      <>
                        <div className="text-gray-500">s/d</div>
                        <div>{formatDate(ticket.event.endDate)}</div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Jumlah Tiket</span>
                    <span className="font-semibold">
                      {ticket.ticketQuantity}x
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Harga</span>
                    <span className="font-semibold text-purple-600">
                      Rp {ticket.totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
