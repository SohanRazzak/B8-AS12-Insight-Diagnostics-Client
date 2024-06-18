import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error/Error";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import AllTests from "./pages/AllTests/AllTests";
import TestDetails from "./pages/TestDetails/TestDetails";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import AllUser from "./pages/AllUser/AllUser";
import DashboardData from "./pages/DashboardData/DashboardData";
import AddBanner from "./pages/AddBanner/AddBanner";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AddTest from "./pages/AddTest/AddTest";
import SendReport from "./pages/SendReport/SendReport";

const routers = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/sign_in',
                element: <SignIn/>
            },
            {
                path: '/sign_up',
                element: <SignUp/>
            },
            {
                path: '/all_tests',
                element: <AllTests/>
            },
            {
                path: '/test_details/:id',
                element: <PrivateRoute><TestDetails/></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <DashboardData/>
            },
            {
                path: '/dashboard/users',
                element: <AllUser/>
            },
            
            {
                path: '/dashboard/add_banner',
                element: <AdminRoute><AddBanner/></AdminRoute>
            },
            {
                path: '/dashboard/add_test',
                element: <AdminRoute><AddTest/></AdminRoute>
            },
            {
                path: '/dashboard/deliver_result',
                element: <AdminRoute><SendReport/></AdminRoute>
            }
        ]
    }
])

export default routers