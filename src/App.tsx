import "./index.css";
import { Nav } from "./components/Nav";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import { Page } from "./types/Page";
import Input from "./pages/input/Input";
import Calculate from "./pages/calculate/Calculate";
import Statistics from "./pages/statistics/Statistics";
import PageContainer from "./pages/PageContainer";
import Heading from "./components/form/Heading";
import Block from "./components/form/Block";
import RecordComponent from "./components/RecordComponent";
import { Record } from "./types/Record";

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
      return <Calculate />;
    case Page.Input:
      return <Input />;
    case Page.Records:
      return <Statistics />;
    case Page.Statistics:
      return (
        <Block>
          <Heading value="Summary Statistics" />
          <RecordComponent
            record={Record.createOverallRecord(app.records)}
            showDate={false}
          />
        </Block>
      );
    case Page.Settings:
      return (
        <button
          className="button-active p-2"
          onClick={() => app.setRecords([])}
        >
          Clear Records
        </button>
      );
  }
}

export default App;
