// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

import InfoAdqModal from "../../Modals/QuantityModal/InfoAdqModal";
import AdqFormModal from "../../Modals/QuantityModal/AdqFormModal";

const AdqList = ({ adqs, setAdqs }) => {
    const [selectedAdq, setSelectedAdq] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adqToEdit, setAdqToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [filteredAdqs, setFilteredAdqs] = useState(adqs); // Trạng thái lưu người dùng đã lọc
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu giá trị tìm kiếm
    const [adqCount, setAdqCount] = useState(0);

    const handleDelete = async (adq) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${adq.objectId}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/adqs/delete/${adq._id}`);
                const response = await axios.get("http://localhost:8080/api/adqs/getall");
                setAdqs(response.data); // Cập nhật lại danh sách người dùng sau khi xóa
            } catch (error) {
                console.error("Error while delete", error);
            }
        }
    };

    const handleMoreClick = (adq) => {
        setSelectedAdq(adq);
    };

    const handleEdit = (adq) => {
        setAdqToEdit(adq);
        setIsEditing(true);
        setIsModalOpen(true); // Mở modal chỉnh sửa
    };

    const handleAddAdq = () => {
        setAdqToEdit(null); // Đặt userToEdit là null cho form thêm mới
        setIsEditing(false); // Đặt chế độ là thêm mới
        setIsModalOpen(true); // Mở modal thêm mới
    };

    const handleCloseModal = () => {
        setSelectedAdq(null); // Đóng modal
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = adqs.filter((adq) => adq.objectId.toLowerCase().includes(query));
        setFilteredAdqs(filtered);
    };
    useEffect(() => {
        // Lấy toàn bộ adqission blocks (ADB)
        setFilteredAdqs(adqs); // Giả sử bạn có danh sách ADB là 'adqissionBlocks'
        setAdqCount(adqs.length); // Cập nhật số lượng adqission blocks
        console.log(adqs);
    }, [adqs]); // Lắng nghe thay đổi của role và users

    // Đếm số lượng người dùng theo role
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadqw-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Danh sách chỉ tiêu</h1>
            {/* Hiển thị số lượng người dùng */}
            <div className="flex space-x-2">
                {/* Nút Add */}
                <button
                    onClick={handleAddAdq}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mb-4"
                >
                    Thêm
                </button>
                <p className="p-2 pr-8 border border-gray-300 rounded mb-4">Tổng: {adqCount}</p>
                {/* Thanh tìm kiếm */}
                <div className="flex space-x-2 justify-end mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm theo ID"
                        className="p-2 pr-8 border appearance-none border-gray-300 rounded"
                    />
                </div>
            </div>
            {/* Khung danh sách người dùng */}
            <div className="max-h-[458px] overflow-y-auto border border-gray-300 rounded p-4">
                <ul className="space-y-2">
                    {filteredAdqs.map((adq) => (
                        <li
                            key={adq._id}
                            className="flex justify-between items-center p-4 border border-gray-200 rounded shadqw-sm"
                        >
                            Mã ngành: {adq.majorId} || Diện tuyển sinh: {adq.criteriaId} || Điểm chuẩn: {adq.quantity}{" "}
                            <div className="flex ml-auto">
                                <button
                                    onClick={() => handleEdit(adq)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                                >
                                    Cập nhật
                                </button>
                                {/* <button
                                    onClick={() => handleDelete(adq)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mr-2"
                                >
                                    Delete
                                </button> */}
                                <button
                                    onClick={() => handleMoreClick(adq)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                >
                                    Xem thêm
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {isModalOpen && (
                <AdqFormModal
                    adqId={adqToEdit?._id}
                    adqToEdit={adqToEdit}
                    setAdqs={setAdqs}
                    onClose={() => setIsModalOpen(false)} // Đóng modal
                    isEditing={isEditing}
                />
            )}

            {/* Modal hiển thị chi tiết thông tin người dùng */}
            <InfoAdqModal adq={selectedAdq} onClose={handleCloseModal} />
        </div>
    );
};

export default AdqList;
