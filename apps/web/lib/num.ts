export const fmt = (n: number | undefined | null) =>
  typeof n === "number" ? n.toLocaleString("en-US") : "—";
