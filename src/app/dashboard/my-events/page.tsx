"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { X, Ticket, Minus, Plus, Tag, Award, Loader2 } from "lucide-react";

interface Event {
  id: number;
  name: string;
  category: string;
  price: number;
  paid: boolean;
  remainingSeats: number;
  location?: string;
  startDate?: string;
}

interface UserData {
  points: number;
  coupons: Array<{
    id: number;
    code: string;
    discountAmount: number;
    expiredAt: string;
  }>;
}

interface CheckoutData {
  eventId: number;
  ticketQuantity: number;
  price: number;
  totalPrice: number;
  usedPoint?: number;
  usedCouponId?: number;
}

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [processing, setProcessing] = useState(false);

  // Checkout state
  const [quantity, setQuantity] = useState(1);
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState<number | null>(null);
  const [userData, setUserData] = useState<UserData>({
    points: 0,
    coupons: [],
  });

  useEffect(() => {
    fetchEvents();
    fetchUserData();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/event/ongoing`
      );
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.events || [];
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      // Fetch user points and coupons
      const [pointsRes, couponsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/points`, {
          withCredentials: true,
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/coupons`, {
          withCredentials: true,
        }),
      ]);

      setUserData({
        points: pointsRes.data?.totalPoints || 0,
        coupons: couponsRes.data || [],
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const openCheckout = (event: Event) => {
    setSelectedEvent(event);
    setQuantity(1);
    setUsePoints(false);
    setPointsToUse(0);
    setSelectedCoupon(null);
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setSelectedEvent(null);
  };

  const calculateTotal = () => {
    if (!selectedEvent) return 0;

    let total = selectedEvent.price * quantity;

    // Apply coupon discount
    if (selectedCoupon) {
      const coupon = userData.coupons.find((c) => c.id === selectedCoupon);
      if (coupon) {
        total = Math.max(0, total - coupon.discountAmount);
      }
    }

    // Apply points discount
    if (usePoints && pointsToUse > 0) {
      total = Math.max(0, total - pointsToUse);
    }

    return total;
  };

  const handleCheckout = async () => {
    if (!selectedEvent) return;

    if (quantity > selectedEvent.remainingSeats) {
      alert("Not enough seats available!");
      return;
    }

    const checkoutData: CheckoutData = {
      eventId: selectedEvent.id,
      ticketQuantity: quantity,
      price: selectedEvent.price,
      totalPrice: calculateTotal(),
    };

    if (usePoints && pointsToUse > 0) {
      checkoutData.usedPoint = pointsToUse;
    }

    if (selectedCoupon) {
      checkoutData.usedCouponId = selectedCoupon;
    }

    setProcessing(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/buy`,
        checkoutData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Ticket purchased successfully! Please upload payment proof.");
      closeCheckout();
      fetchEvents(); // Refresh events to update remaining seats
    } catch (error) {
      console.error("Checkout error:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Failed to purchase ticket");
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setProcessing(false);
    }
  };

  const maxPoints = selectedEvent
    ? Math.min(userData.points, selectedEvent.price * quantity)
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Available Events</h1>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No events available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Available Events</h1>

        <div className="grid md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-3">
                <h2 className="font-semibold text-lg mb-1">{event.name}</h2>
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                  {event.category}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                {event.location && (
                  <p className="text-gray-600">📍 {event.location}</p>
                )}
                <p className="text-gray-600">
                  💺 {event.remainingSeats} seats available
                </p>
                <p className="font-semibold text-lg text-blue-600">
                  {event.paid
                    ? `Rp ${event.price.toLocaleString("id-ID")}`
                    : "FREE"}
                </p>
              </div>

              <button
                onClick={() => openCheckout(event)}
                disabled={event.remainingSeats === 0}
                className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                  event.remainingSeats === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {event.remainingSeats === 0 ? "Sold Out" : "Buy Ticket"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Checkout</h2>
              <button
                onClick={closeCheckout}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Event Info */}
              <div>
                <h3 className="font-semibold text-lg">{selectedEvent.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedEvent.category}
                </p>
                <p className="text-blue-600 font-semibold mt-2">
                  Rp {selectedEvent.price.toLocaleString("id-ID")} / ticket
                </p>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Ticket className="inline mr-1" size={16} />
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border hover:bg-gray-100"
                  >
                    <Minus size={16} className="mx-auto" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={selectedEvent.remainingSeats}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.min(
                          selectedEvent.remainingSeats,
                          Math.max(1, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-20 text-center border rounded-lg py-2"
                  />
                  <button
                    onClick={() =>
                      setQuantity(
                        Math.min(selectedEvent.remainingSeats, quantity + 1)
                      )
                    }
                    className="w-10 h-10 rounded-lg border hover:bg-gray-100"
                  >
                    <Plus size={16} className="mx-auto" />
                  </button>
                  <span className="text-sm text-gray-500">
                    (max: {selectedEvent.remainingSeats})
                  </span>
                </div>
              </div>

              {/* Points */}
              {userData.points > 0 && (
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 font-medium">
                      <Award size={18} className="text-yellow-600" />
                      Use Points
                    </label>
                    <input
                      type="checkbox"
                      checked={usePoints}
                      onChange={(e) => {
                        setUsePoints(e.target.checked);
                        if (!e.target.checked) setPointsToUse(0);
                      }}
                      className="w-5 h-5"
                    />
                  </div>

                  {usePoints && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Available: {userData.points.toLocaleString("id-ID")}{" "}
                        points
                      </p>
                      <input
                        type="number"
                        min="0"
                        max={maxPoints}
                        value={pointsToUse}
                        onChange={(e) =>
                          setPointsToUse(
                            Math.min(
                              maxPoints,
                              Math.max(0, parseInt(e.target.value) || 0)
                            )
                          )
                        }
                        placeholder="Enter points to use"
                        className="w-full border rounded-lg px-3 py-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Max usable: {maxPoints.toLocaleString("id-ID")} points
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Coupons */}
              {userData.coupons.length > 0 && (
                <div className="border rounded-lg p-4 space-y-3">
                  <label className="flex items-center gap-2 font-medium">
                    <Tag size={18} className="text-green-600" />
                    Apply Coupon
                  </label>
                  <select
                    value={selectedCoupon || ""}
                    onChange={(e) =>
                      setSelectedCoupon(
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">No coupon</option>
                    {userData.coupons.map((coupon) => (
                      <option key={coupon.id} value={coupon.id}>
                        {coupon.code} - Rp{" "}
                        {coupon.discountAmount.toLocaleString("id-ID")} off
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>
                    Rp{" "}
                    {(selectedEvent.price * quantity).toLocaleString("id-ID")}
                  </span>
                </div>

                {selectedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon Discount</span>
                    <span>
                      -Rp{" "}
                      {(
                        userData.coupons.find((c) => c.id === selectedCoupon)
                          ?.discountAmount || 0
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                )}

                {usePoints && pointsToUse > 0 && (
                  <div className="flex justify-between text-sm text-yellow-600">
                    <span>Points Discount</span>
                    <span>-Rp {pointsToUse.toLocaleString("id-ID")}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-blue-600">
                    Rp {calculateTotal().toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={processing}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  "Confirm Purchase"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                You will need to upload payment proof after checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
