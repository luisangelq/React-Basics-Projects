import styled from 'styled-components';
const Header = ({title}) => {

    return(
        <ContentHeader>
            <HeaderText>{title}</HeaderText>
        </ContentHeader>
    )
}

const ContentHeader = styled.header`
    background-color: #916001;
    padding: 10px;
    font-weight: bold;
    color: #FFFFFF;
`;

const HeaderText = styled.h1`
    font-size: 2em;
    text-align: center;
    margin: 0;
    font-family: "Slabo 27px", serif;
`;

export default Header;