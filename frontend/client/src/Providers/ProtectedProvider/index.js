import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedProvider = ({ children }) => {
    const isAuth = localStorage.getItem("isAuth")
    if (isAuth === false || isAuth === null) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};
export default ProtectedProvider;