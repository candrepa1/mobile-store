
import { useContext } from 'react';
import { Outlet } from "react-router-dom";
import Logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import CartContext from '../contexts/CartContext';
import { useLocation } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { signOut } from "firebase/auth";
import FirebaseContext from '../contexts/FirebaseContext';

const Layout = () => {
  const { count } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const { auth } = useContext(FirebaseContext);
  const { pathname } = useLocation();

  const logout = async () => {
    await signOut(auth)
    setUser({})
  }

  return <><section id="header">
    <img src={Logo} />
    <ul id="navbar">
      <li><Link to="/" className={pathname === '/' ? "active" : ''}>Home</Link></li>
      <li><Link to="/products" className={pathname === '/products' ? "active" : ''}>Shop</Link></li>
      {!user?.token && <li>
        <Link to="/login" className={pathname === '/login' || pathname === '/register' ? "active" : ''}><FontAwesomeIcon icon={faUser} fontSize={30} /></Link>
      </li>}
      <li>
        <Link to="/cart" className={pathname === '/cart' ? "active" : ''}><FontAwesomeIcon icon={faBagShopping} fontSize={30} /></Link>
        {Boolean(count) && <span class="quantity">{count}</span>}
      </li>
      {user?.token && <li><button onClick={logout}>Logout</button></li>}
    </ul>
  </section>
    <Outlet />
  </>
};

export default Layout;