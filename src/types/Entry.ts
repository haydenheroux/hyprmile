export type Entry = {
  date?: Date;
  gallons: number;
  miles: number;
  odometer?: number;
  mpg: number;
};

export function createEntry(gallons: number, miles: number): Entry {
  return {
    gallons: gallons,
    miles: miles,
    mpg: gallons === 0 ? 0 : miles / gallons,
  };
}

export function createSummaryEntry(entries: Entry[]): Entry {
  let totalGallons = 0;
  let totalMiles = 0;
  for (const entry of entries) {
    totalGallons += entry.gallons;
    totalMiles += entry.miles;
  }
  return createEntry(totalGallons, totalMiles);
}

export function currentOdometer(
  entries: Entry[],
  odometerInit: number | undefined,
): number | undefined {
  let odometer = odometerInit;
  for (const entry of entries) {
    if (entry.odometer !== undefined) {
      odometer = entry.odometer;
    }
  }
  return odometer;
}

export function backfillOdometer(
  entries: Entry[],
  odometerInit: number | undefined,
): Entry[] {
  let odometer = odometerInit;

  return entries.map((entry) => {
    if (entry.odometer !== undefined) {
      odometer = entry.odometer;
      return entry;
    } else if (odometer !== undefined) {
      odometer += entry.miles;
      return {
        ...entry,
        odometer: odometer,
      };
    } else {
      return entry;
    }
  });
}
