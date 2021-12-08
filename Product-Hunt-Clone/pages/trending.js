import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import MainLayout from "../components/MainLayout";
import ProductDetail from "../components/ProductDetail";

import FirebaseContext from "../context/firebaseContext";
import firebaseState from "../context/firebaseState";

const Trending = () => {
  const [products, setProducts] = useState([]);

  const { user } = useContext(FirebaseContext);
  const { getProductsRequest } = firebaseState();

  useEffect(() => {
    getProductsRequest("products", setProducts, "votes");
  }, []);


  return (
    <div>
      <MainLayout>
        <StyledHome>
          <Container>
            <Title>Is the next 🦄 here?</Title>

            {products
              ? products.map((product) => (
                  <ProductDetail key={product.id} product={product} user={user}/>
                ))
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

export default Trending;
