import EntryComponent from "../../components/EntryComponent";
import Block from "../../components/form/Block";
import Heading from "../../components/form/Heading";
import NoEntries from "../../components/NoEntries";
import { useAppContext } from "../../contexts/AppContext";
import { createSummaryEntry, type Entry } from "../../types/Entry";

function SummaryStatistics(entries: Entry[]) {
  return (
    <Block>
      <Heading value="Summary Statistics" />
      <EntryComponent entry={createSummaryEntry(entries)} />
    </Block>
  );
}

function Statistics() {
  const app = useAppContext();

  const hasEntries = app.entries.length > 0;

  return hasEntries ? SummaryStatistics(app.entries) : NoEntries();
}

export default Statistics;
