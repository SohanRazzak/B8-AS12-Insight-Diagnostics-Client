import { toast } from "react-toastify";
import useAxiosInstance from "../../hooks/useAxiosInstance/useAxiosInstance";
import { FaDollarSign, FaLink, FaListAlt, FaRegCalendarAlt, FaRegClock, FaUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaClockRotateLeft } from "react-icons/fa6";

const AddTest = () => {
    const axiosInstance = useAxiosInstance();
    const handleAddTest = (e) => {
        e.preventDefault();
        const form = e.target;
        const newTest = {
            testName: form.testName.value,
            testCategory: form.testCategory.value,
            testDays: form.testDays.value,
            testHours: form.testHours.value,
            imgURL: form.imgURL.value,
            testDescription: form.testDescription.value,
            testDuration: form.testDuration.value,
            price: parseInt(form.price.value),
        };
        axiosInstance.post("/add-test", newTest).then((data) => {
            if (data.data.acknowledged) {
                toast("Test Added Successfully!");
                form.reset();
            }
        });
    };
    return (
        <div className="bg-indigo-50 rounded-md min-h-[calc(100vh-100px)]">
            <h2 className="text-3xl text-center font-medium py-4 underline underline-offset-8">
                Add a new test!
            </h2>
            <form
                onSubmit={handleAddTest}
                className="grid md:grid-cols-2 gap-4 p-5 lg:p-8 !pt-2"
            >
                {/* Test name  */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaUser />
                            Test Name
                        </span>
                    </label>
                    <input
                        name="testName"
                        type="text"
                        placeholder="Test Name"
                        className="input input-bordered"
                        required
                    />
                </div>
                {/* Test Category */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FiMail /> Test Category
                        </span>
                    </label>
                    <input
                        name="testCategory"
                        type="text"
                        placeholder="Category"
                        className="input input-bordered"
                        required
                    />
                </div>
                {/* Test available on days */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaRegCalendarAlt /> Test Days
                        </span>
                    </label>
                    <input
                        name="testDays"
                        type="text"
                        placeholder="Test avalilable on days (ie: Sun-Wed)"
                        className="input input-bordered"
                        required
                    />
                </div>
                {/* Test Hours */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaRegClock /> Test Hours
                        </span>
                    </label>
                    <input
                        name="testHours"
                        type="text"
                        placeholder="Test taken on; (ie: 10:30AM-1:20PM)"
                        className="input input-bordered"
                        required
                    />
                </div>
                {/* Image URL */}
                <div className="form-control col-span-2">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaLink /> Image URL
                        </span>
                    </label>
                    <input
                        name="imgURL"
                        type="text"
                        placeholder="Image URL"
                        className="input input-bordered"
                        required
                    />
                </div>
                {/* Test Description  */}
                <div className="form-control col-span-2">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaListAlt /> Test Description
                        </span>
                    </label>
                    <textarea
                        name="testDescription"
                        className="textarea textarea-bordered"
                        placeholder="Test Description"
                    ></textarea>
                </div>
                {/* Test Duration */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaClockRotateLeft /> Test Duration
                        </span>
                    </label>
                    <input
                        name="testDuration"
                        type="text"
                        placeholder="Esteemated time taken (in Min)"
                        className="input input-bordered"
                        required
                    />
                </div>
                {/* Test Price */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaDollarSign /> Price
                        </span>
                    </label>
                    <input
                        name="price"
                        type="text"
                        placeholder="Test Price without discount"
                        className="input input-bordered"
                        required
                    />
                </div>
                {/* Submit Btn */}
                <button className="col-span-2 btn btn-neutral bg-party-main border-none hover:bg-party-hover text-white w-40 mx-auto">
                    Add Test
                </button>
            </form>
        </div>
    );
};

export default AddTest;
