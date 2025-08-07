import { createContext, useContext, useState, type ReactNode } from "react";
import { Page } from "../types/View";
import type { Record } from "../types/Record";
import { RecordsRepository } from "../utils/localStorage";

export interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  previousOdometerMiles: number;
  records: Record[];
  setRecords: (records: Record[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>(Page.Input);
  const [records, setRecords] = useState(RecordsRepository.getValue());

  const ctx: AppContextType = {
    page,
    setPage,
    previousOdometerMiles: 200_637,
    records,
    setRecords
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
