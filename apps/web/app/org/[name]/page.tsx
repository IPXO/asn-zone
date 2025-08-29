// apps/web/app/org/[name]/page.tsx
export const dynamicParams = false;

export async function generateStaticParams() {
  // seed a couple of org names to satisfy static export
  return [{ name: 'Google' }, { name: 'Microsoft' }];
}

export default function OrgPage({ params }: { params: { name: string } }) {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">{params.name}</h1>
      <p>Stub Org page. Coming soon with real data.</p>
    </main>
  );
}
