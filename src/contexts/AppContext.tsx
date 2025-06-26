import { createContext, useContext, useState, type ReactNode } from "react";
import { View } from "../types/View";

export interface AppContextType {
  view: View;
  setView: (view: View) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>(View.Calculate);
  const ctx: AppContextType = { view, setView };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const app = useContext(AppContext);

  if (app === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return app;
}
