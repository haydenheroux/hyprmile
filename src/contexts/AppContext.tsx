import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Page } from "../types/Page";
import { currentOdometer, type Entry } from "../types/Entry";
import { EntriesRepository, LocationsRepository } from "../utils/localStorage";
import type { Locations } from "../types/Location";

export interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
  locations: Locations;
  setLocations: (locations: Locations) => void;
  odometerOverride?: number;
  setOdometerOverride: (odometerMilesOverride?: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>(Page.Input);
  const [entries, setEntries] = useState(EntriesRepository.getValue());
  const [locations, setLocations] = useState(LocationsRepository.getValue());
  const [odometerOverride, setOdometerOverride] = useState<number | undefined>(
    currentOdometer(entries, undefined),
  );

  useEffect(() => EntriesRepository.setValue(entries), [entries]);
  useEffect(() => LocationsRepository.setValue(locations), [locations]);

  const ctx: AppContextType = {
    page,
    setPage,
    entries,
    setEntries,
    locations,
    setLocations,
    odometerOverride,
    setOdometerOverride,
  };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const app = useContext(AppContext);

  if (app === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return app;
}
