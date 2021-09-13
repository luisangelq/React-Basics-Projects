import { Fragment } from "react";
import styled from "styled-components";

const Result = ({ result }) => {
  const { formData, price } = result;

  console.log(formData);
  return (
    <Fragment>
      {price ? (
        <ResultContainer>
          <h2>Resume</h2>
          <ResultRow>
            <p>Continent: <span>{formData.continent}</span></p>
            
          </ResultRow>

          <ResultRow>
            <p>Year: <span>{formData.year}</span></p>
            
          </ResultRow>

          <ResultRow>
            <p>Plan: <span>{formData.plan}</span></p>
            
          </ResultRow>
          <Total>
            <p>Total: <span>${price.toFixed(2)}</span></p>
            
          </Total>
        </ResultContainer>
      ) : <h2>Select Your Insurance</h2>}
    </Fragment>
  );
};

const ResultContainer = styled.div`
  
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const ResultRow = styled.div`
  display: flex;
  justify-content: center;
  p {
    font-weight: bold;
    span {
      font-weight: normal;
    }
  }
`;

const Total = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  justify-content: center;
  padding: 1rem;
  margin: 2rem auto;
  
  span {
    margin-left: 5px;
  }

`;

export default Result;
