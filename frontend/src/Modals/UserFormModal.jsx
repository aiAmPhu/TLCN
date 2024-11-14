// UserFormModal.js
import { useState, useEffect } from "react";
import axios from "axios";

const UserFormModal = ({ userId, userToEdit, setUsers, onClose, isEditing }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
            setPassword(userToEdit.password);
        } else {
            setName("");
            setEmail("");
            setPassword("");
        }
    }, [userToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { name, email, password };
        try {
            if (isEditing && userId) {
                // Cập nhật user
                await axios.put(`http://localhost:8080/api/users/update/${userId}`, newUser);
            } else {
                // Thêm user mới
                await axios.post("http://localhost:8080/api/users/add", newUser);
            }

            // Cập nhật danh sách người dùng sau khi thêm hoặc sửa
            const response = await axios.get("http://localhost:8080/api/users/getall");
            setUsers(response.data);
            // Đóng modal sau khi submit
            onClose();
        } catch (error) {
            // Hiển thị lỗi từ backend
            if (error.response && error.response.data) {
                setError(error.response.data.message); // Hiển thị thông báo lỗi từ backend
            } else {
                setError("An error occurred, please try again."); // Nếu có lỗi khác
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            {/* Hiển thị cửa sổ lỗi nếu có */}
            {error && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-red-500 text-white p-6 rounded-md shadow-lg max-w-xs w-full text-center">
                        <p>{error}</p>
                        <button onClick={() => setError("")} className="mt-4 bg-white text-red-500 px-4 py-2 rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">{isEditing ? "Edit User" : "Add User"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <div className="flex justify-between mt-4">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            {isEditing ? "Update User" : "Add User"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;
