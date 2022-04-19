import Image from "next/image";
import useRestaurant from "../hooks/useRestaurant";

const Product = ({ product }) => {
  const { name, image, price } = product;

  const { handleProduct, handleModal } = useRestaurant();

  return (
    <div className="grid content-between border p-3 text-center h-full ">
      <Image
        src={`/assets/img/${image}.jpg`}
        width={200}
        height={400}
        alt="dish image"
      />
      <div className="mt-3">
        <h3 className="font-bold text-xl">{name}</h3>
        <p className="mt-5 font-black text-2xl text-amber-500">${price}0</p>

        <button
          onClick={() => {
            handleProduct(product);
            handleModal(true);
          }}
          className="bg-indigo-600 ease-in-out duration-300 hover:bg-indigo-800 w-full text-white font-bold py-2 px-4 rounded mt-5 uppercase"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Product;
