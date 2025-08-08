import "./index.css";
import { Nav } from "./components/Nav";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import { Page } from "./types/Page";
import Input from "./pages/input/Input";
import Calculate from "./pages/calculate/Calculate";
import PageContainer from "./pages/PageContainer";
import Settings from "./pages/settings/Settings";
import Records from "./pages/records/Records";
import Statistics from "./pages/statistics/Statistics";

function App() {
  return (
    <AppProvider>
      <PageContainer>
        <Nav />
        <WhichPage />
      </PageContainer>
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
    case Page.Records:
      return <Records />;
    case Page.Statistics:
      return <Statistics />;
    case Page.Settings:
      return <Settings />;
  }
}

export default App;
