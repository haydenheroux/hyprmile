export type NumericUnit = {
  increment: number;
  format: (number: number | string) => string;
  formatText: (number: number | string) => string;
};

export function parseNumber(number: string): number {
  return parseFloat(number.replace(/[^\d.]/g, ""));
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

type Renderer = (s: string) => string;

function suffix(suffix: string): Renderer {
  return (s: string) => `${s} ${suffix}`;
}

function createNumericUnit(
  fractionDigits: number,
  renderer: (s: string) => string,
): NumericUnit {
  return {
    increment: 10 ** -fractionDigits,
    format: (number: number | string) => formatNumber(number, fractionDigits),
    formatText: (number: number | string) => {
      const result = formatNumber(number, fractionDigits);
      if (result.length === 0) return "";
      return renderer(result);
    }
  };
}

export const Miles = createNumericUnit(1, suffix("mi."));
export const MilesPerGallon = createNumericUnit(1, suffix("mpg."));
export const Gallons = createNumericUnit(3, suffix("gal."));
export const Minutes = createNumericUnit(1, suffix("min."));
export const Dollars = createNumericUnit(2, (s) => `$${s}`);
