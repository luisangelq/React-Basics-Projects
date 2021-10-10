import Axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = (props) => {

  const [details, saveDetails] = useState({});
  const [idrecipe, saveIdRecipe] = useState(null);

  useEffect(() => {
    if (idrecipe) {
      const consultApi = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idrecipe}`;
        const result = await Axios(url);

        saveDetails(result.data.drinks[0]);
      };
      consultApi();
    }
  }, [ idrecipe]);
  return (
    <ModalContext.Provider
      value={{
        details,
        saveDetails,
        saveIdRecipe,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
