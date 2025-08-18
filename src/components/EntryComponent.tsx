import { formatYYYYMMDD } from "../utils/date";
import { Gallons, Miles, MilesPerGallon } from "../utils/numeric";
import Numeric from "./form/Numeric";
import Heading from "./form/Heading";
import Inline from "./form/Inline";
import type { Entry } from "../types/Entry";

function EntryComponent({ entry }: { entry: Entry }) {
  return (
    <>
      {entry.date && <Heading value={formatYYYYMMDD(entry.date)} />}
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
    </>
  );
}

export default EntryComponent;
