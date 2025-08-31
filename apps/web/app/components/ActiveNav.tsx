'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ActiveNav() {
  const pathname = usePathname();
  const is = (p: string) => pathname === p;

  const cls = (active: boolean) =>
    'hover:text-indigo-600 ' + (active ? 'text-indigo-600 font-medium' : '');

  return (
    <>
      <Link className={cls(is('/top/ipv4'))} href="/top/ipv4">
        Top IPv4
      </Link>
      <Link className={cls(is('/top/ipv6'))} href="/top/ipv6">
        Top IPv6
      </Link>
      <Link className={cls(is('/search'))} href="/search">
        Search
      </Link>
    </>
  );
}
