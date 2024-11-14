// UserList.js
import React, { useState } from "react";
import axios from "axios";
import InfoModal from "../Modals/InfoModal";
import UserFormModal from "../Modals/UserFormModal";

const UserList = ({ users, setUsers, onAddClick, onEditClick }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/delete/${id}`);
            // Cập nhật danh sách user sau khi xóa
            const response = await axios.get("http://localhost:8080/api/users/getall");
            setUsers(response.data);
        } catch (error) {
            console.error("Error deleting user", error);
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

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">User List</h2>

            {/* Nút Add */}
            <button
                onClick={handleAddUser}
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mb-4"
            >
                Add User
            </button>

            <ul className="space-y-2">
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="flex justify-between items-center p-4 border border-gray-200 rounded shadow-sm"
                    >
                        {user.name} ({user.email})
                        <div className="flex ml-auto">
                            <button
                                onClick={() => handleEdit(user)}
                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user._id)}
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

export default UserList;
