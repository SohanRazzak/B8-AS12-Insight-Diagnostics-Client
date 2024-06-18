
import { Navigate, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const PrivateRoute = ({children}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const {user} = useContext(AuthContext)
    const  location = useLocation()

    if (user){
        return children
    }
    else{
        return <Navigate to="/sign_in" state={location.pathname}/>
    }
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;