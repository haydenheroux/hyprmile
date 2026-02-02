export type Locations = Record<string, Location>;

export type Location = {
  name: string;
  to: RouteLookup;
};

export type Route = {
  miles: number;
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

export function accountedForMiles(locations: Record<string, Location>, visited: string[]): number {
  let miles = 0;
  for (let i = 1; i < visited.length; ++i) {
    const first = visited[i-1];
    const second = visited[i];
    const route = locations[first].to[second];
    if (route.mpg !== undefined) {
      miles += route.miles;
    }
  }
  return miles;
}

export function getRoute(locations: Record<string, Location>, start: string, end: string): Route | null {
  const startLocation = locations[start];
  if (!startLocation) {
    return null;
  }
  const route = locations[start].to[end];
  if (!route) {
    return null;
  }
  return route;
}

function routeMPG(route: Route, fallbackMPG: number): number {
  return route?.mpg ?? fallbackMPG;
}

function countGallons(locations: Record<string, Location>, start: string, end: string, fallbackMPG: number): number {
  // NOTE(hayden): Start is the same as end -> no movement -> no gallons consumed
  if (start == end) {
    return 0.0;
  }
  const route = locations[start].to[end];
  // NOTE(hayden): If the route does not exist, the gallons cannot be counted
  // TODO(hayden): Check for route existence using a more robust method
  // TODO(hayden): This needs to be fixed to display an error if the route does not exist
  // TODO(hayden): Pre-condition that a location's following selections must be valid?
  if (!route) {
    return 0.0;
  }
  const mpg = routeMPG(route, fallbackMPG);

  return route.miles / mpg;
}

export function countAllGallons(locations: Record<string, Location>, visited: string[], fallbackMPG: number): number {
  let gallons = 0;
  for (let i = 1; i < visited.length; ++i) {
    const start = visited[i-1];
    const end = visited[i];
    gallons += countGallons(locations, start, end, fallbackMPG);
  }
  return gallons;
}
