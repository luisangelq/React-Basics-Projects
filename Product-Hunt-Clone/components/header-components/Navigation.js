import Link from "next/link";
import styled from "styled-components";

import firebaseState from "../../context/firebaseState";

const Navigation = () => {
  const { user } = firebaseState();

  return (
    <Nav>
      <Link href="/">
        <a>Products</a>
      </Link>
      <Link href="/trending">
        <a>Trending</a>
      </Link>
      {user ? (
        <Link href="/newPost">
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
  width: 25rem;

  a {
    color: var(--font-primary-color);
  }
`;
export default Navigation;
