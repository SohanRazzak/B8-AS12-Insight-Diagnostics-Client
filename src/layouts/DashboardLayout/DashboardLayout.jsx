import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const DashboardLayout = () => {
    const { admin } = useContext(AuthContext);
    return (
        <>
            <Navbar />
            <div className="grid grid-cols-12 gap-3 max-w-6xl mx-auto *:border-2">
                <div className="col-span-3 flex flex-col justify-center pl-3 space-y-2 py-2">
                    {admin && (
                        <>
                            <NavLink className={(isActive)=> isActive? 'text-rose-500' : 'text-lime-600'} to="/add_banner">Add Banner</NavLink>
                            <NavLink className={(isActive)=> isActive? 'text-rose-500' : 'text-lime-600'} to="/add_test">Add Test</NavLink>
                            <NavLink className={(isActive)=> isActive? 'text-rose-500' : 'text-lime-600'} to="/deliver_result">
                                Report Delivery
                            </NavLink>
                        </>
                    )}
                </div>

                <div className="col-span-9">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
