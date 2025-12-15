export type Locations = Record<string, Location>;

export type Location = {
  name: string;
  to: RouteLookup;
};

export type Route = {
  distance: number;
  time: number;
  mpg?: number;
};

interface RouteLookup {
  [name: string]: Route;
}

export function createIfAbsent(locations: Record<string, Location>, name: string): Record<string, Location> {
  if (!locations) {
    locations = {};
  }

  if (!locations[name]) {
    locations[name] = { name, to: {} }
  }

  return { ...locations };
}

export function updateRoute(locations: Record<string, Location>, first: string, second: string, route: Route): Record<string, Location> {
  if (!locations) {
    return locations;
  }

  locations = createIfAbsent(locations, first);
  locations = createIfAbsent(locations, second);

  locations[first].to[second] = route;
  locations[second].to[first] = route;

  return locations;
}
