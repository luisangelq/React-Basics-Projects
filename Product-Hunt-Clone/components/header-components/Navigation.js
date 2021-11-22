import Link from "next/link";
import styled from "styled-components";

const Navigation = () => {
  return (
    <Nav>
      <Link href="/">
        <a>Products</a>
      </Link>
      <Link href="/trending">
        <a>Trending</a>
      </Link>
      <Link href="/newPost">
        <a>New Product</a>
      </Link>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 25rem;

  a {
    color: var(--font-primary-color);
  }
`;
export default Navigation;
