const fs = require('fs');

const files = [
  'apps/web/app/top/ipv4/page.tsx',
  'apps/web/app/top/ipv6/page.tsx',
  'apps/web/app/country/page.tsx',
  'apps/web/app/org/page.tsx',
];

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');

  // Replace existing default import "Table" from ../components/Table with SortableTable
  src = src.replace(
    /import\s+Table\s+from\s+["']\.\.\/components\/Table["'];?/,
    'import SortableTable from "../components/SortableTable";'
  );

  // If there is an import from ../components/SortableTable but named Table, rename it
  src = src.replace(
    /import\s+Table\s+from\s+["']\.\.\/components\/SortableTable["'];?/,
    'import SortableTable from "../components/SortableTable";'
  );

  // If there is no SortableTable import at all, insert one after the last import line
  if (!/from\s+["']\.\.\/components\/SortableTable["']/.test(src)) {
    const lines = src.split('\n');
    let lastImport = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^\s*import\b/.test(lines[i])) lastImport = i;
    }
    const imp = 'import SortableTable from "../components/SortableTable";';
    if (lastImport >= 0) {
      lines.splice(lastImport + 1, 0, imp);
      src = lines.join('\n');
    } else {
      src = imp + '\n' + src;
    }
  }

  // Change <Table ...> to <SortableTable ...>
  src = src.replace(/<Table/g, '<SortableTable');

  // Optionally add defaultSort in Top pages if not present
  if (file.includes('/top/ipv4/')) {
    if (!/defaultSort\s*=\s*\{/.test(src)) {
      src = src.replace(
        /<SortableTable([^>]+)\/>/,
        '<SortableTable$1\n        defaultSort={{ key: "v4_slash24s", dir: "desc" }}\n      />'
      );
    }
  }
  if (file.includes('/top/ipv6/')) {
    if (!/defaultSort\s*=\s*\{/.test(src)) {
      src = src.replace(
        /<SortableTable([^>]+)\/>/,
        '<SortableTable$1\n        defaultSort={{ key: "v6_slots", dir: "desc" }}\n      />'
      );
    }
  }

  fs.writeFileSync(file, src);
  console.log('Fixed', file);
}
