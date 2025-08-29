import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const [,, route, kind='page'] = process.argv;
if (!route) {
  console.error('Usage: node scripts/mkroute.mjs app/asn/[id] [page|layout|loading|error]');
  process.exit(1);
}

const exts = { page: '.tsx', layout: '.tsx', loading: '.tsx', error: '.tsx' };
const ext = exts[kind] ?? '.tsx';
const file = `apps/web/${route}/${kind}${ext}`;

mkdirSync(dirname(file), { recursive: true });

let stub = '';
if (kind === 'page') {
  stub = `export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: '15169' }, { id: '8075' }];
}

export default function Page({ params }: { params: Record<string,string> }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dynamic route</h1>
      <pre className="text-sm bg-gray-100 dark:bg-white/10 p-3 rounded-xl">{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}
`;
} else if (kind === 'layout') {
  stub = `export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
} else if (kind === 'loading') {
  stub = `export default function Loading() { return <div>Loading…</div>; }`;
} else if (kind === 'error') {
  stub = `'use client'
export default function Error({ error }: { error: Error }) {
  return <div>Something went wrong: {error.message}</div>;
}
`;
}

writeFileSync(file, stub);
console.log('Created:', file);
