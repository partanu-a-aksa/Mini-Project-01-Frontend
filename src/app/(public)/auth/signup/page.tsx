"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import api from "@/app/lib/api";
import { AxiosError } from "axios";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("ATTENDDEE");
  const [message, setMessage] = useState("");

  async function handleSignup() {
    try {
      const res = await api.post("/auth/signup", {
        fullName: name,
        email,
        password,
        roles: roles.toUpperCase(),
      });
      setMessage(res.data.message);
      alert("Success!");

      if (res.data.roles === "ORGANIZER") {
        router.replace("/dashboard");
      } else {
        router.replace("/");
      }
    } catch (error: any) {
      setMessage(error.res?.data?.message || "Registration Failed.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/bg/nebula.jpg')] bg-cover bg-center">
      <div
        className="relative p-8 rounded-3xl w-[400px] flex flex-col items-center 
        bg-white/5 backdrop-blur-[20px] backdrop-saturate-200
        border border-white/30
        shadow-[0_0_60px_rgba(0,0,0,0.5)] hover:shadow-[0_0_80px_rgba(0,0,0,0.6)]
        transition-all duration-500 overflow-hidden"
      >
        <div className="absolute inset-0 rounded-3xl pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 via-white/5 to-transparent opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 opacity-10 blur-2xl"></div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8 z-10">
          <div className="relative group flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400" />
            <Image
              src="/Navbar/Eventura.svg"
              alt="Eventura logo"
              className="object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
              width={200}
              height={75}
            />
          </div>

          <div className="h-10 w-[2px] bg-black rounded-full opacity-80"></div>

          <h2 className="text-[22px] font-extrabold text-purple-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Sign Up
          </h2>
        </div>

        <form
          className="w-full flex flex-col gap-4 z-10"
          onSubmit={handleSignup}
        >
          <input
            type="text"
            placeholder="Your Fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-xl border border-white/40 bg-white/10 text-slate-800 placeholder-violet-400 
              focus:border-cyan-400 focus:ring focus:ring-cyan-300/30 outline-none transition"
          />
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl border border-white/40 bg-white/10 text-slate placeholder-violet-400 focus:border-cyan-400 focus:ring focus:ring-cyan-300/30 outline-none transition"
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-xl border border-white/40 bg-white/10 text-slate placeholder-violet-400 
              focus:border-cyan-400 focus:ring focus:ring-cyan-300/30 outline-none transition"
          />
          <div>
            <label className="block mb-1 text-gray-700">Role</label>
            <select
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
              className="w-full p-3 rounded-xl border border-white/40 bg-white/10 text-slate placeholder-violet-400 
              focus:border-cyan-400 focus:ring focus:ring-cyan-300/30 outline-none transition"
            >
              <option value="ATTENDEE">Attendee</option>
              <option value="ORGANIZER">Organizer</option>
            </select>
          </div>
          <button
            type="submit"
            className="p-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate font-semibold shadow-lg 
              hover:from-cyan-300 hover:to-blue-400 hover:scale-[1.03] transition-all duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center w-full my-4 z-10">
          <hr className="flex-grow border-white/20" />
          <span className="px-3 text-gray-200 text-sm">Or</span>
          <hr className="flex-grow border-white/20" />
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-3 bg-white/10 w-full py-3 rounded-xl border border-white/30 shadow-sm 
            hover:bg-white/20 hover:scale-[1.03] transition duration-200 text-white z-10"
        >
          <Image
            src="/login/logogoogle.png"
            alt="google"
            width={24}
            height={24}
          />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
