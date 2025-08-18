import "./index.css";
import { Nav } from "./components/Nav";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import { View } from "./types/View";
import Input from "./pages/input/Input";

function App() {
  return (
    <AppProvider>
      <Nav />
      <hr />
      <Viewer />
    </AppProvider>
  );
}

function Viewer() {
  const app = useAppContext();

  switch (app.view) {
    case View.Calculate:
      // TODO Implement calculate component
      return <span className="text-neutral-50">Calculate</span>
    case View.Input:
      // TODO Implement input component
      return <Input />
    case View.Statistics:
      // TODO Implement statistics component
      return <span className="text-neutral-50">Statistics</span>
  }
}

export default App;
