export function formatYYYYMMDD(date: Date): string {
  return date.toISOString().split("T")[0];
}
