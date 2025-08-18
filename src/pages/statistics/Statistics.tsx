import Block from "../../components/form/Block";
import Heading from "../../components/form/Heading";
import Numeric from "../../components/form/Numeric";
import NoEntries from "../../components/NoEntries";
import { useAppContext } from "../../contexts/AppContext";
import { createSummaryEntry, type Entry } from "../../types/Entry";
import { Gallons, Miles, MilesPerGallon } from "../../utils/numeric";

function SummaryStatistics(entries: Entry[]) {
  const summary = createSummaryEntry(entries);

  return (
    <div className="h-32 flex flex-col sm:flex-row gap-4 items-stretch">
      <div className="button flex-1">
        <Block>
          <Heading value="Average MPG" />
          <Numeric value={summary.mpg} placeholder={0} unit={MilesPerGallon} />
        </Block>
      </div>
      <div className="button flex-1">
        <Block>
          <Heading value="Total Miles" />
          <Numeric value={summary.miles} placeholder={0} unit={Miles} />
        </Block>
      </div>
      <div className="button flex-1">
        <Block>
          <Heading value="Total Gallons" />
          <Numeric value={summary.gallons} placeholder={0} unit={Gallons} />
        </Block>
      </div>
    </div>
  );
}

function Statistics() {
  const app = useAppContext();

  const hasEntries = app.entries.length > 0;

  return hasEntries ? SummaryStatistics(app.entries) : NoEntries();
}

export default Statistics;
