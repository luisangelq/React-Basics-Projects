import styled from "styled-components";
import Link from "next/link";

const Footer = () => {
  return (
    <FooterContainer>
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

      <p>All Rights Reserved ©</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: var(--black);
  padding: 5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  

  @media (max-width: 768px) {
    flex-direction: column;
  }

  p {
    color: var(--white);
    font-size: 2.4rem;
    font-weight: 700;
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

export default Footer;
