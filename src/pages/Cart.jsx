import { useContext, useEffect, useState } from "react";
import CartContext from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const Cart = () => {
    const { products, removeFromBag } = useContext(CartContext);
    const productNames = Object.keys(products);
    const [total, setTotal] = useState(0);
    const SHIPPING = 5.00;

    useEffect(() => {
        const totalPrice = productNames.reduce((price, product) => {
            const totalProduct = products[product].price * products[product].quantity;

            return price + totalProduct;
        }, 0);
        setTotal(totalPrice);
    }, [products])

    return <>
        {total ? <div id="main-heading">
            <div class="heading cf">
                <h1>My Cart</h1>
                <Link to="/products" className="continue">Continue Shopping</Link>
            </div>
            <div className="cart"></div>
            <ul class="cartWrap">
                {productNames.map((name, index) => <li className={(index + 1) % 2 === 0 ? "even" : "items"}>
                    <div class="infoWrap">
                        <div class="cartSection">
                            <h3>{name}</h3>
                            <div>
                                <input type="text" class="qty" value={products[name].quantity} /><p className="price-item">x ${products[name].price}</p>
                                <p class={products[name].stock >= products[name].quantity ? 'stockStatus' : 'out'}>{products[name].stock >= products[name].quantity ? 'In Stock' : 'Out of stock'}</p>
                            </div>
                        </div>

                        <div class="cart-final-section">
                            <div class="prodTotal cartSection">
                                <p className="price-item">${products[name].quantity * products[name].price}</p>
                            </div>
                            <div class="cartSection removeWrap">
                                <FontAwesomeIcon icon={faCircleXmark} onClick={() => removeFromBag(name)} />
                            </div>
                        </div>
                    </div>
                </li>)}
            </ul>
            <div class="subtotal cf">
                <ul>
                    <li class="totalRow"><span class="label">Subtotal</span><span class="value">${total}</span></li>
                    <li class="totalRow"><span class="label">Shipping</span><span class="value">${SHIPPING}</span></li>
                    <li class="totalRow final"><span class="label">Total</span><span class="value">${total + SHIPPING}</span></li>
                    <li class="totalRow"><Link class="btn continue">Checkout</Link></li>
                </ul>
            </div>
        </div > : <div id="main-heading">
            <div class="heading cf">
                <h1>Your cart is empty</h1>
                <Link to="/products" className="continue">Continue Shopping</Link>
            </div>
        </div>}
    </>
}

export default Cart;