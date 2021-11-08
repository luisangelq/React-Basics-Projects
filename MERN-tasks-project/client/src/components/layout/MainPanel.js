import { useContext, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FormTask from "../tasks/FormTask";
import TaskList from "../tasks/TasksList";

import AuthContext from "../../context/auth/AuthContext";


const MainPanel = () => {
  const { user, getLoggedUser, resetAlert, logout }  = useContext(AuthContext);

  useEffect(() => {
    getLoggedUser();
    resetAlert("login");
    // eslint-disable-next-line
  }, []);
  

  return (
    <Page>
      <Sidebar />

      <div>
        <Header 
          user={user}
          logout={logout}
        />
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
