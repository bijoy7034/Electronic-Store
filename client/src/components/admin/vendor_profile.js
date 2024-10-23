import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddVendorDetails = () => {
    const [storeName, setStoreName] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('access');
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/vendor/profile/', {
                store_name: storeName,
                description,
                phone_number: phoneNumber,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Vendor profile created:', response.data);
            navigate('/dashboard');

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to add vendor details');
        }
    };

    return (
        <div className="container mt-5 w-50">
            <h2 className="text-center mb-4">Add Vendor Details</h2>
            {error && <div className="alert alert-warning" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="storeName" className="form-label">Store Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="storeName"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                </div>
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
                <button type="submit" className="btn btn-warning w-100">Add Details</button>
            </form>
        </div>
    );
};

export default AddVendorDetails;
