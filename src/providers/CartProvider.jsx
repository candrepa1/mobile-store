import { useState } from "react";
import CartContext from "../contexts/CartContext";

const CartProvider = ({ children }) => {
    const [products, setProducts] = useState({});
    const [count, setCount] = useState(0)

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
        const endProducts = { ...finalProducts, ...toAdd };
        setProducts(endProducts);
        const names = Object.keys(endProducts);
        const finalCount = names.reduce((final, item) => final + endProducts[item].quantity, 0)
        setCount(finalCount)
    }

    const removeFromBag = (toRemove) => {
        const newProducts = { ...products };
        delete newProducts[toRemove];
        setProducts(newProducts)
        const names = Object.keys(newProducts);
        const finalCount = names.reduce((final, item) => final + newProducts[item].quantity, 0)
        setCount(finalCount)
    }

    return <CartContext.Provider value={{ products, addToBag, count, removeFromBag }}>
        {children}
    </CartContext.Provider>
}

export default CartProvider;