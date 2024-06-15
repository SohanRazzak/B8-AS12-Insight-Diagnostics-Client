import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const handleLogout = () => {
        logOutUser()
            .then(() => toast("Logged Out!"))
            .catch((err) => toast(err.code));
    };
    const navlinks = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            {user && (
                <li>
                    <NavLink to="/wishlist">Wishlist</NavLink>
                </li>
            )}
            <li>
                <NavLink to="/request">Request</NavLink>
            </li>
            <li>
                <NavLink to="/services">Services</NavLink>
            </li>
        </>
    );

    const defaultPhotoURL = "https://i.ibb.co/D9tmthh/6769264-60111.jpg";

    return (
        <nav className="navbar bg-base-100 sticky top-0 z-10 px-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-lg w-56 font-semibold text-lg text-gray-700 space-y-1"
                    >
                        {navlinks}
                    </ul>
                </div>
                <Link
                    to="/"
                    className="tracking-tight md:tracking-normal px-2 md:px-4 btn btn-ghost normal-case text-2xl font-black text-rose-600 hover:text-teal-800 drop-shadow-md"
                >
                    Insight Diagnostics
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold text-lg">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-end">
                {!user && (
                    <Link
                        to="/login"
                        className="btn btn-neutral bg-party-main border-none hover:bg-party-hover text-white mr-2"
                    >
                        Login
                    </Link>
                )}
                {user && (
                    <>
                        <img
                            className="w-11 h-11 rounded-full mr-3"
                            src={user?.photoURL || defaultPhotoURL}
                            alt={user.displayName}
                        />
                        <button
                            onClick={handleLogout}
                            to="/login"
                            className="btn btn-neutral bg-party-main border-none hover:bg-party-hover text-white mr-2"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
