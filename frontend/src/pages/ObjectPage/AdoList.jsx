// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

import InfoAdoModal from "../../Modals/ObjectModal/InfoAdoModal";
import AdoFormModal from "../../Modals/ObjectModal/AdoFormModal";

const AdoList = ({ ados, setAdos }) => {
    const [selectedAdo, setSelectedAdo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adoToEdit, setAdoToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [filteredAdos, setFilteredAdos] = useState(ados); // Trạng thái lưu người dùng đã lọc
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu giá trị tìm kiếm
    const [adoCount, setAdoCount] = useState(0);

    const handleDelete = async (ado) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${ado.objectId}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/ados/delete/${ado._id}`);
                const response = await axios.get("http://localhost:8080/api/ados/getall");
                setAdos(response.data); // Cập nhật lại danh sách người dùng sau khi xóa
            } catch (error) {
                console.error("Error while delete", error);
            }
        }
    };

    const handleMoreClick = (ado) => {
        setSelectedAdo(ado);
    };

    const handleEdit = (ado) => {
        setAdoToEdit(ado);
        setIsEditing(true);
        setIsModalOpen(true); // Mở modal chỉnh sửa
    };

    const handleAddAdo = () => {
        setAdoToEdit(null); // Đặt userToEdit là null cho form thêm mới
        setIsEditing(false); // Đặt chế độ là thêm mới
        setIsModalOpen(true); // Mở modal thêm mới
    };

    const handleCloseModal = () => {
        setSelectedAdo(null); // Đóng modal
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = ados.filter((ado) => ado.objectId.toLowerCase().includes(query));
        setFilteredAdos(filtered);
    };
    useEffect(() => {
        // Lấy toàn bộ adoission blocks (ADB)
        setFilteredAdos(ados); // Giả sử bạn có danh sách ADB là 'adoissionBlocks'
        setAdoCount(ados.length); // Cập nhật số lượng adoission blocks
        console.log(ados);
    }, [ados]); // Lắng nghe thay đổi của role và users

    // Đếm số lượng người dùng theo role
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Quản lý đối tượng ưu tiên</h1>
            {/* Hiển thị số lượng người dùng */}
            <div className="flex space-x-2">
                {/* Nút Add */}
                <button
                    onClick={handleAddAdo}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mb-4"
                >
                    Add
                </button>
                <p className="p-2 pr-8 border border-gray-300 rounded mb-4">Tổng: {adoCount}</p>
                {/* Thanh tìm kiếm */}
                <div className="flex space-x-2 justify-end mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm theo ID "
                        className="p-2 pr-8 border appearance-none border-gray-300 rounded"
                    />
                </div>
            </div>
            {/* Khung danh sách người dùng */}
            <div className="max-h-[458px] overflow-y-auto border border-gray-300 rounded p-4">
                <ul className="space-y-2">
                    {filteredAdos.map((ado) => (
                        <li
                            key={ado._id}
                            className="flex justify-between items-center p-4 border border-gray-200 rounded shadow-sm"
                        >
                            {ado.objectId} ({ado.objectName})
                            <div className="flex ml-auto">
                                <button
                                    onClick={() => handleEdit(ado)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                                >
                                    Cập nhật
                                </button>
                                <button
                                    onClick={() => handleDelete(ado)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mr-2"
                                >
                                    Xoá
                                </button>
                                <button
                                    onClick={() => handleMoreClick(ado)}
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
                <AdoFormModal
                    adoId={adoToEdit?._id}
                    adoToEdit={adoToEdit}
                    setAdos={setAdos}
                    onClose={() => setIsModalOpen(false)} // Đóng modal
                    isEditing={isEditing}
                />
            )}

            {/* Modal hiển thị chi tiết thông tin người dùng */}
            <InfoAdoModal ado={selectedAdo} onClose={handleCloseModal} />
        </div>
    );
};

export default AdoList;
