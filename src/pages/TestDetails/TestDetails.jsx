import { useLoaderData, useParams } from "react-router-dom";
import HelmetMaker from "../../components/HelmetMaker/HelmateMaker";
import ContainerLayout from "../../layouts/ContainerLayout/ContainerLayout";
import { FaCalendarAlt, FaDollarSign, FaRegClock, FaTag } from "react-icons/fa";
import { FaHandBackFist } from "react-icons/fa6";

const TestDetails = () => {
    const { id } = useParams();
    const testDetails = useLoaderData();

    const {
        imgURL,
        testName,
        testDescription,
        testDays,
        testCategory,
        _id,
        price,
        testHours,
    } = testDetails.data;
    return (
        <>
            <HelmetMaker title={`${id}`} />
            <ContainerLayout>
                <div className="grid grid-cols-12 *:border-2 gap-4">
                    <div className="col-span-9">
                        <img
                            src={imgURL}
                            alt={testName}
                            className="w-full h-80 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-3xl font-semibold mb-4">
                                {testName}
                            </h2>
                            <p className="text-lg mb-6">
                                <b className="font-bold">Description: </b>
                                {testDescription}
                            </p>
                            <h2 className="text-2xl font-semibold my-3">
                                Test Information:
                            </h2>
                            <ul>
                                <li className="text-gray-700 flex items-center gap-2">
                                    <FaHandBackFist /> Test ID: {_id}
                                </li>
                                <li className="text-gray-700 flex items-center gap-2">
                                    <FaTag />
                                    Test Category: {testCategory}
                                </li>
                                <li className="text-gray-700 flex items-center gap-2">
                                    <FaCalendarAlt />
                                    Test Taken On: {testDays}
                                </li>
                                <li className="text-gray-700 flex items-center gap-2">
                                    <FaRegClock /> {testHours}
                                </li>
                                <li className="text-gray-700 flex items-center gap-2">
                                    <FaDollarSign /> Cost: {price} BDT
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-3 p-4">
                        <h2 className="text-2xl font-semibold">Book this Test!</h2>
                    </div>
                </div>
            </ContainerLayout>
        </>
    );
};

export default TestDetails;
