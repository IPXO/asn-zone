import Link from "next/link";

export default function Breadcrumb({ items }: { items: { label: string, href?: string }[] }) {
  return (
    <nav className="flex space-x-2">
      {items.map((item, i) => (
        <span key={i} className="text-gray-600 dark:text-white">
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            item.label
          )}
          {i < items.length - 1 && "›"}
        </span>
      ))}
    </nav>
  );
}
