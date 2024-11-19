// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoAdyModal from "../Modals/InfoAdyModal";
import AdyFormModal from "../Modals/AdyFormModal";

const AdyList = ({ adys, setAdys }) => {
    const [selectedAdy, setSelectedAdy] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adyToEdit, setAdyToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [filteredAdys, setFilteredAdys] = useState(adys); // Trạng thái lưu người dùng đã lọc
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu giá trị tìm kiếm
    const [adyCount, setAdyCount] = useState(0);

    const handleDelete = async (ady) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${ady.yearName}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/adys/delete/${ady._id}`);
                const response = await axios.get("http://localhost:8080/api/adys/getall");
                setAdys(response.data); // Cập nhật lại danh sách người dùng sau khi xóa
            } catch (error) {
                console.error("Error while delete", error);
            }
        }
    };

    const handleMoreClick = (ady) => {
        setSelectedAdy(ady);
    };

    const handleEdit = (ady) => {
        setAdyToEdit(ady);
        setIsEditing(true);
        setIsModalOpen(true); // Mở modal chỉnh sửa
    };

    const handleAddAdy = () => {
        setAdyToEdit(null); // Đặt userToEdit là null cho form thêm mới
        setIsEditing(false); // Đặt chế độ là thêm mới
        setIsModalOpen(true); // Mở modal thêm mới
    };

    const handleCloseModal = () => {
        setSelectedAdy(null); // Đóng modal
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = adys.filter((ady) => ady.yearId.toLowerCase().includes(query));
        setFilteredAdys(filtered);
    };
    useEffect(() => {
        // Lấy toàn bộ adyission blocks (ADB)
        setFilteredAdys(adys); // Giả sử bạn có danh sách ADB là 'adyissionBlocks'
        setAdyCount(adys.length); // Cập nhật số lượng adyission blocks
        //console.log(adys);
    }, [adys]); // Lắng nghe thay đổi của role và users

    // Đếm số lượng người dùng theo role
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-semibold mb-6">Manage Admission</h2>
            {/* Hiển thị số lượng người dùng */}
            <div className="flex space-x-2">
                {/* Nút Add */}
                <button
                    onClick={handleAddAdy}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mb-4"
                >
                    Add
                </button>
                <p className="p-2 pr-8 border border-gray-300 rounded mb-4">Total: {adyCount}</p>
                {/* Thanh tìm kiếm */}
                <div className="flex space-x-2 justify-end mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by ID..."
                        className="p-2 pr-8 border appearance-none border-gray-300 rounded"
                    />
                </div>
            </div>
            {/* Khung danh sách người dùng */}
            <div className="max-h-[458px] overflow-y-auto border border-gray-300 rounded p-4">
                <ul className="space-y-2">
                    {filteredAdys.map((ady) => (
                        <li
                            key={ady._id}
                            className="flex justify-between items-center p-4 border border-gray-200 rounded shadow-sm"
                        >
                            {ady.yearName}
                            {/* ({ady.majorName}) */}
                            <div className="flex ml-auto">
                                <button
                                    onClick={() => handleEdit(ady)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(ady)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mr-2"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleMoreClick(ady)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                >
                                    More
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {isModalOpen && (
                <AdyFormModal
                    adyId={adyToEdit?._id}
                    adyToEdit={adyToEdit}
                    setAdys={setAdys}
                    onClose={() => setIsModalOpen(false)} // Đóng modal
                    isEditing={isEditing}
                />
            )}

            {/* Modal hiển thị chi tiết thông tin người dùng */}
            <InfoAdyModal ady={selectedAdy} onClose={handleCloseModal} />
        </div>
    );
};

export default AdyList;
