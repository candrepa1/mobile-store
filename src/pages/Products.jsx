import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import FirebaseContext from "../contexts/FirebaseContext";
import { uniq } from 'lodash'
import { useNavigate } from "react-router-dom";
import Fuse from 'fuse.js';

const Products = () => {
    const { db } = useContext(FirebaseContext);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState('');
    const [isFiltering, setIsFiltering] = useState(false);
    const navigate = useNavigate();
    const fuse = new Fuse(products, {
        keys: ['name'],
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
            const filteredProducts = fuse.search(search);
            const formattedProducts = filteredProducts.map(({ item }) => item);
            setProducts(formattedProducts);
        }
    };

    const onChangeInput = (e) => {
        setSearch(e.target.value);
        setIsFiltering(false);
    }

    const onSelect = (cat) => {
        setIsFiltering(true);
        setCategorySelected(cat);
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
        if (categorySelected) {
            getAllProducts().then((list) => {
                const filteredProducts = list.filter(({ type }) => type === categorySelected);
                setProducts(filteredProducts)
            })
        } else {
            setIsFiltering(false);
        }
    }, [categorySelected])

    return <div id="products">
        <div id="menu">
            <input placeholder="Search product..." onChange={onChangeInput} value={search} onKeyUp={onSearch} />
            <div>
                <div class="sidebar">
                    <h3 class="sidebar-title">Explore</h3>
                    <ul>
                        {categories.map((cat) => <li className={categorySelected === cat ? 'active' : ''} onClick={() => onSelect(cat)}>{cat}</li>)}
                    </ul>
                    <button className="button-special" onClick={() => setCategorySelected('')}>Clear filters</button>
                </div>
            </div>
        </div>
        <div id="products-grid">
            {products.map(({ id, imageUrl, stock, name, price, type }) => <div key={name} onClick={() => goToProductDetail(id)}>
                <img src={imageUrl} width={150} height={150} />
                <h1 id="special-h1">{name}</h1>
                <p>{stock} units left in stock</p>
                <p>${price} USD</p>
                <p>Categories: {type}</p>
            </div>)}
        </div>
    </div>;
};

const getCategories = (list) => uniq(list.map(({ type }) => type));

export default Products;