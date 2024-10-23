import axios from "axios";
import { createContext, useContext, useState } from "react";


const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const login = async (credentials) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/login/', credentials)
            setUser(response.data.user)
            setToken(response.data.access)
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            setIsAuthenticated(true)
            return {success : true, is_vendor : response.data.user.is_vendor}
        } catch (err) {
            console.log(err)
            return {success : false, error : err.response?.data?.error || 'Login Failed' }
        }
    }
    
    const register = async(formData) =>{
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', formData)
            return response.data.user
        }catch(err){
            console.log(err)
        }
    }

    const logout = ()=>{
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{user, token, register,  login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export default AuthContextProvider



