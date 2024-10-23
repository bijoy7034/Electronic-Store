import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

const ProtectedRoute = ({children}) => {

    const { isAuthenticated } = useAuth()

    if (!isAuthenticated){
        <Navigate to='/' />
    }

    return children
}
 
export default ProtectedRoute;