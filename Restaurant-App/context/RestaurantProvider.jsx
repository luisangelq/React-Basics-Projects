import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState({});

  const router = useRouter();

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

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    toast.success(`${product.name} removed from cart`);
  };

  const handleStep = (step) => {
    setStep(step);
  };

  const handleOrder = async (order) => {
    setOrder(order);

    try {
      await axios.post("/api/orders", order);
      toast.success(`Order placed`);
      setCart([]);
      
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
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
        step,
        handleStep,
        removeFromCart,
        handleOrder,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantProvider };

export default RestaurantContext;
