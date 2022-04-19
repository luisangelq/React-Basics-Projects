import { useState, useEffect } from "react";
import Image from "next/image";


import useRestaurant from "../hooks/useRestaurant";

const ProductModal = () => {
  const [quantity, setQuantity] = useState(1);
  const { product, handleModal, addToCart, cart } = useRestaurant();

  useEffect(() => {
    if (cart.some((item) => item.id === product.id)) {
      setQuantity(cart.find((item) => item.id === product.id).quantity);
    }
  }, [cart, product]);
  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3 flex justify-center">
        <Image
          width={400}
          height={500}
          src={`/assets/img/${product.image}.jpg`}
          alt={`${product.name} image`}
        />
      </div>
      <div className="md:w-2-3 grid content-evenly">
        <h1 className="text-2xl font-bold mt-5">{product.name}</h1>
        <p className="text-center md:text-left mt-5 font-black text-4xl text-amber-500">
          ${product.price}0
        </p>

        <div className="flex items-center mt-5 gap-2">
          <button
            onClick={() => setQuantity(quantity <= 1 ? quantity : quantity - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-xl">{quantity}</p>
          <button onClick={() => setQuantity(quantity + 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={() => {
            addToCart(product, quantity);
            
          }}
          className="bg-indigo-600 ease-in-out duration-300 hover:bg-indigo-800 w-full text-white font-bold py-2 px-4 rounded mt-5 uppercase"
        >
          Add to order
        </button>
      </div>

      <div className="absolute top-0 right-0">
        <button onClick={() => handleModal(false)}>
          <svg
            className="h-6 w-6 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
