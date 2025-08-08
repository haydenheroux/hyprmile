import { useAppContext } from "../../contexts/AppContext";

function Settings() {
  const app = useAppContext();

  return (
    <>
      <button className="button-active" onClick={() => app.setRecords([])}>
        Clear Records
      </button>
    </>
  );
}

export default Settings;
