import { PiCalculator, PiChartLineUp, PiGasPump } from "react-icons/pi";
import "./index.css";
import { useState } from "react";
import type { IconType } from "react-icons";

const View = {
  Calculate: "Calculate",
  Input: "GasInput",
  Statistics: "Statistics",
} as const;

type View = (typeof View)[keyof typeof View];

function App() {
  return (
    <div>
      <Nav />
    </div>
  );
}

function Nav() {
  const [activeView, setActiveView] = useState<View>(View.Input);

  function createNavIcon(view: View, text: string, Icon: IconType) {
    return (
      <NavIcon
        Icon={Icon}
        text={text}
        onClick={() => setActiveView(view)}
        active={activeView === view}
      />
    );
  }

  const icons = {
    [View.Input]: createNavIcon(
      View.Input,
      "Input",
      PiGasPump,
    ),
    [View.Statistics]: createNavIcon(
      View.Statistics,
      "Statistics",
      PiChartLineUp,
    ),
    [View.Calculate]: createNavIcon(
      View.Calculate,
      "Calculate",
      PiCalculator,
    ),
  };

  return (
    <>
      <div className="w-screen my-6 px-2 flex flex-row lg:gap-8 gap-2 justify-center">
        {Object.keys(icons).map((view) => icons[view as View])}
      </div>
      <div className="w-screen">
        <hr />
      </div>
    </>
  );
}

function NavIcon({
  Icon,
  text,
  onClick,
  active,
}: {
  Icon: IconType;
  text: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      className={`${active ? "bg-linear-to-t from-neutral-100 to-neutral-50 border-neutral-100 shadow-neutral-600 min-w-56" : "bg-linear-to-t from-neutral-950 to-neutral-900 border-neutral-950 shadow-neutral-900 min-w-14 lg:min-w-36"} h-14 p-0 m-0 leading-0 border-2 rounded-lg flex justify-center items-center gap-2 transition-[min-width] ease-in-out duration-150 shadow-xs`}
    >
      <span className={`${active ? "text-neutral-950" : "text-neutral-100"} transition-[scale] ease-in-out duration-150`}>
        <Icon size={32} />
      </span>
      <span className={`${active ? "text-neutral-950 scale-x-100 relative" : "text-neutral-50 scale-x-0 absolute"} origin-left overflow-hidden transition-transform ease-in-out duration-75 text-lg uppercase`}>
        {text}
      </span>
    </div>
  );
}

export default App;
