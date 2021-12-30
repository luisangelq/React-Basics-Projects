import Head from "next/head";
import styled from "styled-components";

import Header from "./Header";

const MainPanel = ({ children }) => {
  return (
    <>
      <Head>
        <title>Firefox Send</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />

      <Main>
        <Content>{children}</Content>
      </Main>
    </>
  );
};

const Main = styled.main`
  margin: 5rem 1rem 0 1rem;

  @media (max-width: 768px) {
    margin: 2rem 1rem;
  }

`
const Content = styled.div`
background-color: #fff;
  max-width: 64rem;
  height: 38rem;
  padding: 1.5rem;
  box-shadow: 0 0 32px 0 rgb(12 12 13 / 10%), 0 2px 16px 0 rgb(12 12 13 / 5%);
  border-radius: 0.5rem;
  margin: 0 auto;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
    padding: 1rem;
  }
`;

export default MainPanel;
