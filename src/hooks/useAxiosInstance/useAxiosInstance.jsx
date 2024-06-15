import axios from 'axios';

// Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})

const useAxiosInstance = () => {
    return axiosInstance;
};

export default useAxiosInstance;