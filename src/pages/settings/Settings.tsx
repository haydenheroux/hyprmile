import { useState } from "react";
import NumericInput from "../../components/form/NumericInput";
import { useAppContext } from "../../contexts/AppContext";
import { Miles, parseNumber } from "../../utils/numeric";
import Block from "../../components/form/Block";
import Heading from "../../components/form/Heading";
import { currentOdometer } from "../../types/Entry";

function Settings() {
  const app = useAppContext();

  const [odometerMiles, setOdometerMiles] = useState<string>("");

  return (
    <>
      <Block>
        <Heading value="Clear Entries" />
        <span className="normal">
          Remove all entries from your log. This action is permanent.
        </span>
      </Block>
      <button className="button emphasized" onClick={() => app.setEntries([])}>
        Clear Entries
      </button>
      {currentOdometer(app.entries, app.odometerOverride) === undefined && (
        <>
          <Block>
            <Heading value="Odometer Miles Override" />
            <span className="normal">
              Enter your current odometer reading to set the starting point for
              mileage tracking.
            </span>
            <NumericInput
              value={odometerMiles}
              setValue={(value) => setOdometerMiles(value)}
              unit={Miles}
              placeholder={0}
            />
          </Block>
          <button
            className="button emphasized"
            onClick={() => app.setOdometerOverride(parseNumber(odometerMiles))}
          >
            Set Odometer Override
          </button>
        </>
      )}
      {currentOdometer(app.entries, undefined) === undefined && (
        <button
          className="button emphasized"
          onClick={() => app.setOdometerOverride(undefined)}
        >
          Clear Odometer Override
        </button>
      )}
    </>
  );
}

export default Settings;
