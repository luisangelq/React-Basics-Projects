import { useState } from "react";
import Products from "./components/Products";

function App() {
  const [products] = useState([
    { id: "1", title: "Notebook", price: 2000 },
    { id: "2", title: "Mouse", price: 20 },
    { id: "3", title: "Keyboard", price: 200 },
    { id: "4", title: "Gamepad", price: 50 },
  ]);

  const [cart, setCart] = useState([]);

  console.log(cart);

  return (
    <div className="App">
      <h1>Product List</h1>
      {products.map((product) => (
        <Products
          key={product.id}
          product={product}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </div>
  );
}

export default App;
