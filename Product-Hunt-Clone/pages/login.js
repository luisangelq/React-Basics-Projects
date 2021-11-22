import MainLayout from "../components/MainLayout";
import styled from "styled-components";

const Login = () => {
  return (
    <MainLayout>
      <LoginContainer>
        <h1>Login</h1>

        <Form>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="User Name"
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
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
