import "./index.css";
import { Nav } from "./components/Nav";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import { Page } from "./types/View";
import Input from "./pages/input/Input";
import Calculate from "./pages/calculate/Calculate";
import Statistics from "./pages/statistics/Statistics";
import PageContainer from "./pages/PageContainer";

function App() {
  return (
    <AppProvider>
      <Nav />
      <hr />
      <PageContainer>
        <WhichPage />
      </PageContainer>
    </AppProvider>
  );
}

function WhichPage() {
  const app = useAppContext();

  switch (app.page) {
    case Page.Calculate:
      return <Calculate />
    case Page.Input:
      return <Input />
    case Page.Statistics:
      return <Statistics />
  }
}

export default App;
