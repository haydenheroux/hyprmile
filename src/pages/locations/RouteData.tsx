import { useEffect, useState } from "react";
import Block from "../../components/form/Block";
import Heading from "../../components/form/Heading";
import NumericInput from "../../components/form/NumericInput";
import type { Route } from "../../types/Location";
import {
  Miles,
  Minutes,
  MilesPerGallon,
  parseNumber,
} from "../../utils/numeric";

export interface RouteDataProps {
  route: Route | null;
  setRoute: (route: Route) => void;
}

function RouteData({ route, setRoute }: RouteDataProps) {
  const [routeMiles, setRouteMiles] = useState<string>(route?.miles.toString() ?? "");
  const [routeTime, setRouteTime] = useState<string>(route?.time.toString() ?? "");
  const [routeMPG, setRouteMPG] = useState<string>(route?.mpg?.toString() ?? "");

  useEffect(() => {
    setRouteMiles(route?.miles.toString() ?? "");
    setRouteTime(route?.time.toString() ?? "");
    setRouteMPG(route?.mpg?.toString() ?? "");
  }, [route]);

  const updateRoute = (newRoute: Partial<Route>) => {
    setRoute({
      miles: parseNumber(routeMiles),
      time: parseNumber(routeTime),
      mpg: parseNumber(routeMPG),
      ...newRoute,
    });
  };

  const updateRouteMiles = (miles: string) => {
    updateRoute({ miles: parseNumber(miles) });
    setRouteMiles(miles);
  };

  const updateRouteTime = (time: string) => {
    updateRoute({ time: parseNumber(time) });
    setRouteTime(time);
  };

  const updateRouteMPG = (mpg: string) => {
    updateRoute({ mpg: parseNumber(mpg) });
    setRouteMPG(mpg);
  };

  return (
    <Block>
      <Heading value={"Route Data"} />
      <NumericInput
        value={routeMiles}
        setValue={(value) => updateRouteMiles(value)}
        unit={Miles}
        placeholder={0.0}
      />
      <NumericInput
        value={routeTime}
        setValue={(value) => updateRouteTime(value)}
        unit={Minutes}
        placeholder={0.0}
      />
      <NumericInput
        value={routeMPG}
        setValue={(value) => updateRouteMPG(value)}
        unit={MilesPerGallon}
        placeholder={0.0}
      />
    </Block>
  );
}

export default RouteData;
