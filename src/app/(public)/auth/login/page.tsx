"use client";
import Image from "next/image";

export default function LogIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/bg/nebula.jpg')] bg-cover bg-center">
      {/* === Deep Glass Card === */}
      <div
        className="relative p-8 rounded-3xl w-[400px] flex flex-col items-center 
        bg-white/5 backdrop-blur-[20px] backdrop-saturate-200
        border border-white/30
        shadow-[0_0_60px_rgba(0,0,0,0.5)] hover:shadow-[0_0_80px_rgba(0,0,0,0.6)]
        transition-all duration-500 overflow-hidden"
      >
        {/* === Light Reflection Layer === */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 via-white/5 to-transparent opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 opacity-10 blur-2xl"></div>
        </div>

        {/* === Logo & Title Section === */}
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

          <div className="h-10 w-[2px] bg-gradient-to-b from-purple-400 via-cyan-300 to-blue-400 rounded-full opacity-80"></div>

          <h2 className="text-2xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Sign In
          </h2>
        </div>

        {/* === Form === */}
        <form className="w-full flex flex-col gap-4 z-10">
          <input
            type="email"
            placeholder="email@email.com"
            className="p-3 rounded-xl border border-white/40 bg-white/10 text-slate placeholder-gray-300 
              focus:border-cyan-400 focus:ring focus:ring-cyan-300/30 outline-none transition"
          />
          <input
            type="password"
            placeholder="password"
            className="p-3 rounded-xl border border-white/40 bg-white/10 text-slate placeholder-gray-300 
              focus:border-cyan-400 focus:ring focus:ring-cyan-300/30 outline-none transition"
          />
          <button
            type="submit"
            className="p-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate font-semibold shadow-lg 
              hover:from-cyan-300 hover:to-blue-400 hover:scale-[1.03] transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        {/* === Divider === */}
        <div className="flex items-center w-full my-4 z-10">
          <hr className="flex-grow border-white/20" />
          <span className="px-3 text-gray-200 text-sm">Or</span>
          <hr className="flex-grow border-white/20" />
        </div>

        {/* === Google Button === */}
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

        {/* === Footer === */}
        <p className="text-sm text-gray-200 mt-6 z-10">
          Dont have an account?{" "}
          <a
            href="/signup"
            className="text-cyan-300 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
