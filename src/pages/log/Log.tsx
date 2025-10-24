import { Card } from "../../components/form/Block";
import { useAppContext } from "../../contexts/AppContext";
import type { Entry } from "../../types/Entry";
import NoEntries from "../../components/NoEntries";
import Heading from "../../components/form/Heading";
import Inline from "../../components/form/Inline";
import Numeric from "../../components/form/Numeric";
import { formatYYYYMMDD } from "../../utils/date";
import { Gallons, Miles, MilesPerGallon } from "../../utils/numeric";

function EntryComponent({ entry }: { entry: Entry }) {
  return (
    <div className="button">
      <Card>
        {entry.date && <Heading value={formatYYYYMMDD(entry.date)} />}
        <div className="mb-0.25" />
        <Inline>
          <Numeric value={entry.miles} placeholder={0} unit={Miles} />
          {entry.odometer && (
            <>
              <span className="normal">@ odo.</span>
              <Numeric value={entry.odometer} placeholder={0} unit={Miles} />
            </>
          )}
        </Inline>
        <Numeric value={entry.gallons} placeholder={0} unit={Gallons} />
        <Numeric value={entry.mpg} placeholder={0} unit={MilesPerGallon} />
      </Card>
    </div>
  );
}

function AllMileageEntries(entries: Entry[]) {
  return (
    <>
      {entries.map((entry, index) => (
        <EntryComponent key={index} entry={entry} />
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
