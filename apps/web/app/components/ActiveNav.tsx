"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveNav() {
  const pathname = usePathname() || "/";
  const L = (href: string, label: string) => {
    const active = pathname.startsWith(href);
    return (
      <Link
        className={`hover:text-indigo-600 ${active ? "text-indigo-600 font-medium" : ""}`}
        href={href}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {L("/top/ipv4", "Top IPv4")}
      {L("/top/ipv6", "Top IPv6")}
      {L("/search", "Search")}
    </>
  );
}
