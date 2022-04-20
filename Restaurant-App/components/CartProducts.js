import Image from "next/image";
import useRestaurant from "../hooks/useRestaurant";

const CartProducts = ({ product }) => {
  const { handleProduct, handleModal, removeFromCart } = useRestaurant();


  return (
    <div className="shadow p-5 mb-3 flex gap-10">
      <div className="md:w-1/6">
        <Image
          width={300}
          height={400}
          alt={`${product.name} image`}
          src={`/assets/img/${product.image}.jpg`}
        />
      </div>
      <div className="md:w-4/6">
        <h1 className="text-2xl font-bold mt-2">{product.name}</h1>
        <p className="text-center md:text-left mt-2 font-black text-xl">
          Quantity: {product.quantity}
        </p>
        <p className="text-center md:text-left mt-3 font-black text-xl text-amber-500">
          Price: ${product.price}0
        </p>
        <p className="mt-2">Subtotal: ${product.price * product.quantity}0</p>
      </div>
      <div className="md:w-1/6">
        <button
          className="bg-sky-700 flex items-center justify-center gap-2 p-2 text-white rounded-md font-bold uppercase shadow-md w-full duration-300 hover:bg-sky-900"
          onClick={() => {
            handleProduct(product);
            handleModal(true);
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Update
        </button>
        <button className="bg-red-600 flex items-center justify-center gap-2 p-2 mt-5 text-white rounded-md font-bold uppercase shadow-md w-full duration-300 hover:bg-red-700"
          onClick={() => removeFromCart(product.id)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartProducts;
