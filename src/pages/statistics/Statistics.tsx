import Block from "../../components/form/Block";
import Heading from "../../components/form/Heading";
import RecordComponent from "../../components/RecordComponent";
import { useAppContext } from "../../contexts/AppContext";
import { createSummaryRecord } from "../../types/Record";

function Statistics() {
  const app = useAppContext();

  return (
    <Block>
      <Heading value="Summary Statistics" />
      <RecordComponent record={createSummaryRecord(app.records)} />
    </Block>
  );
}

export default Statistics;
