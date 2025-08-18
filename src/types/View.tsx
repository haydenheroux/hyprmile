export const View = {
  Calculate: "Calculate",
  Input: "Input",
  Statistics: "Statistics",
} as const;

export type View = (typeof View)[keyof typeof View];

