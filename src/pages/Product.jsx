import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../contexts/FirebaseContext";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import CartContext from "../contexts/CartContext";

const Product = () => {
    const { db } = useContext(FirebaseContext);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { addToBag } = useContext(CartContext);
    const { id } = useParams();

    const getDocument = async () => {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setProduct(docSnap.data());
        }
    };

    const changeQuantity = (e) => {
        setQuantity(Number(e.target.value));
    }

    const addProduct = () => {
        addToBag({
            [product.name]: {
                quantity,
                imageUrl: product.imageUrl,
                price: product.price,
                stock: product.stock,
            }
        })
    };

    useEffect(() => {
        getDocument();
    }, [])

    return <section className="home" id="home">
        <div className="home__container">
            <div className="home__data">
                <span className="home__new">${product.price} USD</span>
                <h1 className="home__title">{product.name}</h1>
                <p className="home__description">{product.description}</p>
                <input type="number" min="1" max={product.stock} value={quantity} onChange={changeQuantity} />
                <p>{product.stock} units left in stock</p>
                <button className="button-special" onClick={addProduct}>Add to cart</button>
            </div>
            <div className="home__sneaker">
                <img src={product.imageUrl} class="home__img" />
            </div>
        </div>
    </section>
        ;
}

export default Product;