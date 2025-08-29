// apps/web/app/asn/[id]/page.tsx
export const dynamicParams = false;

export async function generateStaticParams() {
  // seed a couple of popular ASNs so static export succeeds
  return [{ id: '15169' }, { id: '8075' }];
}

export default function AsnPage({ params }: { params: { id: string } }) {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">AS{params.id}</h1>
      <p>Stub ASN page. We’ll wire real data next.</p>
    </main>
  );
}
