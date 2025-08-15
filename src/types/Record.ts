export type Record = {
  date?: Date;
  gallons: number;
  miles: number;
  odometer?: number;
  mpg: number;
};

export function createRecord(gallons: number, miles: number): Record {
  return {
    gallons: gallons,
    miles: miles,
    mpg: gallons === 0 ? 0 : miles / gallons,
  };
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

export function currentOdometer(
  records: Record[],
  odometerInit: number | undefined,
): number | undefined {
  let odometer = odometerInit;
  for (const record of records) {
    if (record.odometer !== undefined) {
      odometer = record.odometer;
    }
  }
  return odometer;
}

export function backfillOdometer(
  records: Record[],
  odometerInit: number | undefined,
): Record[] {
  let odometer = odometerInit;

  return records.map((record) => {
    if (record.odometer !== undefined) {
      odometer = record.odometer;
      return record;
    } else if (odometer !== undefined) {
      odometer += record.miles;
      return {
        ...record,
        odometer: odometer,
      };
    } else {
      return record;
    }
  });
}
