// import  { useEffect, useState } from "react";
// import axios from "axios";
// import backgroundImage from "../../assets/backgroundhcmute.jpg";

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
//             // If no token or role is not admin, redirect to login
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
//                     console.log(statusData);
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

//     // Get the background color based on the status of all APIs

//     const handleEdit = (user) => {
//         console.log("Email user:", user.email);
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
//         // Clear localStorage and redirect to login page
//         localStorage.clear();
//         window.location.href = "/login";
//     };
//     return (
//         <div
//             className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
//             style={{
//                 backgroundImage: `url(${backgroundImage})`,
//                 backgroundPosition: "center",
//                 backgroundSize: "contain",
//                 backgroundRepeat: "no-repeat",
//             }}
//         >
//             <div className="container  mx-auto p-6 ">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-bold"></h1>
//                     <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
//                         Đăng xuất
//                     </button>
//                 </div>








//                 {loading ? (
//                     <div className="text-center text-blue-500">Loading...</div>
//                 ) : (
//                     <div className="overflow-x-auto bg-white">
//                         <table className="table-auto w-full border-collapse border border-gray-300">
//                             <thead>
//                                 <tr className="bg-gray-100 text-gray-700">
//                                     <th className="px-4 py-2 border">Email</th>
//                                     <th className="px-4 py-2 border">Thông tin</th>
//                                     <th className="px-4 py-2 border">Quá trình học</th>
//                                     <th className="px-4 py-2 border">Học bạ</th>
//                                     <th className="px-4 py-2 border">Ảnh cần thiết</th>
//                                     <th className="px-4 py-2 border">Phê duyệt</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {users.map((user) => {
//                                     const email = user.email;
//                                     const userStatuses = statuses[email] || {};

//                                     return (
//                                         <tr key={email} className="text-center">
//                                             <td className="px-4 py-2 border">{email}</td>
//                                             <td className={`px-4 py-2 border ${getStatusColor(userStatuses.adis)}`}>
//                                                 {userStatuses.adis || "Not Found"}
//                                             </td>
//                                             <td className={`px-4 py-2 border ${getStatusColor(userStatuses.learning)}`}>
//                                                 {userStatuses.learning || "Not Found"}
//                                             </td>
//                                             <td
//                                                 className={`px-4 py-2 border ${getStatusColor(
//                                                     userStatuses.transcripts
//                                                 )}`}
//                                             >
//                                                 {userStatuses.transcripts || "Not Found"}
//                                             </td>
//                                             <td className={`px-4 py-2 border ${getStatusColor(userStatuses.photo)}`}>
//                                                 {userStatuses.photo || "Not Found"}
//                                             </td>
//                                             <td className="px-4 py-2 border">
//                                                 <button
//                                                     onClick={() => handleEdit(user)}
//                                                     disabled={Object.values(userStatuses).includes("chưa thiết lập")}
//                                                     className={`px-4 py-2 rounded ${
//                                                         Object.values(userStatuses).includes("chưa thiết lập")
//                                                             ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                                                             : "bg-blue-500 text-white hover:bg-blue-600"
//                                                     }`}
//                                                 >
//                                                     Edit
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
// export default Review;

import { useEffect, useState } from "react";
import axios from "axios";
import backgroundImage from "../../assets/backgroundhcmute.jpg";

const Review = () => {
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [loading, setLoading] = useState(true);
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

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col p-6">
                <h2 className="text-2xl font-bold mb-6">Reviewer Panel</h2>
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
            <div
                className="flex-1 relative bg-cover bg-center p-6"
                // style={{
                //     backgroundImage: `url(${backgroundImage})`,
                //     backgroundPosition: "center",
                //     backgroundSize: "contain",
                //     backgroundRepeat: "no-repeat",
                // }}
            >
                <div className="container mx-auto p-6 bg-white rounded shadow">
                    <h1 className="text-2xl font-bold mb-6">Danh sách người dùng</h1>

                    {loading ? (
                        <div className="text-center text-blue-500">Loading...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700">
                                        <th className="px-4 py-2 border">Email</th>
                                        <th className="px-4 py-2 border">Thông tin</th>
                                        <th className="px-4 py-2 border">Quá trình học</th>
                                        <th className="px-4 py-2 border">Học bạ</th>
                                        <th className="px-4 py-2 border">Ảnh cần thiết</th>
                                        <th className="px-4 py-2 border">Phê duyệt</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map((user) => {
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Review;
