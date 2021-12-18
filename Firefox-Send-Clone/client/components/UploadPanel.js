import styled from "styled-components";

const UploadPanel = () => {
  return (
    <Container>
      <DropzoneContainer>
        <h1>Dropzone</h1>
      </DropzoneContainer>

      <LinkList>
        <h1>Simple, private file sharing</h1>
        <p>
          Firefox Send lets you share files with end-to-end encryption and a
          link that automatically expires. So you can keep what you share
          private and make sure your stuff doesn’t stay online forever.
        </p>
        <img
          src="assets/IntroImage.svg"
          alt="intro"
        />
      </LinkList>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const DropzoneContainer = styled.div``;

const LinkList = styled.div`
  margin: 2rem 1rem 0 1rem;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  p {
    letter-spacing: 0.02rem;
    padding-right: 4rem;
  }

  img {
    max-width: unset;
    height: unset;
    margin-bottom: -3rem;
    margin-right: -7rem;
    
  }
`;

export default UploadPanel;
