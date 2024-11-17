// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoModal from "../Modals/InfoModal";
import UserFormModal from "../Modals/UserFormModal";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
const PermissionList = ({ users, setUsers }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [role, setRole] = useState("all"); // Trạng thái lưu giá trị role
    const [filteredUsers, setFilteredUsers] = useState(users); // Trạng thái lưu người dùng đã lọc
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái lưu giá trị tìm kiếm
    const [roleCount, setRoleCount] = useState(0);

    // Hàm xử lý thay đổi role
    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setRole(selectedRole);
        if (selectedRole === "all") {
            setFilteredUsers(users); // Nếu role là 'all', hiển thị tất cả người dùng
        } else {
            setFilteredUsers(users.filter((user) => user.role === selectedRole)); // Lọc người dùng theo role
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Đổi trạng thái mở/đóng dropdown
    };

    const handleDelete = async (user) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${user.name}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/users/delete/${user._id}`);
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
        setIsEditing(true);
        setIsModalOpen(true); // Mở modal chỉnh sửa
    };

    const handleAddUser = () => {
        setUserToEdit(null); // Đặt userToEdit là null cho form thêm mới
        setIsEditing(false); // Đặt chế độ là thêm mới
        setIsModalOpen(true); // Mở modal thêm mới
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
        if (role === "all") {
            setFilteredUsers(users); // Hiển thị tất cả người dùng nếu role là 'all'
        } else {
            setFilteredUsers(users.filter((user) => user.role === role)); // Lọc người dùng theo role
        }
        // Cập nhật số lượng người dùng theo role
        if (role !== "all") {
            setRoleCount(users.filter((user) => user.role === role).length);
        } else {
            setRoleCount(users.length); // Hiển thị tổng số người dùng khi chọn 'all'
        }
    }, [role, users]); // Lắng nghe thay đổi của role và users

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-semibold mb-6">User List</h2>
            {/* Hiển thị số lượng người dùng */}
            <div className="flex space-x-2">
                {/* Nút Add */}
                <button
                    onClick={handleAddUser}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mb-4"
                >
                    Add User
                </button>
                {/* Dropdown chọn role */}
                <div className="mb-4 relative">
                    <select
                        id="role"
                        value={role}
                        onChange={handleRoleChange}
                        onClick={toggleDropdown}
                        className="p-2 pr-8 border appearance-none border-gray-300 rounded"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="reviewer">Reviewer</option>
                        <option value="user">User</option>
                    </select>
                    {isDropdownOpen ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    )}
                </div>
                <p className="p-2 pr-8 border border-gray-300 rounded mb-4">User: {roleCount}</p>
                {/* Thanh tìm kiếm */}
                <div className="flex space-x-2 justify-end mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by name..."
                        className="p-2 pr-8 border appearance-none border-gray-300 rounded"
                    />
                </div>
            </div>

            {/* Khung danh sách người dùng */}
            <div className="max-h-[458px] overflow-y-auto border border-gray-300 rounded p-4">
                <ul className="space-y-2">
                    {filteredUsers.map((user) => (
                        <li
                            key={user._id}
                            className="flex justify-between items-center p-4 border border-gray-200 rounded shadow-sm"
                        >
                            {user.name} {/* ({user.email}) */}
                            <div className="flex ml-auto">
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mr-2"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleMoreClick(user)}
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
                <UserFormModal
                    userId={userToEdit?._id}
                    userToEdit={userToEdit}
                    setUsers={setUsers}
                    onClose={() => setIsModalOpen(false)} // Đóng modal
                    isEditing={isEditing}
                />
            )}

            {/* Modal hiển thị chi tiết thông tin người dùng */}
            <InfoModal user={selectedUser} onClose={handleCloseModal} />
        </div>
    );
};

export default PermissionList;
