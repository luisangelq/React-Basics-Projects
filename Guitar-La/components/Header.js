import styled from "styled-components";
import Link from "next/link";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <Link href="/">
          <img src="img/logo.svg" alt="logo" />
        </Link>
      </Logo>

      <Nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/aboutUs">
          <a>About Us</a>
        </Link>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
        <Link href="/store">
          <a>Store</a>
        </Link>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 2rem;
  margin: 0 auto;
  padding: 5rem 1rem;
  background-image: linear-gradient(
      to right,
      rgb(0 0 0 / 0.8),
      rgb(0 0 0 / 0.7)
    ),
    url("img/header.jpg");
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;

    @media (max-width: 768px) {
      width: 80%;
    }
  }
`;
const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  a {
    color: var(--white);
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: var(--primary);
    }
  }
`;

export default Header;
