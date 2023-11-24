import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import FirebaseContext from "../contexts/FirebaseContext";
import styled from "styled-components";
import { uniq } from 'lodash'
import { useNavigate } from "react-router-dom";

const Products = () => {
    const { db } = useContext(FirebaseContext);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([]);
    const navigate = useNavigate();

    const getAllProducts = async () => {
        const list = [];
        const querySnapshot = await getDocs(collection(db, "productos"));
        querySnapshot.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id })
        });

        return list;
    }

    const onSearch = (e) => {
        if (e.keyCode === 13) {
            const filteredProducts = products.filter(({ name }) => name === search);
            setProducts(filteredProducts);
        }
    };

    const onChangeInput = (e) => {
        setSearch(e.target.value);
    }

    const onCheck = (cat, e) => {
        if (e.target.checked) {
            setChecked((prev) => [...prev, cat])
        } else {
            const filteredCats = checked.filter((prevCat) => prevCat != cat);
            setChecked(filteredCats);
        }
    }

    const goToProductDetail = (id) => {
        navigate(`/products/${id}`);
    }

    useEffect(() => {
        getAllProducts().then((list) => {
            setProducts(list)
            const cats = uniq(list.map(({ type }) => type));
            setCategories(cats);
        })
    }, [])

    console.log(products, 'products!')

    useEffect(() => {
        if (checked.length) {
            const filteredProducts = products.filter(({ type }) => checked.includes(type));
            setProducts(filteredProducts)
        }
    }, [checked.length])

    return <Container>
        <input placeholder="Search product..." onChange={onChangeInput} value={search} onKeyUp={onSearch} />
        <ProductsContainer>
            <Menu>
                <BoldElement>Categories</BoldElement>
                <NestedMenu>
                    {categories.map((cat) => <li><input type="checkbox" onClick={(e) => onCheck(cat, e)} />{cat}</li>)}
                </NestedMenu>
            </Menu>
            {products.map(({ id, imageUrl, stock, name, price, type }) => <Product key={name} onClick={() => goToProductDetail(id)}><img src={imageUrl} width={200} height={200} /><h1>{name}</h1><p>{stock} units left in stock</p><p>${price} USD</p><p>Categories: {type}</p></Product>)}
        </ProductsContainer>
    </Container>;
}

const Menu = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const NestedMenu = styled.ul`
    list-style-type: none;
`;

const BoldElement = styled.li`
    font-weight: bold;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Product = styled.div`
    margin: 15px;
`;

const ProductsContainer = styled.div`
    display: flex;
    margin: 30px;
`;

export default Products;