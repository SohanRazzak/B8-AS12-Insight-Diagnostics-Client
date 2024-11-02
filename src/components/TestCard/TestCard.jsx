import { PropTypes } from "prop-types";
import { FaCalendarAlt, FaDollarSign, FaRegClock, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";
const TestCard = ({ data }) => {
    console.log(data);
    const {imgURL, testName, testDescription, testDays, testCategory, _id, price, testHours} = data
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="h-44 relative">
                <span className="absolute bottom-0 border-b-2 py-1 bg-white bg-opacity-70 text-gray-800 font-medium w-full flex items-center gap-2 justify-center"><FaCalendarAlt/> {testDays}</span>
                <span className="absolute top-5 left-0 bg-white rounded-r-md px-2 py-1 text-sm font-medium font-mono text-gray-700 flex items-center gap-2"><FaTag/> {testCategory}</span>
                <img
                    src={imgURL}
                    alt={testName}
                    className="object-cover"
                />
            </figure>
            <div className="card-body py-3 px-5">
                <h2 className="card-title">{testName}</h2>
                <p>{testDescription.slice(0,74) + "..."}</p>
                <p className="text-gray-700 flex items-center gap-2 text-sm"><FaDollarSign/> Cost: {price} BDT</p>
                <p className="text-gray-700 flex items-center gap-2 text-sm"><FaRegClock/> {testHours}</p>
                <div className="card-actions justify-center">
                    <Link to={`/test_details/${_id}`} className="btn btn-success text-white mt-3">View Details</Link>
                </div>
            </div>
        </div>
    );
};

TestCard.propTypes = {
    data: PropTypes.object,
};
export default TestCard;
