import { useRef, useState } from "react";
import Block from "../../components/form/Block";
import Heading from "../../components/form/Heading";
import NumericInput from "../../components/form/NumericInput";
import { Miles, MilesPerGallon, Minutes, parseNumber } from "../../utils/numeric";
import { useAppContext } from "../../contexts/AppContext";
import { createIfAbsent, updateTo, type LocationToLocation } from "../../types/Location";
import Select from "../../components/form/Select";

function Locations() {
  const [name, setName] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [mpg, setMPG] = useState<string>("");

  const app = useAppContext();
  const locations = useRef(app.locations);
  const setLocations = useRef(app.setLocations);

  const addLocation = () => {
    let newLocations = createIfAbsent(locations.current, name);
    if (destination && parseNumber(distance) && parseNumber(time)) {
      const to: LocationToLocation = {
        distance: parseNumber(distance),
        time: parseNumber(time),
      };
      if (parseNumber(mpg)) {
        to.mpg = parseNumber(mpg);
      }
      newLocations = updateTo(newLocations, name, destination, to);
    }
    setLocations.current(newLocations);
  };

  const destinations = Object.keys(locations.current).filter(
    (destination) => name !== destination,
  );

  return (
    <>
      <Block>
        <Heading value={"Name"} />
        <input
          type="text"
          className="numeric"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Block>
      {name && destinations.length > 0 && (
        <Block>
          <Heading value={"Distance"} />
          <Select options={destinations} onChange={(v) => setDestination(v)} />
          <NumericInput
            value={distance}
            setValue={(value) => setDistance(value)}
            unit={Miles}
            placeholder={0.0}
          />
          <NumericInput
            value={time}
            setValue={(value) => setTime(value)}
            unit={Minutes}
            placeholder={0.0}
          />
          <NumericInput
            value={mpg}
            setValue={(value) => setMPG(value)}
            unit={MilesPerGallon}
            placeholder={0.0}
          />
        </Block>
      )}
      <input
        type="submit"
        className="button-active emphasized"
        value="Submit"
        onClick={addLocation}
      />
    </>
  );
}

export default Locations;
