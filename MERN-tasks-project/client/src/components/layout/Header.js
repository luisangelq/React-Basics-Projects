import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <UserName>
        Hello <span>Luis</span>
      </UserName>

      <Nav>
        <a href="#!">Log Out</a>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: var(--green2);
  padding: 4rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    width: 100%;
  }
`;

const UserName = styled.p`
  color: var(--black);
  font-size: 2.2rem;
  margin: 0;
  span {
    font-weight: bold;
  }
`;

const Nav = styled.nav`
  a {
    color: var(--black);
    font-weight: bold;

    &:first-of-type {
      margin-right: 2rem;
    }
  }
`;

export default Header;
