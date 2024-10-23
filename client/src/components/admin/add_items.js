import React, { useState } from 'react';
import './Dashboard.css';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../../context/productContext';

const AddItem = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { addProduct } = useProduct();

    // State to hold form data
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState(''); // New state for stock
    const [productDesc, setProductDesc] = useState('');
    const [category, setCategory] = useState('1'); 
    const [productImage, setProductImage] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('product_price', productPrice);
        formData.append('product_stock', productStock); // Add stock to form data
        formData.append('product_desc', productDesc);
        // formData.append('catagory', category);
        if (productImage) {
            formData.append('product_image', productImage);
        }

        try {
            await addProduct(formData);
            console.log('Product data submitted:', formData);
            navigate('/admin/vendor/items')
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Dashboard</h2>
                <ul>
                    <li><Link to='/dashboard' className='text-light'>Overview</Link></li>
                    <li className='text-dark text-bold'>Add Products</li>
                    <li><Link to='/admin/vendor/items' className='text-light'>Items</Link></li>
                    <li>Team</li>
                    <li>Settings</li>
                </ul>
            </aside>
            <div className="main-content">
                <header className="header">
                    <h1>Welcome to the Dashboard</h1>
                    <div className="user-info">
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </div>
                </header>
                <section>
                    <div className="additem">
                        <form onSubmit={handleSubmit} className="m-2 container w-50" encType="multipart/form-data">
                            <div className="mb-1">
                                <h2><b>Add Product</b></h2>
                                <p>Explore the latest in electronic gadgets, from smartphones to smart home devices, designed to elevate your everyday life.</p>
                                <label htmlFor="productName" className="form-label">Name</label>
                                <input
                                    required
                                    name="product_name"
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>
                            <div className='row'>
                                <div className="mb-1 col">
                                    <label htmlFor="productPrice" className="form-label">Price</label>
                                    <input
                                        required
                                        name="product_price"
                                        type="number"
                                        className="form-control"
                                        id="productPrice"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-1 col">
                                    <label htmlFor="productStock" className="form-label">Stock</label>
                                    <input
                                        required
                                        name="product_stock" 
                                        type="number"
                                        className="form-control"
                                        id="productStock" 
                                        value={productStock} 
                                        onChange={(e) => setProductStock(e.target.value)} // Change to use setProductStock
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productDesc" className="form-label">Description</label>
                                <textarea
                                    rows="2"
                                    name="product_desc"
                                    required
                                    className="form-control"
                                    id="productDesc"
                                    value={productDesc}
                                    onChange={(e) => setProductDesc(e.target.value)}
                                />
                            </div>
                            <label htmlFor="category" className="form-label">Select the Category</label>
                            <div className="">
                                <select
                                    required
                                    name="catagory"
                                    className="form-select"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="1">Mobiles</option>
                                    <option value="2">Laptops</option>
                                    <option value="3">Accessories</option>
                                    <option value="4">Wearables</option>
                                </select>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="productImage" className="form-label">Select Photo</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    name="product_image"
                                    id="productImage"
                                    onChange={(e) => setProductImage(e.target.files[0])}
                                />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-dark mt-2">Add Product</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AddItem;
