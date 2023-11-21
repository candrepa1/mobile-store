import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../contexts/FirebaseContext";
import { doc, getDoc } from "firebase/firestore";
import styled from "styled-components";

const Product = () => {
    const { db } = useContext(FirebaseContext);
    const [product, setProduct] = useState({});

    const getDocument = async () => {
        const docRef = doc(db, "productos", "cYlyuGiemLsDBGY9RcWr");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setProduct(docSnap.data());
        }
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
                <AddToCart>Add to cart</AddToCart>
                <StyledPrice>${product.price} USD</StyledPrice>
            </CartContainer>
            <p>{product.stock} units left in stock</p>
            <p>{product.description}</p>
        </DescriptionContainer>
    </Container>;
}

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