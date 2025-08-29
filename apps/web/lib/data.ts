// apps/web/lib/data.ts

// Import the bundled JSON so builds never fail if a file is missing at runtime.
// We keep the API async so we can later swap to fetch('/data/current/global.json').
import globalJson from "../data/current/global.json";

export type GlobalJson = typeof globalJson;
export type V4TopItem = GlobalJson["top"]["ipv4"][number];
export type V6TopItem = GlobalJson["top"]["ipv6"][number];

export async function loadGlobal(): Promise<GlobalJson> {
  return globalJson as GlobalJson;
}

export function getTopIPv4(g: GlobalJson): V4TopItem[] {
  return g.top.ipv4;
}

export function getTopIPv6(g: GlobalJson): V6TopItem[] {
  return g.top.ipv6;
}