import { useEffect, useReducer, useRef } from "react";
import { Gallons, Miles } from "../../utils/numeric";
import { formReducer, initialFormData } from "./form.tsx";
import { useAppContext } from "../../contexts/AppContext";
import Heading from "../../components/form/Heading";
import NumericInput from "../../components/form/NumericInput.tsx";
import Block from "../../components/form/Block.tsx";
import { formatYYYYMMDD } from "../../utils/date.ts";
import Inline from "../../components/form/Inline.tsx";
import { backfillOdometer, currentOdometer } from "../../types/Entry.ts";
import { Page } from "../../types/Page.ts";
import NumericInputGroup from "../../components/form/NumericInputGroup.tsx";

function Input() {
  const app = useAppContext();

  // TODO useReducer is unable to infer the that the type of action is FormAction, and explicitly
  // specifying the type with <FormData, FormAction> creates other type errors
  const [data, dispatch] = useReducer(formReducer, initialFormData);

  const setEntries = useRef(app.setEntries);
  const entries = useRef(app.entries);

  const odometer = currentOdometer(entries.current, app.odometerOverride);

  useEffect(() => {
    if (data.state === "complete") {
      const newEntries = backfillOdometer(
        [...entries.current, data.entry],
        odometer,
      );
      setEntries.current(newEntries);
    }
  }, [data.state, data, odometer]);

  return (
    <>
      <Block>
        <Heading value={"Date"} />
        <input
          type="date"
          className="numeric"
          value={formatYYYYMMDD(data.date)}
          onChange={(e) => dispatch({ type: "date", value: e.target.value })}
        />
      </Block>
      <Block>
        <Heading value={"Gallons"} />
        <NumericInputGroup 
          value={data.gallons}
          setValue={(value) => dispatch({ type: "gallons", value: value })}
          unit={Gallons}
          placeholder={0.0}
        />
      </Block>
      <Block>
        <Heading value={"Miles"}>
          <Inline>
            {data.mode === "odometer" && (
              <span className="text-neutral-500 numeric">
                {Miles.format(data.previousOdometer)} mi.
              </span>
            )}
            {odometer !== undefined && (
              <button
                className={`${data.mode === "odometer" ? "button-active" : "button"} w-14 py-0.5 text-md emphasized`}
                onClick={() =>
                  dispatch({ type: "odometer", previousOdometer: odometer })
                }
              >
                Odo.
              </button>
            )}
            <button
              className={`${data.mode === "trip" ? "button-active" : "button"} w-14 py-0.5 text-md emphasized`}
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
      {data.state === "input" && (
        <input
          type="submit"
          className="button-active emphasized"
          value="Submit"
          onClick={() => dispatch({ type: "submit" })}
        />
      )}
      {data.state === "error" && (
        <>
          <button
            className="button-error normal"
            onClick={() => dispatch({ type: "reset" })}
          >
            <span className="emphasized">Error</span> - {data.error}
          </button>
        </>
      )}
      {data.state === "complete" && (
        <>
          <Block>
            <Heading value="Entry Logged" />
            <span className="normal">
              Your entry has been successfully logged. You can view all of your
              entries on the Log page, or reset to log a new one.
            </span>
          </Block>
          <button
            className="button emphasized"
            onClick={() => app.setPage(Page.Log)}
          >
            View Log
          </button>
          <button
            className="button emphasized"
            onClick={() => dispatch({ type: "reset" })}
          >
            Log New Entry
          </button>
        </>
      )}
    </>
  );
}

export default Input;
