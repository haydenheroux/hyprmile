export const Page = {
  Calculate: "Calculate",
  Input: "Input",
  Locations: "Locations",
  Log: "Log",
  Settings: "Settings",
  Statistics: "Statistics",
} as const;

export type Page = (typeof Page)[keyof typeof Page];
