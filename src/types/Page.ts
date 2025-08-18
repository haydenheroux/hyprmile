export const Page = {
  Calculate: "Calculate",
  Input: "Input",
  Statistics: "Statistics",
  Log: "Log",
  Settings: "Settings",
} as const;

export type Page = (typeof Page)[keyof typeof Page];
