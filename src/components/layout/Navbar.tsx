import Link from "next/link";

export default function Navbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Partnership", href: "/partnership" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="flex items-center space-x-4">
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.href}
          className="relative px-4 py-2 rounded-2xl text-gray-700 font-medium group transition"
        >
          {link.name}
          <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient" />
        </Link>
      ))}
    </nav>
  );
}
