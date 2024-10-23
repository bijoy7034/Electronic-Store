import React, { useEffect } from 'react';
import { useCustomer } from '../context/customerContext';
import { useNavigate } from 'react-router-dom';
import NavBar from './uiComponents/navbar';
import Footer from './uiComponents/footer';

const Cart = () => {
    const { cartItems, removeFromCart, fetchCart } = useCustomer();
    const navigate = useNavigate();

    console.log(cartItems)
    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemove = (cartItemId) => {
        removeFromCart(cartItemId);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const totalPrice = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.product?.price || 0) * item.quantity);
    }, 0);

    return (
        <>
            <NavBar />
            <div className="container mt-5">
                {cartItems.length === 0 ? (
                    <div className="alert alert-info m-5" role="alert">
                        Your cart is empty.
                    </div>
                ) : (
                    <section className="">
                        <div className="container-fluid py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <div className="row">
                                                <div className="col-lg-7">
                                                    <h5 className="mb-3">
                                                        <a href="#!" className="text-body">
                                                            <i className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping
                                                        </a>
                                                    </h5>
                                                    <hr />

                                                    <div className="d-flex justify-content-between  mb-4">
                                                        <div className="text-start">
                                                            <p className="mb-0">You have {cartItems.length} items in your cart</p>
                                                        </div>
                                                        <div>
                                                            <p className="mb-0">
                                                                <span className="text-muted">Sort by:</span>
                                                                <a href="#!" className="text-body">price <i className="fas fa-angle-down mt-1"></i></a>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {cartItems.map((item) => (
                                                        <div className="card mb-3" key={item.id}>
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="d-flex flex-row align-items-center">
                                                                        {item.product && (
                                                                            <>
                                                                                <img
                                                                                    src={item.product.image || 'default_image_url.jpg'}
                                                                                    className="img-fluid rounded-3"
                                                                                    alt={item.product.name || 'Product Image'}
                                                                                    style={{ width: "65px" }}
                                                                                />
                                                                                <div className="ms-3">
                                                                                    <h5>{item.product.name || 'Unknown Product'}</h5>
                                                                                    <p className="small mb-0">{item.product.description.slice(0,20) || 'No description available'}</p>
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <div className="d-flex flex-row align-items-center">
                                                                        <div style={{ width: "50px" }}>
                                                                            <h5 className="fw-normal mb-0">{item.quantity}</h5>
                                                                        </div>
                                                                        <div style={{ width: "120px" }}>
                                                                            <p className="mb-0">₹{(item.product?.price * item.quantity).toFixed(2)}</p>
                                                                        </div>
                                                                        <a href="#!" style={{ color: "#cecece" }} onClick={() => handleRemove(item.id)}>
                                                                            <i className="fas fa-trash-alt text-danger"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="col-lg-5 text-light">
                                                    <div className="card bg-warning text-white rounded-3">
                                                        <div className="card-body ">
                                                            <h5 className="mb-0">Order Summary</h5>
                                                            <hr className="my-4" />
                                                            <div className="d-flex justify-content-between mb-4">
                                                                <p className="mb-2 text-light">Subtotal</p>
                                                                <p className="mb-2 text-light">₹{totalPrice.toFixed(2)}</p>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-4">
                                                                <p className="mb-2 text-light">Shipping</p>
                                                                <p className="mb-2 text-light">₹20.00</p>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-4">
                                                                <p className="mb-2 text-light">Total (Incl. taxes)</p>
                                                                <p className="mb-2 text-light">₹{(totalPrice + 20).toFixed(2)}</p>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="btn btn-success btn-block btn-lg"
                                                                onClick={handleCheckout}>
                                                                <div className="d-flex justify-content-between">
                                                                    <span>₹{(totalPrice + 20).toFixed(2)}</span>
                                                                    <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Cart;
