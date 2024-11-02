import { useQuery } from "@tanstack/react-query";
import HelmetMaker from "../../components/HelmetMaker/HelmateMaker";
import useAxiosInstance from "../../hooks/useAxiosInstance/useAxiosInstance";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../configs/firebase.config";
import { useState } from "react";
import { FaCheck, FaTrashAlt, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "../AddBanner/AddBanner.css"

const AddBanner = () => {
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [bytes, setBytes] = useState({ total: 0, uploaded: 0 });

    const axiosInstance = useAxiosInstance();

    const all_banner = useQuery({
        queryKey: ["all banner"],
        queryFn: async () => {
            const data = await axiosInstance.get("/all-banner");
            return data.data;
        },
    });
    const { data, isLoading } = all_banner;

    // Deleting Banner
    const handleDelete = (e) => {
        e.preventDefault();
    };

    // Adding New Banner
    const handleAddBanner = (e) => {
        e.preventDefault();
        alert("add this banner");
        const form = e.target;
        const bannerInfo = {
            heading: form.heading.value,
            subHeading: form.subhead.value,
            btnText: form.btnText.value,
            btnLink: form.btnLink.value,
            image: imageURL,
        };
        console.log(bannerInfo);

        // Storing in Database
        axiosInstance.post("/add-banner", bannerInfo).then((res) => {
            if (res.data.acknowledged) {
                toast("Banner Added Successfully!");
                setImageURL(null);
                setBtnDisabled(true);
                form.reset();
            }
        });
    };

    // firebase Upload file

    const handleUpload = () => {
        if (!file) {
            Swal.fire({
                title: "No Selected File!",
                text: "Please select a Image file first!",
                icon: "error",
                target: document.querySelector("#add_banner_modal"),
                customClass: { container: "!z-[9999]" },
            });
            return null;
        }

        const storageRef = ref(storage, `upload_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log(snapshot);
                setBytes({
                    total: snapshot.totalBytes,
                    uploaded: snapshot.bytesTransferred,
                });
                if (snapshot.totalBytes === snapshot.bytesTransferred) {
                    setBtnDisabled(false);
                }
            },
            (error) => {
                console.error("Upload failed:", error);
            },
            () => {
                // Get the download URL once the upload is complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    // Setting this url in state for storing
                    setImageURL(downloadURL);
                });
            }
        );
    };

    return (
        <>
            <HelmetMaker title="Add Banner" />
            <div className="bg-indigo-50 rounded-md min-h-[calc(100vh-100px)]">
                <h2 className="text-3xl text-center font-medium py-4 underline underline-offset-8">
                    Set or Add New Banner!
                </h2>
                <div className="w-screen md:w-full px-2 overflow-x-auto">
                    {isLoading || data == undefined ? (
                        <div className="grid place-content-center h-40">
                            <progress className="progress w-56"></progress>;
                        </div>
                    ) : (
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="min-w-36">Heading</th>
                                    <th className="min-w-48">Banner Image</th>
                                    <th className="min-w-24">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row */}
                                {data.map((banner) => {
                                    return (
                                        <tr key={banner._id}>
                                            <td>
                                                <div className="font-bold">
                                                    {banner.heading}
                                                </div>
                                            </td>
                                            <td>
                                                {banner.reportSub}
                                                <br />
                                                <span className="badge badge-ghost badge-sm">
                                                    <a
                                                        target="_blank"
                                                        href={banner.reportLink}
                                                    >
                                                        <button
                                                            className="btn"
                                                            onClick={() =>
                                                                document
                                                                    .getElementById(
                                                                        "my_modal_3"
                                                                    )
                                                                    .showModal()
                                                            }
                                                        >
                                                            See Image
                                                        </button>
                                                        <dialog
                                                            id="my_modal_3"
                                                            className="modal"
                                                        >
                                                            <div className="modal-box">
                                                                <form method="dialog">
                                                                    {/* if there is a button in form, it will close the modal */}
                                                                    <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">
                                                                        ✕
                                                                    </button>
                                                                </form>
                                                                <img
                                                                    src={
                                                                        banner.image
                                                                    }
                                                                    className="w-96 mx-auto border-2 border-accent object-cover rounded-lg"
                                                                />
                                                            </div>
                                                        </dialog>
                                                    </a>
                                                </span>
                                            </td>

                                            <th className="flex gap-2 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(banner._id)
                                                    }
                                                    className="btn btn-error text-white btn-sm"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(banner._id)
                                                    }
                                                    className="btn btn-success text-white btn-sm"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </th>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="text-center my-8">
                    <button
                        onClick={() =>
                            document
                                .getElementById("add_banner_modal")
                                .showModal()
                        }
                        className="btn btn-neutral bg-party-main border-none hover:bg-party-hover text-white my-6"
                    >
                        Add New Banner
                    </button>
                    <dialog id="add_banner_modal" className="modal">
                        <div className="modal-box max-w-2xl">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    ✕
                                </button>
                            </form>
                            <h3 className="font-bold text-lg">
                                Add a new Banner!
                            </h3>
                            <form
                                className="my-4 mx-2 grid md:grid-cols-2 gap-3"
                                onSubmit={handleAddBanner}
                            >
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Banner Heading
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="heading"
                                        placeholder="Put Banner Heading Here"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Banner Sub-Heading
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="subhead"
                                        placeholder="Put Banner Sub-Heading Here"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Banner Button Text
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="btnText"
                                        placeholder="Put Button Text"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Banner Button Link
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="btnLink"
                                        placeholder="Put Button Link"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </label>
                                {/* Upload a file  */}
                                <div className="flex items-end gap-3 md:col-span-2 mx-auto">
                                    <label className="form-control w-full max-w-xs mx-auto">
                                        <div className="label">
                                            <span className="label-text">
                                                Pick a file
                                            </span>
                                        </div>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={(e) =>
                                                setFile(e.target.files[0])
                                            }
                                            className="file-input file-input-bordered w-full max-w-xs"
                                            required
                                        />
                                    </label>
                                    <div
                                        className="btn btn-accent btn-square"
                                        onClick={handleUpload}
                                    >
                                        <FaUpload />
                                    </div>
                                </div>
                                {bytes.total !== bytes.uploaded && (
                                    <progress className="mx-auto my-4 md:col-span-2 progress progress-info w-64"></progress>
                                )}
                                <button
                                    type="submit"
                                    disabled={btnDisabled}
                                    className="btn btn-warning text-white w-40 md:col-span-2 mx-auto my-2"
                                >
                                    Add This Banner
                                </button>
                            </form>
                        </div>
                    </dialog>
                </div>
            </div>
        </>
    );
};

export default AddBanner;
