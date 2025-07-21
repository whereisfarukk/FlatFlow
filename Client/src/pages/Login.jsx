import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";

import Button from "../components/ui/Button";
import Shape from "../assets/shapes.svg";
// import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    // const { login } = useAuth();
    const [formData, setFormData] = useState({
        apartmentname: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    // for sending cookies if you're using sessions
                },
                body: JSON.stringify({ apartmentname: formData.apartmentname, password: formData.password }),
            });
            console.log(res);
            if (!res.ok) {
                const errorData = await res.json(); // If your server sends a message
                console.error("❌ Login failed:", errorData.message || "Unknown error");
                return;
            }
            const data = await res.json();
            console.log(data);
            localStorage.setItem("isAuthenticated", "true");
            navigate("/dashboard");

            // setError("");
            // try {
            //     const success = true;
            //     if (success) {
            //         localStorage.setItem("isAuthenticated", "true");
            //         navigate("/dashboard");
            //     }
            // } catch (err) {
            //     setError("Login failed. Try again.");
            // } finally {
            //     setIsLoading(false);
            // }
        } catch (e) {
            console.error("🚨 Network/server error:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-[#4b695c] relative overflow-hidden flex items-center justify-center">
            {/* Background decorative circles */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full -translate-x-48 -translate-y-48"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent rounded-full translate-x-32 translate-y-32"></div>
            <motion.img
                className="absolute w-[600px] h-[600px] top-0 left-0"
                src={Shape}
                alt="Logo"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 50,
                    ease: "linear",
                }}
            />
            {/* Main card container */}
            <div className="relative w-full max-w-5xl mx-4">
                <div className="bg-[rgba(250,238,214,0.8)] rounded-3xl px-12 py-16 shadow-xl relative">
                    {/* Login form container */}
                    <div className="bg-[#4c6b5c] rounded-2xl p-8 max-w-sm mx-auto mt-8">
                        <h1 className="text-[#efe6cf] text-2xl font-semibold mb-8">Login</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* apartment number Field */}
                            <div className="space-y-2">
                                <label htmlFor="ssn" className="text-[#efe6cf] text-sm font-medium block">
                                    Apartment Numer
                                </label>
                                <input
                                    type="text"
                                    name="apartmentname"
                                    value={formData.apartmentname}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g 10A"
                                    className="w-full text-card-foreground bg-[#faeed6] border-none rounded-lg h-12 px-4 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-[#efe6cf] text-sm font-medium block">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••"
                                        name="password"
                                        onChange={handleChange}
                                        className="w-full text-card-foreground bg-[#faeed6] border-none rounded-lg h-12 px-4 pr-12 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors">
                                        {showPassword ? <EyeOff size={18} className="text-[#4c6b5c]" /> : <Eye size={18} className="text-[#4c6b5c]" />}
                                    </button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button type="submit" variant="primary" size="lg" isLoading={isLoading} onSubmit={handleSubmit} className="w-full bg-[#ffca48] hover:bg-[#e3b644] text-accent-foreground font-semibold h-12 rounded-lg mt-8 transition-colors focus:outline-none ">
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
