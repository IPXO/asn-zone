// apps/web/app/country/[cc]/page.tsx
export const dynamicParams = false;

export async function generateStaticParams() {
  // seed a couple of ISO country codes
  return [{ cc: 'US' }, { cc: 'GB' }];
}

export default function CountryPage({ params }: { params: { cc: string } }) {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Country: {params.cc}</h1>
      <p>Stub Country page. Real stats soon.</p>
    </main>
  );
}
