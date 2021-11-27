import { useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import MainLayout from "../components/MainLayout";
import Spinner from "../components/Spinner";
import styled from "styled-components";
import Swal from "sweetalert2";

import useFormValidation from "../hooks/useFormValidation";
import firebaseState from "../context/firebaseState";
import FirebaseContext from "../context/firebaseContext";

const newProduct = () => {
  const initialState = {
    productName: "",
    company: "",
    image: "",
    url: "",
    description: "",
  };
  const { user } = useContext(FirebaseContext);
  const router = useRouter();

  const { values, handleChange, handleNewProductSubmit } = useFormValidation(
    initialState,
    addProduct
  );
  const { registerRequest, registerErrorRequest } = firebaseState();

  const { productName, company, url, description } = values;

  async function addProduct() {
    // try {
    //   await registerRequest(name, email, password);
    //   Router.push("/");
    // } catch (error) {
    //   registerErrorRequest(error.message);
    // }
  }

  return (
    <MainLayout>
      {user ? (
        <RegisterContainer>
          <h1>New Product</h1>

          <Form onSubmit={handleNewProductSubmit} noValidate>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Product Name"
              value={productName}
              onChange={handleChange}
            />

            <input
              type="text"
              id="company"
              name="company"
              placeholder="Company Name"
              value={company}
              onChange={handleChange}
            />

            <input
              type="file"
              id="image"
              name="image"
              // value={image}
              // onChange={handleChange}
            />

            <input
              type="url"
              id="url"
              name="url"
              placeholder="URL"
              value={url}
              onChange={handleChange}
            />

            <ProductDescription>
              <label htmlFor="description">Product Description</label>
              <textarea
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </ProductDescription>

            <button type="submit">Add Product</button>
          </Form>
        </RegisterContainer>
      ) : (
        <AccessDenied>
          <h1>You need to be logged in to add a product</h1>
        </AccessDenied>
      )}
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
  display: grid;
  width: 100%;
  padding: 2rem;
  margin-top: 2rem;
  border: 2px solid var(--gray);
  border-radius: 0.5rem;
  transition: all, 0.3s ease-in-out;

  &:hover {
    border: 2px solid var(--btn-primary);
  }

  label {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--font-primary-color);
  }

  textarea {
    margin-top: 2rem;
    border: none;
    height: 15rem;
    color: var(--font-primary-color);

    &:focus {
      outline: none;
      border: none;
    }
  }
`;

const AccessDenied = styled.div`
  h1 {
    text-align: center;
    margin: 5rem 0;
    color: var(--font-primary-color);
  }

`

export default newProduct;
