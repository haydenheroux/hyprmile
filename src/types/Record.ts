export type Record = {
  date?: Date;
  gallons: number;
  miles: number;
  odometerMiles?: number;
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

export function recentOdometerMiles(records: Record[]): number | null {
  let odometerMiles = null;
  for (const record of records) {
    if (record.odometerMiles) {
      odometerMiles = record.odometerMiles;
    }
  }
  return odometerMiles;
}

export function hasOdometerMiles(records: Record[]): boolean {
  for (const record of records) {
    if (record.odometerMiles) {
      return true;
    }
  }
  return false;
}

export function fillOdometerMiles(records: Record[]): Record[] {
  let odometer: number | undefined;

  return records.map((record) => {
    if (record.odometerMiles) {
      odometer = record.odometerMiles;
      return record;
    } else if (odometer) {
      odometer += record.miles;
      return {
        ...record,
        odometerMiles: odometer,
      };
    } else {
      return record;
    }
  });
}
