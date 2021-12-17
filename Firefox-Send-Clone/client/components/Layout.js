import Head from "next/head";
import styled from "styled-components";

import HeaderLogo from "../assets/HeaderLogo.svg";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      </Head>

      <Header>
        <div>
            <img src={HeaderLogo} alt="logo" />
        </div>

        <div>

        </div>
      </Header>

      <div className="min-h-screen">
        <div className="container mx-auto">{children}</div>
      </div>
    </>
  );
};

const Header = styled.header`

`

export default Layout;
