import styled from "styled-components";
import Link from "next/link";


const Header = () => {
  return (
    <HeaderContainer>
      <Link href="/">
        <img
          src="assets/HeaderLogo.svg"
          alt="logo"
        />
      </Link>

      <Link href="/login">
        <Btn>Sign in/up</Btn>
      </Link>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  padding: 0 2rem;

  img {
    cursor: pointer;
  }
 
`;

const Btn = styled.a`
    background: transparent;
    border: 1px solid #0060df;
    border-radius: 0.5rem;
    color: #0060df;
    padding: .8rem 1.1rem;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
        background: #0060df;
        color: #fff;
        
    }


`

export default Header;
