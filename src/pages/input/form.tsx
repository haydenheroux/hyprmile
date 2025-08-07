import { parseNumber } from "../../utils/numeric";

type FormState =
  | { state: "input" }
  | { state: "error"; error: string }
  | { state: "complete" };

export type FormData = {
  state: FormState;
  date: Date;
  mode: "odometer" | "trip";
  previousOdometerMiles: number;
  estimatedTripMiles: number;
  estimatedMPG: number;
  odometerMiles: string;
  tripMiles: string;
  gallons: string;
};

export function defaultFormData(previousOdometerMiles: number): FormData {
  return {
    state: { state: "input" },
    date: new Date(),
    mode: "odometer",
    previousOdometerMiles,
    estimatedTripMiles: 0,
    estimatedMPG: 0,
    odometerMiles: "",
    tripMiles: "",
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
      return { ...data, state: { state: "input" } };
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
      if (data.mode === "odometer") {
        return { ...data, odometerMiles: action.value };
      } else {
        return { ...data, tripMiles: action.value };
      }
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
      state: { state: "error", error: "Gallons field is empty" },
    };
  }
  const gallons = parseNumber(data.gallons);
  if (isNaN(gallons)) {
    return {
      ...data,
      state: { state: "error", error: "Gallons is not a number" },
    };
  }

  let previousOdometerMiles = data.previousOdometerMiles;
  let estimatedTripMiles;

  switch (data.mode) {
    case "odometer": {
      if (data.odometerMiles === "") {
        return {
          ...data,
          state: { state: "error", error: "Odometer miles field is empty" },
        };
      }
      const odometerMiles = parseNumber(data.odometerMiles);
      if (isNaN(odometerMiles)) {
        return {
          ...data,
          state: {
            state: "error",
            error: "Odometer miles field is not a number",
          },
        };
      }

      const difference = odometerMiles - previousOdometerMiles;
      if (difference < 0) {
        return {
          ...data,
          state: { state: "error", error: "Odometer miles have decreased" },
        };
      }

      previousOdometerMiles = odometerMiles;
      estimatedTripMiles = difference;
      break;
    }
    case "trip": {
      if (data.tripMiles === "") {
        return {
          ...data,
          state: { state: "error", error: "Trip miles field is empty" },
        };
      }
      const tripMiles = parseNumber(data.tripMiles);
      if (isNaN(tripMiles)) {
        return {
          ...data,
          state: { state: "error", error: "Trip miles field is not a number" },
        };
      }

      estimatedTripMiles = tripMiles;
      break;
    }
  }

  const estimatedMPG = estimatedTripMiles / gallons;
  if (isNaN(estimatedMPG)) {
    return {
      ...data,
      state: { state: "error", error: "Miles per gallon is not a number" },
    };
  }

  // app.setRecords([
  //   ...app.records,
  //   new Record(data.date, gallons, newData.estimatedTripMiles),
  // ]);
  return {
    ...data,
    state: { state: "complete" },
    estimatedMPG,
  };
}
