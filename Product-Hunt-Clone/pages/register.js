import styled from "styled-components";
import MainLayout from "../components/MainLayout";

import useFormValidation from "../hooks/useFormValidation";
import useFirebaseAccess from "../hooks/useFirebaseAccess";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, handleChange, handleSubmit } = useFormValidation(
    initialState,
    registerUser
  );
  const { registerRequest, registerErrorRequest } = useFirebaseAccess();

  const { name, email, password, confirmPassword } = values;

  async function registerUser() {
    try {
      await registerRequest(name, email, password);
    } catch (error) {
      registerErrorRequest(error.message);
    }
  }

  return (
    <MainLayout>
      <RegisterContainer>
        <h1>Register</h1>

        <Form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="User Name"
            value={name}
            onChange={handleChange}
          />

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

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </Form>
      </RegisterContainer>
    </MainLayout>
  );
};

const RegisterContainer = styled.div`
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

export default Register;
