"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Tickets",
    href: "/tickets",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors font-medium ${
              isActive
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}