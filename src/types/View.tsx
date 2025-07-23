export const Page = {
  Calculate: "Calculate",
  Input: "Input",
  Statistics: "Statistics",
} as const;

export type Page = (typeof Page)[keyof typeof Page];

