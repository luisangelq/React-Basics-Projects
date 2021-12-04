import { useEffect } from "react";
import "../styles/normalize.css";
import "../styles/globals.css";

import FirebaseContext from "../context/firebaseContext";
import useAuth from "../hooks/useAuth";

const MyApp = ({ Component, pageProps }) => {
  const user = useAuth();

  useEffect(() => {
    if(user) {
    }
  }), [user];
  return (
    <FirebaseContext.Provider value={{ user }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
