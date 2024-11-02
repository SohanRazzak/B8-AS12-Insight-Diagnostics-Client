import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../hooks/useAxiosInstance/useAxiosInstance";
import HelmetMaker from "../../components/HelmetMaker/HelmateMaker";
import ContainerLayout from "../../layouts/ContainerLayout/ContainerLayout";
import TestCard from "../../components/TestCard/TestCard";

const AllTests = () => {
    const axiosInstance = useAxiosInstance()
    const all_test = useQuery({
        queryKey: ['All Test'],
        queryFn: async()=>{
            return axiosInstance.get("/all-test")
            .then(res=> res.data)
        }
    })
    const { data, isLoading } = all_test;
    if (isLoading) {
        return (
            <div className="grid place-content-center h-screen">
                <progress className="progress w-56"></progress>;
            </div>
        );
    }
    return (
        <>
            <HelmetMaker title="All Test"/>
            <ContainerLayout>
            <h2 className="text-3xl text-center font-medium py-4 underline underline-offset-8">
                See All Available Test
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data.map(test => <TestCard data={test} key={test._id}/>)}
            </div>
            </ContainerLayout>
        </>
    );
};

export default AllTests;