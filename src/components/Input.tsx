import { useReducer } from "react";

type FormState = {
  date: Date;
  mode: "odometer" | "trip";
  odometerMiles: string;
  tripMiles: string;
  gallons: string;
};

// TODO "...Blur" states replicate same functionality
type FormAction =
  | { type: "date"; value: string }
  | { type: "gallonsChange"; value: string }
  | { type: "gallonsBlur"; value: string }
  | { type: "odometer" }
  | { type: "trip" }
  | { type: "milesChange"; value: string }
  | { type: "milesBlur"; value: string };

function reducer(state: FormState, action: FormAction): FormState {
  console.log(state, action);
  switch (action.type) {
    case "date": {
      const date = action.value === "" ? new Date() : new Date(action.value);
      return { ...state, date };
    }
    case "gallonsChange":
      return { ...state, gallons: action.value };
    case "gallonsBlur":
      return { ...state, gallons: Gallons.format(action.value) };
    case "odometer":
      return { ...state, mode: "odometer" };
    case "trip":
      return { ...state, mode: "trip" };
    case "milesChange": {
      if (state.mode === "odometer") {
        return { ...state, odometerMiles: action.value };
      } else {
        return { ...state, tripMiles: action.value };
      }
    }
    case "milesBlur":
      if (state.mode === "odometer") {
        return { ...state, odometerMiles: Mileage.format(action.value) };
      } else {
        return { ...state, tripMiles: Mileage.format(action.value) };
      }
    default:
      return state;
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

function handleSubmit(state: FormState) {
  const tripMiles =
    state.mode === "odometer"
      ? Number(state.odometerMiles) - 200_000
      : Number(state.tripMiles);
  const mpg = tripMiles / Number(state.gallons);
  alert(`${mpg.toFixed(1)} miles per gallon`);
}

function Input() {
  const [state, dispatch] = useReducer(reducer, {
    date: new Date(),
    mode: "odometer",
    odometerMiles: "",
    tripMiles: "",
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
        type="text"
        className="text-neutral-100"
        value={state.gallons}
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
        type="text"
        className="text-neutral-100"
        value={
          state.mode === "odometer" ? state.odometerMiles : state.tripMiles
        }
        placeholder={Mileage.format(0)}
        onChange={(e) =>
          dispatch({ type: "milesChange", value: e.target.value })
        }
        onBlur={(e) => dispatch({ type: "milesBlur", value: e.target.value })}
      />
      <input
        type="submit"
        className="button-active"
        value="Submit"
        onClick={() => handleSubmit(state)}
      />
    </div>
  );
}

export default Input;
