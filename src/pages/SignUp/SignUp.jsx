import { GoogleAuthProvider, updateProfile } from "firebase/auth";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle, FaLink, FaLock, FaUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import HelmetMaker from "../../components/HelmetMaker/HelmateMaker";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import { MdOutlineBloodtype } from "react-icons/md";

const SignUp = () => {
    const { createUser, googleLogin, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [zila, setZila] = useState([]);
    const [selectedZilaID, setSelectedZilaID] = useState("");
    const [selectedZila, setSelectedZila] = useState("");
    const [selectedUpzila, setSelectedUpzila] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [upzila, setUpzila] = useState([]);

    useEffect(() => {
        axios.get("districts.json").then((data) => setZila(data.data));
        if (selectedZilaID !== "") {
            axios
                .get("upzila.json")
                .then((data) =>
                    setUpzila(
                        data.data.filter(
                            (data) => data.district_id === selectedZilaID
                        )
                    )
                );
        }
    }, [selectedZilaID]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if(user){
            return navigate(location.state || '/')
        }
        const z = zila.find((d) => d.id === selectedZilaID);
        setSelectedZila(z?.name);
    }, [zila, selectedZilaID, user, navigate]);
    const [passError, setPassError] = useState(false);
    const [passUnmatched, setPassUnmatched] = useState(false);
    const passRef = useRef();
    const passRef2 = useRef();
    const GoogleProvider = new GoogleAuthProvider();
    const handleLogin = (e) => {
        e.preventDefault();
        const isValidPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z\d]).{6,}$/;
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = passRef.current.value;
        const confirm_password = passRef2.current.value;
        const userName = form.get("userName");
        const photoURL = form.get("photo");
        const isMatchedPass = password === confirm_password;
        console.log(isMatchedPass, password, confirm_password);
        if (isMatchedPass === false) {
            return setPassUnmatched(true);
        } else {
            setPassUnmatched(false);
        }
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
                });
                if (res.user) {
                    // Adding User to databse
                    const uid = res.user.uid;
                    const user = {
                        userName,
                        photoURL,
                        email,
                        bloodGroup,
                        zila: selectedZila,
                        upzila: selectedUpzila,
                        uid,
                    };
                    axios
                        .post("http://localhost:5000/users", user)
                        .then((res) => {
                            if (res.data.insertedId) {
                                toast("Sign Up Successfull!");
                            }
                        });

                    form.reset();
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

    const handleSocialLogin = () => {
        googleLogin()
            .then((res) => {
                if (res.user) {
                    // Adding User to databse
                    const user = {
                        fullName: res.user.displayName,
                        photo: res.user.photoURL,
                        email: res.user.email,
                        bloodGroup,
                        zila: selectedZila,
                        upzila: selectedUpzila,
                        uid: res.user.uid,
                    };
                    axios
                        .put("http://localhost:5000/users", user)
                        .then((res) => {
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
                                            <FaUser />
                                            Full Name
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
                                {/* Blood Group  */}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <MdOutlineBloodtype />
                                            Blood Group
                                        </span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={bloodGroup}
                                        onChange={(e) =>
                                            setBloodGroup(e.target.value)
                                        }
                                    >
                                        <option value="" disabled>
                                            Select blood group
                                        </option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>

                                {/* Zila  */}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <MdOutlineBloodtype />
                                            Select Zila
                                        </span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={selectedZilaID}
                                        onChange={(e) =>
                                            setSelectedZilaID(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="" disabled>
                                            Select your Zila
                                        </option>
                                        {zila &&
                                            zila.map((singleZila) => (
                                                <option
                                                    key={singleZila.id}
                                                    value={singleZila.id}
                                                >
                                                    {singleZila.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                {/* Upzila  */}
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <MdOutlineBloodtype />
                                            Select Upzila
                                        </span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={selectedUpzila}
                                        onChange={(e) =>
                                            setSelectedUpzila(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="" disabled>
                                            Select your Upzila
                                        </option>
                                        {upzila &&
                                            upzila.map((singleUpzila) => (
                                                <option
                                                    key={singleUpzila.id}
                                                    value={singleUpzila.name}
                                                >
                                                    {singleUpzila.name}
                                                </option>
                                            ))}
                                            
                                    </select>
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
                                        placeholder="Password"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaLock /> Confirm Password
                                        </span>
                                    </label>
                                    <input
                                        ref={passRef2}
                                        name="confirm_password"
                                        type="password"
                                        placeholder="Confirm password"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                {passUnmatched && (
                                    <p className="text-red-600 text-sm my-2 mx-2 -mb-3">
                                        Password and Confirm Password did not
                                        matched!
                                    </p>
                                )}
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
