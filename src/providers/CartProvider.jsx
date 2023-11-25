import { useState } from "react";
import CartContext from "../contexts/CartContext";

const CartProvider = ({ children }) => {
    const [products, setProducts] = useState({});

    const addToBag = (toAdd) => {
        const initialNames = Object.keys(products);
        const toAddNames = Object.keys(toAdd);
        const alreadyAdded = toAddNames.reduce((final, item) => {
            if (initialNames.includes(item)) {
                return [...final, item]
            } else {
                return final
            }
        }, []);
        const finalProducts = { ...products };
        alreadyAdded.forEach((item) => {
            finalProducts[item].quantity = products.item.quantity + toAdd.item.quantity;
        });
        setProducts({ ...finalProducts, ...toAdd });
    }

    console.log(products, 'CartProvider!')

    return <CartContext.Provider value={{ products, addToBag }}>
        {children}
    </CartContext.Provider>
}

export default CartProvider;