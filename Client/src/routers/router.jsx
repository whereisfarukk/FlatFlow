import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Finances from "../pages/Finances";
import Bills from "../pages/Bills";
import Announcements from "../pages/Announcements";
import Committee from "../pages/Committee";
import Documents from "../pages/Documents";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import Building from "../pages/Building";
import { PrivateRoutes } from "./guards/PrivateRoutes";
import Maintenance from "../pages/Maintenance";
const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: (
            <PrivateRoutes>
                <MainLayout />
            </PrivateRoutes>
        ),
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/finances",
                element: <Finances />,
            },
            {
                path: "/bills",
                element: <Bills />,
            },
            {
                path: "/maintenance",
                element: <Maintenance />,
            },
            {
                path: "/announcements",
                element: <Announcements />,
            },
            {
                path: "/committee",
                element: <Committee />,
            },
            {
                path: "/building",
                element: <Building />,
            },
            {
                path: "/documents",
                element: <Documents />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
]);
export default router;
