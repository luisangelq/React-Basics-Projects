import styled from "styled-components";

const Weather = ({ data }) => {
  if (Object.keys(data).length === 0) return null;

  const { name, main } = data;

  return (
    <ResultContainer>
      <h2>{name}'s Climate Is:</h2>
      <MainTemp>{parseFloat(main.temp - 273.15).toFixed(2)} °C</MainTemp>
      <p>
        Max Temperature: <br />{" "}
        <span>{parseFloat(main.temp_max - 273.15).toFixed(2)} °C</span>
      </p>
      <p>
        Min Temperature: <br />{" "}
        <span>{parseFloat(main.temp_min - 273.15).toFixed(2)} °C</span>{" "}
      </p>
    </ResultContainer>
  );
};

const ResultContainer = styled.div`
  background-color: rgba(255, 255, 255, 1);
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;

  span {
    font-weight: bold;
  }
`;

const MainTemp = styled.p`
  font-size: 4rem;
`;

export default Weather;
