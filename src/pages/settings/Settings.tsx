import { useState } from "react";
import NumericInput from "../../components/form/NumericInput";
import { useAppContext } from "../../contexts/AppContext";
import { hasOdometerMiles } from "../../types/Record";
import { Miles, parseNumber } from "../../utils/numeric";
import Block from "../../components/form/Block";
import Heading from "../../components/form/Heading";

function Settings() {
  const app = useAppContext();

  const [odometerMiles, setOdometerMiles] = useState<string>("");

  return (
    <>
      <button className="button-active" onClick={() => app.setRecords([])}>
        Clear Records
      </button>
      {!hasOdometerMiles(app.records) ? (
        <>
          <hr />
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
            className="button-active"
            onClick={() => app.setOdometerOverride(parseNumber(odometerMiles))}
          >
            Set Odometer Miles
          </button>
        </>
      ) : null}
    </>
  );
}

export default Settings;
