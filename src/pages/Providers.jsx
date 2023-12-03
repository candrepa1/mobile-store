import FirebaseProvider from '../providers/FirebaseProvider';
import CartProvider from '../providers/CartProvider';
import { Outlet } from "react-router-dom";
import UserProvider from '../providers/UserProvider';

const Provider = () => {
    return <FirebaseProvider>
        <CartProvider>
            <UserProvider>
                <Outlet />
            </UserProvider>
        </CartProvider>
    </FirebaseProvider>
}

export default Provider;