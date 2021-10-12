import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FormTask from "../tasks/FormTask";

const MainPanel = () => {
  return (
    <Page>
      <Sidebar />

      <div>
        <Header />
        <main>
          <FormTask />
          <div></div>
        </main>
      </div>
    </Page>
  );
};

const Page = styled.div`
  display: grid;
  height: 100vh;
  flex-direction: row;
  grid-template-columns: 0.6fr 3fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default MainPanel;
