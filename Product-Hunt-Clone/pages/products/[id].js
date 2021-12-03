import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import styled from "styled-components";
import MainLayout from "../../components/MainLayout";
import Spinner from "../../components/Spinner";
import firebaseState from "../../context/firebaseState";

const Product = () => {
  const [product, setProduct] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const { getProductRequest } = firebaseState();

  useEffect(() => {
    if (id) {
      getProductRequest(id, "products", setProduct);
    }
  }, [id]);

  return (
    <MainLayout>
      {product ? (
        <Container>
          <ProductHeader>
            <div>
              <img src={product.imageURL} alt={product.productName} />
            </div>
            <div className="productTitle">
              <h2>{product.productName}</h2>
              <p>{product.description}</p>
            </div>
          </ProductHeader>

          <BtnContainer className="btnContaines">
            <button> get it </button>
            <button className="votes">
              &#x25B2; upvote · {product.votes}{" "}
            </button>
          </BtnContainer>

          <ProductDescription>
            <p>{product.description}</p>

            <div className="createdDate">
              <span>
                featured {moment(product.date).startOf("day").fromNow()}
              </span>
            </div>
          </ProductDescription>
        </Container>
      ) : (
        <Spinner />
      )}
    </MainLayout>
  );
};

const Container = styled.div`
  width: 90%;
  margin: 5rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 0.5rem;
  }

  .productTitle {
    margin: 1rem 2rem;
    color: var(--font-primary-color);
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 5rem;
  margin-top: 5rem;
  gap: 1rem;

  button {
    outline: none;
    padding: 1.5rem;
    min-width: 10rem;
    color: var(--font-primary-color);
    font-size: 1.2rem;
    border: 1px solid var(--gray);
    background: white;
    border-radius: 0.5rem;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;

    
  }

  .votes {
    min-width: 25rem;
    background: #f64900;
    color: white;

    @media (max-width: 480px) {
      min-width: 20rem;
    }
  }
`;

const ProductDescription = styled.div`
  margin-top: 5rem;
  padding: 2rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  background: white;
  grid-area: 2 / 1 / 3 / 3;


  .createdDate {
    display: flex;
    justify-content: flex-end;
    span {
      margin-top: 5rem;
      padding: 0.5rem;
      border: 1px solid var(--gray);
      border-radius: 0.5rem;
      font-size: 1rem;
      color: var(--font-primary-color);
      text-transform: uppercase;
    }
  }
`;

export default Product;
