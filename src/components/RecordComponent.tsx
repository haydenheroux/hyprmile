import { formatYYYYMMDD } from "../utils/date";
import { Gallons, Miles, MilesPerGallon } from "../utils/numeric";
import type { Record } from "../types/Record";
import Numeric from "./form/Numeric";
import Heading from "./form/Heading";
import Inline from "./form/Inline";

function RecordComponent({ record }: { record: Record }) {
  return (
    <>
      {record.date ? <Heading value={formatYYYYMMDD(record.date)} /> : null}
      <Inline>
        <Numeric value={record.miles} placeholder={0} unit={Miles} />
        {record.odometerMiles ? (
          <>
            <span>@ odo.</span>
            <Numeric
              value={record.odometerMiles}
              placeholder={0}
              unit={Miles}
            />
          </>
        ) : null}
      </Inline>
      <Numeric value={record.gallons} placeholder={0} unit={Gallons} />
      <Numeric value={record.mpg} placeholder={0} unit={MilesPerGallon} />
    </>
  );
}

export default RecordComponent;
