import "../styles/normalize.css";
import "../styles/globals.css";

import AuthState from "../context/auth/authState";
import FilesState from "../context/files/filesState";

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <FilesState>
        <Component {...pageProps} />
      </FilesState>
    </AuthState>
  );
}

export default MyApp;
