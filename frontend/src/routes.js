import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout";
import ErrorPage from "./component/errorPage";
import Signup from "./component/signup";
import Dashboard from "./component/dashboard";
import EmployeeDetails from "./component/EmployeeDetails";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <Signup />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: '/dashboard',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element:<Dashboard />},
            { path: ':id', element: <EmployeeDetails /> }
        ]
    },
])

export default routes;