import { useEffect, useReducer, useRef } from "react";
import { Gallons, Miles, MilesPerGallon } from "../../utils/numeric";
import { formReducer, initialFormData } from "./form.tsx";
import { useAppContext } from "../../contexts/AppContext";
import Heading from "../../components/form/Heading";
import NumericInput from "../../components/form/NumericInput.tsx";
import Block from "../../components/form/Block.tsx";
import { formatYYYYMMDD } from "../../utils/date.ts";
import Inline from "../../components/form/Inline.tsx";

function Input() {
  const app = useAppContext();

  // TODO useReducer is unable to infer the that the type of action is FormAction, and explicitly
  // specifying the type with <FormData, FormAction> creates other type errors
  const [data, dispatch] = useReducer(
    formReducer,
    initialFormData(app.previousOdometerMiles),
  );

  const setRecords = useRef(app.setRecords);
  const records = useRef(app.records);

  useEffect(() => {
    if (data.state === "complete") {
      setRecords.current([...records.current, data.record]);
    }
  }, [data.state, data]);

  return (
    <>
      <Block>
        <Heading value={"Date"} />
        <input
          type="date"
          value={formatYYYYMMDD(data.date)}
          onChange={(e) => dispatch({ type: "date", value: e.target.value })}
        />
      </Block>
      <Block>
        <Heading value={"Gallons"} />
        <NumericInput
          value={data.gallons}
          setValue={(value) => dispatch({ type: "gallons", value: value })}
          unit={Gallons}
          placeholder={0.0}
        />
      </Block>
      <Block>
        <Heading value={"Miles"}>
          <Inline>
            <span
              className={`text-neutral-500 ${data.mode === "odometer" ? "block" : "hidden"}`}
            >
              {Miles.format(data.previousOdometerMiles)} mi.
            </span>
            <button
              className={`${data.mode === "odometer" ? "button-active" : "button"} text-md p-0.5`}
              onClick={() => dispatch({ type: "odometer" })}
            >
              Odo.
            </button>
            <button
              className={`${data.mode === "trip" ? "button-active" : "button"} text-md p-0.5`}
              onClick={() => dispatch({ type: "trip" })}
            >
              Trip
            </button>
          </Inline>
        </Heading>
        <NumericInput
          value={data.miles}
          setValue={(value) => dispatch({ type: "miles", value: value })}
          unit={Miles}
          placeholder={0.0}
        />
      </Block>
      <input
        type="submit"
        className="button-active p-2"
        value="Submit"
        onClick={() => dispatch({ type: "submit" })}
      />
      {data.state === "error" ? (
        <button
          className="button-error p-2"
          onClick={() => dispatch({ type: "reset" })}
        >
          <span className="text-xl font-bold text-red-300 ">Input Error</span>
          <br />
          <span className="text-red-400">{data.error}</span>
        </button>
      ) : null}
      {data.state === "complete" ? (
        <div className="button p-2" onClick={() => dispatch({ type: "reset" })}>
          <span className="text-xl font-bold text-neutral-100 ">
            {MilesPerGallon.formatText(data.record.mpg)} on{" "}
            {formatYYYYMMDD(data.date)}
          </span>
        </div>
      ) : null}
    </>
  );
}

export default Input;
