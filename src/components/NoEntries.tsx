import { useAppContext } from "../contexts/AppContext";
import { Page } from "../types/Page";
import Block from "./form/Block";
import Heading from "./form/Heading";

function NoEntries() {
  const app = useAppContext();

  return (
    <>
      <Block>
        <Heading value="No Entries Logged" />
        <span className="normal">
          Start keeping track of your driving by logging your first trip.
        </span>
      </Block>
      <button
        className="button emphasized"
        onClick={() => app.setPage(Page.Input)}
      >
        Log Mileage
      </button>
    </>
  );
}

export default NoEntries;
