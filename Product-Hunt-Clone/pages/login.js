import MainLayout from "../components/MainLayout";
import styled from "styled-components";
import Router from "next/router";

import useFormValidation from "../hooks/useFormValidation";
import useFirebaseAccess from "../hooks/useFirebaseAccess";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const { values, handleChange, handleLoginSubmit } = useFormValidation(
    initialState,
    loginUser
  );
  const { loginRequest, loginErrorRequest } = useFirebaseAccess();

  const { email, password } = values;

  async function loginUser() {
    try {
      await loginRequest( email, password);
      Router.push("/");
    } catch (error) {
      loginErrorRequest(error.message);
    }
  }
  return (
    <MainLayout>
      <LoginContainer>
        <h1>Login</h1>

        <Form
          onSubmit={handleLoginSubmit}
        >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={handleChange}
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </Form>
      </LoginContainer>
    </MainLayout>
  );
};

const LoginContainer = styled.div`
  margin: 2rem;
  h1 {
    text-align: center;
    margin: 5rem 0;
    color: var(--font-primary-color);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50rem;
  margin: 0 auto;
  margin-top: 5rem;

  input {
    border: none;
    border-bottom: 2px solid var(--gray);
    margin: 2rem 0;
    box-sizing: border-box;
    height: 4rem;
    width: 100%;

    &:focus {
      outline: none;
      border-bottom: 2px solid var(--btn-primary);
    }
  }

  button {
    background: var(--btn-primary);
    color: var(--white);
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    width: 100%;
    margin: 2rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #ff4582;
    }
  }
`;

export default Login;
