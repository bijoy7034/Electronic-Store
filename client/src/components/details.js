import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from './uiComponents/navbar';
import Footer from './uiComponents/footer';
import { useCustomer } from '../context/customerContext';
import { useParams } from 'react-router-dom';

const Details = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCustomer();
    const [quantity, setQuantity] = useState(1);
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(1)



    const AddItemsToCart = async () => {
        const cartData = {
            product_id: product.id,
            quantity: quantity,
        };

        try {
            addToCart(cartData);
            alert('Added To Cart');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add to cart');
        }
    };

    const handleReviewAdd = async() =>{
        const reviewData = {
            product: product.id,
            rating : rating,
            content: content
        }
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/v1/viewsets/review/', reviewData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                },
            })
            setLoading(2)
            alert('Review Added')
        }catch(err){
            console.log(err)
        }

    } 

    useEffect(() => {
        const fetchProduct = async () => {
            const token = localStorage.getItem('access');
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/viewsets/product/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setProduct(response.data);
        };

        fetchProduct();
    }, [loading]);

    return (
        <>
            <NavBar />
            {product && (
                <main className="mt-2 pt-2">
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <img
                                    src={product.image}
                                    className="img-fluid"
                                    alt={product.name}
                                />
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="p-4">
                                    <div className="mb-3">
                                        <span className="badge bg-dark me-1">Category</span>
                                        <span className="badge bg-info me-1">New</span>
                                        <span className="badge bg-danger me-1">Bestseller</span>
                                    </div>

                                    <h5 className="lead">
                                        <span className="me-1">
                                            <del>₹{(parseFloat(product.price) + 1000).toFixed(2)}</del>
                                        </span>
                                        <span>₹{parseFloat(product.price).toFixed(2)}</span>
                                    </h5>

                                    <strong><p style={{ fontSize: "20px" }}>Description</p></strong>
                                    <small className='mb-5'>{product.description}</small>
                                    <form className="d-flex justify-content-left mt-4" onSubmit={(e) => e.preventDefault()}>
                                        <div className="form-outline me-1" style={{ width: "100px" }}>
                                            <input
                                                type="number"
                                                value={quantity}
                                                min="1"
                                                className="form-control"
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                        <button className="btn btn-success ms-1" type="button" onClick={AddItemsToCart}>
                                            Add to cart
                                            <i className="fas fa-shopping-cart ms-1"></i>
                                        </button>
                                        <button className="btn btn-warning ms-1" type="button">
                                            Wishlist
                                            <i className="fas fa-shopping-cart ms-1"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="row">
                            <div className='d-flex justify-content-between'>
                                <h2 className='text-center'>Reviews</h2>
                                <div className='d-flex justify-content-between'>
                                    <div className='mx-4 d-flex justify-content-between'>
                                      <div>  <input class="form-control " type="text" placeholder="Review" aria-label="Review" onChange={(e)=>setContent(e.target.value)} /></div>
                                      <p className='px-2'></p>
                                        <div style={{maxWidth: '100px'}}><input class="form-control " type="number" placeholder="Rating" aria-label="Rating" onChange={(e)=>setRating(e.target.value)}/></div>
                                    </div>
                                    <div className=''>
                                    <button className='btn btn-warning' onClick={handleReviewAdd}>Add Review</button>
                                    </div>
                                </div>
                            </div>
                            <div className='container'>
                                {product.reviews && product.reviews.map((review) => (
                                    <div className='card mt-2'>
                                        <small>{review.created_at}</small>
                                        <hr />
                                        <p className='text-start'>{review.content}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </main>
            )}
            <Footer />
        </>
    );
};

export default Details;
