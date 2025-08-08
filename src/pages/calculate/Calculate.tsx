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
import Block from "../../components/form/Block";
import { Record } from "../../types/Record";

function Calculate() {
  const app = useAppContext();

  const overallRecord = Record.createOverallRecord(app.records);
  const initialMPG =
    app.records.length > 0 ? MilesPerGallon.formatText(overallRecord.mpg) : "";

  const [miles, setMiles] = useState<string>("");
  const [mpg, setMPG] = useState<string>(initialMPG);
  const [price, setPrice] = useState<string>("");

  const estimatedGallons = parseNumber(miles) / parseNumber(mpg);
  const pricePerGallon = parseNumber(price);

  return (
    <>
      <Block>
        <Heading value={"Total Miles"} />
        <NumericInput
          value={miles}
          placeholder={0}
          setValue={(value) => setMiles(value)}
          unit={Miles}
        />
      </Block>
      <Block>
        <Heading value={"Estimated Miles per Gallon"} />
        <NumericInput
          value={mpg}
          placeholder={0}
          setValue={(value) => setMPG(value)}
          unit={MilesPerGallon}
        />
      </Block>
      <Block>
        <Heading value={"Estimated Gallons"} />
        <Numeric value={estimatedGallons} placeholder={0} unit={Gallons} />
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
          value={estimatedGallons * pricePerGallon}
          placeholder={0}
          unit={Dollars}
        />
      </Block>
    </>
  );
}

export default Calculate;
