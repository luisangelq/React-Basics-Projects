import Axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import useCoin from "../hooks/useCoin";
import useCrypto from "../hooks/useCrypto";

const Form = ({ saveCoin, saveCrypto }) => {
  const COINS = [
    { code: "USD", name: "E.U. Dolar" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "Pound Sterling" },
  ];
  //cryptocurrency listing status
  const [cryptoList, saveCryptos] = useState([]);

  const [coin, Select] = useCoin("Choose your Coin", "", COINS);
  const [crypto, SelectCrypto] = useCrypto(
    "Choose your Cryptocurrency",
    "",
    cryptoList
  );

  //Api
  useEffect(() => {
    const consultApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const result = await Axios.get(url);
      saveCryptos(result.data.Data);
    };
    consultApi();
  }, []);

  //When user hit submit
  const quoteCoin = (e) => {
    e.preventDefault();

    if (coin === "" || crypto === "") {
        Swal.fire({
            icon: 'error',
            title: 'All Fields Are Required',
            showConfirmButton: false,
            timer: 1500
          })
      return;
    }

    saveCoin(coin);
    saveCrypto(crypto);
  };

  return (
    <form onSubmit={quoteCoin}>
      <Select />
      <SelectCrypto />
      <Button type="submit" value="Calculate" />
    </form>
  );
};

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

export default Form;
