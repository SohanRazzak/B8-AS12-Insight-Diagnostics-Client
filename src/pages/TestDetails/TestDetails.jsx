import { useParams } from "react-router-dom";

const TestDetails = () => {
    const {id} = useParams();
    return (
        <div>
            Showing Test Details for id: {id}
        </div>
    );
};

export default TestDetails;