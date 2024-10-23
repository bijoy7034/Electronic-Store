import React from 'react';
import './card.css'; 
import { FaShoppingCart } from 'react-icons/fa';
import { Link} from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <div className="card product-card shadow-sm h-100">
            <div className="card-img-top position-relative" >
                <div style={{height: '400px'}}>

                <img src={product.image} className="img-fluid product-image" alt={product.name} />
                </div>
                <span className="badge bg-success position-absolute top-0 end-0 m-2">Best Seller</span>
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="product-name text-truncate">{product.name}</h5>
                <div className="d-flex align-items-center mb-2">
                    <span className="text-muted">(reviews)</span>
                </div>
                <div className="product-price mb-3">
                    <h6 className="text-danger">₹{product.price}</h6>
                </div>
                <div className="mt-auto d-flex justify-content-between">
                <div>
                <Link to={`/details/${product.id}`} className="btn btn-outline-primary btn-sm">View Details</Link>
                </div>
                    <div>
                    <button className="btn btn-warning btn-sm">
                        <FaShoppingCart className="me-1" /> Add to Cart
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
