import { useRef, useState } from "react";
import Block from "../../components/form/Block";
import Heading from "../../components/form/Heading";
import NumericInput from "../../components/form/NumericInput";
import { Miles, MilesPerGallon, Minutes, parseNumber } from "../../utils/numeric";
import { useAppContext } from "../../contexts/AppContext";
import { createIfAbsent, updateRoute, type Route } from "../../types/Location";
import Select from "../../components/form/Select";

function Locations() {
  const [locationName, setLocationName] = useState<string>("");
  const [destinationName, setDestinationName] = useState<string>("");
  const [routeDistance, setRouteDistance] = useState<string>("");
  const [routeTime, setRouteTime] = useState<string>("");
  const [routeMPG, setRouteMPG] = useState<string>("");

  const app = useAppContext();
  const locations = useRef(app.locations);
  const setLocations = useRef(app.setLocations);

  const getRouteValues = () => {
    const parsedValues = {
      distance: parseNumber(routeDistance),
      time: parseNumber(routeTime),
      mpg: parseNumber(routeMPG),
    };
    return {
      ...parsedValues,
      hasDistanceTime: parsedValues.distance && parsedValues.time,
      hasMpg: parsedValues.mpg,
    }
  };

  const addLocation = () => {
    let newLocations = createIfAbsent(locations.current, locationName);
    const routeValues = getRouteValues();
    if (destinationName && routeValues.hasDistanceTime) {
      const route: Route = {
        miles: parseNumber(routeDistance),
        time: parseNumber(routeTime),
      };
      if (parseNumber(routeMPG)) {
        route.mpg = parseNumber(routeMPG);
      }
      newLocations = updateRoute(newLocations, locationName, destinationName, route);
    }
    setLocations.current(newLocations);
  };

  const destinations = Object.keys(locations.current).filter(
    (destination) => locationName !== destination,
  );

  return (
    <>
      <Block>
        <Heading value={"Name"} />
        <input
          type="text"
          className="numeric"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        />
      </Block>
      {locationName && destinations.length > 0 && (
        <Block>
          <Heading value={"Distance"} />
          <Select selection={destinationName} options={destinations} onChange={(v) => setDestinationName(v)} allowEmpty={false} />
          <NumericInput
            value={routeDistance}
            setValue={(value) => setRouteDistance(value)}
            unit={Miles}
            placeholder={0.0}
          />
          <NumericInput
            value={routeTime}
            setValue={(value) => setRouteTime(value)}
            unit={Minutes}
            placeholder={0.0}
          />
          <NumericInput
            value={routeMPG}
            setValue={(value) => setRouteMPG(value)}
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
