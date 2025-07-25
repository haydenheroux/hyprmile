import {
  Gallons,
  Mileage
} from "../../utils/numeric";

export type FormState =
  | { state: "input" }
  | { state: "error"; reason: string }
  | { state: "complete" };

export type FormData = {
  date: Date;
  mode: "odometer" | "trip";
  odometerMileage: string;
  tripMileage: string;
  gallons: string;
};

export function defaultFormData(): FormData {
  return {
    date: new Date(),
    mode: "odometer",
    odometerMileage: "",
    tripMileage: "",
    gallons: "",
  }
}

function formatFormData(data: FormData): FormData {
  return {
    ...data,
    odometerMileage: Mileage.format(data.odometerMileage),
    tripMileage: Mileage.format(data.tripMileage),
    gallons: Gallons.format(data.gallons),
  };
}

type FormAction =
  | { type: "date"; value: string }
  | { type: "gallons"; value: string }
  | { type: "odometer" }
  | { type: "trip" }
  | { type: "mileage"; value: string }
  | { type: "blur" };

export function formReducer(data: FormData, action: FormAction): FormData {
  switch (action.type) {
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
    case "mileage": {
      if (data.mode === "odometer") {
        return { ...data, odometerMileage: action.value };
      } else {
        return { ...data, tripMileage: action.value };
      }
    }
    case "blur":
      return formatFormData(data);
    default:
      return data;
  }
}
