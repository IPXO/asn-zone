import { JsonLd } from 'react-schemaorg';

export function itemListJsonLd(data: any) {
  return (
    <JsonLd type="ItemList" itemListElement={data.items.map((item: any) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url
    }))} />
  );
}
