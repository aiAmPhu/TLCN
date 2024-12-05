import React, { useEffect, useState } from "react";
import axios from "axios";

const Review = () => {
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [loading, setLoading] = useState(true);

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
                    console.log(statusData);
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

    // Get the background color based on the status of all APIs
    const getStatusBackgroundColor = (statuses) => {
        if (Object.values(statuses).includes("chưa thiết lập")) {
            return "bg-gray-200"; // Gray if any status is not found
        }

        if (Object.values(statuses).every((status) => status === "accepted")) {
            return "bg-green-200"; // Green if all are accepted
        }

        if (Object.values(statuses).includes("rejected")) {
            return "bg-red-200"; // Red if any is rejected
        }

        if (Object.values(statuses).includes("waiting")) {
            return "bg-yellow-200"; // Yellow if any is waiting
        }

        return "bg-white"; // Default white
    };
    const handleEdit = (user) => {
        console.log("Email user:", user.email);
        localStorage.setItem("userEmail", user.email);
        window.location.href = "/infoAdmissionReviewer";
    };
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">User Review</h1>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Thông tin</th>
                                <th className="px-4 py-2 border">Quá trình học</th>
                                <th className="px-4 py-2 border">Học bạ</th>
                                <th className="px-4 py-2 border">Ảnh cần thiết</th>
                                {/* Thêm cột "Actions" */}
                                <th className="px-4 py-2 border">Phê duyệt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                const email = user.email;
                                const userStatuses = statuses[email] || {};

                                return (
                                    <tr key={email} className={getStatusBackgroundColor(userStatuses)}>
                                        <td className="px-4 py-2 border">{email}</td>
                                        <td className="px-4 py-2 border">{userStatuses.adis || "Not Found"}</td>
                                        <td className="px-4 py-2 border">{userStatuses.learning || "Not Found"}</td>
                                        <td className="px-4 py-2 border">{userStatuses.transcripts || "Not Found"}</td>
                                        <td className="px-4 py-2 border">{userStatuses.photo || "Not Found"}</td>
                                        {/* Cột quản lý */}
                                        <td className="px-4 py-2 border text-center">
                                            {/* Button Action */}
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="text-blue-500 hover:text-blue-700 mr-2"
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
    );
};

export default Review;
