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
        const updateAllActiveStatuses = async () => {
            try {
                const updates = adys.map((ady) => {
                    const currentDate = new Date();
                    const endDate = new Date(ady.endDate);
                    const isActive = endDate > currentDate;

                    // Chỉ cập nhật nếu Active
                    if (isActive) {
                        return axios.put(`http://localhost:8080/api/adys/update/${ady._id}`, {
                            status: "Active",
                        });
                    } else {
                        return axios.put(`http://localhost:8080/api/adys/update/${ady._id}`, {
                            status: "Inactive",
                        });
                    }
                    return Promise.resolve(); // Không cần cập nhật nếu không Active
                });

                await Promise.all(updates); // Đợi tất cả cập nhật hoàn tất
                console.log("Updated all active statuses successfully");
            } catch (error) {
                console.error("Error updating active statuses:", error);
            }
        };

        updateAllActiveStatuses();
        setFilteredAdys(adys); // Giả sử bạn có danh sách ADB là 'adyissionBlocks'
        setAdyCount(adys.length); // Cập nhật số lượng adyission blocks
        //console.log(adys);
    }, [adys]); // Lắng nghe thay đổi của role và users

    // Đếm số lượng người dùng theo role
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg ">
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
                    {filteredAdys.map((ady) => {
                        const currentDate = new Date();
                        const endDate = new Date(ady.endDate);
                        const isActive = endDate > currentDate;

                        return (
                            <li key={ady._id} className="flex justify-between items-center p-4 border rounded ">
                                {ady.yearName}
                                <div className="flex ml-auto">
                                    <span
                                        className={`px-2 py-1 text-sm font-semibold rounded mr-2 ${
                                            isActive
                                                ? "bg-green-200 text-green-800" // Active
                                                : "bg-red-200 text-red-800" // Inactive
                                        }`}
                                    >
                                        {isActive ? "Active" : "Inactive"}
                                    </span>
                                    <button
                                        onClick={() => handleEdit(ady)}
                                        disabled={!isActive} // Vô hiệu hóa nếu không Active
                                        className={`py-1 px-3 rounded mr-2 ${
                                            isActive
                                                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ady)}
                                        disabled={!isActive} // Vô hiệu hóa nếu không Active
                                        className={`py-1 px-3 rounded mr-2 ${
                                            isActive
                                                ? "bg-red-500 text-white hover:bg-red-600"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
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
                        );
                    })}
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
