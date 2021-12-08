import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import MainLayout from "../components/MainLayout";
import { useRouter } from "next/router";
import ProductDetail from "../components/ProductDetail";

import FirebaseContext from "../context/firebaseContext";
import firebaseState from "../context/firebaseState";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [result, setResult] = useState([]);

  const { user } = useContext(FirebaseContext);
  const { getProductsRequest } = firebaseState();

  const router = useRouter();
  const {
    query: { q },
  } = router;

  useEffect(() => {
    if (products.length === 0) {
      getProductsRequest("products", setProducts, "date");
    }

    if (q) {
      const search = q.toLowerCase();
      const filteredProducts = products.filter((product) => {
        return (
          product.productName.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search)
        );
      });

      setResult(filteredProducts);
    }
  }, [q, products]);

  return (
    <MainLayout>
      <StyledHome>
        <Container>
          <Title>Is the next 🦄 here?</Title>

          {products
            ? result.map((product) => (
                <ProductDetail key={product.id} product={product} user={user} />
              ))
            : null}
        </Container>
      </StyledHome>
    </MainLayout>
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
`;

export default Search;
