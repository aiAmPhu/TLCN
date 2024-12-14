// import { useEffect, useState } from "react";
// import axios from "axios";

// const Review = () => {
//     const [users, setUsers] = useState([]);
//     const [statuses, setStatuses] = useState({});
//     const [loading, setLoading] = useState(true);
//     const token = localStorage.getItem("token");
//     const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;

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
//                         adis: adisStatus.data.data[0].status,
//                         learning: learningStatus.data.data[0].status,
//                         transcripts: transcriptsStatus.data.data[0].status,
//                         photo: photoStatus.data.data[0].status,
//                     };
//                 } catch (error) {
//                     console.error(`Error fetching status for ${email}:`, error);
//                     statusData[email] = {
//                         adis: "chưa thiết lập",
//                         learning: "chưa thiết lập",
//                         transcripts: "chưa thiết lập",
//                         photo: "chưa thiết lập",
//                     };
//                 }
//             }

//             setStatuses(statusData);
//             setLoading(false);
//         };

//         if (users.length > 0) {
//             fetchStatuses();
//         }
//     }, [users]);

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

//     const handleLogout = () => {
//         localStorage.clear();
//         window.location.href = "/login";
//     };

//     return (
//         <div className="flex min-h-screen">
//             {/* Sidebar */}
//             <div className="w-64 bg-gray-800 text-white flex flex-col p-6">
//                 <h2 className="text-2xl font-bold mb-6">MyUTE/Reviewer</h2>
//                 <button
//                     className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
//                     onClick={() => window.location.reload()}
//                 >
//                     Refresh Data
//                 </button>
//                 <button
//                     className="mb-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
//                     onClick={handleLogout}
//                 >
//                     Đăng xuất
//                 </button>
//             </div>

//             {/* Main Content */}
//             <div
//                 className="flex-1 relative bg-cover bg-center p-6"
//             >
//                 <div className="container mx-auto p-6 bg-white rounded shadow">
//                     <h1 className="text-2xl font-bold mb-6">Danh sách người dùng</h1>

//                     {loading ? (
//                         <div className="text-center text-blue-500">Loading...</div>
//                     ) : (
//                         <div className="overflow-x-auto">
//                             <table className="table-auto w-full border-collapse border border-gray-300">
//                                 <thead>
//                                     <tr className="bg-gray-100 text-gray-700">
//                                         <th className="px-4 py-2 border">Email</th>
//                                         <th className="px-4 py-2 border">Thông tin</th>
//                                         <th className="px-4 py-2 border">Quá trình học</th>
//                                         <th className="px-4 py-2 border">Học bạ</th>
//                                         <th className="px-4 py-2 border">Ảnh cần thiết</th>
//                                         <th className="px-4 py-2 border">Phê duyệt</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-200">
//                                     {users.map((user) => {
//                                         const email = user.email;
//                                         const userStatuses = statuses[email] || {};

//                                         return (
//                                             <tr key={email} className="text-center">
//                                                 <td className="px-4 py-2 border">{email}</td>
//                                                 <td className={`px-4 py-2 border ${getStatusColor(userStatuses.adis)}`}>
//                                                     {userStatuses.adis || "Not Found"}
//                                                 </td>
//                                                 <td className={`px-4 py-2 border ${getStatusColor(userStatuses.learning)}`}>
//                                                     {userStatuses.learning || "Not Found"}
//                                                 </td>
//                                                 <td className={`px-4 py-2 border ${getStatusColor(userStatuses.transcripts)}`}>
//                                                     {userStatuses.transcripts || "Not Found"}
//                                                 </td>
//                                                 <td className={`px-4 py-2 border ${getStatusColor(userStatuses.photo)}`}>
//                                                     {userStatuses.photo || "Not Found"}
//                                                 </td>
//                                                 <td className="px-4 py-2 border">
//                                                     <button
//                                                         onClick={() => handleEdit(user)}
//                                                         disabled={Object.values(userStatuses).includes("chưa thiết lập")}
//                                                         className={`px-4 py-2 rounded ${
//                                                             Object.values(userStatuses).includes("chưa thiết lập")
//                                                                 ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                                                                 : "bg-blue-500 text-white hover:bg-blue-600"
//                                                         }`}
//                                                     >
//                                                         Edit
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Review;

import { useEffect, useState } from "react";
import axios from "axios";

const Review = () => {
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page
    const token = localStorage.getItem("token");
    const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;

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
                        adis: adisStatus.data.data[0].status,
                        learning: learningStatus.data.data[0].status,
                        transcripts: transcriptsStatus.data.data[0].status,
                        photo: photoStatus.data.data[0].status,
                    };
                } catch (error) {
                    console.error(`Error fetching status for ${email}:`, error);
                    statusData[email] = {
                        adis: "chưa thiết lập",
                        learning: "chưa thiết lập",
                        transcripts: "chưa thiết lập",
                        photo: "chưa thiết lập",
                    };
                }
            }

            setStatuses(statusData);
            setLoading(false);
        };

        if (users.length > 0) {
            fetchStatuses();
        }
    }, [users]);

    const handleEdit = (user) => {
        localStorage.setItem("userEmail", user.email);
        window.location.href = "/infoAdmissionReviewer";
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

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    const filteredUsers = users.filter((user) => {
        if (selectedStatus === "all") return true;
        const userStatuses = statuses[user.email] || {};
        return Object.values(userStatuses).includes(selectedStatus);
    });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col p-6">
                <h2 className="text-2xl font-bold mb-6">MyUTE/Reviewer</h2>
                <button
                    className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                    onClick={() => window.location.reload()}
                >
                    Refresh Data
                </button>
                <button
                    className="mb-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
                    onClick={handleLogout}
                >
                    Đăng xuất
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-50 p-6">
                <div className="container mx-auto p-6 bg-white rounded shadow">
                    <h1 className="text-2xl font-bold mb-6 text-center text-blue-600 flex-grow">Danh sách người dùng</h1>

                    {/* Navigation for status */}
                    <div className="flex justify-center space-x-4 mb-6 overflow-x-auto">
                        {[
                            { label: "Tất cả", value: "all" },
                            { label: "Đã chấp nhận", value: "accepted" },
                            { label: "Đang chờ", value: "waiting" },
                            { label: "Bị từ chối", value: "rejected" },
                            { label: "Chưa thiết lập", value: "chưa thiết lập" },
                        ].map(({ label, value }) => (
                            <button
                                key={value}
                                className={`px-6 py-2 text-sm font-medium rounded-md shadow-md transition-colors ${
                                    selectedStatus === value
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                onClick={() => setSelectedStatus(value)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="text-center text-blue-500">Loading...</div>
                    ) : (
                        <div>
                            {/* Scrollable table */}
                            <div className="overflow-x-auto max-h-[500px]">
                                <table className="table-auto w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-blue-500 text-white">
                                            <th className="px-4 py-2 border">Email</th>
                                            <th className="px-4 py-2 border">Thông tin</th>
                                            <th className="px-4 py-2 border">Quá trình học</th>
                                            <th className="px-4 py-2 border">Học bạ</th>
                                            <th className="px-4 py-2 border">Ảnh cần thiết</th>
                                            <th className="px-4 py-2 border">Phê duyệt</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {currentUsers.map((user) => {
                                            const email = user.email;
                                            const userStatuses = statuses[email] || {};

                                            return (
                                                <tr key={email} className="text-center">
                                                    <td className="px-4 py-2 border">{email}</td>
                                                    <td className={`px-4 py-2 border ${getStatusColor(userStatuses.adis)}`}>
                                                        {userStatuses.adis || "Not Found"}
                                                    </td>
                                                    <td className={`px-4 py-2 border ${getStatusColor(userStatuses.learning)}`}>
                                                        {userStatuses.learning || "Not Found"}
                                                    </td>
                                                    <td className={`px-4 py-2 border ${getStatusColor(userStatuses.transcripts)}`}>
                                                        {userStatuses.transcripts || "Not Found"}
                                                    </td>
                                                    <td className={`px-4 py-2 border ${getStatusColor(userStatuses.photo)}`}>
                                                        {userStatuses.photo || "Not Found"}
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        <button
                                                            onClick={() => handleEdit(user)}
                                                            disabled={Object.values(userStatuses).includes("chưa thiết lập")}
                                                            className={`px-4 py-2 rounded ${
                                                                Object.values(userStatuses).includes("chưa thiết lập")
                                                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                                            }`}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 rounded ${
                                            page === currentPage
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Review;
