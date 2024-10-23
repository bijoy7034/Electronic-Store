import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCustomerDetails = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [dummyField1, setDummyField1] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('access');
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/customer/profile/', {
                phone_number: phoneNumber,
                address : address,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Customer profile created:', response.data);
            navigate('/home');

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to add customer details');
        }
    };

    return (
        <div className="container mt-5 w-50">
            <h2 className="text-center mb-4">Add Customer Details</h2>
            {error && <div className="alert alert-warning" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea
                        id="address"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="dummyField1" className="form-label">Pincode</label>
                    <input
                        type="number"
                        className="form-control"
                        id="dummyField1"
                        value={dummyField1}
                        onChange={(e) => setDummyField1(e.target.value)}
                    />
                </div>
    
                <button type="submit" className="btn btn-warning w-100">Submit</button>
            </form>
        </div>
    );
};

export default AddCustomerDetails;
