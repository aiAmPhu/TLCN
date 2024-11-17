// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoAdbModal from "../Modals/InfoAdbModal";
import AdbFormModal from "../Modals/AdbFormModal";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
const AdbList = ({ adbs, setAdbs }) => {
    const [selectedAdb, setSelectedAdb] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adbToEdit, setAdbToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [filteredAdbs, setFilteredAdbs] = useState(adbs); // Trạng thái lưu người dùng đã lọc
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu giá trị tìm kiếm
    const [adbCount, setAdbCount] = useState(0);

    const handleDelete = async (adb) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${adb.name}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/adbs/delete/${adb._id}`);
                const response = await axios.get("http://localhost:8080/api/adbs/getall");
                setAdbs(response.data); // Cập nhật lại danh sách người dùng sau khi xóa
            } catch (error) {
                console.error("Error while delete", error);
            }
        }
    };

    const handleMoreClick = (adb) => {
        setSelectedAdb(adb);
    };

    const handleEdit = (adb) => {
        setAdbToEdit(adb);
        setIsEditing(true);
        setIsModalOpen(true); // Mở modal chỉnh sửa
    };

    const handleAddAdb = () => {
        setAdbToEdit(null); // Đặt userToEdit là null cho form thêm mới
        setIsEditing(false); // Đặt chế độ là thêm mới
        setIsModalOpen(true); // Mở modal thêm mới
    };

    const handleCloseModal = () => {
        setSelectedAdb(null); // Đóng modal
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = adbs.filter((adb) => adb.admissionBlockId.toLowerCase().includes(query));
        setFilteredAdbs(filtered);
    };
    useEffect(() => {
        // Lấy toàn bộ admission blocks (ADB)
        setFilteredAdbs(adbs); // Giả sử bạn có danh sách ADB là 'admissionBlocks'
        setAdbCount(adbs.length); // Cập nhật số lượng admission blocks
        console.log(adbs);
    }, [adbs]); // Lắng nghe thay đổi của role và users

    // Đếm số lượng người dùng theo role
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-semibold mb-6">Admission Block List</h2>
            {/* Hiển thị số lượng người dùng */}
            <div className="flex space-x-2">
                {/* Nút Add */}
                <button
                    onClick={handleAddAdb}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mb-4"
                >
                    Add
                </button>

                <p className="p-2 pr-8 border border-gray-300 rounded mb-4">Total: {adbCount}</p>
                {/* Thanh tìm kiếm */}
                <div className="flex space-x-2 justify-end mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by id..."
                        className="p-2 pr-8 border appearance-none border-gray-300 rounded"
                    />
                </div>
            </div>
            {/* Khung danh sách người dùng */}
            <div className="max-h-[458px] overflow-y-auto border border-gray-300 rounded p-4">
                <ul className="space-y-2">
                    {filteredAdbs.map((adb) => (
                        <li
                            key={adb._id}
                            className="flex justify-between items-center p-4 border border-gray-200 rounded shadow-sm"
                        >
                            {adb.admissionBlockId} ({adb.admissionBlockName})
                            <div className="flex ml-auto">
                                <button
                                    onClick={() => handleEdit(adb)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(adb)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mr-2"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleMoreClick(adb)}
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
                <AdbFormModal
                    adbId={adbToEdit?._id}
                    adbToEdit={adbToEdit}
                    setAdbs={setAdbs}
                    onClose={() => setIsModalOpen(false)} // Đóng modal
                    isEditing={isEditing}
                />
            )}

            {/* Modal hiển thị chi tiết thông tin người dùng */}
            <InfoAdbModal adb={selectedAdb} onClose={handleCloseModal} />
        </div>
    );
};

export default AdbList;
