import { useState } from "react";

const useCoin = (label, initialState, options) => {

  const [coin, saveCoin] = useState(initialState);

  const Select = () => (
    <div className="contentUseCoin">
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
    </div>
  );

  return [coin, Select, saveCoin];
};

export default useCoin;
