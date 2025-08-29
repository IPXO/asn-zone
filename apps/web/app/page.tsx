import fs from 'node:fs';
import path from 'node:path';

type Row4 = { asn: number; name?: string; org?: string; country?: string; v4_slash24s?: number };
type Row6 = { asn: number; name?: string; org?: string; country?: string; v6_slots?: number };
type Global = {
  generated_at?: string;
  stats?: { asns_total?: number; ipv4_announced?: number; ipv6_announced?: number };
  top?: { ipv4?: Row4[]; ipv6?: Row6[] };
};

function loadGlobal(): Global {
  try {
    // apps/web is two levels below repo root: <root>/apps/web
    const p = path.resolve(process.cwd(), '..', '..', 'data', 'current', 'global.json');
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return {};
  }
}

function fmt(n?: number) {
  return typeof n === 'number' ? n.toLocaleString() : '—';
}

export default function Home() {
  const data = loadGlobal();
  const t4 = (data.top?.ipv4 ?? []).slice(0, 10);
  const t6 = (data.top?.ipv6 ?? []).slice(0, 10);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">asn.zone</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The open, minimalistic, authoritative ASN directory.
        </p>
      </div>

      <section className="rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 flex justify-between">
          <h2 className="font-medium">Global stats</h2>
          <span className="text-xs text-gray-500">updated {data.generated_at ?? '—'}</span>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4 text-sm">
          <div>
            <div className="text-gray-500">Total ASNs</div>
            <div className="font-mono">{fmt(data.stats?.asns_total)}</div>
          </div>
          <div>
            <div className="text-gray-500">IPv4 announced</div>
            <div className="font-mono">{fmt(data.stats?.ipv4_announced)}</div>
          </div>
          <div>
            <div className="text-gray-500">IPv6 announced</div>
            <div className="font-mono">{fmt(data.stats?.ipv6_announced)}</div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
            <h3 className="font-medium">Top 10 ASNs by IPv4 size</h3>
            <a href="/top/ipv4" className="text-sm text-indigo-600 hover:underline">
              View all
            </a>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50/60 dark:bg-white/5">
              <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-left [&>th]:font-medium text-gray-600 dark:text-gray-300">
                <th>Rank</th>
                <th>ASN</th>
                <th>Org</th>
                <th className="text-right">IPv4 (/24 eq)</th>
              </tr>
            </thead>
            <tbody className="[&>tr>td]:px-3 [&>tr>td]:py-2 [&>tr>td]:border-b [&>tr>td]:border-gray-100 dark:[&>tr>td]:border-white/5">
              {t4.map((r, i) => (
                <tr key={r.asn}>
                  <td>{i + 1}</td>
                  <td className="font-mono">
                    <a className="text-indigo-600 hover:underline" href={`/asn/${r.asn}`}>
                      AS{r.asn}
                    </a>
                  </td>
                  <td>{r.org ?? r.name ?? '—'}</td>
                  <td className="text-right font-mono">{fmt(r.v4_slash24s)}</td>
                </tr>
              ))}
              {!t4.length && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-6">
                    No data yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
            <h3 className="font-medium">Top 10 ASNs by IPv6 size</h3>
            <a href="/top/ipv6" className="text-sm text-indigo-600 hover:underline">
              View all
            </a>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50/60 dark:bg-white/5">
              <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-left [&>th]:font-medium text-gray-600 dark:text-gray-300">
                <th>Rank</th>
                <th>ASN</th>
                <th>Org</th>
                <th className="text-right">/32 slots</th>
              </tr>
            </thead>
            <tbody className="[&>tr>td]:px-3 [&>tr>td]:py-2 [&>tr>td]:border-b [&>tr>td]:border-gray-100 dark:[&>tr>td]:border-white/5">
              {t6.map((r, i) => (
                <tr key={r.asn}>
                  <td>{i + 1}</td>
                  <td className="font-mono">
                    <a className="text-indigo-600 hover:underline" href={`/asn/${r.asn}`}>
                      AS{r.asn}
                    </a>
                  </td>
                  <td>{r.org ?? r.name ?? '—'}</td>
                  <td className="text-right font-mono">{fmt(r.v6_slots)}</td>
                </tr>
              ))}
              {!t6.length && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-6">
                    No data yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
