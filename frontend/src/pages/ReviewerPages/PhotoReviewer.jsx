import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Giả sử Navbar của bạn nằm ở đây

const PhotoReviewer = () => {
    // State để lưu dữ liệu từ API
    const userEmail = localStorage.getItem("userEmail");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false); // State để hiển thị form
    const [rejectionReason, setRejectionReason] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    // useEffect để gọi API khi component được render
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/photo/getPhotoByE/${userEmail}`);
                console.log(response.data);
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
            const response = await axios.put(`http://localhost:8080/api/photo/accept/${user}`, {
                status: "accepted",
            });
            if (response.status === 200) {
                // Cập nhật trạng thái hoặc làm gì đó khi cập nhật thành công
                //console.log("User approved successfully");
                alert("Đã chấp nhận");
                window.location.reload();
            }
        } catch (err) {
            console.error("Error updating status", err);
        }
    };
    const handleReject = async () => {
        setShowForm(true);
    };

    const handleSubmit = async () => {
        try {
            const data = {
                rejectionReason: rejectionReason, // Dữ liệu từ form
                status: "rejected", // Trạng thái là rejected
            };

            // Giả sử bạn cần gửi dữ liệu này lên một API
            const response = await axios.put(`http://localhost:8080/api/photo/reject/${user}`, data);

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
    const handleImageClick = (image) => {
        setSelectedImage(image); // Set the clicked image as the selected image
    };

    const handleCloseModal = () => {
        setSelectedImage(null); // Clear the selected image to close modal
    };
    // Hiển thị dữ liệu
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container  mx-auto  max-w-md px-4 py-8 ">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Quá trình học tập</h1>

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
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
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
                            {/* Các trường thông tin học tập */}
                            <tr>
                                <td className="py-2 px-4 font-medium">Ảnh 3x4:</td>
                                <td className="py-2 px-4">
                                    <img
                                        src={data.data.personalPic}
                                        alt="Grade 10"
                                        className="w-24 h-auto rounded shadow"
                                        onClick={() => handleImageClick(data.data.personalPic)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Mặt trước CCCD/ CMND:</td>
                                <td className="py-2 px-4">
                                    <img
                                        src={data.data.frontCCCD}
                                        alt="Grade 10"
                                        className="w-24 h-auto rounded shadow"
                                        onClick={() => handleImageClick(data.data.frontCCCD)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Mặt sau CCCD/ CMND:</td>
                                <td className="py-2 px-4">
                                    <img
                                        src={data.data.backCCCD}
                                        alt="Grade 10"
                                        className="w-24 h-auto rounded shadow"
                                        onClick={() => handleImageClick(data.data.backCCCD)}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="py-2 px-4 font-medium">Học bạ lớp 10:</td>
                                <td className="py-2 px-4">
                                    <img
                                        src={data.data.grade10Pic}
                                        alt="Grade 10"
                                        className="w-24 h-auto rounded shadow"
                                        onClick={() => handleImageClick(data.data.grade10Pic)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Học bạ lớp 11:</td>
                                <td className="py-2 px-4">
                                    <img
                                        src={data.data.grade11Pic}
                                        alt="Grade 10"
                                        className="w-24 h-auto rounded shadow"
                                        onClick={() => handleImageClick(data.data.grade11Pic)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-medium">Học bạ lớp 12:</td>
                                <td className="py-2 px-4">
                                    <img
                                        src={data.data.grade12Pic}
                                        alt="Grade 10"
                                        className="w-24 h-auto rounded shadow"
                                        onClick={() => handleImageClick(data.data.grade12Pic)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {selectedImage && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                            <div className="relative">
                                <img src={selectedImage} alt="Large View" className="max-w-full max-h-screen rounded" />
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 px-3 py-1 rounded"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoReviewer;
