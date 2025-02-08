import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
    const { data, loading } = useSelector((state) => state.user);

    if (loading) {
        return <></>
    }

    if (!data) {
        return <Navigate to="/signin"/>
    } else {
        if (data.role !== 'admin') {
            return <Navigate to="/"/>
        }
    }

    return children

}

export default AdminProtected