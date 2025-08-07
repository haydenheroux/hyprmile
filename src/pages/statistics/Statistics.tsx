import Group from "../../components/form/Group";
import { formatYYYYMMDD } from "../../utils/date";
import { Gallons, Miles, MilesPerGallon } from "../../utils/numeric";
import { Record } from "../../types/Record";
import Heading from "../../components/form/Heading";
import Numeric from "../../components/form/Numeric";
import { useAppContext } from "../../contexts/AppContext";

function RecordComponent({
  record,
  showDate = true,
}: {
  record: Record;
  showDate?: boolean;
}) {
  return (
    <>
      {showDate ? <Heading value={formatYYYYMMDD(record.date)} /> : null}
      <Numeric value={record.miles} placeholder={0} unit={Miles} />
      <Numeric value={record.gallons} placeholder={0} unit={Gallons} />
      <Numeric value={record.mpg} placeholder={0} unit={MilesPerGallon} />
    </>
  );
}

function Statistics() {
  const app = useAppContext();

  return (
    <>
      <Group>
        <Heading value="Summary Statistics" />
        <RecordComponent
          record={Record.createOverallRecord(app.records)}
          showDate={false}
        />
      </Group>
      {app.records.map((record, index) => (
        <div key={index}>
          <hr />
          <Group>
            <RecordComponent record={record} />
          </Group>
        </div>
      ))}
    </>
  );
}

export default Statistics;
