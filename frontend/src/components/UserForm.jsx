import { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ userId, setUsers, setIsEditing, userToEdit, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            if (userId) {
                // Cập nhật user
                await axios.put(`http://localhost:8080/api/users/update/${userId}`, newUser);
            } else {
                // Thêm user mới
                await axios.post("http://localhost:8080/api/users/add", newUser);
            }

            // Cập nhật danh sách user sau khi thêm/sửa
            const response = await axios.get("http://localhost:8080/api/users/getall");
            setUsers(response.data);

            // Đóng Form
            onClose();
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-300 rounded shadow-md">
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
            <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    {userId ? "Update User" : "Add User"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default UserForm;
