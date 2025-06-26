import { useReducer } from "react";

type FormState =
  | { date: Date; mode: "odometer"; odometerMiles: string; gallons: string}
  | { date: Date; mode: "trip"; tripMiles: string; gallons: string};

type FormAction =
  | { type: "date"; value: string }
  | { type: "gallons"; value: string }
  | { type: "odometer" }
  | { type: "trip" }
  | { type: "miles"; value: string };

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "date": {
      const date = action.value === "" ? new Date() : new Date(action.value);
      return { ...state, date };
    }
    case "gallons":
      return { ...state, gallons: action.value };
    case "odometer":
      return { ...state, mode: "odometer", odometerMiles: "" };
    case "trip":
      return { ...state, mode: "trip", tripMiles: "" };
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

function handleSubmit(state: FormState) {
  const tripMiles = state.mode === "odometer" ? Number(state.odometerMiles) - 200_000 : Number(state.tripMiles);
  const mpg = tripMiles / Number(state.gallons);
  alert(`${mpg.toFixed(1)} miles per gallon`);
}

function Input() {
  const [state, dispatch] = useReducer(reducer, {
    date: new Date(),
    mode: "odometer",
    odometerMiles: "",
    gallons: "",
  });

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
          state.mode === "odometer"
            ? state.odometerMiles
            : state.tripMiles
        }
        placeholder="0.0"
        onChange={(e) => dispatch({ type: "miles", value: e.target.value })}
      />
      <input type="submit" className="button-active" value="Submit" onClick={() => handleSubmit(state)} />
    </div>
  );
}

export default Input;
