
import Header from "./components/Header";
import Products from "./components/Products";
import NewProducts from "./components/NewProducts";
import EditProduct from "./components/EditProduct";

import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Header/>

      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="/products/new" element={<NewProducts/>}/>
          <Route path="/products/edit/:id" element={<EditProduct/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
