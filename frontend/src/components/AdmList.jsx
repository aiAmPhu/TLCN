// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoAdmModal from "../Modals/InfoAdmModal";
import AdmFormModal from "../Modals/AdmFormModal";

const AdmList = ({ adms, setAdms }) => {
    const [selectedAdm, setSelectedAdm] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [admToEdit, setAdmToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [filteredAdms, setFilteredAdms] = useState(adms); // Trạng thái lưu người dùng đã lọc
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu giá trị tìm kiếm
    const [admCount, setAdmCount] = useState(0);

    const handleDelete = async (adm) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${adm.name}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/adms/delete/${adm._id}`);
                const response = await axios.get("http://localhost:8080/api/adms/getall");
                setAdms(response.data); // Cập nhật lại danh sách người dùng sau khi xóa
            } catch (error) {
                console.error("Error while delete", error);
            }
        }
    };

    const handleMoreClick = (adm) => {
        setSelectedAdm(adm);
    };

    const handleEdit = (adm) => {
        setAdmToEdit(adm);
        setIsEditing(true);
        setIsModalOpen(true); // Mở modal chỉnh sửa
    };

    const handleAddAdm = () => {
        setAdmToEdit(null); // Đặt userToEdit là null cho form thêm mới
        setIsEditing(false); // Đặt chế độ là thêm mới
        setIsModalOpen(true); // Mở modal thêm mới
    };

    const handleCloseModal = () => {
        setSelectedAdm(null); // Đóng modal
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = adms.filter((adm) => adm.majorId.toLowerCase().includes(query));
        setFilteredAdms(filtered);
    };
    useEffect(() => {
        // Lấy toàn bộ admission blocks (ADB)
        setFilteredAdms(adms); // Giả sử bạn có danh sách ADB là 'admissionBlocks'
        setAdmCount(adms.length); // Cập nhật số lượng admission blocks
        console.log(adms);
    }, [adms]); // Lắng nghe thay đổi của role và users

    // Đếm số lượng người dùng theo role
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-semibold mb-6">Admission Major List</h2>
            {/* Hiển thị số lượng người dùng */}
            <div className="flex space-x-2">
                {/* Nút Add */}
                <button
                    onClick={handleAddAdm}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mb-4"
                >
                    Add
                </button>
                <p className="p-2 pr-8 border border-gray-300 rounded mb-4">Total: {admCount}</p>
                {/* Thanh tìm kiếm */}
                <div className="flex space-x-2 justify-end mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by code name..."
                        className="p-2 pr-8 border appearance-none border-gray-300 rounded"
                    />
                </div>
            </div>
            {/* Khung danh sách người dùng */}
            <div className="max-h-[458px] overflow-y-auto border border-gray-300 rounded p-4">
                <ul className="space-y-2">
                    {filteredAdms.map((adm) => (
                        <li
                            key={adm._id}
                            className="flex justify-between items-center p-4 border border-gray-200 rounded shadow-sm"
                        >
                            {adm.majorId} ({adm.majorName})
                            <div className="flex ml-auto">
                                <button
                                    onClick={() => handleEdit(adm)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(adm)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mr-2"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleMoreClick(adm)}
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
                <AdmFormModal
                    admId={admToEdit?._id}
                    admToEdit={admToEdit}
                    setAdms={setAdms}
                    onClose={() => setIsModalOpen(false)} // Đóng modal
                    isEditing={isEditing}
                />
            )}

            {/* Modal hiển thị chi tiết thông tin người dùng */}
            <InfoAdmModal adm={selectedAdm} onClose={handleCloseModal} />
        </div>
    );
};

export default AdmList;
