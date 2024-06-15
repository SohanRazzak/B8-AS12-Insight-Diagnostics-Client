import { GoogleAuthProvider, updateProfile } from "firebase/auth";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle, FaLink, FaLock, FaUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import HelmetMaker from "../../components/HelmetMaker/HelmateMaker";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const SignUp = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const location = useLocation();
    const moveTo = useNavigate();
    const { createUser, googleLogin } = useContext(AuthContext);
    const [passError, setPassError] = useState(false);
    const passRef = useRef();
    const GoogleProvider = new GoogleAuthProvider();
    const handleLogin = (e) => {
        e.preventDefault();
        const isValidPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z\d]).{6,}$/;
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = passRef.current.value;
        const userName = form.get("userName");
        const photoURL = form.get("photo");
        if (!isValidPass.test(password)) {
            return setPassError(true);
        } else {
            setPassError(false);
        }
        createUser(email, password)
            .then((res) => {
                updateProfile(res.user, {
                    displayName: userName,
                    photoURL: photoURL,
                }).then(() => {
                    toast("Sign Up Successfull!");
                    location.state ? moveTo(location.state) : moveTo("/");
                });
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
            .then(() => {
                toast("Login Successfull!");
                location.state ? moveTo(location.state) : moveTo("/");
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
            <HelmetMaker title="Create Account" />
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form
                                className="grid md:grid-cols-2 gap-4"
                                onSubmit={handleLogin}
                            >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaUser /> Name
                                        </span>
                                    </label>
                                    <input
                                        name="userName"
                                        type="text"
                                        placeholder="name"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaLink /> Photo URL (Optional)
                                        </span>
                                    </label>
                                    <input
                                        name="photo"
                                        type="text"
                                        placeholder="photo URL"
                                        className="input input-bordered"
                                    />
                                </div>
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
                                        ref={passRef}
                                        name="password"
                                        type="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                {passError ? (
                                    <p className="text-red-600 text-sm my-2 mx-2 -mb-3">
                                        Make Sure Your Password Contains At
                                        Least
                                        <li>One Capital Letter,</li>
                                        <li>One Small Letter</li>
                                        <li>One Special Character</li>
                                        <li>Is 6 Characters Long</li>
                                    </p>
                                ) : null}
                                <div className="form-control mt-5 md:col-span-2">
                                    <button className="btn btn-neutral bg-party-main border-none hover:bg-party-hover text-white w-40 mx-auto">
                                        Create User
                                    </button>
                                </div>
                                <p className="md:col-span-2 text-center">
                                    Already have an account?{" "}
                                    <Link
                                        className="font-medium text-party-main"
                                        to="/sign_in"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </form>
                            <hr className="border-2 space-y-2" />
                            <div className="flex flex-wrap md:flex-nowrap gap-5 justify-center items-center px-7 mt-2">
                                <button
                                    onClick={() =>
                                        handleSocialLogin(GoogleProvider)
                                    }
                                    className="px-4 py-2 rounded-lg border-teal-600 border-2 text-xl font-semibold hover:text-white hover:bg-teal-500 text-teal-600 flex items-center gap-3 justify-center w-40"
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

export default SignUp;
