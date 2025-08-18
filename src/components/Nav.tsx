import type { IconType } from "react-icons";
import { NavIcon } from "./NavIcon";
import { Page } from "../types/Page";
import { useAppContext } from "../contexts/AppContext";
import Inline from "./form/Inline";
import {
  TbCalculator,
  TbChartLine,
  TbNotes,
  TbPencil,
  TbSettings,
} from "react-icons/tb";

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
    [Page.Input]: createNavIcon(Page.Input, "Input", TbPencil),
    [Page.Log]: createNavIcon(Page.Log, "Log", TbNotes),
    [Page.Statistics]: createNavIcon(
      Page.Statistics,
      "Statistics",
      TbChartLine,
    ),
    [Page.Calculate]: createNavIcon(Page.Calculate, "Calculate", TbCalculator),
    [Page.Settings]: createNavIcon(Page.Settings, "Settings", TbSettings),
  };

  return (
    <nav className="flex justify-start sm:justify-center overflow-x-scroll">
      <Inline>{Object.keys(icons).map((page) => icons[page as Page])}</Inline>
    </nav>
  );
}
