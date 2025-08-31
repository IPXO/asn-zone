/**
 * Minimal scaffold. Today it just validates and re-writes apps/web/data/current/global.json.
 * Later: fetch + parse RIR delegated + BGP; keep the same output shape.
 */
import fs from "fs";
import path from "path";

const dst = path.join("apps", "web", "data", "current", "global.json");
if (!fs.existsSync(dst)) {
  console.error("Missing input:", dst);
  process.exit(1);
}
const raw = JSON.parse(fs.readFileSync(dst, "utf8"));

if (!raw.top || !raw.stats) {
  console.error("Invalid dataset shape (missing top/stats).");
  process.exit(1);
}

// Optional: refresh timestamp to mark regeneration
raw.generated_at = new Date().toISOString();
fs.writeFileSync(dst, JSON.stringify(raw, null, 2) + "\n");
console.log("Dataset refreshed:", dst);
