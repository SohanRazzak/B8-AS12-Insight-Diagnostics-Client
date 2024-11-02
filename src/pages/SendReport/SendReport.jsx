import { FaLink, FaList, FaUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import useAxiosInstance from "../../hooks/useAxiosInstance/useAxiosInstance";
import { toast } from "react-toastify";

const SendReport = () => {
    const axiosInstance = useAxiosInstance();
    const handleSendReport = (e) => {
        e.preventDefault();
        const form = e.target;
        const report = {
            patientName: form.patientName.value,
            patientEmail: form.patientEmail.value,
            reportLink: form.report.value,
            reportSub: form.reportSub.value,
            reportSent: Date.now()
        };
        axiosInstance.post("/send-report", report).then((data) => {
            if (data.data.acknowledged) {
                toast("Report Send Successfully!");
                form.reset();
            }
        });
    };
    return (
        <div className="bg-indigo-50 rounded-md min-h-[calc(100vh-100px)]">
            <h2 className="text-3xl text-center font-medium py-4 underline underline-offset-8">
                Deliver test report!
            </h2>
            <form
                onSubmit={handleSendReport}
                className="grid md:grid-cols-2 gap-4 p-5 lg:p-8 !pt-2"
            >
                {/* Patient or Users' name  */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaUser />
                            Patient Name
                        </span>
                    </label>
                    <input
                        name="patientName"
                        type="text"
                        placeholder="Name"
                        className="input input-bordered"
                        required
                    />
                </div>
                {/* Patient or Users' email, This will be used to Filter user */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FiMail /> Patient Email
                        </span>
                    </label>
                    <input
                        name="patientEmail"
                        type="email"
                        placeholder="Email"
                        className="input input-bordered"
                        required
                    />
                </div>
                {/* Report Subject */}
                <div className="form-control col-span-2">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaList /> Report Subject
                        </span>
                    </label>
                    <input
                        name="reportSub"
                        type="text"
                        placeholder="Report Subject"
                        className="input input-bordered"
                        required
                    />
                </div>
                {/* Report Link */}
                <div className="form-control col-span-2">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <FaLink /> Report URL
                        </span>
                    </label>
                    <input
                        name="report"
                        type="text"
                        placeholder="Report URL"
                        className="input input-bordered"
                        required
                    />
                </div>
                {/* Submit Btn */}
                <button className="col-span-2 btn btn-neutral bg-party-main border-none hover:bg-party-hover text-white w-40 mx-auto">
                    Send Report
                </button>
            </form>
        </div>
    );
};

export default SendReport;
