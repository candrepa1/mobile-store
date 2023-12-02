import FirebaseProvider from '../providers/FirebaseProvider';
import CartProvider from '../providers/CartProvider';
import { Outlet } from "react-router-dom";

const Provider = () => {
    return <FirebaseProvider>
        <CartProvider>
            <Outlet />
        </CartProvider>
    </FirebaseProvider>
}

export default Provider;