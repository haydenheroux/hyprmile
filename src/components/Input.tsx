import { useReducer, useState } from "react";
import { IoMdClose } from "react-icons/io";

type FormState = {
  date: Date;
  mode: "odometer" | "trip";
  odometerMiles: string;
  tripMiles: string;
  gallons: string;
};

type FormAction =
  | { type: "date"; value: string }
  | { type: "gallons"; value: string }
  | { type: "odometer" }
  | { type: "trip" }
  | { type: "miles"; value: string };

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "date": {
      const cleared = action.value === "";
      const date = cleared ? new Date() : new Date(action.value);
      return { ...state, date };
    }
    case "gallons":
      return { ...state, gallons: action.value };
    case "odometer":
      return { ...state, mode: "odometer" };
    case "trip":
      return { ...state, mode: "trip" };
    case "miles": {
      if (state.mode === "odometer") {
        return { ...state, odometerMiles: action.value };
      } else {
        return { ...state, tripMiles: action.value };
      }
    }
    default:
      return state;
  }
}

function formatYYYYMMDD(date: Date): string {
  return date.toISOString().split("T")[0];
}

function previousOdometerMiles(): number {
  return 200_637;
}

function calculateTripMiles(state: FormState): number | null {
  switch (state.mode) {
    case "odometer": {
      const difference = Number(state.odometerMiles) - previousOdometerMiles();
      if (difference < 0) {
        return null;
      }
      return difference;
    }
    case "trip":
      return Number(state.tripMiles);
    default:
      return 0.0;
  }
}

function handleSubmit(
  setMPG: (mpg: number) => void,
  setShowMPG: (show: boolean) => void,
  state: FormState,
) {
  const tripMiles = calculateTripMiles(state);
  if (tripMiles === null) {
    return;
  }
  const gallons = Number(state.gallons);
  // TODO Implement alternative way to detect failure condition
  if (isNaN(gallons)) {
    return;
  }
  setMPG(tripMiles / gallons);
  setShowMPG(true);
}

function Input() {
  const [state, dispatch] = useReducer(reducer, {
    date: new Date(),
    mode: "odometer",
    odometerMiles: "",
    tripMiles: "",
    gallons: "",
  });

  const [mpg, setMPG] = useState<number>(0);
  const [showMPG, setShowMPG] = useState<boolean>(false);

  return (
    <div className="w-screen lg:w-96 mx-auto my-6 px-8 flex flex-col gap-4">
      <div className="flex justify-between items-center h-8">
        <span className="text-neutral-100 text-xl">Date</span>
      </div>
      <input
        type="date"
        className="text-neutral-100"
        value={formatYYYYMMDD(state.date)}
        onChange={(e) => dispatch({ type: "date", value: e.target.value })}
      />
      <div className="flex justify-between items-center h-8">
        <span className="text-neutral-100 text-xl">Gallons</span>
      </div>
      <input
        type="number"
        step={0.001}
        className="text-neutral-100"
        value={state.gallons}
        placeholder="0.000"
        onChange={(e) => dispatch({ type: "gallons", value: e.target.value })}
      />
      <div className="flex justify-between items-center h-8">
        <span className="text-neutral-100 text-xl">Miles</span>
        <div className="flex gap-2 items-center">
          <span
            className={`${state.mode === "odometer" ? "button-active" : "button"} "text-sm p-1 transition-bg ease-in-out duration-100`}
            onClick={() => dispatch({ type: "odometer" })}
          >
            Odo.
          </span>
          <span
            className={`${state.mode === "trip" ? "button-active" : "button"} "text-sm p-1 transition-bg ease-in-out duration-100`}
            onClick={() => dispatch({ type: "trip" })}
          >
            Trip
          </span>
        </div>
      </div>
      <input
        type="number"
        step={0.1}
        className="text-neutral-100"
        value={
          state.mode === "odometer" ? state.odometerMiles : state.tripMiles
        }
        placeholder="0.0"
        onChange={(e) => dispatch({ type: "miles", value: e.target.value })}
      />
      <input
        type="submit"
        className="button-active"
        value="Submit"
        onClick={() => handleSubmit(setMPG, setShowMPG, state)}
      />
      <div
        className={`relative border-1 border-neutral-800 rounded-lg bg-linear-to-t from-neutral-950 to-neutral-900 p-2 transition-opacity ${showMPG ? "opacity-100" : "opacity-0"} duration-150 ease-in-out`}
      >
        <span
          tabIndex={0}
          className="absolute right-2 top-1 text-neutral-500"
          onClick={() => setShowMPG(false)}
        >
          <IoMdClose size={24} />
        </span>
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
