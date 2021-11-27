import { useContext } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import Link from "next/link";
import Search from "./header-components/Search";
import Navigation from "./header-components/Navigation";


import FirebaseContext from "../context/firebaseContext";
import firebaseState from "../context/firebaseState";


const Header = () => {
  const { user } = useContext(FirebaseContext);

  const { logOutRequest } = firebaseState();

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.value) {
        logOutRequest();
      }
    });
  }

  return (
    <HeaderContainer>
      <LeftContainer>
        <Link href="/">
          <svg
            className="logo"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20"
                fill="#DA552F"
              ></path>
              <path
                d="M22.667 20H17v-6h5.667a3 3 0 010 6m0-10H13v20h4v-6h5.667a7 7 0 100-14"
                fill="#FFF"
              ></path>
            </g>
          </svg>
        </Link>

        <Search />
      </LeftContainer>

      <CenterContainer>
        <Navigation 
          user={user}
        />
      </CenterContainer>

      <RightContainer>
        {user ? (
          <>
            <p>Hello: {user.displayName.split(" ")[0]} </p>

            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <Link href="/login">
              <a className="login">Login</a>
            </Link>
            <Link href="/register">
              <a>Sign Up</a>
            </Link>
          </>
        )}
      </RightContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  box-shadow: 0 0 1px 1px rgb(33 41 63 / 10%);
  padding: 2rem;

  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;

  .logo {
    cursor: pointer;
  }

  @media (max-width: 980px) {
    order: 0;
    margin: 2rem 0;
  }

  @media (max-width: 480px) {
    .logo {
      position: fixed;
      top: 0;
      left: 0;
      margin: 1rem;
    }
  }
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 980px) {
    margin: 2rem 0;
  }
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  p {
    color: var(--font-primary-color);
  }

  button {
    background: var(--btn-primary);
    color: var(--white);
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 2rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #ff4582;
    }
  }

  a {
    background-color: var(--btn-primary);
    color: var(--white);
    font-weight: bold;
    padding: 1rem;
    outline: none;
    border-radius: 0.5rem;
    border: none;
    transition: all 0.3s ease-in-out;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: #ff4582;
    }
  }
  .login {
    background: none;
    color: var(--font-primary-color);

    &:hover {
      background: none;
      color: var(--btn-primary);
    }
  }

  @media (max-width: 980px) {
    order: -1;
  }
`;

export default Header;
