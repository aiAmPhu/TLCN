import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterPage = () => {
    const [emails, setEmails] = useState([]); // State lưu trữ các email
    const [filteredEmails, setFilteredEmails] = useState([]); // State lưu trữ các email đã lọc
    const [loading, setLoading] = useState(false); // State kiểm tra trạng thái loading
    const [error, setError] = useState(""); // State lưu thông báo lỗi
    const [filterText, setFilterText] = useState(""); // State để lưu giá trị lọc
    // Gọi API khi component được mount
    useEffect(() => {
        const fetchEmails = async () => {
            setLoading(true); // Bắt đầu loading
            setError(""); // Reset lỗi khi bắt đầu lấy dữ liệu

            try {
                const response = await axios.get("http://localhost:8080/api/wish/getUniqueEmails");
                setEmails(response.data.data); // Lưu dữ liệu email vào state
                setFilteredEmails(response.data.data); // Set dữ liệu email đã lấy vào filteredEmails
            } catch (err) {
                setError("Lỗi khi lấy dữ liệu"); // Nếu có lỗi
                console.error(err);
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };

        fetchEmails();
    }, []); // Chỉ gọi API một lần khi component được render lần đầu

    // Hàm xử lý tìm kiếm khi thay đổi trong input
    const handleSearchChange = (e) => {
        setFilterText(e.target.value); // Cập nhật filterText khi người dùng nhập
        const filtered = emails.filter(
            (email) => email.toLowerCase().includes(e.target.value.toLowerCase()) // Lọc theo filterText
        );
        setFilteredEmails(filtered); // Cập nhật danh sách email đã lọc
    };

    // Hàm xử lý nút Lọc
    const handleFilter = async () => {
        try {
            //console.log(filteredEmails);
            // Gọi API song song cho tất cả email
            const results = await axios.get(`http://localhost:8080/api/wish/getByStatus`);

            //console.log(results);
            const wishes = results.data.data;
            console.log("All wishes fetched:", wishes);
            let emailChecked = [];
            for (const wish of wishes) {
                const { _id, major, criteriaId, email, scores, priority } = wish; // Lấy majorId và criteriaId từ wish
                if (!emailChecked.includes(email)) {
                    //emailChecked !== "" &&
                    // Thực hiện hành động nếu emailCheck không rỗng và khác email
                    //console.log(_id);
                    // Bước 3: Gọi API getQuantityByCriteriaIdAndMajorId
                    const quantityResponse = await axios.get(
                        `http://localhost:8080/api/adqs/getQuantityByCriteriaIdAndMajorId/${criteriaId}/${major}`
                    );
                    console.log(quantityResponse.data.data);
                    // Kiểm tra và in ra kết quả
                    if (quantityResponse.data.data.length > 0) {
                        const quantity = quantityResponse.data.data[0].quantity; // Lấy quantity
                        if (scores >= quantity) {
                            await axios.put(`http://localhost:8080/api/wish/accept/${_id}`);
                            //await axios.put(`http://localhost:8080/api/wish/waiting/${_id}`);
                            emailChecked.push(email);
                        } else await axios.put(`http://localhost:8080/api/wish/reject/${_id}`);
                        //console.log(`Major: ${major}, CriteriaId: ${criteriaId}, Quantity: ${quantity}`);
                    } else {
                        console.log(`Không có số lượng cho Major: ${major}, CriteriaId: ${criteriaId}`);
                    }
                } else {
                    await axios.put(`http://localhost:8080/api/wish/reject/${_id}`);
                    //await axios.put(`http://localhost:8080/api/wish/waiting/${_id}`);
                }
            }
            alert("Lọc thành công");
        } catch (error) {
            console.error("Error fetching wishes:", error);
            throw error;
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-blue-600 flex-grow mb-6">Danh sách Hồ sơ</h1>
            {loading && <div className="text-center text-gray-700">Đang tải...</div>}

            {error && <div className="text-center text-red-600">{error}</div>}

            {/* Hiển thị số lượng email và nút lọc */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-lg font-medium text-gray-800">
                    {filteredEmails.length > 0
                        ? `Có ${filteredEmails.length} hồ sơ trên hệ thống`
                        : "Chưa có hồ sơ nào."}
                </p>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo email..."
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterText}
                        onChange={handleSearchChange} // Xử lý tìm kiếm khi thay đổi
                    />
                    <button
                        onClick={handleFilter} // Gọi hàm lọc khi nhấn nút
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Lọc
                    </button>
                </div>
            </div>

            {/* Hiển thị danh sách email đã lọc */}
            <div className="space-y-4">
                {filteredEmails.length > 0 ? (
                    <ul>
                        {filteredEmails.map((email, index) => (
                            <li
                                key={index}
                                className="bg-white p-4 border border-gray-200 rounded shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <p className="text-lg font-semibold text-gray-800">Email: {email}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <div className="text-center text-gray-700">Không có email nào.</div>
                )}
            </div>
        </div>
    );
};

export default FilterPage;
