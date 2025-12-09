export type Locations = Record<string, Location>;

export type Location = {
  name: string;
  to: LocationToLocationLookup;
};

export type LocationToLocation = {
  distance: number;
  time: number;
  mpg?: number;
};

interface LocationToLocationLookup {
  [name: string]: LocationToLocation;
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

export function updateTo(locations: Record<string, Location>, first: string, second: string, to: LocationToLocation): Record<string, Location> {
  if (!locations) {
    return locations;
  }

  locations = createIfAbsent(locations, first);
  locations = createIfAbsent(locations, second);

  locations[first].to[second] = to;
  locations[second].to[first] = to;

  return locations;
}
