import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Button from "../components/ui/Button";
// import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    // const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    // for sending cookies if you're using sessions
                },
                body: JSON.stringify({ username: formData.username, password: formData.password }),
            });

            if (!res.ok) {
                const errorData = await response.json(); // If your server sends a message
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating background blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Login card */}
            <div className="w-full max-w-sm z-10 bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

                {error && <p className="text-red-600 text-center text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input type="text" name="username" value={formData.email} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="you@example.com" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="••••••••" />
                            <button type="button" className="absolute right-3 top-3.5 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" variant="primary" size="lg" isLoading={isLoading} onSubmit={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </div>

            {/* Custom CSS */}
            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    33% {
                        transform: translateY(-10px) rotate(120deg);
                    }
                    66% {
                        transform: translateY(5px) rotate(240deg);
                    }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Login;
