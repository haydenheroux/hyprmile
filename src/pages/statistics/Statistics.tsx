import Block from "../../components/form/Block";
import { useAppContext } from "../../contexts/AppContext";
import RecordComponent from "../../components/RecordComponent";

function Statistics() {
  const app = useAppContext();

  return (
    <>
      {app.records.map((record, index) => (
        <div key={index}>
          <Block>
            <RecordComponent record={record} />
          </Block>
        </div>
      ))}
    </>
  );
}

export default Statistics;
