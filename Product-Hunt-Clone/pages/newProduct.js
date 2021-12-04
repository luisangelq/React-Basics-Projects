import { useContext, useState } from "react";
import Router, { useRouter } from "next/router";
import MainLayout from "../components/MainLayout";
import Spinner from "../components/Spinner";
import styled from "styled-components";

import useFormValidation from "../hooks/useFormValidation";
import firebaseState from "../context/firebaseState";
import FirebaseContext from "../context/firebaseContext";

const newProduct = () => {
  const initialState = {
    productName: "",
    company: "",
    url: "",
    description: "",
  };

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const { user } = useContext(FirebaseContext);
  const router = useRouter();

  const { values, handleChange, handleNewProductSubmit } = useFormValidation(
    initialState,
    createProduct
  );
  const { createProductRequest } = firebaseState();

  const { productName, company, url, description } = values;

  async function createProduct() {
    if (!user) {
      return router.push("/login");
    }

    const product = {
      productName,
      company,
      url,
      imageURL,
      description,
      votes: 0,
      comments: [],
      date: Date.now(),
      postedBy: {
        id: user.uid,
        name: user.displayName,
      }
    };

    try {
      await createProductRequest(image, setUploading, setImageURL, product);
    } catch (error) {
      console.log(error.message);
    }
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
              accept="image/*"
              type="file"
              id="image"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
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

            <SpinnerContainer>
              {uploading ? <Spinner /> : null }
            </SpinnerContainer>

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
    margin: 2.5rem 0;
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
    margin: 1.5rem 0;
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

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  height: 5rem;
`

const AccessDenied = styled.div`
  h1 {
    text-align: center;
    margin: 5rem 0;
    color: var(--font-primary-color);
  }
`;

export default newProduct;
