import { useState } from "react";
import NumericInput from "../../components/form/NumericInput";
import { useAppContext } from "../../contexts/AppContext";
import { Miles, parseNumber } from "../../utils/numeric";
import Block from "../../components/form/Block";
import Heading from "../../components/form/Heading";
import { currentOdometer } from "../../types/Record";

function Settings() {
  const app = useAppContext();

  const [odometerMiles, setOdometerMiles] = useState<string>("");

  return (
    <>
      <button className="button-active emphasized" onClick={() => app.setRecords([])}>
        Clear Records
      </button>
      <hr />
      {currentOdometer(app.records, app.odometerOverride) === undefined && (
        <>
          <Block>
            <Heading value="Odometer Miles Override" />
            <NumericInput
              value={odometerMiles}
              setValue={(value) => setOdometerMiles(value)}
              unit={Miles}
              placeholder={0}
            />
          </Block>
          <button
            className="button-active emphasized"
            onClick={() => app.setOdometerOverride(parseNumber(odometerMiles))}
          >
            Set Odometer Override
          </button>
        </>
      )}
      {currentOdometer(app.records, undefined) === undefined && (
        <button
          className="button-active emphasized"
          onClick={() => app.setOdometerOverride(undefined)}
        >
          Clear Odometer Override
        </button>
      )}
    </>
  );
}

export default Settings;
