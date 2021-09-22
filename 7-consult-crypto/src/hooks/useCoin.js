import { useState } from "react";
import styled from "styled-components";

const useCoin = (label, initialState, options) => {

  const [coin, saveCoin] = useState(initialState);

  const Select = () => (
    <Content >
      <label > {label} </label>

      <select
        onChange={ e => saveCoin(e.target.value)}
        value={coin}
      >
        <option value=""> -- Select -- </option>
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </Content>
  );

  return [coin, Select, saveCoin];
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

export default useCoin;
