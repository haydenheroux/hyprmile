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

function Calculate() {
  const app = useAppContext();
  const [miles, setMiles] = useState<string>("");
  const [price, setPrice] = useState<string>("");

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
          value={app.mpgEstimate}
          placeholder={0}
          unit={MilesPerGallon}
        />
      </Group>
      <Group>
        <Heading value={"Estimated Gallons"} />
        <Numeric
          value={parseNumber(miles) / app.mpgEstimate}
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
          value={(parseNumber(miles) / app.mpgEstimate) * parseNumber(price)}
          placeholder={0}
          unit={Dollars}
        />
      </Group>
    </>
  );
}

export default Calculate;
