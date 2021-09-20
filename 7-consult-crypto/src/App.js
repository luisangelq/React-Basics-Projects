import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "./cryptomonedas.png";
import Form from "./components/Form";
import Quote from "./components/Quote";
import Spinner from "./components/Spinner";
import Axios from "axios";

function App() {
  const [coin, saveCoin] = useState("");
  const [crypto, saveCrypto] = useState("");
  const [result, saveResult] = useState({});
  const [loading, saveLoading] = useState(false);

  useEffect(() => {
    const quoteCrypto = async () => {
      //we avoid the first execution
      if (coin === "") return;

      //consult api to get quote
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`;

      const result = await Axios.get(url);

      //Show Spinner
      saveLoading(true);

      setTimeout(() => {
        saveLoading(false);

        saveResult(result.data.DISPLAY[crypto][coin]);
      }, 2000);
    };
    quoteCrypto();
  }, [coin, crypto]);

  return (
    <div className="App">
      <div>
        <img src={Image} alt="imageCrypto" />
      </div>
      <div>
        <h1>Cotiza Criptomonedas</h1>

        <Form saveCoin={saveCoin} saveCrypto={saveCrypto} />

        {loading ? <Spinner /> : <Quote result={result} />}
      </div>
    </div>
  );
}

const StyledApp = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }

  img {
    max-width: 100%;
    margin-top: 5rem;
  }

  h1 {
    font-family: "Bebas Neue", cursive;
    color: #fff;
    text-align: left;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 50px;
    margin-top: 80px;

    &::after {
      content: "";
      width: 100px;
      height: 6px;
      background-color: #66a2fe;
      display: block;
    }
  }
`;

export default App;
