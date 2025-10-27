"use client";

import { useRouter } from "next/navigation";
import { Home, Calendar, Settings, LogOut, BookUser } from "lucide-react";
import axios from "axios";
export default function DashboardSidebar() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Logout Failed: ", error);
      alert("Logout Failed.");
    }
  }

  const menu = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    { name: "My Events", icon: <Calendar size={18} />, path: "/events" },
  ];

  const account = [
    {
      name: "Informasi User",
      icon: <BookUser size={18} />,
      path: "/account/info",
    },
    {
      name: "Settings",
      icon: <Settings size={18} />,
      path: "/account/settings",
    },
  ];
  return (
    <aside
      className="
        fixed top-0 left-0 z-20
        h-screen w-60
        flex flex-col
        bg-rose-500/10 text-black
        backdrop-blur-lg shadow-2xl
        border-r border-white/10
      "
    >
      <div className="px-4 py-5 border-b border-white/10">
        <h1 className="text-lg font-semibold tracking-wide">Dashboard</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-black mb-2">
            Menu
          </p>
          <nav className="flex flex-col gap-1">
            {menu.map((item, i) => (
              <button
                key={i}
                onClick={() => router.push(item.path)}
                className="
                  flex items-center gap-3 w-full px-3 py-2
                  rounded-md text-sm font-medium
                  hover:bg-white/15 transition-colors
                "
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-black mb-2">
            Akun
          </p>
          <nav className="flex flex-col gap-1">
            {account.map((item, i) => (
              <button
                key={i}
                onClick={() => router.push(item.path)}
                className="
                  flex items-center gap-3 w-full px-3 py-2
                  rounded-md text-sm font-medium
                  hover:bg-white/15 transition-colors
                "
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-black mb-2">
            Mode User
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center gap-3 px-3 py-2
            text-sm font-medium rounded-md
            hover:bg-red-500/80 transition-colors
          "
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
