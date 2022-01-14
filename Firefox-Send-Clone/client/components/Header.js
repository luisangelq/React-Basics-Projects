import { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import AuthContext from "../context/auth/authContext";
import FilesContext from "../context/files/filesContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { logoutFilesFn } = useContext(FilesContext);

  const onLogout = () => {
    logout();
    logoutFilesFn();
  }
  return (
    <HeaderContainer>
      <Link href="/" passHref>
        <img src="/assets/HeaderLogo.svg" alt="logo" />
      </Link>

      {isAuthenticated ? (
        <AuthContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>

          <div className="popup">
            <p>{user ? user.name : "Guest"}</p>
            <button onClick={() => onLogout() }>Logout</button>
          </div>
        </AuthContainer>
      ) : (
        <Link href="/login" passHref>
          <Btn>Sign in/up</Btn>
        </Link>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;

  img {
    margin-left: 2rem;
    cursor: pointer;

    @media (max-width: 480px) {
      margin-left: .5rem;
      width: 10rem;
    }
  }
`;

const AuthContainer = styled.div`
  margin-right: 2rem;
  .popup {
    visibility: hidden;
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background: #fff;
    width: 15rem;
    position: absolute;
    right: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease-in-out;

    p {
      margin: 0;
    }

    button {
      background-color: transparent;
      width: 100%;
      border: 1px solid #fb4b70;
      border-radius: 0.5rem;
      color: #fb4b70;
      padding: 0.5rem;
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        background: #fb4b70;
        color: #fff;
      }
    }
  }

  &:hover .popup {
    visibility: visible;
    opacity: 1;
  }
  svg {
    height: 2.5rem;
    color: #c0ced6;
    cursor: pointer;
  }

  @media (max-width: 480px) {
    margin-right: .5rem;
  }
`;

const Btn = styled.a`
  background: transparent;
  border: 1px solid #0060df;
  border-radius: 0.5rem;
  color: #0060df;
  padding: 0.8rem 1.1rem;
  margin-right: 2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #0060df;
    color: #fff;
  }

  @media (max-width: 480px) {
    margin-right: 1rem;
        padding: .5rem;
        font-size: .8rem;
      }
`;

export default Header;
