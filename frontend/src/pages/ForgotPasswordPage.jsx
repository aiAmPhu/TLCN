import { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import backgroundImage from "../assets/backgroundhcmute.jpg";

import axios from "axios";
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [errors, setErrors] = useState([]);
    const [otp, setOtp] = useState("");
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleOtpChange = (e) => setOtp(e.target.value);
    const handleSendOtp = async () => {
        try {
            if (!email) {
                alert("Please enter your email first.");
                return;
            }
            // Gửi yêu cầu gửi OTP
            const response = await axios.post("http://localhost:8080/api/users/sendOTP", { email });
            if (response.status === 200) {
                alert("OTP has been sent to your email.");
                setCountdown(30);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP. Please try again.");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!email) newErrors.push("Email is required");
        if (!otp) newErrors.push("OTP is required");
        if (newErrors.length > 0) {
            setErrors(newErrors);
        } else {
            try {
                // Xác minh OTP và thêm user
                const response = await axios.post(`http://localhost:8080/api/users/verify`, {
                    email,
                    otp,
                });
                alert(response.data.message);
                localStorage.setItem("email", email);
                window.location.href = "/forgotpasswordnextpage";
            } catch (error) {
                setErrors([error.response?.data?.message || "Failed to register."]);
            }
        }
    };

    const formatCountdown = () => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [countdown]);

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
                    Xác minh email
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
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#005A8E]" // HCMUTE Blue
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-4 flex items-center space-x-2">
                        {/* Input OTP */}
                        <input
                            type="text"
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#005A8E]"
                            placeholder="Nhập OTP"
                            value={otp}
                            onChange={handleOtpChange}
                            //disabled={countdown > 0} // Không cho nhập nếu đang đếm ngược
                        />
                        {/* Gửi OTP button */}
                        <button
                            type="button"
                            onClick={handleSendOtp}
                            className="px-4 py-2 bg-[#005A8E] text-white font-semibold rounded-md hover:bg-[#004d7a] transition duration-200"
                            disabled={countdown > 0} // Không cho gửi nếu đang đếm ngược
                        >
                            {countdown > 0 ? formatCountdown() : "Gửi OTP"}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#005A8E] hover:bg-[#004d7a] text-white font-semibold py-2 px-4 rounded-md transition duration-200" // HCMUTE Blue
                    >
                        Xác minh
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
