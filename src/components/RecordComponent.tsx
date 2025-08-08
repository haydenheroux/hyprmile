import { formatYYYYMMDD } from "../utils/date";
import { Gallons, Miles, MilesPerGallon } from "../utils/numeric";
import type { Record } from "../types/Record";
import Numeric from "./form/Numeric";
import Heading from "./form/Heading";

function RecordComponent({ record }: { record: Record }) {
  return (
    <>
      {record.date ? <Heading value={formatYYYYMMDD(record.date)} /> : null}
      <Numeric value={record.miles} placeholder={0} unit={Miles} />
      <Numeric value={record.gallons} placeholder={0} unit={Gallons} />
      <Numeric value={record.mpg} placeholder={0} unit={MilesPerGallon} />
    </>
  );
}

export default RecordComponent;
