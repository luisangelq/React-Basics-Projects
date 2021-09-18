import { useState, useEffect } from "react";
import styled from "styled-components";

import Phrase from "./components/Phrase";

function App() {
  const [phrase, setPhrase] = useState({});

  console.log(phrase);

  const consultAPI = async () => {
    try {
      const response = await fetch(
        "https://breakingbadapi.com/api/quote/random"
      );
      const data = await response.json();

      setPhrase(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    consultAPI();
  } , []);

  
  return (
    <Container>
      {Object.keys(phrase).length === 0 ? null : <Phrase phrase={phrase} />}

      <Button onClick={consultAPI}>Get Phrase</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding-top: 3rem;
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
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

export default App;
