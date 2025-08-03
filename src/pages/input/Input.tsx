import { useReducer, useState } from "react";
import {
  Gallons,
  Miles,
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
import Heading from "../../components/form/Heading";
import NumericInput from "../../components/form/NumericInput.tsx";

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
        if (data.odometerMiles === "") {
          error("Odometer miles field is empty");
          return null;
        }
        const odometerMiles = parseNumber(data.odometerMiles);
        if (isNaN(odometerMiles)) {
          error("Odometer miles field is not a number");
          return null;
        }

        const previousOdometerMiles =
          app.previousOdometerMiles.fill(odometerMiles);

        const difference = previousOdometerMiles.difference();
        if (difference < 0) {
          error("Odometer miles have decreased");
          return null;
        }

        // NOTE Only update the app context's odometer miles when there are no errors
        app.setPreviousOdometerMiles(previousOdometerMiles);
        return difference;
      }
      case "trip": {
        if (data.tripMiles === "") {
          error("Trip miles field is empty");
          return null;
        }
        const tripMiles = parseNumber(data.tripMiles);
        if (isNaN(tripMiles)) {
          error("Trip miles field is not a number");
          return null;
        }
        return tripMiles;
      }
      default:
        return 0.0;
    }
  }

  return <>
      <Heading value={"Date"} />
      <input
        type="date"
        value={formatYYYYMMDD(data.date)}
        onChange={(e) => dispatch({ type: "date", value: e.target.value })}
      />
      <Heading value={"Gallons"} />
      <NumericInput
        value={data.gallons}
        setValue={(value) => dispatch({ type: "gallons", value: value })}
        unit={Gallons}
        placeholder={0.0}
      />
      <Heading value={"Miles"}>
        <div className="flex gap-2 items-center">
          <span
            className={`text-neutral-500 ${data.mode === "odometer" ? "opacity-100" : "opacity-0"} transition-opacity duration-75 ease-in-out`}
          >
            {Miles.format(app.previousOdometerMiles.prev)} mi.
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
      </Heading>
      <NumericInput
        value={data.mode === "odometer" ? data.odometerMiles : data.tripMiles}
        setValue={(value) => dispatch({ type: "miles", value: value })}
        unit={Miles}
        placeholder={0.0}
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
    </>
}

export default Input;
