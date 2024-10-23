import React, { useState, useEffect } from 'react';
import './shop.css'; 
import { useProduct } from '../context/productContext';
import Product from './uiComponents/productCard';
import NavBar from './uiComponents/navbar';
import Footer from './uiComponents/footer';

const Shop = () => {
    const { products, getProducts } = useProduct(); 
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOption, setSortOption] = useState('default');

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setSortedProducts(products); 
    }, [products]);

 
    const handleSortChange = (e) => {
        const option = e.target.value;
        setSortOption(option);

        let sorted = [...products]; 

        if (option === 'price-asc') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (option === 'price-desc') {
            sorted.sort((a, b) => b.price - a.price);
        } else if (option === 'name-asc') {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (option === 'name-desc') {
            sorted.sort((a, b) => b.name.localeCompare(a.name));
        } else {
            sorted = [...products]; 
        }

        setSortedProducts(sorted);
    };

    return (
      <>
      <NavBar/>
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Shop All Products</h2>
                <div>
                    <label htmlFor="sort">Sort by: </label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={handleSortChange}
                        className="form-select"
                        style={{ width: '200px' }}
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name-asc">Name: A-Z</option>
                        <option value="name-desc">Name: Z-A</option>
                    </select>
                </div>
            </div>

            <div className="row">
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <Product product={product} />
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
        <Footer/>
      </>
    );
};

export default Shop;
