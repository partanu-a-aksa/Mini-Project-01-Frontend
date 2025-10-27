"use client";

export default function OrganizerDashboard() {
  return (
    <div className="relative min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Organizer Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-2">Event Management</h2>
          <p className="text-gray-600 text-sm">
            View and manage your events (Add / Edit / Delete).
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-2">Transaction Management</h2>
          <p className="text-gray-600 text-sm">
            Accept, reject, or view payment proofs from users.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-2">Statistics Overview</h2>
          <p className="text-gray-600 text-sm">
            View event statistics and performance metrics.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-2">Attendee List</h2>
          <p className="text-gray-600 text-sm">
            See who is attending your events, with ticket quantity and price
            paid.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-2">Notification Emails</h2>
          <p className="text-gray-600 text-sm">
            Email customers when transactions are accepted or rejected.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-2">
            Seat & Points Restoration
          </h2>
          <p className="text-gray-600 text-sm">
            Restore available seats and points for rejected transactions.
          </p>
        </div>
      </div>
    </div>
  );
}
