import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import FirebaseContext from "../contexts/FirebaseContext";
import styled from "styled-components";
import { uniq } from 'lodash'
import { useNavigate } from "react-router-dom";
import Fuse from 'fuse.js';

const Products = () => {
    const { db } = useContext(FirebaseContext);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const navigate = useNavigate();
    const fuse = new Fuse(products, {
        keys: ['name']
    })

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
            setIsFiltering(true);
            const filteredProducts = fuse.search(search)[0].item;
            const list = [filteredProducts];
            setProducts(list);
        }
    };

    const onChangeInput = (e) => {
        setSearch(e.target.value);
        setIsFiltering(false);
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
        if (!isFiltering) {
            getAllProducts().then((list) => {
                setProducts(list);
                const cats = getCategories(list);
                setCategories(cats);
            });
        }
    }, [isFiltering])

    useEffect(() => {
        if (checked.length) {
            setIsFiltering(true);
            const filteredProducts = products.filter(({ type }) => checked.includes(type));
            setProducts(filteredProducts)
            const cats = getCategories(filteredProducts);
            setCategories(cats);
        } else {
            setIsFiltering(false);
        }
    }, [checked.length])

    return <Container>
        <input placeholder="Search product..." onChange={onChangeInput} value={search} onKeyUp={onSearch} />
        <ProductsContainer>
            <Menu>
                <BoldElement>Categories</BoldElement>
                <NestedMenu>
                    {categories.map((cat) => <li><input type="checkbox" onChange={(e) => onCheck(cat, e)} checked={isChecked(checked, cat)} />{cat}</li>)}
                </NestedMenu>
            </Menu>
            <StyledProducts>{products.map(({ id, imageUrl, stock, name, price, type }) => <Product key={name} onClick={() => goToProductDetail(id)}><img src={imageUrl} width={200} height={200} /><h1>{name}</h1><p>{stock} units left in stock</p><p>${price} USD</p><p>Categories: {type}</p></Product>)}</StyledProducts>
        </ProductsContainer>
        <Cart onClick={() => navigate('/cart')}>CART</Cart>
    </Container>;
};

const isChecked = (list, cat) => list.includes(cat);

const getCategories = (list) => uniq(list.map(({ type }) => type));

const Cart = styled.button`
    position: fixed;
    top: 0;
    right: 0;
    width: 70px;
    height: 50px;
`;

const StyledProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(7, 1fr);
    height: 100vh;
`;

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