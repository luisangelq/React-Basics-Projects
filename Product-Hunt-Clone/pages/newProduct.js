import Router from "next/router";
import MainLayout from "../components/MainLayout";
import styled from "styled-components";

import useFormValidation from "../hooks/useFormValidation";
import firebaseState from "../context/firebaseState";

const newProduct = () => {
  const initialState = {
    name: "",
    email: "",
  };

  const { values, handleChange, handleRegisterSubmit } = useFormValidation(
    initialState,
    registerUser
  );
  const { registerRequest, registerErrorRequest } = firebaseState();

  const { name, email, password, confirmPassword } = values;

  async function registerUser() {
    try {
      await registerRequest(name, email, password);
      Router.push("/");
    } catch (error) {
      registerErrorRequest(error.message);
    }
  }

  return (
    <MainLayout>
      <RegisterContainer>
        <h1>New Product</h1>

        <Form onSubmit={handleRegisterSubmit} noValidate>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="User Name"
            value={name}
            onChange={handleChange}
          />

          <fieldset>
            <legend>General Information</legend>

            <input
              type="text"
              id="company"
              name="company"
              placeholder="Company Name"
              value={name}
              onChange={handleChange}
            />

            <input
              type="file"
              id="image"
              name="image"
              value={name}
              onChange={handleChange}
            />

            <input
              type="url"
              id="url"
              name="url"
              placeholder="URL"
              value={url}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend>About Your Product</legend>

            <ProductDescription>
              <label htmlFor="product">Product Name</label>
              <input type="text" id="product" name="product" />
            </ProductDescription>
          </fieldset>

          <button type="submit">Add Product</button>
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

const ProductDescription = styled.div`
  
`

export default newProduct;
