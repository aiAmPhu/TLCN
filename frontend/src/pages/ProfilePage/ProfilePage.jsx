// import { useState, useEffect } from "react";
// import Header from "../../components/Header";
// import AdmissionInformation from "../../components/Profile/AdmissionInformation";
// import LearningProcess from "../../components/Profile/LearningProcess";
// import PhotoID from "../../components/Profile/PhotoID";
// import HighSchoolTranscript from "../../components/Profile/HighSchoolTranscript";
// import axios from "axios";
// const ProjfilePage = () => {
//     const [activeSection, setActiveSection] = useState(null); // State để theo dõi phần nội dung được chọn
//     const token = localStorage.getItem("token");
//     const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
//     const [user, setUser] = useState({});
    
//     const handleClick = (section) => {
//         // Khi nhấn vào liên kết, thay đổi giá trị activeSection
//         setActiveSection(section);
//     };
//     useEffect(() => {
//         if (!token || tokenUser?.role !== "user") {
//             // If no token or role is not admin, redirect to login
//             window.location.href = "/404";
//         }

//         const fetchData = async () => {
//             try {
//                 // Gọi API để lấy danh sách thông tin từ cơ sở dữ liệu
//                 const response = await axios.get("http://localhost:8080/api/users/getAll");
//                 // Tìm kiếm thông tin dựa trên tokenUser.email
//                 const userAdInfo = response.data.find((item) => item.email === tokenUser.email);
//                 setUser(userAdInfo);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         // Gọi hàm fetchData
//         fetchData();
//     }, [token, tokenUser]);
//     return (
//         <div className="min-h-screen flex flex-col bg-gray-50">
//             <Header />

//             <div className="flex flex-1" style={{ paddingTop: "72px" }}>
                
//                 <aside className="w-1/4 bg-gray-900 text-white p-4">
//                     <div className="mb-6">
//                         <img
//                             src={user.pic}
//                             alt="Profile"
//                             className="bg-white rounded-full mx-auto mb-2 w-40 h-40 object-cover"
//                         />
//                         <p className="text-center font-semibold">{user.name}</p>
//                     </div>
//                     <nav>
//                         <ul className="space-y-2">
//                             <li
//                                 className={`hover:bg-blue-700 rounded-md px-3 py-2 cursor-pointer ${
//                                     activeSection === "admissioninformation" && "bg-blue-600"
//                                 }`}
//                                 onClick={() => handleClick("admissioninformation")}
//                             >
//                                 Thông tin xét tuyển
//                             </li>
//                             <li
//                                 className={`hover:bg-blue-700 rounded-md px-3 py-2 cursor-pointer ${
//                                     activeSection === "learningprocess" && "bg-blue-600"
//                                 }`}
//                                 onClick={() => handleClick("learningprocess")}
//                             >
//                                 Quá trình học tập
//                             </li>
//                             <li
//                                 className={`hover:bg-blue-700 rounded-md px-3 py-2 cursor-pointer ${
//                                     activeSection === "highschooltranscript" && "bg-blue-600"
//                                 }`}
//                                 onClick={() => handleClick("highschooltranscript")}
//                             >
//                                 Học bạ THPT
//                             </li>
//                             <li
//                                 className={`hover:bg-blue-700 rounded-md px-3 py-2 cursor-pointer ${
//                                     activeSection === "photo" && "bg-blue-600"
//                                 }`}
//                                 onClick={() => handleClick("photoid")}
//                             >
//                                 Hồ sơ ảnh
//                             </li>
//                         </ul>
//                     </nav>
//                 </aside>
//                 <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
//                     {activeSection === "admissioninformation" && <AdmissionInformation />}
//                     {activeSection === "learningprocess" && <LearningProcess />}
//                     {activeSection === "photoid" && <PhotoID />}
//                     {activeSection === "highschooltranscript" && <HighSchoolTranscript />}
//                     {!activeSection && (
//                         <div className="text-center text-gray-500">
//                         <h2 className="text-xl font-semibold">Trạng thái hồ sơ</h2>
//                         <p className="mb-4">
//                             {profileStatus === "approved" ? "Hồ sơ đã duyệt" : "Hồ sơ chưa duyệt"}
//                         </p>
//                         {profileStatus === "rejected" && (
//                             <div className="text-red-500 font-medium">
//                                 <p>Lý do không được duyệt: {rejectionReason || "Chưa có lý do cụ thể."}</p>
//                             </div>
//                         )}
//                         <div className="mt-6 text-left">
//                             <p><strong>Ảnh thẻ:</strong> <PhotoID /></p>
//                             <p><strong>Họ và tên:</strong> {fullName || "Chưa cập nhật"}</p>
//                             <p><strong>Ngày sinh:</strong> {dob || "Chưa cập nhật"}</p>
//                             <p><strong>Giới tính:</strong> {gender || "Chưa cập nhật"}</p>
//                             <p><strong>Số điện thoại:</strong> {phone || "Chưa cập nhật"}</p>
//                             <p><strong>Email:</strong> {email || "Chưa cập nhật"}</p>
//                             <p><strong>CCCD:</strong> {cccd || "Chưa cập nhật"}</p>
//                         </div>
//                     </div>
//                     )}
//                 </div>
//             </div>
            
//         </div>
//     );
// };

// export default ProjfilePage;

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import AdmissionInformation from "../../components/Profile/AdmissionInformation";
import LearningProcess from "../../components/Profile/LearningProcess";
import PhotoID from "../../components/Profile/PhotoID";
import HighSchoolTranscript from "../../components/Profile/HighSchoolTranscript";
import axios from "axios";

const ProjfilePage = () => {
    const [activeSection, setActiveSection] = useState(null); // State để theo dõi phần nội dung được chọn
    const token = localStorage.getItem("token");
    const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const [user, setUser] = useState({}); // Thông tin người dùng

    const handleClick = (section) => {
        // Khi nhấn vào liên kết, thay đổi giá trị activeSection
        setActiveSection(section);
    };

    useEffect(() => {
        if (!token || tokenUser?.role !== "user") {
            // Nếu không có token hoặc vai trò không phải user, chuyển hướng đến trang 404
            window.location.href = "/404";
        }

        const fetchData = async () => {
            try {
                // Gọi API để lấy danh sách thông tin từ cơ sở dữ liệu
                const response = await axios.get("http://localhost:8080/api/users/getAll");
                // Tìm kiếm thông tin dựa trên tokenUser.email
                const userAdInfo = response.data.find((item) => item.email === tokenUser.email);
                setUser(userAdInfo); // Cập nhật thông tin người dùng
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token, tokenUser]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <div className="flex flex-1" style={{ paddingTop: "72px" }}>
                
                <aside className="w-1/4 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                    {/* <div className="mb-6 flex flex-col items-center">
                        <img
                            src={user.pic}
                            alt="Profile"
                            className="bg-white rounded-lg shadow-lg w-32 h-40 object-cover mb-4"
                            style={{ aspectRatio: '3 / 4' }} // Kích thước Ảnh 3x4
                        />
                        <p className="text-center text-xl font-semibold">{user.name}</p>
                    </div> */}
                    <span className="inline-block w-full">
                        <img src="../../../public/myUTE_Tuyensinh.png" alt="Logo" className="w-full h-auto object-contain" />
                    </span>
                    <nav>
                        <ul className="space-y-4">
                            <li
                                className={`hover:bg-blue-700 rounded-md px-4 py-3 cursor-pointer ${
                                    activeSection === "admissioninformation" && "bg-blue-600"
                                }`}
                                onClick={() => handleClick("admissioninformation")}
                            >
                                Thông tin xét tuyển
                            </li>
                            <li
                                className={`hover:bg-blue-700 rounded-md px-4 py-3 cursor-pointer ${
                                    activeSection === "learningprocess" && "bg-blue-600"
                                }`}
                                onClick={() => handleClick("learningprocess")}
                            >
                                Quá trình học tập
                            </li>
                            <li
                                className={`hover:bg-blue-700 rounded-md px-4 py-3 cursor-pointer ${
                                    activeSection === "highschooltranscript" && "bg-blue-600"
                                }`}
                                onClick={() => handleClick("highschooltranscript")}
                            >
                                Học bạ THPT
                            </li>
                            <li
                                className={`hover:bg-blue-700 rounded-md px-4 py-3 cursor-pointer ${
                                    activeSection === "photo" && "bg-blue-600"
                                }`}
                                onClick={() => handleClick("photoid")}
                            >
                                Hồ sơ ảnh
                            </li>
                        </ul>
                    </nav>
                </aside>

                <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
                    {activeSection === "admissioninformation" && <AdmissionInformation />}
                    {activeSection === "learningprocess" && <LearningProcess />}
                    {activeSection === "photoid" && <PhotoID />}
                    {activeSection === "highschooltranscript" && <HighSchoolTranscript />}
                    {!activeSection && (
                        <div className="text-center text-gray-600">
                            <h2 className="text-2xl font-semibold text-gray-800">Trạng thái hồ sơ</h2>
                            <p className="mb-6 text-lg">
                                {user?.profileStatus === "approved" ? "Hồ sơ đã duyệt" : "Hồ sơ chưa duyệt"}
                            </p>
                            {user?.profileStatus === "rejected" && (
                                <div className="text-red-500 font-medium">
                                    <p>Lý do không được duyệt: {user?.rejectionReason || "Chưa có lý do cụ thể."}</p>
                                </div>
                            )}
                            <div className="mt-6 text-left grid grid-cols-2 gap-6">
                                <div className="flex items-center">
                                    <strong className="w-32">Ảnh thẻ:</strong>
                                    <img src={user?.pic} alt="Profile" className="w-32 h-40 object-cover rounded-lg shadow-md" />
                                </div>
                                <div className="flex items-center">
                                    <strong className="w-32">Họ và tên:</strong>
                                    <p>{user?.name || "Chưa cập nhật"}</p>
                                </div>
                                <div className="flex items-center">
                                    <strong className="w-32">Ngày sinh:</strong>
                                    <p>{user?.dob || "Chưa cập nhật"}</p>
                                </div>
                                <div className="flex items-center">
                                    <strong className="w-32">Giới tính:</strong>
                                    <p>{user?.gender || "Chưa cập nhật"}</p>
                                </div>
                                <div className="flex items-center">
                                    <strong className="w-32">Số điện thoại:</strong>
                                    <p>{user?.phone || "Chưa cập nhật"}</p>
                                </div>
                                <div className="flex items-center">
                                    <strong className="w-32">Email:</strong>
                                    <p>{user?.email || "Chưa cập nhật"}</p>
                                </div>
                                <div className="flex items-center">
                                    <strong className="w-32">CCCD:</strong>
                                    <p>{user?.cccd || "Chưa cập nhật"}</p>
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
