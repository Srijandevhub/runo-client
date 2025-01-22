import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { data, loading } = useSelector((state) => state.user);

    if (loading) {
        return <></>
    }

    return data ? children : <Navigate to="/signin"/>;
}


export default ProtectedRoute