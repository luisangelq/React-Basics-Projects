import styled from "styled-components";
import Layout from "../components/layout/Layout";

const Home = () => {
  return (
    <div>
      <Layout>
        <StyledHome>Home</StyledHome>
      </Layout>
    </div>
  );
};

const StyledHome = styled.h1`
  color: red;
`;

export default Home;
