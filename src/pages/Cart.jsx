import { useContext, useEffect, useState } from "react";
import CartContext from "../contexts/CartContext";

const Cart = () => {
    const { products } = useContext(CartContext);
    const productNames = Object.keys(products);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalPrice = productNames.reduce((price, product) => {
            const totalProduct = products[product].price * products[product].quantity;

            return price + totalProduct;
        }, 0);
        setTotal(totalPrice);
    }, [])

    return <>
        {productNames.map((name) => <div>
            <img src={products[name].imageUrl} width={200} height={200} />
            <p>{name}</p>
            <p>{products[name].quantity}</p>
        </div>)}
        <div><p>Total: ${total} USD</p></div>
    </>
}

export default Cart;