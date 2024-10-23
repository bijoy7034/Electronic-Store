import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { storage } from '../firebaseConfig'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const token = localStorage.getItem('access');
    const [products, setProducts] = useState([]);

    const getProducts = async()=>{
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/v1/viewsets/product/', {
                headers :{
                    'Authorization': `Bearer ${token}`,
                }
            })
            setProducts(response.data)
            return products
        }catch(err){
            return {'error' : 'error in fetching' + err}
        }
    }

    useEffect(()=>{
        getProducts();
    },[])

    const addProduct = async (formData) => {
        try {
            const productImageFile = formData.get('product_image');
            let imageUrl = '';

            if (productImageFile) {
                const imageRef = ref(storage, `images/${productImageFile.name}`);
                await uploadBytes(imageRef, productImageFile);
                imageUrl = await getDownloadURL(imageRef); 
            }

          
            const productData = {
                name: formData.get('product_name'),
                price: formData.get('product_price'),
                description: formData.get('product_desc'),
                stock : formData.get('product_stock'),
                image: imageUrl, 
            };

            const response = await axios.post('http://127.0.0.1:8000/api/v1/viewsets/product/', productData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            await getProducts()
            return response.data;
        } catch (err) {
            console.log('Error adding product:', err);
        }
    };

    return (
        <ProductContext.Provider value={{ addProduct, getProducts, products }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    return useContext(ProductContext);
};

export default ProductContextProvider;
