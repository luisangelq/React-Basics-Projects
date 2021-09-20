import { useState } from "react";

const useCrypto = (label, initialState, options) => {

  const [crypto, saveCrypto] = useState(initialState);

  const SelectCrypto = () => (
    <div className="contentUseCoin">
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
    </div>
  );

  return [crypto, SelectCrypto, saveCrypto];
};

export default useCrypto;
