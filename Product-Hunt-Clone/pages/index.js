import styled from "styled-components";
import MainLayout from "../components/MainLayout";

const Home = () => {
  return (
    <div>
      <MainLayout>
        <StyledHome>Home</StyledHome>
      </MainLayout>
    </div>
  );
};

const StyledHome = styled.h1`
  color: var(--btn-primary);
`;

export default Home;
