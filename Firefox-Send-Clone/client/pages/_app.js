import "../styles/normalize.css";
import "../styles/globals.css";

import AuthState from "../context/auth/authState";

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <Component {...pageProps} />
    </AuthState>
  );
}

export default MyApp;
