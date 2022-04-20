import Layout from "../components/Layout";
import CartProducts from "../components/CartProducts";

import useRestaurant from "../hooks/useRestaurant";

const Cart = () => {
  const { cart } = useRestaurant();
  return (
    <Layout page="Cart">
      <h1 className="text-4xl font-bold">Resume</h1>
      <p className="text-2xl my-10">Check your order</p>

      {cart.length === 0 ? (
        <p className="text-2xl my-10 text-center">Your cart is empty</p>
      ) : (
        <div>
          {cart.map((product) => (
            <CartProducts 
                key={product.id}
                product={product}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Cart;
