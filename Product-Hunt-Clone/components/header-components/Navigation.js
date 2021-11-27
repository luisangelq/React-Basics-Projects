import Link from "next/link";
import styled from "styled-components";

const Navigation = ({user}) => {

  console.log(user);
  return (
    <Nav>
      <Link href="/">
        <a>Products</a>
      </Link>
      <Link href="/trending">
        <a>Trending</a>
      </Link>
      {user ? (
        <Link href="/newProduct">
          <a>New Product</a>
        </Link>
      ) : null}
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 30rem;

  a {
    color: var(--font-primary-color);
  }
`;
export default Navigation;
