export type Record = {
  date?: Date;
  gallons: number;
  miles: number;
  mpg: number;
};

export function createRecord(gallons: number, miles: number): Record {
  return {
    gallons: gallons,
    miles: miles,
    mpg: miles === 0 ? 0 : miles / gallons,
  };
}

export function createDatedRecord(date: Date, gallons: number, miles: number) {
  const record = createRecord(gallons, miles);
  record.date = date;
  return record;
}

export function createSummaryRecord(records: Record[]): Record {
  let totalGallons = 0;
  let totalMiles = 0;
  for (const record of records) {
    totalGallons += record.gallons;
    totalMiles += record.miles;
  }
  return createRecord(totalGallons, totalMiles);
}
