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
          <img src="assets/FirefoxLogo.svg" />

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
`;

const Info = styled.div`
  display: flex;

  .card {
    display: flex;
    align-items: flex-start;

    img {
      width: 4rem;
      margin: 0 1rem;
    }

    .description {
      ul {
        color: #4a4a4f;
        line-height: 1.5;
      }
    }
  }
`;

export default Sign_In_Up;
