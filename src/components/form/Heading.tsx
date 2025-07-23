import type { ReactNode } from "react";

function Heading({ value, children }: { value: string; children?: ReactNode; }) {
  return (
    <div className="flex justify-between items-center h-8">
      <span className="text-neutral-100 text-xl">{value}</span>
      {children}
    </div>
  )
}

export default Heading;
