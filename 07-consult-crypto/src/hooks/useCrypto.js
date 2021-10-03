import { useState } from "react";
import styled from "styled-components";

const useCrypto = (label, initialState, options) => {

  const [crypto, saveCrypto] = useState(initialState);

  const SelectCrypto = () => (
    <Content>
      <label > {label} </label>

      <select
        onChange={ e => saveCrypto(e.target.value)}
        value={crypto}
      >
        <option value=""> -- Select -- </option>
        {options.map((option) => (
          <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>
            {option.CoinInfo.FullName } {option.DISPLAY.USD.FROMSYMBOL}
          </option>
        ))}
      </select>
    </Content>
  );

  return [crypto, SelectCrypto, saveCrypto];
};

const Content = styled.div`
  label {
    font-family: "Bebas Neue", cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
  }

  select {
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
  }
`

export default useCrypto;
