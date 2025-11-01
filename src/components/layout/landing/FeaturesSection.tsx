"use client";

import { CalendarDays, Ticket, Gift } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <CalendarDays size={36} className="text-blue-500" />,
      title: "Event Management",
      desc: "Create and manage your events effortlessly — from setup to success.",
    },
    {
      icon: <Ticket size={36} className="text-purple-500" />,
      title: "Smart Ticketing",
      desc: "Seamless and secure ticket purchases with real-time tracking.",
    },
    {
      icon: <Gift size={36} className="text-pink-500" />,
      title: "Rewards & Referrals",
      desc: "Earn points and rewards for sharing and attending great events.",
    },
  ];

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Why Choose Eventura?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div className="p-3 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
