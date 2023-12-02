import { createContext } from "react"

const CartContext = createContext({ products: {}, count: 0 });

export default CartContext;