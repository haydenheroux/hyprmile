import Block from "../../components/form/Block";
import { useAppContext } from "../../contexts/AppContext";
import type { Entry } from "../../types/Entry";
import EntryComponent from "../../components/EntryComponent";
import NoEntries from "../../components/NoEntries";

function AllMileageEntries(entries: Entry[]) {
  return (
    <>
      {entries.map((entry, index) => (
        <Block key={index}>
          <EntryComponent entry={entry} />
        </Block>
      ))}
    </>
  );
}

function MileageLog() {
  const app = useAppContext();

  const hasEntries = app.entries.length > 0;

  return hasEntries
    ? AllMileageEntries(app.entries.slice().reverse())
    : NoEntries();
}

export default MileageLog;
