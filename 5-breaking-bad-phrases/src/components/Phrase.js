import styled from "styled-components";

const Phrase = ({ phrase }) => {
  const { quote, author } = phrase;

  return (
    <Container>
      <Quote>{quote}</Quote>
      <Author>-{author}</Author>
    </Container>
  );
};

const Container = styled.div`
  padding: 3rem;
  border-radius: 0.5rem;
  background-color: #fff;
  height: 15rem;
  max-width: 800px;
`;

const Quote = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  position: relative;
  padding-left: 4rem;
  font-family: Arial, Helvetica, sans-serif;

  &::before {
    content: open-quote;
    font-size: 8rem;
    color: black;
    position: absolute;
    left: -1rem;
    top: -2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Author = styled.p`
  margin-top: 2rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: right;
  font-weight: bold;
  color: #666;
`;

export default Phrase;
