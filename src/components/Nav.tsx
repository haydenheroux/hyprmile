import type { IconType } from "react-icons";
import { NavIcon } from "./NavIcon";
import { PiCalculator, PiChartLineUp, PiGasPump } from "react-icons/pi";
import { View } from "../types/View";
import { useAppContext } from "../contexts/AppContext";

export function Nav() {
  const app = useAppContext();

  function createNavIcon(view: View, text: string, Icon: IconType) {
    return (
      <NavIcon
        Icon={Icon}
        text={text}
        key={text}
        onClick={() => app.setView(view)}
        active={app.view === view}
      />
    );
  }

  const icons = {
    [View.Input]: createNavIcon(View.Input, "Input", PiGasPump),
    [View.Statistics]: createNavIcon(
      View.Statistics,
      "Statistics",
      PiChartLineUp,
    ),
    [View.Calculate]: createNavIcon(View.Calculate, "Calculate", PiCalculator),
  };

  return (
    <nav className="w-screen my-6 px-2 flex flex-row lg:gap-8 gap-2 justify-center">
      {Object.keys(icons).map((view) => icons[view as View])}
    </nav>
  );
}
