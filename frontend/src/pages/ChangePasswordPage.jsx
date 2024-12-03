import { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import backgroundImage from "../assets/backgroundhcmute.jpg";

import axios from "axios";
const ChangePasswordPage = () => {
    const token = localStorage.getItem("token");
    const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState([]);
    const [userId, setUserId] = useState([]);
    const [userPassword, setUserPassword] = useState([]);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewpassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!email) newErrors.push("Email is required");
        if (!password) newErrors.push("Password is required");
        if (!newPassword) newErrors.push("Password is required");
        if (!confirmPassword) newErrors.push("Confirm password is required");
        if (newPassword !== confirmPassword) newErrors.push("New passwords do not match");
        if (password !== userPassword) newErrors.push("Wrong password");
        if (newErrors.length > 0) {
            setErrors(newErrors);
        } else {
            try {
                // Xác minh OTP và thêm user
                const response = await axios.put(`http://localhost:8080/api/users/update/${userId}`, {
                    password: newPassword,
                });
                alert(response.data.message);
                localStorage.removeItem("token"); // Xóa token khi đăng xuất
                window.location.href = "/login";
            } catch (error) {
                setErrors([error.response?.data?.message || "Failed to register."]);
            }
        }
    };

    useEffect(() => {
        if (tokenUser?.role === "admin") {
            // Nếu không có token hoặc role không phải là user, chuyển hướng về trang đăng nhập
            window.location.href = "/sidebar";
            return; // Dừng việc gọi API nếu role không phải là user
        } else if (tokenUser?.role === "admin") {
            window.location.href = "/sidebar";
            return;
        } else if (tokenUser?.role === null) {
            window.location.href = "/home";
            return;
        }
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/getall`);

                const userTpassword = response.data.find((user) => user.email === tokenUser.email)?.password;
                setUserPassword(userTpassword);
                const userTid = response.data.find((user) => user.email === tokenUser.email)?._id;
                setUserId(userTid);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu", error);
            }
        };

        fetchUser();
    }, []);

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
                    Đăng ký
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
                            placeholder="Nhập email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#005A8E]" // HCMUTE Blue
                            placeholder="Nhập mật khẩu cũ"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#005A8E]" // HCMUTE Blue
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#005A8E]" // HCMUTE Blue
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#005A8E] hover:bg-[#004d7a] text-white font-semibold py-2 px-4 rounded-md transition duration-200" // HCMUTE Blue
                    >
                        Đổi mật khẩu
                    </button>
                </form>

                {/* Login Link */}
                {/* <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Đã có tài khoản?{" "}
                        <Link to="/login" className="text-[#005A8E] font-semibold hover:underline">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default ChangePasswordPage;
