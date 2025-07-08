import { useReducer, useState } from "react";
import { useAppContext } from "../contexts/AppContext";

type FormState =
  | { state: "input" }
  | { state: "error"; reason: string }
  | { state: "complete" };

type FormData = {
  date: Date;
  mode: "odometer" | "trip";
  odometerMileage: string;
  tripMileage: string;
  gallons: string;
};

// TODO "...Blur" states replicate same functionality
type FormAction =
  | { type: "date"; value: string }
  | { type: "gallonsChange"; value: string }
  | { type: "gallonsBlur"; value: string }
  | { type: "odometer" }
  | { type: "trip" }
  | { type: "mileageChange"; value: string }
  | { type: "mileageBlur"; value: string };

function reducer(data: FormData, action: FormAction): FormData {
  console.log(data, action);
  switch (action.type) {
    case "date": {
      const cleared = action.value === "";
      const date = cleared ? new Date() : new Date(action.value);
      return { ...data, date };
    }
    case "gallonsChange":
      return { ...data, gallons: action.value };
    case "gallonsBlur":
      return { ...data, gallons: Gallons.format(action.value) };
    case "odometer":
      return { ...data, mode: "odometer" };
    case "trip":
      return { ...data, mode: "trip" };
    case "mileageChange": {
      if (data.mode === "odometer") {
        return { ...data, odometerMileage: action.value };
      } else {
        return { ...data, tripMileage: action.value };
      }
    }
    case "mileageBlur":
      if (data.mode === "odometer") {
        return { ...data, odometerMileage: Mileage.format(action.value) };
      } else {
        return { ...data, tripMileage: Mileage.format(action.value) };
      }
    default:
      return data;
  }
}

function formatYYYYMMDD(date: Date): string {
  return date.toISOString().split("T")[0];
}

type IncrementAmount = {
  step: number;
  format: (number: number | string) => string;
};

function formatNumber(number: number | string, fractionDigits: number): string {
  const numberFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  if (typeof number === "string" && number === "") return "";

  const num =
    typeof number === "number" ? number : parseFloat(number.replace(",", ""));
  return numberFormat.format(num);
}

function createIncrementAmount(fractionDigits: number): IncrementAmount {
  return {
    step: 10 ** -fractionDigits,
    format: (number: number | string) => formatNumber(number, fractionDigits),
  };
}

const Mileage = createIncrementAmount(1);
const Gallons = createIncrementAmount(3);

function Input() {
  const app = useAppContext();

  const [data, dispatch] = useReducer(reducer, {
    date: new Date(),
    mode: "odometer",
    odometerMileage: "",
    tripMileage: "",
    gallons: "",
  });

  const [mpg, setMPG] = useState<number>(0);
  const [state, setState] = useState<FormState>({ state: "input" });

  const error = (reason: string): void => {
    setState({ state: "error", reason });
  };

  const handleSubmit = (data: FormData) => {
    const tripMiles = calculateTripMiles(data);
    if (tripMiles === null) {
      // NOTE It is `calculateTripMiles` responsibility to call `setState`
      return;
    }

    if (data.gallons === "") {
      error("Gallons is empty");
      return;
    }
    const gallons = Number(data.gallons);
    if (isNaN(gallons)) {
      error("Gallons is not a number");
      return;
    }

    const mpg = tripMiles / gallons;
    if (!isNaN(mpg)) {
      setMPG(mpg);
      setState({ state: "complete" });
    }
  };

  const calculateTripMiles = (data: FormData): number | null => {
    switch (data.mode) {
      case "odometer": {
        if (data.odometerMileage === "") {
          error("Odometer mileage is empty");
          return null;
        }
        const odometerMileage = Number(data.odometerMileage);
        if (isNaN(odometerMileage)) {
          error("Odometer mileage is not a number");
          return null;
        }

        const previousOdometerMileage =
          app.previousOdometerMileage.fill(odometerMileage);

        const difference = previousOdometerMileage.difference();
        if (difference < 0) {
          error("Odometer mileage has decreased");
          return null;
        }

        // NOTE Only update the app context's odometer mileage when there are no mileage errors
        app.setPreviousOdometerMileage(previousOdometerMileage);
        return difference;
      }
      case "trip": {
        if (data.tripMileage === "") {
          error("Trip mileage is empty");
          return null;
        }
        const tripMiles = Number(data.tripMileage);
        if (isNaN(tripMiles)) {
          error("Trip mileage is not a number");
          return null;
        }
        return tripMiles;
      }
      default:
        return 0.0;
    }
  };

  return (
    <div className="w-screen lg:w-128 mx-auto my-6 px-8 flex flex-col gap-4">
      <div className="flex justify-between items-center h-8">
        <span className="text-neutral-100 text-xl">Date</span>
      </div>
      <input
        type="date"
        className="text-neutral-100"
        value={formatYYYYMMDD(data.date)}
        onChange={(e) => dispatch({ type: "date", value: e.target.value })}
      />
      <div className="flex justify-between items-center h-8">
        <span className="text-neutral-100 text-xl">Gallons</span>
      </div>
      <input
        type="text"
        className="text-neutral-100"
        value={data.gallons}
        placeholder={Gallons.format(0)}
        onChange={(e) =>
          dispatch({ type: "gallonsChange", value: e.target.value })
        }
        onBlur={(e) => dispatch({ type: "gallonsBlur", value: e.target.value })}
      />
      <div className="flex justify-between items-center h-8">
        <span className="text-neutral-100 text-xl">Miles</span>
        <div className="flex gap-2 items-center">
          <span
            className={`text-neutral-500 ${data.mode === "odometer" ? "opacity-100" : "opacity-0"} transition-opacity duration-75 ease-in-out`}
          >
            {Mileage.format(app.previousOdometerMileage.prev)} mi.
          </span>
          <span
            className={`${data.mode === "odometer" ? "button-active" : "button"} "text-sm p-1 transition-bg ease-in-out duration-100`}
            onClick={() => dispatch({ type: "odometer" })}
          >
            Odo.
          </span>
          <span
            className={`${data.mode === "trip" ? "button-active" : "button"} "text-sm p-1 transition-bg ease-in-out duration-100`}
            onClick={() => dispatch({ type: "trip" })}
          >
            Trip
          </span>
        </div>
      </div>
      <input
        type="text"
        className="text-neutral-100"
        value={
          data.mode === "odometer" ? data.odometerMileage : data.tripMileage
        }
        placeholder={Mileage.format(0)}
        onChange={(e) =>
          dispatch({ type: "mileageChange", value: e.target.value })
        }
        onBlur={(e) => dispatch({ type: "mileageBlur", value: e.target.value })}
      />
      <input
        type="submit"
        className="button-active"
        value="Submit"
        onClick={() => handleSubmit(data)}
      />
      <div
        className={`button-error p-2 transition-opacity ${state.state === "error" ? "opacity-100 block" : "opacity-0 hidden"} duration-75 ease-in-out`}
        onClick={() => setState({ state: "input" })}
      >
        <span className="text-xl font-bold text-red-300 ">Input Error</span>
        <br />
        <span className="text-red-400">
          {state.state === "error" ? state.reason : null}
        </span>
      </div>
      <div
        className={`button p-2 transition-opacity ${state.state === "complete" ? "opacity-100" : "opacity-0"} duration-75 ease-in-out`}
        onClick={() => setState({ state: "input" })}
      >
        <span className="text-xl font-bold text-neutral-100 ">
          MPG Recorded
        </span>
        <br />
        <span className="text-neutral-500">
          {mpg.toFixed(1)} miles / gallon
        </span>
      </div>
    </div>
  );
}

export default Input;
