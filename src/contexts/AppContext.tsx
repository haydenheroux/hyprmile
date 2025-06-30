import { createContext, useContext, useState, type ReactNode } from "react";
import { View } from "../types/View";
import { DifferenceBuffer } from "../types/DifferenceBuffer";

export interface AppContextType {
  view: View;
  setView: (view: View) => void;
  previousOdometerMileage: DifferenceBuffer;
  setPreviousOdometerMileage: (previousOdometerMiles: DifferenceBuffer) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>(View.Input);
  const [previousOdometerMiles, setPreviousOdometerMiles] =
    useState<DifferenceBuffer>(new DifferenceBuffer(200_637));
  const ctx: AppContextType = {
    view,
    setView,
    previousOdometerMileage: previousOdometerMiles,
    setPreviousOdometerMileage: setPreviousOdometerMiles,
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
