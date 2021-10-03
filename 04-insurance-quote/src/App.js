import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";

import styled from "styled-components";

function App() {

  const [result, setResult] = useState({});

  return (
    <Content>
      <Header title="Insurance Quote" />
      
      <Form result={result} setResult={setResult}/>
    </Content>
  );
}

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export default App;
