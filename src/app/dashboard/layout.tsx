"use client";

import DashboardSidebar from "./components/DashboardSidebar";

export interface IDashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: IDashboardProps) {
  return (
    <div className="min-h-screen w-full relative">
      {/* === Aurora Dream Soft Harmony Background === */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 60% 20%, rgba(175, 109, 255, 0.50), transparent 65%),
            radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 100, 180, 0.45), transparent 65%),
            radial-gradient(ellipse 60% 50% at 60% 65%, rgba(255, 235, 170, 0.43), transparent 62%),
            radial-gradient(ellipse 65% 40% at 50% 60%, rgba(120, 190, 255, 0.48), transparent 68%),
            linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
          `,
        }}
      />

      <DashboardSidebar />

      <main className="relative flex-1 p-6 z-10 ml-60">{children}</main>
    </div>
  );
}
