import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../contexts/FirebaseContext";
import { doc, getDoc } from "firebase/firestore";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import CartContext from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const { db } = useContext(FirebaseContext);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { addToBag } = useContext(CartContext);
    const { id } = useParams();
    const navigate = useNavigate();

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
            }
        })
    };

    useEffect(() => {
        getDocument();
    }, [])

    return <Container>
        <TitleContainer>
            <StyledTitle>{product.name}</StyledTitle>
            <img src={product.imageUrl} width={300} height={300} />
        </TitleContainer>
        <DescriptionContainer>
            <CartContainer>
                <div>
                    <input type="number" min="1" max={product.stock} value={quantity} onChange={changeQuantity} />
                    <AddToCart onClick={addProduct}>Add to cart</AddToCart>
                </div>
                <StyledPrice>${product.price} USD</StyledPrice>
            </CartContainer>
            <p>{product.stock} units left in stock</p>
            <p>{product.description}</p>
        </DescriptionContainer>
        <Cart onClick={() => navigate('/cart')}>CART</Cart>
    </Container>;
}

const Cart = styled.button`
    position: fixed;
    top: 0;
    right: 0;
    width: 70px;
    height: 50px;
`;

const CartContainer = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 20px;
`;

const AddToCart = styled.button`
    padding: 20px;
    border: none;
    border-radius: 5px;
    background-color: #deca14;
    font-size: 20px;
    cursor: pointer;
    margin-left: 20px;
`;

const StyledPrice = styled.h2`
    display: inline-block;
    margin: 10px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

const DescriptionContainer = styled.div`
    text-align: right;
`;

const StyledTitle = styled.h1`
    width: 200px;
    font-size: 50px;
    margin: 20px;
    text-align: center;
    align-item: center;
`;

export default Product;