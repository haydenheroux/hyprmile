import type { IconType } from "react-icons";
import { NavIcon } from "./NavIcon";
import { PiCalculator, PiChartLineUp, PiGasPump } from "react-icons/pi";
import { Page } from "../types/View";
import { useAppContext } from "../contexts/AppContext";

export function Nav() {
  const app = useAppContext();

  function createNavIcon(page: Page, text: string, Icon: IconType) {
    return (
      <NavIcon
        Icon={Icon}
        text={text}
        key={text}
        onClick={() => app.setPage(page)}
        active={app.page === page}
      />
    );
  }

  const icons = {
    [Page.Input]: createNavIcon(Page.Input, "Input", PiGasPump),
    [Page.Statistics]: createNavIcon(
      Page.Statistics,
      "Statistics",
      PiChartLineUp,
    ),
    [Page.Calculate]: createNavIcon(Page.Calculate, "Calculate", PiCalculator),
  };

  return (
    <nav className="w-screen my-6 px-2 flex-horizontal justify-center">
      {Object.keys(icons).map((page) => icons[page as Page])}
    </nav>
  );
}
