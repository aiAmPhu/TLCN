import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Giả sử Navbar của bạn nằm ở đây

const InfoAdmission = () => {
    // State để lưu dữ liệu từ API
    const userEmail = localStorage.getItem("userEmail");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false); // State để hiển thị form
    const [rejectionReason, setRejectionReason] = useState("");
    // useEffect để gọi API khi component được render
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/adis/getAdiByE/${userEmail}`);
                console.log(response.data);
                //const userAdInfo = response.data.find((item) => item.email === userEmail);
                //console.log(response.data.data.email);
                setUser(response.data.data._id);
                console.log(user);
                setData(response.data); // Cập nhật dữ liệu vào state
                setLoading(false); // Đổi trạng thái loading khi đã có dữ liệu
            } catch (err) {
                setError("Error fetching data: ");
                setLoading(false);
            }
        };

        fetchData(); // Gọi API
    }, []); // Chạy khi component được render lần đầu tiên

    // Kiểm tra trạng thái tải dữ liệu
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const handleApprove = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/adis/accept/${user}`, {
                status: "accepted",
            });
            if (response.status === 200) {
                // Cập nhật trạng thái hoặc làm gì đó khi cập nhật thành công
                console.log("User approved successfully");
                alert("User approved successfully");
                window.location.reload();
            }
        } catch (err) {
            console.error("Error updating status", err);
        }
    };
    const handleReject = async () => {
        // try {
        //     const response = await axios.put(`http://localhost:8080/api/adis/reject/${user}`, {
        //         status: "rejected",
        //     });
        //     if (response.status === 200) {
        //         // Cập nhật trạng thái hoặc làm gì đó khi cập nhật thành công
        //         console.log("User rejected successfully");
        //         alert("User rejected successfully");
        //     }
        // } catch (err) {
        //     console.error("Error updating status", err);
        // }
        setShowForm(true);
    };

    const handleSubmit = async () => {
        try {
            const data = {
                rejectionReason: rejectionReason, // Dữ liệu từ form
                status: "rejected", // Trạng thái là rejected
            };

            // Giả sử bạn cần gửi dữ liệu này lên một API
            const response = await axios.put(`http://localhost:8080/api/adis/reject/${user}`, data);

            if (response.status === 200) {
                alert("Lý do từ chối đã được gửi!");
                setShowForm(false); // Ẩn form sau khi gửi
                setRejectionReason(""); // Reset lý do từ chối
                window.location.reload();
            }
        } catch (err) {
            console.error("Có lỗi xảy ra khi gửi dữ liệu:", err);
        }
    };

    // Hiển thị dữ liệu
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container  mx-auto max-w-md px-4 py-8">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Thông tin cá nhân</h1>

                {/* Hiển thị dữ liệu trả về từ API */}
                <div
                    className={`p-6 rounded-lg shadow-md ${
                        data.data.status === "accepted"
                            ? "bg-green-100"
                            : data.data.status === "waiting"
                            ? "bg-yellow-50"
                            : data.data.status === "rejected"
                            ? "bg-red-100"
                            : "bg-white" // Màu nền mặc định nếu không có status
                    }`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Thông tin:</h2>
                        <div className="flex space-x-2">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                onClick={handleApprove}
                            >
                                Phê duyệt
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={handleReject}
                            >
                                Từ chối
                            </button>
                        </div>
                    </div>
                    {showForm && (
                        <div className="mt-4 p-6 bg-gray-100 rounded-md shadow-md">
                            <h2 className="text-lg font-semibold mb-4">Lý do từ chối</h2>
                            <textarea
                                className="w-full p-2 border rounded-md"
                                rows="4"
                                placeholder="Nhập lý do từ chối..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                            ></textarea>
                            <div className="mt-4">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    onClick={handleSubmit}
                                >
                                    Gửi lý do
                                </button>
                                <button
                                    className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    onClick={() => setShowForm(false)} // Đóng form
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    )}
                    <table className="min-w-full table-auto">
                        <tbody className="text-gray-700">
                            <tr>
                                <td className="py-2 px-4 font-medium">Full Name</td>
                                <td className="py-2 px-4">
                                    {data.data.firstName} {data.data.lastName}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Birth Date</td>
                                <td className="py-2 px-4">{new Date(data.data.birthDate).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Gender</td>
                                <td className="py-2 px-4">{data.data.gender}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Birth Place</td>
                                <td className="py-2 px-4">{data.data.birthPlace}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Phone</td>
                                <td className="py-2 px-4">{data.data.phone}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Email</td>
                                <td className="py-2 px-4">{data.data.email}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Parent Email</td>
                                <td className="py-2 px-4">{data.data.parentEmail}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">ID Number</td>
                                <td className="py-2 px-4">{data.data.idNumber}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">ID Issue Date</td>
                                <td className="py-2 px-4">{new Date(data.data.idIssueDate).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">ID Issue Place</td>
                                <td className="py-2 px-4">{data.data.idIssuePlace}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Province</td>
                                <td className="py-2 px-4">{data.data.province}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">District</td>
                                <td className="py-2 px-4">{data.data.district}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Commune</td>
                                <td className="py-2 px-4">{data.data.commune}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Address</td>
                                <td className="py-2 px-4">{data.data.address}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">House Number</td>
                                <td className="py-2 px-4">{data.data.houseNumber}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Street Name</td>
                                <td className="py-2 px-4">{data.data.streetName}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InfoAdmission;
