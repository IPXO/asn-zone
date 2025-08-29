// apps/web/components/Table.tsx
type Column =
  | { key: string; label: string }
  | { key: string; label: string; render: (value: any, row: Record<string, any>) => React.ReactNode };

export default function Table({
  columns,
  rows
}: {
  columns: Column[];
  rows: Record<string, any>[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50/50 dark:bg-white/5">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2 text-left font-semibold">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-gray-100 dark:border-white/10">
              {columns.map((c) => {
                const v = r[c.key];
                return (
                  <td key={c.key} className="px-3 py-2">
                    {"render" in c ? c.render(v, r) : v}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}