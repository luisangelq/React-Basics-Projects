import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainPanel = () => {
  return (
    <Page>
      <Sidebar />

      
      <div>
      <Header />
        <main></main>
      </div>
    </Page>
  );
};

const Page = styled.div`
  display: grid;
  height: 100vh;
  flex-direction: row;
  grid-template-columns: .6fr 3fr;
  

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    
  }
`;

export default MainPanel;
