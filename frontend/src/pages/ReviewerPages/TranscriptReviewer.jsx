import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Giả sử Navbar của bạn nằm ở đây

const TranscriptReviewer = () => {
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
                const response = await axios.get(`http://localhost:8080/api/transcripts/getTranscriptByE/${userEmail}`);
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
            const response = await axios.put(`http://localhost:8080/api/transcripts/accept/${user}`, {
                status: "accepted",
            });
            if (response.status === 200) {
                // Cập nhật trạng thái hoặc làm gì đó khi cập nhật thành công
                console.log("Chấp nhận học bạ thành công");
                alert("Chấp nhận học bạ thành công");
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
            const response = await axios.put(`http://localhost:8080/api/transcripts/reject/${user}`, data);

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
            <div className="container  mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Thông tin cá nhân</h1>

                {/* Hiển thị dữ liệu trả về từ API */}
                <div
                    className={`p-6 rounded-lg shadow-md ${
                        data.data.status === "accepted"
                            ? "bg-green-100"
                            : data.data.status === "waiting"
                            ? "bg-yellow-100"
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
                            <table className="min-w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">Môn học</th>
                                        <th className="py-2 px-4 border-b text-left">Kỳ 1 Lớp 10</th>
                                        <th className="py-2 px-4 border-b text-left">Kỳ 2 Lớp 10</th>
                                        <th className="py-2 px-4 border-b text-left">Kỳ 1 Lớp 11</th>
                                        <th className="py-2 px-4 border-b text-left">Kỳ 2 Lớp 11</th>
                                        <th className="py-2 px-4 border-b text-left">Kỳ 1 Lớp 12</th>
                                        <th className="py-2 px-4 border-b text-left">Điểm Trung Bình</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Môn Toán */}
                                    <tr>
                                        <td className="py-2 px-4 border-b">Toán</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[0].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[0].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[0].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[0].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[0].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[0].averageScore}</td>
                                    </tr>

                                    {/* Môn Vật lý */}
                                    <tr>
                                        <td className="py-2 px-4 border-b">Vật lý</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[1].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[1].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[1].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[1].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[1].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[1].averageScore}</td>
                                    </tr>

                                    {/* Môn Hóa học */}
                                    <tr>
                                        <td className="py-2 px-4 border-b">Hóa học</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[2].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[2].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[2].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[2].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[2].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[2].averageScore}</td>
                                    </tr>

                                    {/* Môn Sinh học */}
                                    <tr>
                                        <td className="py-2 px-4 border-b">Sinh học</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[3].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[3].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[3].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[3].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[3].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[3].averageScore}</td>
                                    </tr>

                                    {/* Môn Tin học */}
                                    <tr>
                                        <td className="py-2 px-4 border-b">Tin học</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[4].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[4].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[4].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[4].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[4].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[4].averageScore}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">Ngữ văn</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[5].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[5].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[5].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[5].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[5].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[5].averageScore}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">Lịch sử</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[6].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[6].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[6].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[6].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[6].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[6].averageScore}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">Địa lý</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[7].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[7].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[7].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[7].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[7].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[7].averageScore}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">Tiếng Anh</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[8].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[8].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[8].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[8].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[8].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[8].averageScore}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">Giáo dục Công dân</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[9].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[9].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[9].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[9].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[9].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[9].averageScore}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">Công nghệ</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[10].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[10].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[10].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[10].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[10].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[10].averageScore}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">Giáo dục Quốc phòng An Ninh</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[11].scores[0].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[11].scores[1].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[11].scores[2].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[11].scores[3].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[11].scores[4].score}</td>
                                        <td className="py-2 px-4 border-b">{data.data.subjects[11].averageScore}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TranscriptReviewer;
