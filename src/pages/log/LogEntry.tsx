import { useState } from "react";
import { Card } from "../../components/form/Block";
import Button from "../../components/form/Button";
import Heading from "../../components/form/Heading";
import Inline from "../../components/form/Inline";
import Numeric from "../../components/form/Numeric";
import type { Entry } from "../../types/Entry";
import { formatYYYYMMDD } from "../../utils/date";
import { Miles, Gallons, MilesPerGallon } from "../../utils/numeric";

function LogEntry({ entry }: { entry: Entry }) {
  const [selected, setSelected] = useState(false);

  return (
    <Button selected={selected} onClick={() => setSelected(!selected)} >
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
    </Button>
  );
}

export default LogEntry;
