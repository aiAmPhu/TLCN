import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
const UserList = ({ users, setUsers, setIsEditing, setUserToEdit }) => {
    const [selectedUser, setSelectedUser] = useState(null);
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

    const handleEdit = (user) => {
        setUserToEdit(user);
        setIsEditing(true);
    };

    const handleMoreClick = (user) => {
        setSelectedUser(user); // Gán người dùng được chọn để hiển thị chi tiết
    };

    const closeModal = () => {
        setSelectedUser(null); // Đóng modal bằng cách đặt selectedUser thành null
    };
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">User List</h2>
            <ul className="space-y-2">
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="flex justify-between items-center p-4 border border-gray-200 rounded shadow-sm"
                    >
                        {user.name}
                        {/*  ({user.email}) */}
                        <div className="flex ml-auto">
                            <button
                                onClick={() => handleMoreClick(user)}
                                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700 mr-2"
                            >
                                More
                            </button>
                            <button
                                onClick={() => handleEdit(user)}
                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user._id)}
                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Hiển thị modal khi selectedUser có giá trị */}
            {selectedUser && <Modal user={selectedUser} closeModal={closeModal} />}
        </div>
    );
};

export default UserList;
