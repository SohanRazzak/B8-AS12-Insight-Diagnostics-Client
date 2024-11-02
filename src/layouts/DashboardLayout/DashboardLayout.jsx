import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';
import { FaBook, FaCalendarAlt, FaImage, FaPlusCircle, FaTelegram, FaUserCircle } from "react-icons/fa"
import Footer from "../../components/Footer/Footer";

const DashboardLayout = () => {
    const { admin, user } = useContext(AuthContext);
    return (
        <>
            <Navbar />
            <div className="grid lg:grid-cols-12 gap-3 max-w-6xl mx-auto">
                <div className="lg:col-span-3 flex flex-wrap gap-5 lg:flex-col p-5 font-semibold bg-indigo-50 rounded-md mb-4">
                    {
                        user && (
                            <>
                            <NavLink className={({isActive})=> isActive? 'text-rose-500' : 'text-gray-800'} to="/dashboard/my_profile"> <span className="flex gap-2 items-center"><FaUserCircle/> My Profile</span></NavLink>
                            <NavLink className={({isActive})=> isActive? 'text-rose-500' : 'text-gray-800'} to="/dashboard/reservation"> <span className="flex gap-2 items-center"><FaCalendarAlt/> Upcoming Test</span></NavLink>
                            <NavLink className={({isActive})=> isActive? 'text-rose-500' : 'text-gray-800'} to="/dashboard/report">
                            <span className="flex gap-2 items-center"><FaBook/> Reports</span>
                            </NavLink>
                        </>
                        )
                    }
                    {admin && (
                        <>
                            <NavLink className={({isActive})=> isActive? 'text-rose-500' : 'text-gray-800'} to="/dashboard/add_banner"> <span className="flex gap-2 items-center"><FaImage/> Add Banner</span></NavLink>
                            <NavLink className={({isActive})=> isActive? 'text-rose-500' : 'text-gray-800'} to="/dashboard/add_test"> <span className="flex gap-2 items-center"><FaPlusCircle/> Add Test</span></NavLink>
                            <NavLink className={({isActive})=> isActive? 'text-rose-500' : 'text-gray-800'} to="/dashboard/deliver_result">
                                <span className="flex gap-2 items-center"><FaTelegram/> Report Delivery</span>
                            </NavLink>
                            <NavLink className={({isActive})=> isActive? 'text-rose-500' : 'text-gray-800'} to="/dashboard/all_report">
                                <span className="flex gap-2 items-center"><FaBook/>All Report</span>
                            </NavLink>
                        </>
                    )}
                </div>

                <div className="lg:col-span-9">
                    <Outlet />
                </div>
            </div>
            <Footer/>
            <ToastContainer className="z-50"/>
        </>
    );
};

export default DashboardLayout;
