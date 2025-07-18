import React from "react";
import { BrowserRouter as Router, Route, Routes, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Finances from "./pages/Finances";
import Bills from "./pages/Bills";
import Announcements from "./pages/Announcements";
import Committee from "./pages/Committee";
import Building from "./pages/Building";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import router from "./routers/router";

function App() {
    return <RouterProvider router={router} />;
}

export default App;
