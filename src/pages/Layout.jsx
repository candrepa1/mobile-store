import FirebaseProvider from "../providers/FirebaseProvider";
import { Outlet } from "react-router-dom";
import CartProvider from "../providers/CartProvider";
import Logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons'

const Layout = () => {
  return <FirebaseProvider>
    <CartProvider>
      <section id="header">
        <img src={Logo} />
        <ul id="navbar">
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/products">Shop</Link></li>
          <li>
            <Link to="/login"><FontAwesomeIcon icon={faUser} fontSize={30} /></Link>
          </li>
          <li>
            <Link to="/cart"><FontAwesomeIcon icon={faBagShopping} fontSize={30} /></Link>
            <span class="quantity">0</span>
          </li>
        </ul>
      </section>
      <Outlet />
    </CartProvider>
  </FirebaseProvider>
};

export default Layout;