export type NumericUnit = {
  increment: number;
  format: (number: number | string) => string;
};

export function parseNumber(number: string): number {
  return parseFloat(number.replace(",", ""));
}

function formatNumber(number: number | string, fractionDigits: number): string {
  const numberFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  if (typeof number === "string" && number === "") return "";

  const num = typeof number === "number" ? number : parseNumber(number);

  if (isNaN(num)) return "";

  return numberFormat.format(num);
}

function createNumericUnit(fractionDigits: number): NumericUnit {
  return {
    increment: 10 ** -fractionDigits,
    format: (number: number | string) => formatNumber(number, fractionDigits),
  };
}

export const Mileage = createNumericUnit(1);
export const MilesPerGallon = createNumericUnit(1);
export const Gallons = createNumericUnit(3);
