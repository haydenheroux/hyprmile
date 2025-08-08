import { createDatedRecord, type Record } from "../types/Record";

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

export const RecordsRepository = new LocalStorage(
  "records",
  [] as Record[],
  (json) => {
    const parsedRecords = JSON.parse(json);
    const canIterate = Array.isArray(parsedRecords);
    if (!canIterate) return [];

    const records = [];
    for (const parsedRecord of parsedRecords) {
      const { date, gallons, miles } = parsedRecord as {
        date: string;
        gallons: number;
        miles: number;
      };
      records.push(createDatedRecord(new Date(date), gallons, miles));
    }
    return records;
  },
);
