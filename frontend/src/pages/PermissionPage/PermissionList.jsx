// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoModal from "../../Modals/UserModal/InfoModal";
import PermissionFormModal from "../../Modals/PermissionModal/PermissionFormModal";
import InfoPermissionModal from "../../Modals/PermissionModal/InfoPermissionModal";
const PermissionList = ({ users, setUsers }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu giá trị tìm kiếm
    const [filteredUsers, setFilteredUsers] = useState(users); // Trạng thái lưu người dùng đã lọc

    const handleDelete = async (user) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${user.name}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/permissions/delete/${user._id}`);
                const response = await axios.get("http://localhost:8080/api/users/getall");
                setUsers(response.data); // Cập nhật lại danh sách người dùng sau khi xóa
            } catch (error) {
                console.error("Error deleting user", error);
            }
        }
    };

    const handleMoreClick = (user) => {
        setSelectedUser(user);
    };

    const handleEdit = (user) => {
        setUserToEdit(user);
        setIsModalOpen(true); // Mở modal chỉnh sửa
    };

    const handleCloseModal = () => {
        setSelectedUser(null); // Đóng modal
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = users.filter((user) => user.name.toLowerCase().includes(query));
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        setFilteredUsers(users);
        console.log(users); // Cập nhật danh sách người dùng khi users thay đổi
    }, [users]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Quản lý phân quyền</h1>
            {/* Thanh tìm kiếm */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-700 font-medium">Tổng: {filteredUsers.length}</p>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Tìm theo tên ...."
                    className="p-2 pr-8 border appearance-none border-gray-300 rounded"
                />
                {/* Nút thêm người dùng */}
            </div>
            {/* Khung danh sách người dùng */}
            <div className="max-h-[458px] overflow-y-auto border border-gray-300 rounded p-4">
                <ul className="space-y-2">
                    {filteredUsers.map((user) => (
                        <li
                            key={user._id}
                            className="flex justify-between items-center p-4 border border-gray-200 rounded shadow-sm"
                        >
                            <div className="flex flex-col">
                                <span>{user.name}</span>
                                <span className="break-words">{user.email}</span>
                            </div>
                            <div className="flex items-center ml-auto space-x-2">
                                {/* Trạng thái Active/Inactive */}
                                <span
                                    className={`px-2 py-1 text-sm font-medium rounded ${
                                        user.majorGroup && user.majorGroup.length > 0
                                            ? "bg-green-100 text-green-800" // Active style
                                            : "bg-red-100 text-red-800" // Inactive style
                                    }`}
                                >
                                    {user.majorGroup && user.majorGroup.length > 0 ? "Kích hoạt" : "Chưa kích hoạt"}
                                </span>
                                {/* Các nút hành động */}
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                >
                                    Cập nhật
                                </button>
                                <button
                                    onClick={() => handleDelete(user)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                >
                                    Xoá
                                </button>
                                <button
                                    onClick={() => handleMoreClick(user)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                >
                                    Xem thêm
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Modal chỉnh sửa/thêm người dùng */}
            {isModalOpen && (
                <PermissionFormModal
                    userId={userToEdit?._id}
                    userToEdit={userToEdit}
                    setUsers={setUsers}
                    onClose={() => setIsModalOpen(false)} // Đóng modal
                />
            )}

            {/* Modal hiển thị chi tiết thông tin người dùng */}
            <InfoPermissionModal user={selectedUser} onClose={handleCloseModal} />
        </div>
    );
};

export default PermissionList;
