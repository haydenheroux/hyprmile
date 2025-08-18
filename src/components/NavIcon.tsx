import type { IconType } from "react-icons";

export interface NavIconProps {
  Icon: IconType;
  text: string;
  onClick: () => void;
  active: boolean;
}

export function NavIcon({ Icon, text, onClick, active }: NavIconProps) {
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      className={`${active ? "button-active w-48 lg:w-56 delay-200" : "button w-14 delay-0"} h-14 border-2 rounded-lg flex justify-center items-center gap-2 transition-[width] ease-in-out duration-200`}
    >
      <span>
        <Icon size={32} />
      </span>
      <span
        className={`${active ? "scale-x-100 relative" : "scale-x-0 absolute"} origin-left overflow-hidden text-lg uppercase emphasized`}
      >
        {text}
      </span>
    </div>
  );
}
