import { createEntry, type Entry } from "../../types/Entry";
import { parseNumber } from "../../utils/numeric";

type FormFields = {
  date: Date;
  miles: string;
  gallons: string[];
};

type FormInput =
  | (FormFields & { mode: "odometer"; previousOdometer: number })
  | (FormFields & { mode: "trip" });

export type FormData =
  | (FormInput & { state: "input" })
  | (FormInput & { state: "error"; error: string })
  | (FormInput & { state: "complete"; entry: Entry });

export const initialFormData: FormData = {
  state: "input",
  date: new Date(),
  mode: "trip",
  miles: "",
  gallons: [""],
};

type FormAction =
  | { type: "reset" }
  | { type: "date"; value: string }
  | { type: "gallons"; value: string[] }
  | { type: "odometer"; previousOdometer: number }
  | { type: "trip" }
  | { type: "miles"; value: string }
  | { type: "submit" };

export function formReducer(data: FormData, action: FormAction): FormData {
  switch (action.type) {
    case "reset":
      return { ...data, state: "input" };
    case "date": {
      const cleared = action.value === "";
      const date = cleared ? new Date() : new Date(action.value);
      return { ...data, date };
    }
    case "gallons":
      return { ...data, gallons: action.value };
    case "odometer":
      return {
        ...data,
        mode: "odometer",
        previousOdometer: action.previousOdometer,
      };
    case "trip":
      return { ...data, mode: "trip" };
    case "miles": {
      return { ...data, miles: action.value };
    }
    case "submit":
      return handleSubmit(data);
    default:
      return data;
  }
}

function handleSubmit(data: FormData): FormData {
  if (data.gallons.every(str => str.length === 0)) {
    return {
      ...data,
      state: "error",
      error: "Gallons field is empty",
    };
  }
  const gallons = data.gallons.map(parseNumber);
  if (gallons.some(n => Number.isNaN(n))) {
    return {
      ...data,
      state: "error",
      error: "Gallons is not a number",
    };
  }

  if (data.miles === "") {
    return {
      ...data,
      state: "error",
      error: "Miles field is empty",
    };
  }
  const miles = parseNumber(data.miles);
  if (isNaN(miles)) {
    return {
      ...data,
      state: "error",
      error: "Miles field is not a number",
    };
  }

  let tripMiles = miles;
  let previousOdometer = 0;

  if (data.mode === "odometer") {
    const difference = miles - data.previousOdometer;
    if (difference < 0) {
      return {
        ...data,
        state: "error",
        error: "Odometer miles have decreased",
      };
    }

    previousOdometer = miles;
    tripMiles = difference;
  }

  const tripGallons = gallons.reduce((sum, n) => sum + n, 0);
  const estimatedMPG = tripMiles / tripGallons;
  if (isNaN(estimatedMPG)) {
    return {
      ...data,
      state: "error",
      error: "Miles per gallon is not a number",
    };
  }

  const entry = createEntry(tripGallons, tripMiles);
  entry.date = data.date;
  if (data.mode === "odometer") {
    entry.odometer = miles;
  }

  data = {
    ...data,
    state: "complete",
    entry: entry,
  };

  if (data.mode === "odometer") {
    data.previousOdometer = previousOdometer;
  }

  return data;
}
