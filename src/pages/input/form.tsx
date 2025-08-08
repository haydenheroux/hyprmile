import { parseNumber } from "../../utils/numeric";
import { createDatedRecord, type Record } from "../../types/Record";

type FormInput = {
  date: Date;
  mode: "odometer" | "trip";
  previousOdometerMiles: number;
  miles: string;
  gallons: string;
};

export type FormData =
  | (FormInput & { state: "input" })
  | (FormInput & { state: "error"; error: string })
  | (FormInput & { state: "complete"; record: Record });

export function initialFormData(previousOdometerMiles: number): FormData {
  return {
    state: "input",
    date: new Date(),
    mode: "trip",
    previousOdometerMiles,
    miles: "",
    gallons: "",
  };
}

type FormAction =
  | { type: "reset" }
  | { type: "date"; value: string }
  | { type: "gallons"; value: string }
  | { type: "odometer" }
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
      return { ...data, mode: "odometer" };
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
  if (data.gallons === "") {
    return {
      ...data,
      state: "error",
      error: "Gallons field is empty",
    };
  }
  const gallons = parseNumber(data.gallons);
  if (isNaN(gallons)) {
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
  let miles = parseNumber(data.miles);
  if (isNaN(miles)) {
    return {
      ...data,
      state: "error",
      error: "Miles field is not a number",
    };
  }

  if (data.mode === "odometer") {
    const difference = miles - data.previousOdometerMiles;
    if (difference < 0) {
      return {
        ...data,
        state: "error",
        error: "Odometer miles have decreased",
      };
    }

    data.previousOdometerMiles = miles;
    miles = difference;
  }

  const estimatedMPG = miles / gallons;
  if (isNaN(estimatedMPG)) {
    return {
      ...data,
      state: "error",
      error: "Miles per gallon is not a number",
    };
  }

  return {
    ...data,
    state: "complete",
    record: createDatedRecord(data.date, gallons, miles),
  };
}
