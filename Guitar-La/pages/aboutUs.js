import styled from "styled-components";
import Layout from "../components/Layout";

const AboutUs = () => {
  return (
    <>
      <Layout>
        <Main>
          <h2>About Us</h2>

          <Content>
            <img  src="img/about.jpg" alt="about-image" />
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.{" "}
            </p>
          </Content>
        </Main>
      </Layout>
    </>
  );
};

const Main = styled.main`
  margin: 0 auto;
    max-width: 1200px;
    min-height: calc(100vh - 401px);

  h2 {
    text-align: center;
  }
`;

const Content = styled.div`
  display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    margin: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: .5rem;
  }
`;

export default AboutUs;
