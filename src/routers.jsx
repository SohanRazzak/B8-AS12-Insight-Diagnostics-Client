import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error/Error";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

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
            }
        ]
    }
])

export default routers