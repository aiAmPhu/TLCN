// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
// import InfoAdrModal from "../Modals/InfoAdrModal";
// import AdrFormModal from "../Modals/AdrFormModal";
import InfoAdrModal from "../../Modals/RegionModal/InfoAdrModal";
import AdrFormModal from "../../Modals/RegionModal/AdrFormModal";

const AdrList = ({ adrs, setAdrs }) => {
    const [selectedAdr, setSelectedAdr] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adrToEdit, setAdrToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [filteredAdrs, setFilteredAdrs] = useState(adrs); // Trạng thái lưu người dùng đã lọc
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu giá trị tìm kiếm
    const [adrCount, setAdrCount] = useState(0);

    const handleDelete = async (adr) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${adr.regionId}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/adrs/delete/${adr._id}`);
                const response = await axios.get("http://localhost:8080/api/adrs/getall");
                setAdrs(response.data); // Cập nhật lại danh sách người dùng sau khi xóa
            } catch (error) {
                console.error("Error while delete", error);
            }
        }
    };

    const handleMoreClick = (adr) => {
        setSelectedAdr(adr);
    };

    const handleEdit = (adr) => {
        setAdrToEdit(adr);
        setIsEditing(true);
        setIsModalOpen(true); // Mở modal chỉnh sửa
    };

    const handleAddAdr = () => {
        setAdrToEdit(null); // Đặt userToEdit là null cho form thêm mới
        setIsEditing(false); // Đặt chế độ là thêm mới
        setIsModalOpen(true); // Mở modal thêm mới
    };

    const handleCloseModal = () => {
        setSelectedAdr(null); // Đóng modal
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = adrs.filter((adr) => adr.regionId.toLowerCase().includes(query));
        setFilteredAdrs(filtered);
    };
    useEffect(() => {
        // Lấy toàn bộ adrission blocks (ADB)
        setFilteredAdrs(adrs); // Giả sử bạn có danh sách ADB là 'adrissionBlocks'
        setAdrCount(adrs.length); // Cập nhật số lượng adrission blocks
        console.log(adrs);
    }, [adrs]); // Lắng nghe thay đổi của role và users

    // Đếm số lượng người dùng theo role
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Danh sách khu vực ưu tiên</h1>
            {/* Hiển thị số lượng người dùng */}
            <div className="flex space-x-2">
                {/* Nút Add */}
                <button
                    onClick={handleAddAdr}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mb-4"
                >
                    Thêm
                </button>
                <p className="p-2 pr-8 border border-gray-300 rounded mb-4">Tổng: {adrCount}</p>
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
                    {filteredAdrs.map((adr) => (
                        <li
                            key={adr._id}
                            className="flex justify-between items-center p-4 border border-gray-200 rounded shadow-sm"
                        >
                            {adr.regionId} ({adr.regionName})
                            <div className="flex ml-auto">
                                <button
                                    onClick={() => handleEdit(adr)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                                >
                                    Cập nhật
                                </button>
                                <button
                                    onClick={() => handleDelete(adr)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mr-2"
                                >
                                    Xoá
                                </button>
                                <button
                                    onClick={() => handleMoreClick(adr)}
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
                <AdrFormModal
                    adrId={adrToEdit?._id}
                    adrToEdit={adrToEdit}
                    setAdrs={setAdrs}
                    onClose={() => setIsModalOpen(false)} // Đóng modal
                    isEditing={isEditing}
                />
            )}

            {/* Modal hiển thị chi tiết thông tin người dùng */}
            <InfoAdrModal adr={selectedAdr} onClose={handleCloseModal} />
        </div>
    );
};

export default AdrList;
