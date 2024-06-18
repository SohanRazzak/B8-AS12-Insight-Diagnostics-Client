
import { PropTypes } from "prop-types";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AdminRoute = ({children}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const {admin, logOutUser} = useContext(AuthContext)

    if (admin){
        return children
    }
    else{
        return logOutUser();
    }
};

AdminRoute.propTypes = {
    children: PropTypes.node
}

export default AdminRoute;