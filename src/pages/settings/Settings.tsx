import { useAppContext } from "../../contexts/AppContext";

function Settings() {
  const app = useAppContext();

  return (
    <button className="button-active p-2" onClick={() => app.setRecords([])}>
      Clear Records
    </button>
  );
}

export default Settings;
