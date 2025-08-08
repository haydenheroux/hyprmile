import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Page } from "../types/Page";
import {
  hasOdometerMiles,
  recentOdometerMiles,
  type Record,
} from "../types/Record";
import { RecordsRepository } from "../utils/localStorage";

export interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  records: Record[];
  setRecords: (records: Record[]) => void;
  odometerOverride: number | null;
  setOdometerOverride: (odometerMilesOverride: number | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>(Page.Input);
  const [records, setRecords] = useState(RecordsRepository.getValue());
  const [odometerOverride, setOdometerOverride] = useState<number | null>(
    hasOdometerMiles(records) ? recentOdometerMiles(records) : null,
  );

  useEffect(() => RecordsRepository.setValue(records), [records]);

  const ctx: AppContextType = {
    page,
    setPage,
    records,
    setRecords,
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
