import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userData = await login({ username, password });
            if (userData.success) {
                if(userData.is_vendor){
                    navigate('/dashboard')
                }else{
                    navigate('/home')
                }
            } else {
                setError(userData.error);
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please try again.");
        }
    };

    return (
        <>
            <section className="py-3 py-md-5 py-xl-8">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-5">
                                <h2 className="display-5 fw-bold text-center text-warning">Sign in</h2>
                                <p className="text-center m-0">
                                    Don't have an account? <Link to="/register" className="text-decoration-none">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            <div className="row gy-5 justify-content-center">
                                <div className="col-12 col-lg-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row gy-3 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input 
                                                        type="text" 
                                                        className="form-control border-0 border-bottom rounded-0" 
                                                        id="username" 
                                                        placeholder="Username" 
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        required 
                                                    />
                                                    <label htmlFor="username" className="form-label">Username</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input 
                                                        type="password" 
                                                        className="form-control border-0 border-bottom rounded-0" 
                                                        id="password" 
                                                        placeholder="Password" 
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)} 
                                                        required 
                                                    />
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                </div>
                                            </div>
                                            {error && <div className="alert alert-danger">{error}</div>} 
                                            <div className="col-12">
                                                <div className="row justify-content-between">
                                                    <div className="col-6">
                                                        <div className="form-check">
                                                            <input 
                                                                className="form-check-input" 
                                                                type="checkbox" 
                                                                id="remember_me" 
                                                            />
                                                            <label className="form-check-label text-secondary" htmlFor="remember_me">
                                                                Remember me
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 text-end">
                                                        <Link to="/forgot-password" className="link-secondary text-decoration-none">Forgot password?</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <button className="btn btn-lg btn-dark rounded-0 fs-6" type="submit">Log in</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center gap-3 flex-lg-column">
                                    <div className="bg-dark h-100 d-none d-lg-block" style={{ width: "1px", opacity: ".1" }}></div>
                                    <div className="bg-dark w-100 d-lg-none" style={{ height: "1px", opacity: ".1" }}></div>
                                    <div>or</div>
                                    <div className="bg-dark h-100 d-none d-lg-block" style={{ width: "1px", opacity: ".1" }}></div>
                                    <div className="bg-dark w-100 d-lg-none" style={{ height: "1px", opacity: ".1" }}></div>
                                </div>
                                <div className="col-12 col-lg-5 d-flex align-items-center">
                                    <div className="d-flex gap-3 flex-column w-100 ">
                                        <a href="#!" className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google text-danger" viewBox="0 0 16 16">
                                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                            </svg>
                                            <span className="ms-2 fs-6 flex-grow-1">Continue with Google</span>
                                        </a>
                                        <a href="#!" className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-apple text-dark" viewBox="0 0 16 16">
                                                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                            </svg>
                                            <span className="ms-2 fs-6 flex-grow-1">Continue with Apple</span>
                                        </a>
                                        <a href="#!" className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook text-primary" viewBox="0 0 16 16">
                                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 15c-.6 0-1-.1-1.2-.3.2-.2.5-.6.5-1v-1H6.5c-.3 0-.5-.2-.5-.5v-1c0-.3.2-.5.5-.5H8V10H6c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h1.5V6c0-1.1.8-2 1.9-2h1.2c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5H9c-.6 0-.9.3-.9.8v1.2H10c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5H8.2c.2.6.7 1 1.8 1H11c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5H8z" />
                                            </svg>
                                            <span className="ms-2 fs-6 flex-grow-1">Continue with Facebook</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
