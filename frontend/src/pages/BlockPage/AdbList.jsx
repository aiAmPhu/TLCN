// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoAdbModal from "../../Modals/BlockModal/InfoAdbModal";
import AdbFormModal from "../../Modals/BlockModal/AdbFormModal";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
const AdbList = ({ adbs, setAdbs }) => {
    const [selectedAdb, setSelectedAdb] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adbToEdit, setAdbToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [filteredAdbs, setFilteredAdbs] = useState(adbs); // Trạng thái lưu người dùng đã lọc
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu giá trị tìm kiếm
    const [adbCount, setAdbCount] = useState(0);
    const [selectedKeyword, setSelectedKeyword] = useState(""); // Từ khóa lọc (ví dụ: A, B, C,...)
    const [blocks, setBlocks] = useState([]); // Lưu trữ dữ liệu khối ngành từ API
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredBlocks, setFilteredBlocks] = useState([]); // Các khối ngành đã lọc

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
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
        const fetchBlocks = async () => {
            try {
                const response = await axios.get("/api/blocks"); // Gọi API để lấy danh sách khối ngành
                setBlocks(response.data);
                setFilteredAdbs(adbs); // Mặc định, hiển thị tất cả các khối ngành
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu khối ngành:", error);
            }
        };

        fetchBlocks();
        setAdbCount(adbs.length); // Cập nhật số lượng admission blocks
    }, [adbs]);
    // Xử lý thay đổi từ khóa lọc
    const handleKeywordChange = (event) => {
        const keyword = event.target.value.toUpperCase(); // Chuyển đổi từ khóa thành chữ hoa
        setSelectedKeyword(keyword);

        // Nếu người dùng nhập từ khóa (ví dụ: "B")
        if (keyword) {
            // Lọc các admissionBlocks có 'admissionBlockId' chứa từ khóa (dùng includes thay vì startsWith)
            const filtered = adbs.filter(
                (adb) => adb.admissionBlockId.toUpperCase().includes(keyword) // Kiểm tra xem admissionBlockId có chứa từ khóa hay không
            );
            setFilteredAdbs(filtered);
        } else {
            // Nếu không có từ khóa, hiển thị tất cả
            setFilteredAdbs(adbs);
        }
    };
    // Đếm số lượng người dùng theo role
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Quản lý khối xét tuyển</h1>
            {/* Hiển thị số lượng người dùng */}
            <div className="flex space-x-2">
                {/* Nút Add */}
                <button
                    onClick={handleAddAdb}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mb-4"
                >
                    Thêm
                </button>
                {/* Dropdown chọn khối ngành */}
                <div className="mb-4 relative">
                    <select
                        id="block"
                        value={selectedKeyword}
                        onChange={handleKeywordChange}
                        onClick={toggleDropdown}
                        className="p-2 pr-8 border appearance-none border-gray-300 rounded"
                    >
                        <option value="">Tất cả</option>
                        <option value="A">Khối A</option>
                        <option value="B">Khối B</option>
                        <option value="C">Khối C</option>
                        <option value="D">Khối D</option>
                        <option value="H">Khối H</option>
                        <option value="V">Khối V</option>
                        <option value="R">Khối R</option>
                        <option value="M">Khối M</option>
                        <option value="N">Khối N</option>
                        <option value="T">Khối T</option>
                    </select>
                    {isDropdownOpen ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    )}
                </div>

                <p className="p-2 pr-8 border border-gray-300 rounded mb-4">Tổng: {adbCount}</p>
                {/* Thanh tìm kiếm */}
                <div className="flex space-x-2 justify-end mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm theo ID khối xét tuyển"
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
                                    Cập nhật
                                </button>
                                <button
                                    onClick={() => handleDelete(adb)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mr-2"
                                >
                                    Xoá
                                </button>
                                <button
                                    onClick={() => handleMoreClick(adb)}
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
