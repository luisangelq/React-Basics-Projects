import "../styles/globals.css";

import { RestaurantProvider } from "../context/RestaurantProvider.jsx";

function MyApp({ Component, pageProps }) {
  return (
    <RestaurantProvider>
      <Component {...pageProps} />
    </RestaurantProvider>
  );
}

export default MyApp;
