import { useReducer, useState } from "react";
import {
  Gallons,
  Mileage,
  MilesPerGallon,
  parseNumber
} from "../../utils/numeric";
import {
  formReducer,
  type FormState,
  type FormData,
  defaultFormData
} from "./form.tsx";
import { useAppContext } from "../../contexts/AppContext";

function formatYYYYMMDD(date: Date): string {
  return date.toISOString().split("T")[0];
}

function Input() {
  const app = useAppContext();

  const [data, dispatch] = useReducer(formReducer, defaultFormData());

  const [mpg, setMPG] = useState<number>(0);
  const [state, setState] = useState<FormState>({ state: "input" });

  const error = (reason: string): void => {
    setState({ state: "error", reason });
  };

  function handleSubmit(data: FormData) {
    if (data.gallons === "") {
      error("Gallons field is empty");
      return;
    }
    const gallons = parseNumber(data.gallons);
    if (isNaN(gallons)) {
      error("Gallons is not a number");
      return;
    }

    const tripMiles = calculateTripMiles(data);
    if (tripMiles === null) {
      // NOTE It is `calculateTripMiles` responsibility to call `error`
      return;
    }

    const mpg = tripMiles / gallons;
    if (!isNaN(mpg)) {
      setMPG(mpg);
      setState({ state: "complete" });
    }
  }

  function calculateTripMiles(data: FormData): number | null {
    switch (data.mode) {
      case "odometer": {
        if (data.odometerMileage === "") {
          error("Odometer mileage field is empty");
          return null;
        }
        const odometerMileage = parseNumber(data.odometerMileage);
        if (isNaN(odometerMileage)) {
          error("Odometer mileage field is not a number");
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
        const tripMiles = parseNumber(data.tripMileage);
        if (isNaN(tripMiles)) {
          error("Trip mileage is not a number");
          return null;
        }
        return tripMiles;
      }
      default:
        return 0.0;
    }
  }

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
        onChange={(e) => dispatch({ type: "gallons", value: e.target.value })}
        onBlur={() => dispatch({ type: "blur" })}
      />
      <div className="flex justify-between items-center h-8">
        <span className="text-neutral-100 text-xl">Miles</span>
        <div className="flex gap-2 items-center">
          <span
            className={`text-neutral-500 ${data.mode === "odometer" ? "opacity-100" : "opacity-0"} transition-opacity duration-75 ease-in-out`}
          >
            {Mileage.format(app.previousOdometerMileage.prev)} mi.
          </span>
          <button
            className={`${data.mode === "odometer" ? "button-active" : "button"} "text-sm p-1 transition-bg ease-in-out duration-100`}
            onClick={() => dispatch({ type: "odometer" })}
          >
            Odo.
          </button>
          <button
            className={`${data.mode === "trip" ? "button-active" : "button"} "text-sm p-1 transition-bg ease-in-out duration-100`}
            onClick={() => dispatch({ type: "trip" })}
          >
            Trip
          </button>
        </div>
      </div>
      <input
        type="text"
        className="text-neutral-100"
        value={
          data.mode === "odometer" ? data.odometerMileage : data.tripMileage
        }
        placeholder={Mileage.format(0)}
        onChange={(e) => dispatch({ type: "mileage", value: e.target.value })}
        onBlur={() => dispatch({ type: "blur" })}
      />
      <input
        type="submit"
        className="button-active"
        value="Submit"
        onClick={() => handleSubmit(data)}
      />
      <button
        className={`button-error p-2 transition-opacity ${state.state === "error" ? "opacity-100 block" : "opacity-0 hidden"} duration-75 ease-in-out`}
        onClick={() => setState({ state: "input" })}
      >
        <span className="text-xl font-bold text-red-300 ">Input Error</span>
        <br />
        <span className="text-red-400">
          {state.state === "error" ? state.reason : null}
        </span>
      </button>
      <div
        className={`button p-2 transition-opacity ${state.state === "complete" ? "opacity-100" : "opacity-0"} duration-75 ease-in-out`}
        onClick={() => setState({ state: "input" })}
      >
        <span className="text-xl font-bold text-neutral-100 ">
          MPG Recorded
        </span>
        <br />
        <span className="text-neutral-500">
          {MilesPerGallon.format(mpg)} miles / gallon
        </span>
      </div>
    </div>
  );
}

export default Input;
