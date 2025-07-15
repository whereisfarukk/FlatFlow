import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="finances" element={<Finances />} />
                    <Route path="bills" element={<Bills />} />
                    <Route path="announcements" element={<Announcements />} />
                    <Route path="committee" element={<Committee />} />
                    <Route path="building" element={<Building />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="*" element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
