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

  console.log(route);

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

export function accountedForGallons(locations: Record<string, Location>, visited: string[]): number {
  console.log(locations);
  let gallons = 0;
  for (let i = 1; i < visited.length; ++i) {
    const first = visited[i-1];
    const second = visited[i];
    const route = locations[first].to[second];
    if (route.mpg !== undefined) {
      gallons += route.miles / route.mpg;
      console.log(`${first} to ${second} could calculate gallons ${route.miles} / ${route.mpg}`);
    }
  }
  return gallons;
}
