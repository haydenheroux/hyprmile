import { useAppContext } from "../../contexts/AppContext";
import type { Entry } from "../../types/Entry";
import NoEntries from "../../components/NoEntries";
import LogEntry from "./LogEntry";

function AllMileageEntries({ entries }: { entries: Entry[] }) {
  return entries.map((entry, index) => <LogEntry key={index} entry={entry} />);
}

function MileageLog() {
  const app = useAppContext();

  const hasEntries = app.entries.length > 0;

  return hasEntries ? (
    <AllMileageEntries entries={app.entries.slice().reverse()} />
  ) : (
    <NoEntries />
  );
}

export default MileageLog;
