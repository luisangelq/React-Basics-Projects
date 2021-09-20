import { useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Form from "./components/Form";

const App = () => {
  const [search, setSearch] = useState({
    city: "",
    country: "",
  });
  const [data, setData] = useState({});

  return (
    <Content>
      <Header title="Weather API Project" />

      <Form
        search={search}
        setSearch={setSearch}
        data={data}
        setData={setData}
      />
    </Content>
  );
};

const Content = styled.div`
  max-width: 60%;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export default App;
