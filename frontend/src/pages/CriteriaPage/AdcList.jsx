// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoAdcModal from "../../Modals/CriteriaModal/InfoAdcModal";
import AdcFormModal from "../../Modals/CriteriaModal/AdcFormModal";

const AdcList = ({ adcs, setAdcs }) => {
    const [selectedAdc, setSelectedAdc] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adcToEdit, setAdcToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [filteredAdcs, setFilteredAdcs] = useState(adcs); // Trạng thái lưu người dùng đã lọc
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu giá trị tìm kiếm
    const [adcCount, setAdcCount] = useState(0);

    const handleDelete = async (adc) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${adc.criteriaName}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/adcs/delete/${adc._id}`);
                const response = await axios.get("http://localhost:8080/api/adcs/getall");
                setAdcs(response.data); // Cập nhật lại danh sách người dùng sau khi xóa
            } catch (error) {
                console.error("Error while delete", error);
            }
        }
    };

    const handleMoreClick = (adc) => {
        setSelectedAdc(adc);
    };

    const handleEdit = (adc) => {
        setAdcToEdit(adc);
        setIsEditing(true);
        setIsModalOpen(true); // Mở modal chỉnh sửa
    };

    const handleAddAdc = () => {
        setAdcToEdit(null); // Đặt userToEdit là null cho form thêm mới
        setIsEditing(false); // Đặt chế độ là thêm mới
        setIsModalOpen(true); // Mở modal thêm mới
    };

    const handleCloseModal = () => {
        setSelectedAdc(null); // Đóng modal
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = adcs.filter((adc) => adc.criteriaId.toLowerCase().includes(query));
        setFilteredAdcs(filtered);
    };
    useEffect(() => {
        // Lấy toàn bộ adcission blocks (ADB)
        setFilteredAdcs(adcs); // Giả sử bạn có danh sách ADB là 'adcissionBlocks'
        setAdcCount(adcs.length); // Cập nhật số lượng adcission blocks
        console.log(adcs);
    }, [adcs]); // Lắng nghe thay đổi của role và users

    // Đếm số lượng người dùng theo role
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Quản lý diện xét tuyển</h1>
            {/* Hiển thị số lượng người dùng */}
            <div className="flex space-x-2">
                {/* Nút Add */}
                <button
                    onClick={handleAddAdc}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mb-4"
                >
                    Thêm
                </button>
                <p className="p-2 pr-8 border border-gray-300 rounded mb-4">Tổng: {adcCount}</p>
                {/* Thanh tìm kiếm */}
                <div className="flex space-x-2 justify-end mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm theo ID diện xét tuyển"
                        className="p-2 pr-8 border appearance-none border-gray-300 rounded"
                    />
                </div>
            </div>
            {/* Khung danh sách người dùng */}
            <div className="max-h-[458px] overflow-y-auto border border-gray-300 rounded p-4">
                <ul className="space-y-2">
                    {filteredAdcs.map((adc) => (
                        <li
                            key={adc._id}
                            className="flex justify-between items-center p-4 border border-gray-200 rounded shadow-sm"
                        >
                            {adc.criteriaId} ({adc.criteriaName})
                            <div className="flex ml-auto">
                                <button
                                    onClick={() => handleEdit(adc)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                                >
                                    Cập nhật
                                </button>
                                {/* <button
                                    onClick={() => handleDelete(adc)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mr-2"
                                >
                                    Delete
                                </button> */}
                                <button
                                    onClick={() => handleMoreClick(adc)}
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
                <AdcFormModal
                    adcId={adcToEdit?._id}
                    adcToEdit={adcToEdit}
                    setAdcs={setAdcs}
                    onClose={() => setIsModalOpen(false)} // Đóng modal
                    isEditing={isEditing}
                />
            )}

            {/* Modal hiển thị chi tiết thông tin người dùng */}
            <InfoAdcModal adc={selectedAdc} onClose={handleCloseModal} />
        </div>
    );
};

export default AdcList;
