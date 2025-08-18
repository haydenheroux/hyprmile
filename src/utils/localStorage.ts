import { createEntry, type Entry } from "../types/Entry";

class LocalStorage<T> {
  private readonly key: string;
  private readonly fallback: T;
  private readonly parse: (json: string) => T;

  constructor(key: string, fallback: T, parse: (json: string) => T) {
    this.key = key;
    this.fallback = fallback;
    this.parse = parse;
  }

  getValue(): T {
    const stored = localStorage.getItem(this.key);
    if (stored === null) return this.fallback;
    return this.parse(stored);
  }

  setValue(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
}

export const EntriesRepository = new LocalStorage(
  "entries",
  [] as Entry[],
  (json) => {
    const parsedEntries = JSON.parse(json);
    const canIterate = Array.isArray(parsedEntries);
    if (!canIterate) return [];

    const entries = [];
    for (const parsedEntry of parsedEntries) {
      const { date, gallons, miles, odometerMiles } = parsedEntry as {
        date: string;
        gallons: number;
        miles: number;
        odometerMiles?: number;
      };

      const entry = createEntry(gallons, miles);
      entry.date = new Date(date);
      entry.odometer = odometerMiles;

      entries.push(entry);
    }
    return entries;
  },
);
