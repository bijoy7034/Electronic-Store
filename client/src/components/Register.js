import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/img/bg4.svg';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        is_vendor: "0",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(formData);
        
            if (response) {
                navigate("/"); 
            } else {
              
                console.error("Registration failed:", response.error || "Unknown error");
            }
        } catch (error) {
            console.error("An error occurred during registration:", error);
        }
    };

    return (
        <center>
            <div className="container d-flex justify-content-around align-items-center m-5 text-start">
                <form method="post" className="mt-2" onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <h2>
                            <b className="text-warning">Create Account</b>
                        </h2>
                        <p>
                            Explore the latest in electronic gadgets, from smartphones to smart home devices, designed to elevate your everyday life.
                        </p>
                        <label htmlFor="name" className="form-label">Fullname</label>
                        <input
                            required
                            name="username"
                            type="text"
                            className="form-control"
                            id="username"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            required
                            name="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="form-control"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <label>Vendor or Customer</label>
                    <div>
                        <select
                            required
                            name="is_vendor"
                            className="form-select"
                            id="is_vendor"
                            value={formData.is_vendor}
                            onChange={handleChange}
                        >
                            <option value="0">Customer</option>
                            <option value="1">Vendor</option>
                        </select>
                    </div>
                    <br />
                    <p className="text-center m-0 text-start">Do you have an account? <Link to="/">Login</Link></p>
                    <button type="submit" className="btn btn-dark mt-4">Create Account</button>
                </form>
                <div class="container text-end">
            <img src={logo} alt="" width="500px" />
          </div>
            </div>
        </center>
    );
};

export default Register;
