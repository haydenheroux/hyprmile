export class Record {
  public readonly date: Date;
  public readonly gallons: number;
  public readonly miles: number;
  public readonly mpg: number;

  constructor(date: Date, gallons: number, miles: number) {
    this.date = date;
    this.gallons = gallons;
    this.miles = miles;
    this.mpg = miles === 0 ? 0 : miles / gallons;
  }

  static createOverallRecord(records: Record[]): Record {
    let totalGallons = 0;
    let totalMiles = 0;
    for (const record of records) {
      totalGallons += record.gallons;
      totalMiles += record.miles;
    }

    return new Record(new Date(), totalGallons, totalMiles);
  }
}

