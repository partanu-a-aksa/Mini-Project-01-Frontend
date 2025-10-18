// For customize not-found page
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-4">
      <h1 className="text-3xl font-bold text-red-500">404</h1>
      <p>Halaman tidak ditemukan</p>
      <Link
        href="/"
        className="bg-slate-500 text-white px-4 py-2 rounded shadow"
      >
        <span>Kembali ke Home</span>
      </Link>
    </div>
  );
}
