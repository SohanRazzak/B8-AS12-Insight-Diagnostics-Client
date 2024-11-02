import { GoogleAuthProvider } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle, FaLock } from "react-icons/fa";
import HelmetMaker from "../../components/HelmetMaker/HelmateMaker";
import { FiMail } from "react-icons/fi";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const SignIn = () => {
    const navigate = useNavigate();
    const { logInUser, googleLogin, user } = useContext(AuthContext);
    useEffect(() => {
        window.scrollTo(0, 0);
        if(user){
            return navigate(location.state || '/')
        }
    }, [user, navigate]);
    const GoogleProvider = new GoogleAuthProvider();
    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        logInUser(email, password)
            .then(() => {
                toast("Login Successfull!");
                location.state ? navigate(location.state) : navigate("/");
            })
            .catch((err) =>
                toast(
                    err.code
                        .replace(/[-]/g, " ")
                        .replace("auth/", "")
                        .toUpperCase()
                )
            );
    };

    const handleSocialLogin = () => {
        googleLogin()
            .then((res) => {
                if (res.user) {
                    // Adding User to databse
                    const user = {
                        fullName: res.user.displayName,
                        photo: res.user.photoURL,
                        email: res.user.email,
                        bloodGroup: "---",
                        zila: "---",
                        upzila: "---",
                        uid: res.user.uid,
                        status: 'active'
                    };
                    axios.put("http://localhost:5000/users", user).then((res) => {
                        if (res.data.insertedId) {
                            toast("Login Successful!");
                        }
                    });
                    location.state ? navigate(location.state) : navigate("/");
                }
            })
            .catch((err) =>
                toast(
                    err.code
                        .replace(/[-]/g, " ")
                        .replace("auth/", "")
                        .toUpperCase()
                )
            );
    };


    
    
    return (
        <>
            <HelmetMaker title="Sign In" />
            <div className="hero min-h-[calc(100vh-76px)] bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card w-[350px] shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FiMail /> Email
                                        </span>
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="email"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaLock /> Password
                                        </span>
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-neutral bg-party-main border-none hover:bg-party-hover text-white">
                                        Login
                                    </button>
                                </div>
                                <p className="ml-1 mt-2">
                                    Don&#39;t have an account?{" "}
                                    <Link
                                        className="font-medium text-party-main"
                                        to="/sign_up"
                                    >
                                        Register
                                    </Link>
                                </p>
                            </form>
                            <hr className="border-2 space-y-2" />
                            <div className="flex flex-wrap md:flex-nowrap gap-5 justify-center items-center px-7 mt-2">
                                <button
                                    onClick={() =>
                                        handleSocialLogin(GoogleProvider)
                                    }
                                    className="px-4 py-2 rounded-lg border-teal-600 border-2 text-xl font-semibold hover:text-white hover:bg-teal-500 w-full text-teal-600 flex items-center gap-3 justify-center"
                                >
                                    <FaGoogle /> Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
