import { useEffect, useRef, useState } from "react";
import Block from "../../components/form/Block";
import Heading from "../../components/form/Heading";
import { useAppContext } from "../../contexts/AppContext";
import { createIfAbsent, getRoute, updateRoute, type Route } from "../../types/Location";
import Select from "../../components/form/Select";
import RouteData from "./RouteData";

function Locations() {
  const [locationName, setLocationName] = useState<string>("");
  const [destinationName, setDestinationName] = useState<string>("");

  const app = useAppContext();
  const locations = useRef(app.locations);
  const setLocations = useRef(app.setLocations);
  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    const savedRoute = getRoute(app.locations, locationName, destinationName);
    if (savedRoute) {
      setRoute(savedRoute);
    } else {
      setRoute(null);
    }
  }, [app, locationName, destinationName]);

  const addLocation = () => {
    if (route === null) {
      // TODO(hayden): Throw error
      return;
    }
    let newLocations = createIfAbsent(locations.current, locationName);
    if (destinationName && route.miles && route.time) {
      newLocations = updateRoute(
        newLocations,
        locationName,
        destinationName,
        route,
      );
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
        <>
          <Block>
            <Heading value={"To"} />
            <Select
              selection={destinationName}
              options={destinations}
              onChange={(v) => setDestinationName(v)}
              allowEmpty={false}
            />
          </Block>
          <RouteData route={route} setRoute={setRoute} />
        </>
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
