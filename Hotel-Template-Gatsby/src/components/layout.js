import React, { Fragment } from "react"
import Helmet from "react-helmet"
import { Global, css } from "@emotion/react"

import Header from "./header"
import Footer from "./footer"
import useSeo from "../hooks/useSeo"

const Layout = props => {
  const seo = useSeo()

  const {
    siteName,
    fallbackSeo: { title, description },
  } = seo.datoCmsSite.globalSeo
  const {
    rel,
    href,
    type,
    sizes,
  } = seo.datoCmsSite.faviconMetaTags.tags[16].attributes

  return (
    <Fragment>
      <Global
        styles={css`
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.8rem;
            line-height: 1.5;
            font-family: "PT Sans", sans-serif;
          }
          h1,
          h2,
          h3 {
            margin: 0;
            line-height: 1.5;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
        `}
      />

      <Helmet>
        <title>{siteName}</title>
        <meta name="description" content={description} />
        <link rel={rel} href={href} sizes={sizes} type={type} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Header />
      {props.children}
      <Footer title={title} />
    </Fragment>
  )
}

export default Layout
