import { useState } from "react";
import Heading from "../../components/form/Heading";
import NumericInput from "../../components/form/NumericInput";
import Numeric from "../../components/form/Numeric";
import {
  Dollars,
  Gallons,
  parseNumber,
} from "../../utils/numeric";
import { useAppContext } from "../../contexts/AppContext";
import Block from "../../components/form/Block";
import SelectGroup from "../../components/form/SelectGroup";
import { countAllGallons } from "../../types/Location";

function Calculate() {
  const app = useAppContext();

  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const gallons = countAllGallons(app.locations, selectedLocations);

  const [price, setPrice] = useState<string>("");
  const pricePerGallon = parseNumber(price);

  return (
    <>
      <Block>
        <Heading value={"Trip Locations"} />
        <SelectGroup options={Object.keys(app.locations)} onChange={(value) => setSelectedLocations(value)} />
      </Block>
      <Block>
        <Heading value={"Trip Gallons"} />
        <Numeric
          value={countAllGallons(app.locations, selectedLocations)}
          placeholder={0}
          unit={Gallons}
        />
      </Block>
      <Block>
        <Heading value={"Price per Gallon"} />
        <NumericInput
          value={price}
          placeholder={0}
          setValue={(value) => setPrice(value)}
          unit={Dollars}
        />
      </Block>
      <Block>
        <Heading value={"Total Price"} />
        <Numeric
          value={gallons * pricePerGallon}
          placeholder={0}
          unit={Dollars}
        />
      </Block>
    </>
  );
}

export default Calculate;
