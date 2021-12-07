import { useEffect, useState } from "react";
import styled from "styled-components";
import MainLayout from "../components/MainLayout";
import ProductDetail from "../components/ProductDetail";

import firebaseState from "../context/firebaseState";

const Home = () => {
  const [products, setProducts] = useState([]);

  const { getProductsRequest } = firebaseState();

  useEffect(() => {
    getProductsRequest("products", setProducts, "date");
  }, []);

  console.log(products);

  return (
    <div>
      <MainLayout>
        <StyledHome>
          <Container>
            <Title>Is the next 🦄 here?</Title>

            {products
              ? products.map((product) => (
                  <ProductDetail key={product.id} product={product} />
                )).reverse()
              : null}
          </Container>
        </StyledHome>
      </MainLayout>
    </div>
  );
};

const Title = styled.h1`
  font-size: 2.5rem;
  color: #21293c;
`;

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 80rem;
`;

const Container = styled.div`
  margin: 4rem;
`

export default Home;
