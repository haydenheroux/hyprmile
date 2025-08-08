import type { ReactNode } from "react";

function Block({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-1.5">{children}</div>;
}

export default Block;
