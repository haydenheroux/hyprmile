import type { ReactNode } from "react";

function Inline({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      {children}
    </div>
  );
}

export default Inline;
