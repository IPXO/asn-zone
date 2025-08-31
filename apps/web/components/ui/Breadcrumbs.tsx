export default function Breadcrumbs({
  items = [],
}: {
  items?: { href?: string; label: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-400">
      {items.map((it, i) => (
        <span key={i}>
          {it.href ? (
            <a className="hover:underline" href={it.href}>
              {it.label}
            </a>
          ) : (
            it.label
          )}
          {i < items.length - 1 ? ' / ' : ''}
        </span>
      ))}
    </nav>
  );
}
