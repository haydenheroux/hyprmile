import { useState } from "react";
import Heading from "../../components/form/Heading";
import NumericInput from "../../components/form/NumericInput";
import Numeric from "../../components/form/Numeric";
import {
  Dollars,
  Gallons,
  Miles,
  MilesPerGallon,
  parseNumber,
} from "../../utils/numeric";
import { useAppContext } from "../../contexts/AppContext";
import Group from "../../components/form/Group";
import { Record } from "../../types/Record";

function Calculate() {
  const app = useAppContext();
  const [miles, setMiles] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const overallRecord = Record.createOverallRecord(app.records);
  const estimatedGallons = parseNumber(miles) / overallRecord.mpg;
  const pricePerGallon = parseNumber(price);

  return (
    <>
      <Group>
        <Heading value={"Total Miles"} />
        <NumericInput
          value={miles}
          placeholder={0}
          setValue={(value) => setMiles(value)}
          unit={Miles}
        />
      </Group>
      <Group>
        <Heading value={"Estimated Miles per Gallon"} />
        <Numeric
          value={overallRecord.mpg}
          placeholder={0}
          unit={MilesPerGallon}
        />
      </Group>
      <Group>
        <Heading value={"Estimated Gallons"} />
        <Numeric
          value={estimatedGallons}
          placeholder={0}
          unit={Gallons}
        />
      </Group>
      <Group>
        <Heading value={"Price per Gallon"} />
        <NumericInput
          value={price}
          placeholder={0}
          setValue={(value) => setPrice(value)}
          unit={Dollars}
        />
      </Group>
      <Group>
        <Heading value={"Total Price"} />
        <Numeric
          value={estimatedGallons * pricePerGallon}
          placeholder={0}
          unit={Dollars}
        />
      </Group>
    </>
  );
}

export default Calculate;
