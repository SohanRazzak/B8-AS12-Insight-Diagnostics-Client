import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../hooks/useAxiosInstance/useAxiosInstance";
import { toast } from "react-toastify";
import HelmetMaker from "../../components/HelmetMaker/HelmateMaker";
import Swal from "sweetalert2";

const AllReport = () => {
    const axiosInstance = useAxiosInstance();
    const all_report = useQuery({
        queryKey: ["all report"],
        queryFn: async () => {
            const data = await axiosInstance.get("/all-report");
            return data.data;
        },
    });
    const { data, isLoading } = all_report;
    if (isLoading || data == undefined) {
        return (
            <div className="grid place-content-center h-screen">
                <progress className="progress w-56"></progress>;
            </div>
        );
    }
    // Deleting Report
    const handleDelete = (id) => {
        Swal.fire({
            title: "Confirm Delete Report?",
            text: "this is an irreversable action!",
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/delete-report/${id}`).then((res) => {
                    if (res.data.acknowledged) {
                        toast("Report Deleted Successfully!");
                        all_report.refetch();
                    }
                });
            } else {
                Swal.fire({
                    title: "Cancelled",
                    text: "Your report is safe :)",
                    icon: "error",
                });
            }
        });
    };

    // Format Date
    function formatTimeDate(timestamp) {
        let date = new Date(timestamp);
        const formattedDate = `${("0" + date.getDate()).slice(-2)}-${(
            "0" +
            (date.getMonth() + 1)
        ).slice(-2)}-${date.getFullYear()}`;
        const formattedTime = `${("0" + date.getHours()).slice(-2)}:${(
            "0" + date.getMinutes()
        ).slice(-2)}`;
        return { formattedTime, formattedDate };
    }
    return (
        <div className="bg-indigo-50 rounded-md min-h-[calc(100vh-100px)]">
            <HelmetMaker title="All Report" />
            <h2 className="text-3xl text-center font-medium py-4 underline underline-offset-8">
                Manage Report Fom Here!
            </h2>
            <div className="w-screen md:w-full px-2 overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="min-w-36">Name & Email</th>
                            <th className="min-w-48">Report</th>
                            <th className="min-w-32">Sent On</th>
                            <th className="min-w-24">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row */}
                        {data.map((report) => {
                            return (
                                <tr key={report._id}>
                                    <td>
                                        <div className="flex flex-col">
                                            <div className="font-bold">
                                                {report.patientName}
                                            </div>
                                            <div className="text-sm opacity-90">
                                                {report.patientEmail}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {report.reportSub}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">
                                            <a
                                                target="_blank"
                                                href={report.reportLink}
                                            >
                                                See Report
                                            </a>
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span>
                                                {
                                                    formatTimeDate(
                                                        report.reportSent
                                                    ).formattedDate
                                                }
                                            </span>
                                            <span>
                                                {
                                                    formatTimeDate(
                                                        report.reportSent
                                                    ).formattedTime
                                                }{" "}
                                                Hours
                                            </span>
                                        </div>
                                    </td>
                                    <th>
                                        <button
                                            onClick={() =>
                                                handleDelete(report._id)
                                            }
                                            className="btn btn-error text-white btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReport;
