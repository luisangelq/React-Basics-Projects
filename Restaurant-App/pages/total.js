import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import useRestaurant from "../hooks/useRestaurant";

const Total = () => {
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const { cart } = useRestaurant();

  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(totalPrice);
  }, [cart]);

  const setOrder = (e) => {
    e.preventDefault();
    const order = {
      products: cart,
      name: name,
      total: total,
    };
    console.log(order);
  };
  return (
    <Layout page="Total">
      <h1 className="text-4xl font-bold">Total</h1>
      <p className="text-2xl my-10">Confirm your order</p>
      {cart.length === 0 ? (
        <p className="text-2xl my-10 text-center">Your cart is empty</p>
      ) : (
        <>
          <form onSubmit={setOrder}>
            <div>
              <label
                htmlFor="name"
                className="block uppercase text-slate-800 font-bold"
              >
                Name
              </label>
              <input
                id="name"
                type={"text"}
                className="bg-gray-200 w-full md:w-2/3 xl:w-1/3 rounded-md p-2"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mt-10">
              <p className="text-2xl">
                Total to pay:{" "}
                <span className="text-center md:text-left mt-3 font-black text-3xl text-amber-500">
                  ${total}0
                </span>
              </p>
            </div>

            <div className="mt-10">
              <input
                type="submit"
                className={
                  name
                    ? "bg-indigo-600 w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center cursor-pointer"
                    : "bg-indigo-600 w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center  opacity-50 cursor-not-allowed"
                }
                value="Confirm order"
                disabled={name ? false : true}
              />
            </div>
          </form>
        </>
      )}
    </Layout>
  );
};

export default Total;
