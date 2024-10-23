import React, { useEffect } from 'react'; 
import './Dashboard.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/authContext';
import { useProduct } from '../../context/productContext';

const ViewItemsDash = () => {
    const navigate = useNavigate(); 
    const { logout } = useAuth(); 
    const { products } = useProduct()

    console.log(products)

    const handleLogout = () => {
        logout();
        navigate('/'); 
    }

    return (
        <div className="dashboard-container" style={{overflowY: 'auto'}}>
            <aside className="sidebar">
                <h2>Dashboard</h2>
                <ul>
                <li><Link to='/dashboard' className='text-light'>Overview</Link></li>
                    <li><Link to='/admin/additem' className='text-light'>Add Products</Link></li>
                    <li className='text-dark'>Items</li>
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
                <section className="cards">
                {products.length === 0 ? (
                        <p>No products available.</p> 
                    ) : (
                        products.map((product) => (
                            <div className="card" key={product.id}>
                                <img src={product.image} style={{ width:'50%' ,height: 'auto' }} />
                                <h6><b>{product.name}</b></h6> 
                                <p>Price: {product.price}</p> 
                                <small>{product.description.slice(0,100)}.</small> 
                                <button className='btn btn-danger btn-sm m-1'>Remove</button>
                                <button className='btn btn-success btn-sm m-1'>Edit</button>
                                <button className='btn btn-primary btn-sm m-1' >View Orders</button>
                                
                            </div>
                        ))
                    )}
                </section>
            </div>
        </div>
    );
};

export default ViewItemsDash;
