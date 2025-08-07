import { useEffect, useReducer } from "react";
import { Gallons, Miles, MilesPerGallon } from "../../utils/numeric";
import { formReducer, initialFormData } from "./form.tsx";
import { useAppContext } from "../../contexts/AppContext";
import Heading from "../../components/form/Heading";
import NumericInput from "../../components/form/NumericInput.tsx";
import Group from "../../components/form/Group.tsx";
import { formatYYYYMMDD } from "../../utils/date.ts";
import { RecordsRepository } from "../../utils/localStorage.ts";

function Input() {
  const app = useAppContext();

  // TODO useReducer is unable to infer the that the type of action is FormAction, and explicitly
  // specifying the type with <FormData, FormAction> creates other type errors
  const [data, dispatch] = useReducer(
    (data, action) => formReducer(data, action, app),
    initialFormData(app.previousOdometerMiles),
  );

  useEffect(() => RecordsRepository.setValue(app.records), [app.records]);

  return (
    <>
      <Group>
        <Heading value={"Date"} />
        <input
          type="date"
          value={formatYYYYMMDD(data.date)}
          onChange={(e) => dispatch({ type: "date", value: e.target.value })}
        />
      </Group>
      <Group>
        <Heading value={"Gallons"} />
        <NumericInput
          value={data.gallons}
          setValue={(value) => dispatch({ type: "gallons", value: value })}
          unit={Gallons}
          placeholder={0.0}
        />
      </Group>
      <Group>
        <Heading value={"Miles"}>
          <div className="flex gap-2 items-center">
            <span
              className={`text-neutral-500 ${data.mode === "odometer" ? "opacity-100" : "opacity-0"} transition-opacity duration-75 ease-in-out`}
            >
              {Miles.format(data.previousOdometerMiles)} mi.
            </span>
            <button
              className={`${data.mode === "odometer" ? "button-active" : "button"} text-md p-0.5 transition-bg ease-in-out duration-100`}
              onClick={() => dispatch({ type: "odometer" })}
            >
              Odo.
            </button>
            <button
              className={`${data.mode === "trip" ? "button-active" : "button"} text-md p-0.5 transition-bg ease-in-out duration-100`}
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
      </Group>
      <input
        type="submit"
        className="button-active p-0"
        value="Submit"
        onClick={() => dispatch({ type: "submit" })}
      />
      <button
        className={`button-error p-2 transition-opacity ${data.state.state === "error" ? "opacity-100 block" : "opacity-0 hidden"} duration-75 ease-in-out`}
        onClick={() => dispatch({ type: "reset" })}
      >
        <span className="text-xl font-bold text-red-300 ">Input Error</span>
        <br />
        <span className="text-red-400">
          {data.state.state === "error" ? data.state.error : ""}
        </span>
      </button>
      <div
        className={`button p-2 transition-opacity ${data.state.state === "complete" ? "opacity-100" : "opacity-0"} duration-75 ease-in-out`}
        onClick={() => dispatch({ type: "reset" })}
      >
        <span className="text-xl font-bold text-neutral-100 ">
          {MilesPerGallon.formatText(data.estimatedMPG)} on{" "}
          {formatYYYYMMDD(data.date)}
        </span>
      </div>
    </>
  );
}

export default Input;
