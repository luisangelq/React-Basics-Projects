import { useState, useEffect, createContext } from "react";
import axios from "axios";

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [products, setProducts] = useState([]);

  const getCategories = async () => {
    const response = await axios.get("/api/category");
    setCategories(response.data);
  };

  const getProducts = async () => {
    const response = await axios.get("/api/products");
    setProducts(response.data);
    };

  useEffect(() => {
    getCategories();
    
  }, []);

  useEffect(() => {
    setCurrentCategory(categories[0]);
    getProducts();
  }, [categories]);

  const handleCategory = (id) => {
    const category = categories.filter((category) => category.id === id);
    setCurrentCategory(category[0]);

  }

  return (
    <RestaurantContext.Provider
      value={{
        categories,
        currentCategory,
        handleCategory,
        products
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantProvider };

export default RestaurantContext;
