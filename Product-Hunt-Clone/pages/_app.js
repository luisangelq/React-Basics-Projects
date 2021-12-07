import { useEffect, useState } from "react";
import "../styles/normalize.css";
import "../styles/globals.css";

import FirebaseContext from "../context/firebaseContext";
import firebaseState from "../context/firebaseState";
import useAuth from "../hooks/useAuth";

const MyApp = ({ Component, pageProps }) => {
  const [products, setProducts] = useState([]);
  const user = useAuth();

  useEffect(() => {
    
  }),
    [];

  return (
    <FirebaseContext.Provider value={{ user, products, setProducts }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
