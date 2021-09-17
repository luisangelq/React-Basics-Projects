import styled from "styled-components";

function App() {


  const consultAPI = async () => {
    
  }

  return (
    <Container>
      <Button onClick={consultAPI}>Get Phrase</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.7);
  background-size: 300px;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  border-radius: 1rem;
  cursor: pointer;
`;

export default App;
