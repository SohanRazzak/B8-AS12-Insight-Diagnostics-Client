import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';
import Navbar from "../../components/Navbar/Navbar";
const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet />
            <ToastContainer/>
        </div>
    );
};

export default MainLayout;
