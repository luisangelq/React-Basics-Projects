import styled from "styled-components";
const Header = ({ title }) => {
  return (
    <ContentHeader>
      <HeaderText>{title}</HeaderText>
    </ContentHeader>
  );
};

const ContentHeader = styled.header`
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 2rem;
  padding: 10px;
  font-weight: bold;
  color: white;
  border-radius: 0.5rem;
`;

const HeaderText = styled.h1`
  font-size: 2em;
  text-align: center;
  margin: 0;
  font-family: "Gluten", cursive;
`;

export default Header;
