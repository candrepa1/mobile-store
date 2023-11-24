import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import Product from './pages/Product';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products">
            <Route index element={<Products />} />
            <Route path=":id" element={<Product />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
