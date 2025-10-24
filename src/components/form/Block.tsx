import type { ReactNode } from "react";

function Block({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ? " " : ""}${className}`}>
      {children}
    </div>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <Block className="p-4">{children}</Block>;
}

export default Block;
