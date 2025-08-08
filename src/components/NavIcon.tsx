import type { IconType } from "react-icons";

export interface NavIconProps {
  Icon: IconType;
  text: string;
  onClick: () => void;
  active: boolean;
}

export function NavIcon({
  Icon,
  text,
  onClick,
  active,
}: NavIconProps) {
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      className={`${active ? "button-active min-w-56" : "button min-w-14 lg:min-w-36"} h-14 border-2 rounded-lg flex justify-center items-center gap-2 transition-[min-width] ease-in-out duration-150`}
    >
      <span
        className={`transition-[scale] ease-in-out duration-150`}
      >
        <Icon size={32} />
      </span>
      <span
        className={`${active ? "scale-x-100 relative" : "scale-x-0 absolute"} origin-left overflow-hidden transition-transform ease-in-out duration-0 text-lg uppercase`}
      >
        {text}
      </span>
    </div>
  );
}
