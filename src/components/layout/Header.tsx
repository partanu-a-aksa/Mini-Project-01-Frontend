"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Loader2, SquareUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

interface IUser {
  id: string;
  fullName: string;
  email: string;
  role: "ADMIN" | "ATTENDEE" | "ORGANIZER";
  profilePic?: string | null;
  points?: number | null;
}

export default function Header() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            withCredentials: true,
          }
        );
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <header className="bg-red-50 shadow-sm sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 gap-4">
        <div className="relative group w-[150px] h-[50px] flex items-center justify-center">
          <div className=" absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient" />
          <Image
            src="/Navbar/Eventura.svg"
            alt="Eventura logo"
            fill
            className="scale-175 relative z-10 transition-transform duration-300"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Navbar />

          {loading ? (
            <Loader2 className="animate-spin text-gray-500" size={22} />
          ) : user ? (
            <Link href={"/dashboard"}>
              <button
                className="p-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105 transition"
                title={`${user.fullName} (${user.role})`}
              >
                <SquareUserRound className="text-white" size={22} />
              </button>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="relative inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 animate-gradient"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
