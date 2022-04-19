import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [cart, setCart] = useState([]);

  const getCategories = async () => {
    const response = await axios.get("/api/category");
    setCategories(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCurrentCategory(categories[0]);
  }, [categories]);

  const handleCategory = (id) => {
    const category = categories.filter((category) => category.id === id);
    setCurrentCategory(category[0]);
  };

  const handleProduct = (product) => {
    console.log(product);
    setProduct(product);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const addToCart = (product, quantity) => {
    const newProduct = {
      ...product,
      quantity,
    };
    //check if product is already in cart
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      productInCart.quantity = quantity;

      setCart([...cart]);
      handleModal(false);
      toast.success(`Changes saved`);
    } else {
      setCart([...cart, newProduct]);
      handleModal(false);
      toast.success(`${product.name} added to cart`);
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        categories,
        currentCategory,
        handleCategory,
        product,
        handleProduct,
        modal,
        handleModal,
        addToCart,
        cart,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantProvider };

export default RestaurantContext;
