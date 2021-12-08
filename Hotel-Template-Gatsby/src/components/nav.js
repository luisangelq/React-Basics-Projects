import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  padding-bottom: 3rem;
  @media (min-width: 768px) {
    padding-bottom: 0;
  }
`

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1rem;
  padding: 1rem;
  margin-right: 2rem;
  margin-bottom: 0.5rem;
  transition: 0.3s ease-in-out;

  &:hover {
    border-bottom: 2px solid #de9c00;
  }

  &:last-of-type {
    margin-right: 0;
  }

  &.current-page {
    border-bottom: 2px solid #de9c00;
  }
`

const Navigation = () => {
  return (
    <Nav>
      <NavLink to={"/"} activeClassName="current-page">
        Home
      </NavLink>
      <NavLink to={"/us"} activeClassName="current-page">
        About Us
      </NavLink>
    </Nav>
  )
}

export default Navigation
