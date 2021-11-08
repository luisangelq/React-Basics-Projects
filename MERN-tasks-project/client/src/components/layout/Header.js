import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Header = ({user, logout }) => {

  const handleLogout = () => {
    Swal.fire({
      title: "Exit",
      text: "Are You Sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA312D",
      cancelButtonColor: "#20525c",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Have a great day!",
          icon: "info",
          confirmButtonColor: "#20525c",
          timer: 2000,
        });
      }
    });
    
  }
  return (
    <HeaderContainer>
      <UserName>
        Hello {user ? <span>{user.userName}</span> : <span>Guest</span>}
      </UserName>

      <Nav>
        <button
          onClick={handleLogout}
        >
          Log Out
          <Icon icon={faSignOutAlt} />
        </button>
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
  color: var(--blue2);
  font-size: 2.2rem;
  margin: 0;
  span {
    font-weight: bold;
  }
`;

const Nav = styled.nav`
  button {
    color: var(--blue2);
    padding-bottom: 0.5rem;
    font-weight: bold;
    outline: none;
    background: none;
    border: none;
    border-radius: 0.5rem;
    border-bottom: 2px solid var(--blue2);
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      color: #fa312d;
      border-bottom: 2px solid #fa312d;
    }
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-left: 1rem;
`;

export default Header;
