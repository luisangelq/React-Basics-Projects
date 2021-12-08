import React from "react"
import { css } from "@emotion/react"
import { Link } from "gatsby"
import Navigation from "./nav"

const Header = () => {
  return (
    <header
      css={css`
        background-color: #222;
        padding: 2rem;
      `}
    >
      <div
        css={css`
          max-width: 1200px;
          margin: 0 auto;

          @media (min-width: 768px) {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        `}
      >
        <Link
          to={"/"}
          css={css`
            color: #fff;
            text-align: center;
            text-decoration: none;
            font-size: 4rem;
            font-weight: bold;
            transition: 0.3s ease-in-out;

            &:hover {
              color: #de9c00;
            }
          `}
        >
          Umbral Hotel
        </Link>

        <Navigation />
      </div>
    </header>
  )
}

export default Header
