import Block from "../../components/form/Block";
import { useAppContext } from "../../contexts/AppContext";
import RecordComponent from "../../components/RecordComponent";

function Records() {
  const app = useAppContext();

  return (
    <>
      {app.records.slice().reverse().map((record, index) => (
        <Block key={index}>
          <RecordComponent record={record} />
        </Block>
      ))}
    </>
  );
}

export default Records;
