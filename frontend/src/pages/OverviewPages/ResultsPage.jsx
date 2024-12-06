import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
const ResultPage = () => {
    const [admissionWishes, setAdmissionWishes] = useState([]); // Lưu trữ nguyện vọng
    const [loading, setLoading] = useState(false); // Để hiển thị trạng thái đang tải
    const [error, setError] = useState(null); // Để hiển thị lỗi nếu có
    const email = localStorage.getItem("email");

    useEffect(() => {
        const fetchAdmissionWishes = async () => {
            setLoading(true); // Bắt đầu tải
            try {
                const response = await axios.get(`http://localhost:8080/api/wish/getAll/${email}`); // Gọi API
                setAdmissionWishes(response.data.data); // Lưu dữ liệu vào state
            } catch (err) {
                setError("Không thể tải dữ liệu"); // Xử lý lỗi nếu API gọi không thành công
            } finally {
                setLoading(false); // Kết thúc trạng thái tải
            }
        };

        fetchAdmissionWishes();
    }, []); // Chạy một lần khi component mount

    if (loading) {
        return <div>Đang tải...</div>; // Hiển thị khi đang tải dữ liệu
    }

    if (error) {
        return <div>{error}</div>; // Hiển thị khi có lỗi
    }

    // Hàm xác định màu nền dựa trên status
    const getStatusBackgroundColor = (status) => {
        switch (status) {
            case "waiting":
                return "bg-yellow-50"; // Xanh dương nhạt cho "waiting"
            case "accepted":
                return "bg-green-100"; // Xanh lá nhạt cho "accepted"
            case "rejected":
                return "bg-red-100"; // Đỏ nhạt cho "rejected"
            default:
                return "bg-gray-200"; // Màu mặc định nếu không có status
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <Header />
            <div className="container mt-10 mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Danh Sách Nguyện Vọng</h1>
                {admissionWishes.length === 0 ? (
                    <p className="text-center text-gray-600">Không có nguyện vọng nào</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">Mã Ngành</th>
                                    <th className="px-4 py-2 border">Nguyện vọng</th>
                                    <th className="px-4 py-2 border">Tiêu Chí</th>
                                    <th className="px-4 py-2 border">Tổ Hợp Môn</th>
                                    <th className="px-4 py-2 border">Điểm</th>
                                    <th className="px-4 py-2 border">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admissionWishes.map((wish) => (
                                    <tr key={wish._id} className={getStatusBackgroundColor(wish.status)}>
                                        <td className="px-4 py-2 border">{wish.major}</td>
                                        <td className="px-4 py-2 border">{wish.priority}</td>
                                        <td className="px-4 py-2 border">{wish.criteriaId}</td>
                                        <td className="px-4 py-2 border">{wish.admissionBlockId}</td>
                                        <td className="px-4 py-2 border">{wish.scores}</td>
                                        <td className="px-4 py-2 border">{wish.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultPage;
