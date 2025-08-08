import Block from "../../components/form/Block";
import Heading from "../../components/form/Heading";
import RecordComponent from "../../components/RecordComponent";
import { useAppContext } from "../../contexts/AppContext";
import { Record } from "../../types/Record";

function Statistics() {
  const app = useAppContext();

  return (
    <Block>
      <Heading value="Summary Statistics" />
      <RecordComponent
        record={Record.createOverallRecord(app.records)}
        showDate={false}
      />
    </Block>
  );
}

export default Statistics;
