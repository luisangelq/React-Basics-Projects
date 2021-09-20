import Axios from "axios";
import { useEffect, useState } from "react";

import useCoin from "../hooks/useCoin"
import useCrypto from "../hooks/useCrypto"

const Form = ({saveCoin, saveCrypto}) => {

    const [ error, saveError ] = useState(false);

    const COINS = [
        { code: "USD", name: "E.U. Dolar"},
        { code: "MXN", name: "Mexican Peso"},
        { code: "EUR", name: "Euro"},
        { code: "GBP", name: "Pound Sterling"},
    ]
    //cryptocurrency listing status
    const [ cryptoList, saveCryptos ] = useState([]);

    const [coin, Select] = useCoin("Choose your Coin", "", COINS)
    const [crypto, SelectCrypto] = useCrypto("Choose your Cryptocurrency", "", cryptoList)

    //Api
    useEffect(() => {
        const consultApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

            const result = await Axios.get(url)
            saveCryptos(result.data.Data);
        }
        consultApi();
    }, [])


    //When user hit submit
    const quoteCoin = (e) => {
        e.preventDefault();
        
        if(coin === "" || crypto === "") {
            saveError(true);
            return;
        }

        //pass data to principal component
        saveError(false)

        saveCoin(coin);
        saveCrypto(crypto);
    }

  return (
    <form
        onSubmit={quoteCoin}
    >
        {error ? <p className="font error ">All fields are required</p> : null}
        <Select />
        <SelectCrypto />
      <input className="buttonSubmit" type="submit" value="Calculate" />
    </form>
  );
};

export default Form;
