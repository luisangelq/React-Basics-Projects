import "../styles/normalize.css";
import "../styles/globals.css";

import useAuth from "../hooks/useAuth";

const MyApp = ({ Component, pageProps }) => {
  const user = useAuth();
  console.log(user);

  return <Component {...pageProps} />;
};

export default MyApp;
