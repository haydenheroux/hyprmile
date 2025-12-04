import type { ReactNode } from "react";

function Button({
  children,
  selected = false,
  onClick = () => {},
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className={selected ? "button-selected" : "button"} onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;
