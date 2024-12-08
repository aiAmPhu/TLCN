import { useState, useEffect } from "react";
import Header from "../../components/Header";
import AdmissionInformation from "../../components/Profile/AdmissionInformation";
import LearningProcess from "../../components/Profile/LearningProcess";
import PhotoID from "../../components/Profile/PhotoID";
import HighSchoolTranscript from "../../components/Profile/HighSchoolTranscript";
import axios from "axios";
import { FaUserCheck, FaInfoCircle, FaGraduationCap, FaFileAlt, FaImage } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";

const ProjfilePage = () => {
    const [activeSection, setActiveSection] = useState(null);
    const token = localStorage.getItem("token");
    const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const [user, setUser] = useState({});
    const [account, setAccount] = useState({});
    const [status, setStatus] = useState("");
    const [feedbacks, setFeedbacks] = useState([]); // Lưu feedbacks
    const handleClick = (section) => setActiveSection(section);

    useEffect(() => {
        if (!token || tokenUser?.role !== "user") {
            window.location.href = "/404";
        }

        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/getAll");
                const accountAdInfo = response.data.find((item) => item.email === tokenUser.email);
                setAccount(accountAdInfo);
                const response2 = await axios.get("http://localhost:8080/api/adis/getAll");
                const userAdInfo = response2.data.data.find((item) => item.email === tokenUser.email);
                setUser(userAdInfo);
                const status1 = await axios.get(`http://localhost:8080/api/adis/getStatus/${tokenUser.email}`);
                const status2 = await axios.get(`http://localhost:8080/api/learning/getStatus/${tokenUser.email}`);
                const status3 = await axios.get(`http://localhost:8080/api/transcripts/getStatus/${tokenUser.email}`);
                const status4 = await axios.get(`http://localhost:8080/api/photo/getStatus/${tokenUser.email}`);
                const statuses = [
                    status1.data.data[0],
                    status2.data.data[0],
                    status3.data.data[0],
                    status4.data.data[0],
                ];

                // Lấy tất cả feedback từ các trạng thái rejected
                const rejectedFeedbacks = statuses
                    .filter((status) => status.status === "rejected") // Chỉ giữ trạng thái rejected
                    .map((status) => status.feedback); // Lấy feedback của trạng thái rejected
                console.log(statuses);
                console.log(rejectedFeedbacks);
                // Xác định trạng thái tổng thể
                if (rejectedFeedbacks.length > 0) {
                    setStatus("rejected");
                    setFeedbacks(rejectedFeedbacks); // Lưu các feedback vào state
                    return;
                }

                // Kiểm tra trạng thái waiting
                if (statuses.some((status) => status.status === "waiting")) {
                    setStatus("waiting");
                    return;
                }

                // Nếu tất cả đều accepted
                setStatus("accepted");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token, tokenUser.email]);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <div className="flex flex-1 pt-20">
                <aside className="w-1/4 bg-[#222d32] text-white p-6 rounded-xl shadow-xl space-y-6">
                    <div className="text-center">
                        <img
                            src="../../../public/myUTE_Tuyensinh.png"
                            alt="Logo"
                            className="w-43 h-auto mx-auto mb-6"
                        />
                    </div>
                    <nav>
                        <ul className="space-y-4">
                            <li
                                className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-md ${
                                    activeSection === null ? "bg-blue-700 text-white" : "hover:bg-blue-600"
                                }`}
                                onClick={() => handleClick(null)}
                            >
                                <FaUserCheck className="text-lg" />
                                Trạng thái hồ sơ
                            </li>
                            <li
                                className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-md ${
                                    activeSection === "admissioninformation"
                                        ? "bg-blue-700 text-white"
                                        : "hover:bg-blue-600"
                                }`}
                                onClick={() => handleClick("admissioninformation")}
                            >
                                <FaInfoCircle className="text-lg" />
                                Thông tin xét tuyển
                            </li>
                            <li
                                className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-md ${
                                    activeSection === "learningprocess" ? "bg-blue-700 text-white" : "hover:bg-blue-600"
                                }`}
                                onClick={() => handleClick("learningprocess")}
                            >
                                <FaGraduationCap className="text-lg" />
                                Quá trình học tập
                            </li>
                            <li
                                className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-md ${
                                    activeSection === "highschooltranscript"
                                        ? "bg-blue-700 text-white"
                                        : "hover:bg-blue-600"
                                }`}
                                onClick={() => handleClick("highschooltranscript")}
                            >
                                <FaFileAlt className="text-lg" />
                                Học bạ THPT
                            </li>
                            <li
                                className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-md ${
                                    activeSection === "photoid" ? "bg-blue-700 text-white" : "hover:bg-blue-600"
                                }`}
                                onClick={() => handleClick("photoid")}
                            >
                                <FaImage className="text-lg" />
                                Hồ sơ ảnh
                            </li>
                        </ul>
                    </nav>
                </aside>

                <div className="flex-1 p-8 bg-gray-50 shadow-xl rounded-xl">
                    {activeSection === "admissioninformation" && <AdmissionInformation />}
                    {activeSection === "learningprocess" && <LearningProcess />}
                    {activeSection === "photoid" && <PhotoID />}
                    {activeSection === "highschooltranscript" && <HighSchoolTranscript />}
                    {!activeSection && (
                        <div className="text-center space-y-8 bg-gray-100 p-8 rounded-lg shadow-md">
                            {/* Tiêu đề */}
                            <h2 className="text-4xl font-extrabold text-blue-600 uppercase tracking-wide">
                                Trạng thái Hồ Sơ
                            </h2>
                            <p
                                className={`text-2xl font-semibold ${
                                    status === "accepted"
                                        ? "text-green-700"
                                        : status === "rejected"
                                        ? "text-red-600"
                                        : "text-yellow-600"
                                }`}
                            >
                                {status === "accepted"
                                    ? "Hồ sơ đã duyệt"
                                    : status === "rejected"
                                    ? "Hồ sơ bị từ chối"
                                    : "Hồ sơ đang chờ xử lý"}
                            </p>
                            {status === "rejected" && feedbacks.length > 0 && (
                                <div className="feedback-list mt-4 bg-red-100 border border-red-300 rounded p-4">
                                    <h3 className="text-lg font-semibold text-red-700 mb-2">Lý do từ chối:</h3>
                                    <ul className="list-disc list-inside">
                                        {feedbacks.map((feedback, index) => (
                                            <li key={index} className="text-sm text-red-600">
                                                {feedback || "Không có thông tin chi tiết."}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {/* Lý do bị từ chối */}
                            {user?.profileStatus === "rejected" && (
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-lg">
                                    <p className="font-bold text-lg">Lý do không được duyệt:</p>
                                    <p className="mt-2 text-base">{user?.rejectionReason || "Chưa có lý do cụ thể."}</p>
                                </div>
                            )}

                            {/* Thông tin chi tiết */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Ảnh thẻ */}
                                <div className="flex flex-col items-center">
                                    <strong className="text-lg mb-2 text-blue-800">Ảnh thẻ</strong>
                                    <img
                                        src={account?.pic || "https://via.placeholder.com/128x170"}
                                        alt="Profile"
                                        className="w-40 h-52 object-cover rounded-lg shadow-md border-2 border-gray-300"
                                    />
                                </div>

                                {/* Thông tin cá nhân */}
                                <div className="text-left space-y-4">
                                    <p>
                                        <strong className="text-blue-800">Họ và tên:</strong>{" "}
                                        {account?.name || "Chưa cập nhật"}
                                    </p>
                                    <p>
                                        <strong className="text-blue-800">Ngày sinh:</strong>{" "}
                                        {user?.birthDate
                                            ? new Date(user.birthDate).toLocaleDateString("vi-VN")
                                            : "Chưa cập nhật"}
                                    </p>
                                    <p>
                                        <strong className="text-blue-800">Email:</strong>{" "}
                                        {account?.email || "Chưa cập nhật"}
                                    </p>
                                </div>

                                {/* Thông tin liên hệ */}
                                <div className="text-left space-y-4">
                                    <p>
                                        <strong className="text-blue-800">Giới tính:</strong>{" "}
                                        {user?.gender || "Chưa cập nhật"}
                                    </p>
                                    <p>
                                        <strong className="text-blue-800">Số điện thoại:</strong>{" "}
                                        {user?.phone || "Chưa cập nhật"}
                                    </p>
                                    <p>
                                        <strong className="text-blue-800">CCCD:</strong>{" "}
                                        {user?.idNumber || "Chưa cập nhật"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjfilePage;
