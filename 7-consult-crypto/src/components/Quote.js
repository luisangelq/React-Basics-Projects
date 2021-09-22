import styled from "styled-components";

const Quote = ({ result }) => {
  if (Object.keys(result).length === 0) return null;
  return (
    <Result>
      <p className="price">
        Price is: <span>{result.PRICE}</span>
      </p>
      <p>
        Highest price of the day: <span>{result.HIGHDAY}</span>
      </p>
      <p>
        Lowest price of the day: <span>{result.LOWDAY}</span>
      </p>
      <p>
        Variation last 24 hours: <span>{result.CHANGEPCT24HOUR}</span>
      </p>
      <p>
        Last update: <span>{result.LASTUPDATE}</span>
      </p>
    </Result>
  );
};

const Result = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 2rem;
  margin-top: 2rem;
  padding: 1rem;

  p {
    font-size: 18px;
  }
  .price {
    font-size: 30px;

    span {
      font-weight: bold;
    }
  }
`;

export default Quote;
