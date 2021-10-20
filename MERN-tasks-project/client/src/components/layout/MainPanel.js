import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FormTask from "../tasks/FormTask";
import TaskList from "../tasks/TasksList";

const MainPanel = () => {
  return (
    <Page>
      <Sidebar />

      <div>
        <Header />
        <main>
          <FormTask />

          <TaskList />
        </main>
      </div>
    </Page>
  );
};

const Page = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 3fr;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default MainPanel;
