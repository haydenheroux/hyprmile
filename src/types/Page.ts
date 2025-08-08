export const Page = {
  Calculate: "Calculate",
  Input: "Input",
  Statistics: "Statistics",
  Records: "Records",
  Settings: "Settings",
} as const;

export type Page = (typeof Page)[keyof typeof Page];
