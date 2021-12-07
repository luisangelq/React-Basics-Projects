import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { loginAlert }  from "../helpers/validations/AlertHandler"

import firebaseState from "../context/firebaseState";

const ProductDetail = ({ product, user }) => {
  const { id, productName, company, imageURL, comments, quote } =
    product;

  const [productState, setProductState] = useState(product);

  const { updateProductRequest } = firebaseState();

  const voteProduct = (id) => {
    if (!user) {
      loginAlert();
      return;
    }

    const newProduct = {
      ...productState,
      votes: productState.votes + 1,
      votesUsers: [...productState.votesUsers, user.uid],
    };

    if (productState.votesUsers.includes(user.uid)) {
      const newProduct = {
        ...productState,
        votes: productState.votes - 1,
        //delete user from votesUsers
        votesUsers: productState.votesUsers.filter(
          (userId) => userId !== user.uid
        ),
      };
      setProductState(newProduct);
      updateProductRequest(id, "products", newProduct);

      return;
    }

    setProductState(newProduct);
    updateProductRequest(id, "products", newProduct);
  };
  return (
    <Product>
      <ProductImage src={imageURL} alt={productName} />

      <ProductInfo>
        <Link href="/products/[id]" as={`/products/${id}`}>
          <a>
            <div className="header">
              <h2>{productName}</h2>
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  stroke="#4B587C"
                  strokeWidth="1.5"
                  fill="none"
                  fillRule="evenodd"
                >
                  <path d="M9.6 4H4.2a2.4 2.4 0 00-2.4 2.4V10"></path>
                  <path d="M6.6 7l3-3-3-3m5.4 9v3H0"></path>
                </g>
              </svg>
            </div>
            <div className="content">
              <p>{quote}</p>
            </div>

            <div className="footer">
              <div className="comments">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="commentIcon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>
                  <span>{comments.length}</span>
                </p>
              </div>

              <p> {company}</p>
            </div>
          </a>
        </Link>
      </ProductInfo>

      <ProductVotes
        onClick={() => voteProduct(id)}
        className={
          user
            ? productState.votesUsers.includes(user.uid)
              ? "removeVote"
              : null
            : null
        }
      >
        <p className="rotate">◥</p>
        <p>{productState.votes}</p>
      </ProductVotes>
    </Product>
  );
};

const Product = styled.div`
  background-color: rgb(255, 255, 255);
  background-image: linear-gradient(
    12deg,
    rgb(255, 255, 255) 50%,
    rgba(255, 255, 255, 0)
  );
  display: grid;
  grid-template-columns: 1fr 5fr 0.5fr;
  align-items: center;
  border-radius: 0.5rem;
  margin: 2rem 0;
  cursor: pointer;
  transition: all 0.6s ease;

  &:hover {
    background-color: rgb(254, 237, 230);
  }
`;

const ProductImage = styled.img`
  width: 8rem;
  height: 8rem;
  margin: 0 auto;
  border-radius: 0.5rem;
`;
const ProductInfo = styled.div`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  transition: all 0.5s ease-in-out;

  a {
    color: var(--font-primary-color);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      display: none;
      transition: all 0.5s ease-in-out;
    }
  }

  &:hover svg {
    display: block;
  }

  .content {
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  .footer {
    display: flex;
    gap: 5rem;
    .comments {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    svg {
      height: 2rem;
      margin-right: 1rem;
    }
  }
`;

const ProductVotes = styled.button`
  display: grid;
  border: 1px solid var(--gray);
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: white;
  color: var(--font-primary-color);
  width: 5rem;
  height: 6rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &.removeVote {
    color: #f64900;
    border: 1px solid #f64900;
  }

  &:hover {
    border: 1px solid var(--btn-secondary);
  }

  .rotate {
    margin-top: 0.5rem;
    transform: rotate(-45deg);
  }
`;
export default ProductDetail;
