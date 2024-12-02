import React, { useState, useEffect, useNavigate } from "react";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import backgroundImage from "../assets/backgroundhcmute.jpg";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState([]);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRoleChange = (e) => setRole(e.target.value);

    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/getall");
                setUser(response.data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu", error);
            }
        };

        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];
        if (!email) newErrors.push("Email is required");
        if (!password) newErrors.push("Password is required");

        if (newErrors.length > 0) {
            setErrors(newErrors);
        } else {
            setErrors([]);
            console.log("Email:", email, "Password:", password);
        }
        const newUser = {
            email,
            password,
            role,
        };

        try {
            localStorage.clear();

            // Thêm user mới
            const response = await axios.post("http://localhost:8080/api/jwt/login", newUser);

            if (response.data?.token) {
                // Lưu token vào localStorage để sử dụng cho các request tiếp theo
                localStorage.setItem("token", response.data.token);
                console.log("Token saved:", localStorage.getItem("token"));
                if (response.data?.token) {
                    // const user = response.data.token ? JSON.parse(atob(response.data.token.split(".")[1])) : null;
                    // console.log(user);
                    //console.log("Token found:", response.data.token);
                    if (role === "user") {
                        window.location.href = "/home"; // Chuyển hướng đến trang home cho user
                    } else if (role === "admin") {
                        window.location.href = "/sidebar";
                    }
                } else {
                    console.log("No token found.");
                }
                // Chuyển hướng người dùng tới trang Home
            } else {
                alert("Login failed: No token received.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newErrors = [];
    //     if (!email) newErrors.push("Email is required");
    //     if (!password) newErrors.push("Password is required");

    //     if (newErrors.length > 0) {
    //         setErrors(newErrors);
    //     } else {
    //         setErrors([]);
    //         console.log("Email:", email, "Password:", password);
    //     }
    // };

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content container */}
            <div className="relative w-full max-w-md mx-4 bg-white shadow-2xl rounded-lg p-8 z-10">
                {/* Greeting outside the form */}
                <h2 className="text-3xl font-semibold text-center text-[#005A8E] mb-4">
                    {" "}
                    {/* HCMUTE Blue Color */}
                    Login
                </h2>
                {errors.length > 0 && (
                    <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#005A8E]" // HCMUTE Blue
                            placeholder="Enter Email Address..."
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#005A8E]" // HCMUTE Blue
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            className="w-48 px-2 py-1 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#005A8E]" // HCMUTE Blue
                            value={role}
                            onChange={handleRoleChange}
                        >
                            <option value="" disabled>
                                -- Select Role --
                            </option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="reviewer">Reviewer</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#005A8E] hover:bg-[#004d7a] text-white font-semibold py-2 px-4 rounded-md transition duration-200" // HCMUTE Blue
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Nếu chưa có tài khoản{" "}
                        <Link to="/register" className="text-[#005A8E] font-semibold hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
