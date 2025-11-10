"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Calendar,
  Settings,
  LogOut,
  BookUser,
  Loader2,
  PlusCircle,
  Receipt,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

export default function DashboardSidebar() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchUser() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          withCredentials: true,
        }
      );
      setUser(res.data.user.fullName);
      setRole(res.data.user.role);
    } catch (err) {
      console.error(err);
      setRole("");
      setUser("");
    }
  }

  async function handleSwitchRole() {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/switch-role`,
        {},
        { withCredentials: true }
      );
      const me = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          withCredentials: true,
        }
      );
      setRole(me.data.user.role);

      router.replace("/");
    } catch (error) {
      console.error(error);
      alert("Failed to switch profile.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function handleLogout() {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      Cookies.remove("token");
      localStorage.removeItem("user");
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout Failed: ", error);
      alert("Logout Failed.");
    }
  }

  const baseMenu = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
  ];

  const organizerMenu = [
    {
      name: "My Events",
      icon: <Calendar size={18} />,
      path: "/dashboard/events",
    },
    {
      name: "Create Event",
      icon: <PlusCircle size={18} />,
      path: "/dashboard/events/create",
    },
  ];

  const attendeeMenu = [
    {
      name: "My Tickets",
      icon: <Receipt size={18} />,
      path: "/dashboard/my-tickets",
    },
  ];

  const account = [
    {
      name: "Informasi User",
      icon: <BookUser size={18} />,
      path: "/dashboard/profile",
    },
    {
      name: "Ticket Transactions",
      icon: <Receipt size={18} />,
      path: "/dashboard/my-transaction",
    },
    {
      name: "Settings",
      icon: <Settings size={18} />,
      path: "/account/settings",
    },
  ];

  const menu =
    role === "ORGANIZER"
      ? [...baseMenu, ...organizerMenu]
      : [...baseMenu, ...attendeeMenu];

  return (
    <aside
      className="
        fixed top-0 left-0 z-20
        h-screen w-60
        flex flex-col
        bg-gradient-to-b from-rose-100/20 to-purple-100/10 text-black
        backdrop-blur-lg shadow-2xl border-r border-white/10 
      "
    >
      <div className="px-4 py-5 border-b border-white/10 flex flex-col items-center justify-center ">
        <div className="relative w-[140px] h-[45px] flex items-center justify-center group">
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400" />
          <Link href={"/"}>
            <Image
              src="/Navbar/Eventura.svg"
              alt="Eventura logo"
              fill
              className="object-contain relative z-10"
            />
          </Link>
        </div>
        {user ? (
          <p className="mt-3 text-sm font-medium text-gray-700 text-center mt-2 hover:scale-105">
            Welcome,{" "}
            <span className="font-semibold text-purple-700">{user}</span>
          </p>
        ) : (
          <p className="mt-3 text-sm font-medium text-gray-700 text-center mt-2">
            Loading..
          </p>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 ">
        <div>
          <p className="text-xs uppercase tracking-wider text-black mb-2">
            Menu
          </p>
          <nav className="flex flex-col gap-1 ">
            {menu.map((item, i) => (
              <button
                key={i}
                onClick={() => router.push(item.path)}
                className="
                  flex items-center gap-3 w-full px-3 py-2
                  rounded-md text-sm font-medium
                  hover:bg-white/15 transition-colors hover:scale-105
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
                  hover:bg-white/15 transition-colors hover:scale-105
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
          <button
            onClick={handleSwitchRole}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold hover:scale-[1.03] transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin text-white" size={18} />
                <span>Switching Role...</span>
              </>
            ) : role === "ATTENDEE" ? (
              "Change to Organizer Profile"
            ) : (
              "Change to Attendee Profile"
            )}
          </button>
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
