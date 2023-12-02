import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import Product from './pages/Product';
import Cart from './pages/Cart'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Intro from './pages/Intro';
import './styles/styles.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Intro />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products">
            <Route index element={<Products />} />
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
