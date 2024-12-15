import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
const ListAcceptedPage = () => {
    const [wishes, setWishes] = useState([]); // State để lưu danh sách wishes
    const [name, setName] = useState([]);
    const [acceptedScore, setAcceptedScore] = useState([]);
    const [loading, setLoading] = useState(true); // State để hiển thị trạng thái tải
    const [error, setError] = useState(null); // State để lưu lỗi

    // Hàm gọi API khi component mount
    useEffect(() => {
        const fetchAcceptedWishes = async () => {
            try {
                // Gọi API
                const response = await axios.get("http://localhost:8080/api/wish/getAccepted");
                setWishes(response.data.data); // Lưu dữ liệu nhận được vào state
                const response1 = await axios.get(
                    `http://localhost:8080/api/adis/getFaLNameByE/${response.data.data[0].email}`
                );
                const response2 = await axios.get(
                    `http://localhost:8080/api/adqs/getQuantityByCriteriaIdAndMajorId/${response.data.data[0].criteriaId}/${response.data.data[0].major}`
                );
                console.log(response2.data.data[0].quantity);
                const name = response1.data.data.firstName + " " + response1.data.data.lastName;
                setName(name); // Lưu dữ liệu nhận được vào state
                setAcceptedScore(response2.data.data[0].quantity);
                setLoading(false); // Tắt trạng thái loading
            } catch (err) {
                setError("Lỗi khi tải dữ liệu"); // Lưu lỗi vào state
                setLoading(false);
            }
        };

        fetchAcceptedWishes(); // Gọi hàm fetchAcceptedWishes
    }, []); // Chỉ chạy một lần khi component được render lần đầu
    const exportToCSV = () => {
        if (!wishes.length) {
            alert("Không có dữ liệu để xuất!");
            return;
        }

        // Chuyển đổi danh sách sinh viên thành định dạng CSV
        const csvData = Papa.unparse(
            wishes.map((wish) => ({
                Email: wish.email,
                "Họ và Tên": name, // Ghép họ và tên nếu có
                "Diện Xét Tuyển": wish.criteriaId,
                "Ngành Xét Tuyển": wish.major,
                "Điểm Xét Tuyển": wish.scores,
                "Điểm Trúng Tuyển": acceptedScore || "", // Điểm trúng tuyển nếu có
            }))
        );
        const csvWithBom = "\uFEFF" + csvData;
        // Tạo file blob chứa dữ liệu CSV
        const blob = new Blob([csvWithBom], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        // Tạo link tải file
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "DanhSachTrungTuyen.csv");
        document.body.appendChild(link);
        link.click(); // Tự động nhấn vào link
        document.body.removeChild(link); // Xoá link sau khi tải xong
    };
    // Xử lý khi đang tải
    if (loading) {
        return <div className="text-center text-gray-700">Đang tải dữ liệu...</div>;
    }

    // Xử lý khi có lỗi
    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    // Xử lý khi không có dữ liệu
    if (wishes.length === 0) {
        return <div className="text-center text-gray-700">Không có dữ liệu trúng tuyển.</div>;
    }
    const handleButtonClick = () => {
        alert("Bạn đã nhấn nút và gọi hàm!");
    };
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Danh sách Trúng Tuyển</h1>
            <div className="text-center mb-6">
                <button
                    onClick={exportToCSV} // Gọi hàm exportToCSV khi nhấn
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
                >
                    Xuất file CSV
                </button>
            </div>
            <table className="table-auto w-full border-collapse border border-gray-300 text-center">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Họ và Tên</th>
                        <th className="px-4 py-2 border">Diện Xét Tuyển</th>
                        <th className="px-4 py-2 border">Ngành Xét Tuyển</th>
                        <th className="px-4 py-2 border">Điểm Xét Tuyển</th>
                        <th className="px-4 py-2 border">Điểm Trúng Tuyển</th>
                    </tr>
                </thead>
                <tbody>
                    {wishes.map((wish, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border">{index + 1}</td>
                            <td className="px-4 py-2 border">{wish.email}</td>
                            <td className="px-4 py-2 border">{name}</td>
                            <td className="px-4 py-2 border">{wish.criteriaId}</td>
                            <td className="px-4 py-2 border">{wish.major}</td>
                            <td className="px-4 py-2 border">{wish.scores}</td>
                            <td className="px-4 py-2 border">{acceptedScore}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListAcceptedPage;
