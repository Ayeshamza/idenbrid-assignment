import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import SingleProduct from "./screens/SingleProduct";
import CreateProduct from "./screens/CreateProduct";
import Cart from "./screens/Cart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single-product/:id" element={<SingleProduct />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/shopping-cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
