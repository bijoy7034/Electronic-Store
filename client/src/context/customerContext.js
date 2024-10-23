import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CustomerContext = createContext();

const CustomerContextProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const fetchCustomerDetails = async () => {
        try {
            const token = localStorage.getItem('access');
            const response = await axios.get('http://127.0.0.1:8000/api/v1/customer/profile/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCustomer(response.data);
            await fetchCart(); 
        } catch (err) {
            console.log(err);
        }
    };

    const addToCart = async (formData) => {
        try {
            const token = localStorage.getItem('access');
            const response = await axios.post('http://127.0.0.1:8000/api/v1/customer/cart/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
       
            await fetchCart(); 
            return { message: true, data: response.data };
        } catch (err) {
            console.log(err);
            return { message: false, error: err };
        }
    };

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('access');
            const response = await axios.get('http://127.0.0.1:8000/api/v1/customer/cart/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCartItems(response.data.cart_items);
        } catch (err) {
            console.log(err);
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            const token = localStorage.getItem('access');
            await axios.delete(`http://127.0.0.1:8000/api/v1/customer/cart/remove/${cartItemId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            await fetchCart(); 
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCustomerDetails(); // Fetch customer details initially
    }, []);

    return (
        <CustomerContext.Provider value={{ fetchCustomerDetails, customer, addToCart, cartItems, removeFromCart, fetchCart }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomer = () => {
    return useContext(CustomerContext);
};

export default CustomerContextProvider;
