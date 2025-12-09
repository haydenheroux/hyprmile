import "./index.css";
import { Nav } from "./components/Nav";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import { Page } from "./types/Page";
import Input from "./pages/input/Input";
import Calculate from "./pages/calculate/Calculate";
import Settings from "./pages/settings/Settings";
import Log from "./pages/log/Log";
import Statistics from "./pages/statistics/Statistics";
import Locations from "./pages/locations/Locations";

function App() {
  return (
    <AppProvider>
      <div className="w-screen lg:w-3xl mx-auto flex flex-col gap-6 mt-6 px-6 sm:px-18">
        <Nav />
        <hr />
        <WhichPage />
      </div>
    </AppProvider>
  );
}

function WhichPage() {
  const app = useAppContext();

  switch (app.page) {
    case Page.Calculate:
      return <Calculate />;
    case Page.Input:
      return <Input />;
    case Page.Locations:
      return <Locations />
    case Page.Log:
      return <Log />;
    case Page.Settings:
      return <Settings />;
    case Page.Statistics:
      return <Statistics />;
  }
}

export default App;
