import Header from "./components/Header";
import Form from "./components/Form";

import styled from "styled-components";

function App() {
  return (
    <Content>
      <Header title="Insurance Quote" />
      
      <Form />
    </Content>
  );
}

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export default App;
