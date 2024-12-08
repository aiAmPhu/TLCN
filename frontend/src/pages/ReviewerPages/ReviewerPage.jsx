// import { useEffect, useState } from "react";
// import axios from "axios";
// import { AiOutlineLogout } from "react-icons/ai";
// import { FiUsers } from "react-icons/fi";

// const Review = () => {
//     const [users, setUsers] = useState([]);
//     const [statuses, setStatuses] = useState({});
//     const [loading, setLoading] = useState(true);
//     const token = localStorage.getItem("token");
//     const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;

//     // Fetch users with role=user
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8080/api/users/getall");
//                 const usersData = response.data.filter((user) => user.role === "user");
//                 setUsers(usersData);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };
//         fetchUsers();
//     }, []);

//     // Fetch statuses for each user
//     useEffect(() => {
//         if (!token || tokenUser?.role !== "reviewer") {
//             window.location.href = "/404";
//         }

//         const fetchStatuses = async () => {
//             setLoading(true);
//             const statusData = {};
//             for (const user of users) {
//                 const email = user.email;
//                 try {
//                     const [adisStatus, learningStatus, transcriptsStatus, photoStatus] = await Promise.all([
//                         axios.get(`http://localhost:8080/api/adis/getStatus/${email}`),
//                         axios.get(`http://localhost:8080/api/learning/getStatus/${email}`),
//                         axios.get(`http://localhost:8080/api/transcripts/getStatus/${email}`),
//                         axios.get(`http://localhost:8080/api/photo/getStatus/${email}`),
//                     ]);

//                     statusData[email] = {
//                         adis: adisStatus.data.data[0]?.status || "chưa thiết lập",
//                         learning: learningStatus.data.data[0]?.status || "chưa thiết lập",
//                         transcripts: transcriptsStatus.data.data[0]?.status || "chưa thiết lập",
//                         photo: photoStatus.data.data[0]?.status || "chưa thiết lập",
//                     };
//                 } catch (error) {
//                     console.error(`Error fetching status for ${email}:`, error);
//                 }
//             }

//             setStatuses(statusData);
//             setLoading(false);
//         };

//         if (users.length > 0) fetchStatuses();
//     }, [users]);

//     const handleLogout = () => {
//         localStorage.clear();
//         window.location.href = "/login";
//     };

//     const handleEdit = (user) => {
//         localStorage.setItem("userEmail", user.email);
//         window.location.href = "/infoAdmissionReviewer";
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case "accepted":
//                 return "bg-green-200 text-green-800";
//             case "waiting":
//                 return "bg-yellow-200 text-yellow-800";
//             case "rejected":
//                 return "bg-red-200 text-red-800";
//             case "chưa thiết lập":
//                 return "bg-gray-200 text-gray-800";
//             default:
//                 return "bg-white";
//         }
//     };

//     return (
//         <div className="flex min-h-screen">
//             {/* Sidebar */}
//             <aside className="w-64 bg-[#222d32] text-white flex flex-col justify-between">
//                 <div>
//                     <span className="inline-block w-full">
//                       <img src="../../../public/myUTE_Reviewer.png" alt="Logo" className="w-full h-auto object-contain" />
//                     </span>

//                     <nav className="flex flex-col space-y-4 p-4">
//                         <a href="/" className="flex items-center space-x-3 hover:bg-blue-700 p-3 rounded">
//                             <FiUsers className="text-xl" />
//                             <span>Danh sách người dùng</span>
//                         </a>
//                     </nav>
//                 </div>

//                 <div className="p-4">
//                     <button
//                         onClick={handleLogout}
//                         className="flex items-center justify-center w-full p-3 bg-red-600 text-white rounded hover:bg-red-700"
//                     >
//                         <AiOutlineLogout className="text-xl mr-2" />
//                         Đăng xuất
//                     </button>
//                 </div>
//             </aside>

//             {/* Main content */}
//             <main className="flex-1 p-6 bg-gray-100">
//                 <h1 className="text-2xl font-bold mb-4">Danh sách hồ sơ</h1>

//                 {loading ? (
//                     <div className="flex justify-center items-center min-h-screen">
//                         <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
//                     </div>
//                 ) : (
//                     <div className="bg-white rounded-lg shadow">
//                         <table className="table-auto w-full">
//                             <thead>
//                                 <tr className="bg-blue-900 text-white">
//                                     <th className="px-4 py-2">Email</th>
//                                     <th className="px-4 py-2">Thông tin</th>
//                                     <th className="px-4 py-2">Quá trình học</th>
//                                     <th className="px-4 py-2">Học bạ</th>
//                                     <th className="px-4 py-2">Ảnh cần thiết</th>
//                                     <th className="px-4 py-2">Phê duyệt</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.map((user) => {
//                                     const userStatuses = statuses[user.email] || {};
//                                     return (
//                                         <tr key={user.email} className="text-center border-b">
//                                             <td className="px-4 py-2">{user.email}</td>
//                                             <td className={`px-4 py-2 ${getStatusColor(userStatuses.adis)}`}>{userStatuses.adis || "Not Found"}</td>
//                                             <td className={`px-4 py-2 ${getStatusColor(userStatuses.learning)}`}>{userStatuses.learning || "Not Found"}</td>
//                                             <td className={`px-4 py-2 ${getStatusColor(userStatuses.transcripts)}`}>{userStatuses.transcripts || "Not Found"}</td>
//                                             <td className={`px-4 py-2 ${getStatusColor(userStatuses.photo)}`}>{userStatuses.photo || "Not Found"}</td>
//                                             <td className="px-4 py-2">
//                                                 <button
//                                                     onClick={() => handleEdit(user)}
//                                                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                                                 >
//                                                     Xem hồ sơ
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default Review;

import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLogout } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";

const Review = () => {
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;

    // Fetch users with role=user
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/getall");
                const usersData = response.data.filter((user) => user.role === "user");
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    // Fetch statuses for each user
    useEffect(() => {
        if (!token || tokenUser?.role !== "reviewer") {
            window.location.href = "/404";
        }

        const fetchStatuses = async () => {
            setLoading(true);
            const statusData = {};
            for (const user of users) {
                const email = user.email;
                try {
                    const [adisStatus, learningStatus, transcriptsStatus, photoStatus] = await Promise.all([
                        axios.get(`http://localhost:8080/api/adis/getStatus/${email}`),
                        axios.get(`http://localhost:8080/api/learning/getStatus/${email}`),
                        axios.get(`http://localhost:8080/api/transcripts/getStatus/${email}`),
                        axios.get(`http://localhost:8080/api/photo/getStatus/${email}`),
                    ]);

                    statusData[email] = {
                        adis: adisStatus.data.data[0]?.status || "chưa thiết lập",
                        learning: learningStatus.data.data[0]?.status || "chưa thiết lập",
                        transcripts: transcriptsStatus.data.data[0]?.status || "chưa thiết lập",
                        photo: photoStatus.data.data[0]?.status || "chưa thiết lập",
                    };
                } catch (error) {
                    console.error(`Error fetching status for ${email}:`, error);
                }
            }

            setStatuses(statusData);
            setLoading(false);
        };

        if (users.length > 0) fetchStatuses();
    }, [users]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    const handleEdit = (user) => {
        const userStatuses = statuses[user.email];
    
        if (
            !userStatuses ||
            Object.values(userStatuses).every((status) => status === "chưa thiết lập" || !status)
        ) {
            // Nếu không có thông tin, chuyển đến trang lỗi
            window.location.href = "/404";
        } else {
            // Nếu có thông tin, lưu email và điều hướng đến trang xem hồ sơ
            localStorage.setItem("userEmail", user.email);
            window.location.href = "/infoAdmissionReviewer";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "accepted":
                return "bg-green-200 text-green-800";
            case "waiting":
                return "bg-yellow-200 text-yellow-800";
            case "rejected":
                return "bg-red-200 text-red-800";
            case "chưa thiết lập":
                return "bg-gray-200 text-gray-800";
            default:
                return "bg-white";
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-[#222d32] text-white flex flex-col justify-between">
                <div>
                    <span className="inline-block w-full">
                      <img src="../../../public/myUTE_Reviewer.png" alt="Logo" className="w-full h-auto object-contain" />
                    </span>

                    <nav className="flex flex-col space-y-4 p-4">
                        <a href="/" className="flex items-center space-x-3 hover:bg-blue-700 p-3 rounded">
                            <FiUsers className="text-xl" />
                            <span>Danh sách người dùng</span>
                        </a>
                    </nav>
                </div>

                <div className="p-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full p-3 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        <AiOutlineLogout className="text-xl mr-2" />
                        Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Danh sách hồ sơ</h1>

                {loading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow">
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="bg-blue-900 text-white">
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Thông tin</th>
                                    <th className="px-4 py-2">Quá trình học</th>
                                    <th className="px-4 py-2">Học bạ</th>
                                    <th className="px-4 py-2">Ảnh cần thiết</th>
                                    <th className="px-4 py-2">Phê duyệt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => {
                                    const userStatuses = statuses[user.email] || {};
                                    return (
                                        <tr key={user.email} className="text-center border-b">
                                            <td className="px-4 py-2">{user.email}</td>
                                            <td className={`px-4 py-2 ${getStatusColor(userStatuses.adis)}`}>{userStatuses.adis || "Not Found"}</td>
                                            <td className={`px-4 py-2 ${getStatusColor(userStatuses.learning)}`}>{userStatuses.learning || "Not Found"}</td>
                                            <td className={`px-4 py-2 ${getStatusColor(userStatuses.transcripts)}`}>{userStatuses.transcripts || "Not Found"}</td>
                                            <td className={`px-4 py-2 ${getStatusColor(userStatuses.photo)}`}>{userStatuses.photo || "Not Found"}</td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                                >
                                                    Xem hồ sơ
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Review;