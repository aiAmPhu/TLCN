import { useState, useEffect } from "react";
import Header from "../../components/Header";
import AdmissionInformation from "../../components/Profile/AdmissionInformation";
import LearningProcess from "../../components/Profile/LearningProcess";
import PhotoID from "../../components/Profile/PhotoID";
import HighSchoolTranscript from "../../components/Profile/HighSchoolTranscript";
import axios from "axios";

const ProjfilePage = () => {
    const [activeSection, setActiveSection] = useState(null);
    const token = localStorage.getItem("token");
    const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const [user, setUser] = useState({});
    const [account, setAccount] = useState({});
    const [status, setStatus] = useState("");

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
                if (
                    status1.data.data[0].status === "accepted" &&
                    status2.data.data[0].status === "accepted" &&
                    status3.data.data[0].status === "accepted" &&
                    status4.data.data[0].status === "accepted"
                ) {
                    setStatus("accepted");
                } else {
                    setStatus("waiting");
                }
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
                            className="w-32 h-auto mx-auto mb-6"
                        />
                    </div>
                    <nav>
                        <ul className="space-y-4">
                            <li
                                className={`cursor-pointer px-4 py-3 rounded-md ${
                                    activeSection === null ? "bg-blue-700 text-white" : "hover:bg-blue-600"
                                }`}
                                onClick={() => handleClick(null)}
                            >
                                Trạng thái hồ sơ
                            </li>
                            <li
                                className={`cursor-pointer px-4 py-3 rounded-md ${
                                    activeSection === "admissioninformation"
                                        ? "bg-blue-700 text-white"
                                        : "hover:bg-blue-600"
                                }`}
                                onClick={() => handleClick("admissioninformation")}
                            >
                                Thông tin xét tuyển
                            </li>
                            <li
                                className={`cursor-pointer px-4 py-3 rounded-md ${
                                    activeSection === "learningprocess" ? "bg-blue-700 text-white" : "hover:bg-blue-600"
                                }`}
                                onClick={() => handleClick("learningprocess")}
                            >
                                Quá trình học tập
                            </li>
                            <li
                                className={`cursor-pointer px-4 py-3 rounded-md ${
                                    activeSection === "highschooltranscript"
                                        ? "bg-blue-700 text-white"
                                        : "hover:bg-blue-600"
                                }`}
                                onClick={() => handleClick("highschooltranscript")}
                            >
                                Học bạ THPT
                            </li>
                            <li
                                className={`cursor-pointer px-4 py-3 rounded-md ${
                                    activeSection === "photoid" ? "bg-blue-700 text-white" : "hover:bg-blue-600"
                                }`}
                                onClick={() => handleClick("photoid")}
                            >
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
                        <h2 className="text-4xl font-extrabold text-blue-600 uppercase tracking-wide">Trạng thái Hồ Sơ</h2>
                        <p
                            className={`text-2xl font-semibold ${
                                status === "accepted" ? "text-green-700" : "text-yellow-600"
                            }`}
                        >
                            {status === "accepted" ? "Hồ sơ đã duyệt" : "Hồ sơ đang chờ xử lý"}
                        </p>
                    
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
                                    <strong className="text-blue-800">Họ và tên:</strong> {account?.name || "Chưa cập nhật"}
                                </p>
                                <p>
                                    <strong className="text-blue-800">Ngày sinh:</strong>{" "}
                                    {user?.birthDate
                                        ? new Date(user.birthDate).toLocaleDateString("vi-VN")
                                        : "Chưa cập nhật"}
                                </p>
                                <p>
                                    <strong className="text-blue-800">Email:</strong> {account?.email || "Chưa cập nhật"}
                                </p>
                            </div>
                    
                            {/* Thông tin liên hệ */}
                            <div className="text-left space-y-4">
                                <p>
                                    <strong className="text-blue-800">Giới tính:</strong> {user?.gender || "Chưa cập nhật"}
                                </p>
                                <p>
                                    <strong className="text-blue-800">Số điện thoại:</strong> {user?.phone || "Chưa cập nhật"}
                                </p>
                                <p>
                                    <strong className="text-blue-800">CCCD:</strong> {user?.idNumber || "Chưa cập nhật"}
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
