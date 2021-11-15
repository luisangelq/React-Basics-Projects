import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Nav className=" navbar navbar-expand-lg navbar-dark  justify-content-between">
      <div className="container">
        <h1>
          {" "}
          <LinkStyled to={"/"}>CRUD - React, Redux, REST API & Axios</LinkStyled>
        </h1>
      </div>
      <Link
        to={"/products/new"}
        className="btn btn-danger new-post d-block d-md-inline-block "
      >
        Add Product &#43;
      </Link>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #e6d439;

  .new-post {
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const LinkStyled = styled(Link)`
    color: #45687B;

    &:hover {
        text-decoration: none;
        color: #45687B;
    }
`

export default Header;
