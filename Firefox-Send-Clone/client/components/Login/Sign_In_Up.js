import { useState, useContext } from "react";
import styled from "styled-components";
import { EmailForm, SignInForm, SignUpForm } from "./HandleForm";

import AuthContext from "../../context/auth/authContext";

const Sign_In_Up = () => {
  const { handleExist, emailExist, createUser, authUser, user, exist } =
    useContext(AuthContext);

  return (
    <Container>
      <Info>
        <div className="card">
          <img src="assets/FirefoxLogo.svg" alt="logo"/>

          <div className="description">
            <h1>Create a Firefox Account or sign in</h1>
            <ul>
              <li>Share files up to 10MB</li>
              <li>Share files with more people</li>
              <li>Keep links active for up to 7 days</li>
              <li>Manage shared files from any device</li>
              <li>Learn about other Mozilla services</li>
            </ul>
          </div>
        </div>
      </Info>

      {/* This Componens shows in order to:
      EmailForm if exist = null
      SignInForm if exist = false
      SignUpForm if exist = true
    */}
      {exist === null ? (
        <EmailForm handleExist={handleExist} emailExist={emailExist} />
      ) : exist ? (
        <SignInForm handleExist={handleExist} authUser={authUser} user={user} />
      ) : (
        <SignUpForm
          handleExist={handleExist}
          createUser={createUser}
          user={user}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 55% 45%;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin: 0 8rem 0 6rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    margin: 0;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    margin: 2rem 0;
  }
`;

const Info = styled.div`
  display: flex;

  .card {
    display: flex;
    align-items: flex-start;

    img {
      width: 4rem;
      margin: 0 1rem 1rem 0;
    }

    .description {
      ul {
        color: #4a4a4f;
        line-height: 1.5;
      }
    }

    @media (max-width: 1000px) {
      flex-direction: column;
      align-items: center;
    }
  }

  @media (max-width: 1000px) {
    order: 1;
    flex-direction: column;
  }
`;

export default Sign_In_Up;
