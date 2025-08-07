import { createContext, useContext, useState, type ReactNode } from "react";
import { Page } from "../types/View";
import { DifferenceBuffer } from "../types/DifferenceBuffer";
import type { Record } from "../types/Record";

export interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  previousOdometerMiles: DifferenceBuffer;
  setPreviousOdometerMiles: (previousOdometerMiles: DifferenceBuffer) => void;
  records: Record[];
  setRecords: (records: Record[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>(Page.Input);
  const [previousOdometerMiles, setPreviousOdometerMiles] =
    useState<DifferenceBuffer>(new DifferenceBuffer(200_637));
  const [records, setRecords] = useState<Record[]>([]);

  const ctx: AppContextType = {
    page,
    setPage,
    previousOdometerMiles,
    setPreviousOdometerMiles,
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
