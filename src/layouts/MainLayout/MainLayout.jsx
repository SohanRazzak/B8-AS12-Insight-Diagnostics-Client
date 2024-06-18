import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet />
            <Footer/>
            <ToastContainer/>
        </div>
    );
};

export default MainLayout;
