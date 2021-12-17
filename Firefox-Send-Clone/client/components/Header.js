import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <div>
        <img
          src="https://raw.githubusercontent.com/luisangelq/React-Basics-Projects/14af5d08669afff5abe52226a9787a9502bdee50/Firefox-Send-Clone/client/assets/HeaderLogo.svg"
          alt="logo"
        />
      </div>

      <div>
        <Btn>Sign in/up</Btn>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  padding: 0 2rem;
 
`;

const Btn = styled.button`
    background: transparent;
    border: 1px solid #0060df;
    border-radius: 0.5rem;
    color: #0060df;
    padding: .8rem 1.1rem;
    transition: all .2s ease-in-out;

    &:hover {
        background: #0060df;
        color: #fff;
        
    }


`

export default Header;
