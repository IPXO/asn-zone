#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve repo root = two levels up (…/apps/web/scripts → repo root)
const repoRoot = path.resolve(__dirname, "../../..");
const webRoot = path.join(repoRoot, "apps/web");
const appRoot = path.join(webRoot, "app");

const args = process.argv.slice(2);
if (!args.length) {
  console.error("Usage: npm run mkroute -- \"asn/[id]\"");
  process.exit(1);
}

let raw = args[0];
raw = raw.replace(/^\/+/, "").replace(/^app\//, "");

const targetDir = path.join(appRoot, raw);
const pageFile = path.join(targetDir, "page.tsx");

const match = raw.match(/\[([^\]]+)\]/);
const hasParam = !!match;
const paramName = match ? match[1] : null;

const topSeg = raw.split("/")[0];
let seeds = [];
if (hasParam) {
  if (topSeg === "asn") seeds = [{ id: "15169" }, { id: "8075" }];
  else if (topSeg === "country") seeds = [{ cc: "US" }, { cc: "GB" }];
  else if (topSeg === "org") seeds = [{ name: "Google" }, { name: "Microsoft" }];
  else seeds = [{ [paramName]: "example" }];
}

fs.mkdirSync(targetDir, { recursive: true });

let content = "";
if (hasParam) {
  content = `export const dynamicParams = false;

export async function generateStaticParams() {
  return ${JSON.stringify(seeds, null, 2)};
}

export default function Page({ params }: { params: { ${paramName}: string } }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">${topSeg.toUpperCase()}: {params.${paramName}}</h1>
      <p>Stub ${topSeg} page. We’ll wire real data next.</p>
    </div>
  );
}
`;
} else {
  content = `export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">${raw}</h1>
      <p>Stub page. We’ll wire real content next.</p>
    </div>
  );
}
`;
}

if (fs.existsSync(pageFile)) {
  console.error("Refusing to overwrite: " + path.relative(repoRoot, pageFile));
  process.exit(2);
}

fs.writeFileSync(pageFile, content, "utf8");
console.log("Created: " + path.relative(repoRoot, pageFile));
