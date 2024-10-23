import React, { useEffect } from 'react'; 
import './Dashboard.css'; 
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/authContext';
const Dashboard = () => {
    const navigate = useNavigate(); 
    const { logout } = useAuth(); 

    useEffect(() => {
        const fetchVendorProfile = async () => {
            const token = localStorage.getItem('access');

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/vendor/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });

               
                if (response.data && response.data.created === false) {
                    navigate('/admin/vendor/profile'); 
                } else {
                    console.log(response.data);
                }
            } catch (err) {
                console.log('Error fetching vendor profile:', err.response?.data); // Log errors
            }
        };

        fetchVendorProfile(); 
    }, []); 

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    }

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Dashboard</h2>
                <ul>
                    <li className='text-dark'><b>Overview</b></li>
                    <li><Link to='/admin/additem' className='text-light'>Add Products</Link></li>
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
                <section className="cards">
                    <div className="card">
                        <h3>Card Title 1</h3>
                        <p>Some information about this card.</p>
                    </div>
                    <div className="card">
                        <h3>Card Title 2</h3>
                        <p>Some information about this card.</p>
                    </div>
                    <div className="card">
                        <h3>Card Title 3</h3>
                        <p>Some information about this card.</p>
                    </div>
                    <div className="card">
                        <h3>Card Title 4</h3>
                        <p>Some information about this card.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
