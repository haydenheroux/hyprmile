import type { IconType } from "react-icons";
import { NavIcon } from "./NavIcon";
import {
  PiCalculator,
  PiChartLineUp,
  PiArchive,
  PiGasPump,
  PiGear,
} from "react-icons/pi";
import { Page } from "../types/Page";
import { useAppContext } from "../contexts/AppContext";
import Inline from "./form/Inline";

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
    [Page.Records]: createNavIcon(Page.Records, "Records", PiArchive),
    [Page.Settings]: createNavIcon(Page.Settings, "Settings", PiGear),
  };

  return (
    <nav className="w-screen my-6 px-2 justify-center">
      <Inline>{Object.keys(icons).map((page) => icons[page as Page])}</Inline>
    </nav>
  );
}
