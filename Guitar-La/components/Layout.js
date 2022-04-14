import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, page }) => {
  return (
    <>
      <Head>
        <title>GuitarLA {page ? "- " + page : ""}</title>
        <meta name="description" content="Guitar Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
