import { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ userId, setUsers, setIsEditing, userToEdit }) => {
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
    // Kiểm tra nếu tất cả các trường dữ liệu bị xóa
    const isFormEmpty = !name && !email && !password;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { name, email, password };

        try {
            if (userId && !isFormEmpty) {
                // Cập nhật user
                await axios.put(`http://localhost:8080/api/users/update/${userId}`, newUser);
            } else {
                // Thêm user mới
                await axios.post("http://localhost:8080/api/users/add", newUser);
            }

            // Cập nhật danh sách người dùng sau khi thêm hoặc sửa
            const response = await axios.get("http://localhost:8080/api/users/getall");
            setUsers(response.data);

            // Reset form và đóng chế độ chỉnh sửa
            setName("");
            setEmail("");
            setPassword("");
            setIsEditing(false);
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };
    useEffect(() => {
        if (isFormEmpty) {
            setIsEditing(false);
        }
    }, [isFormEmpty, setIsEditing]);
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
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                {userId ? "Update User" : "Add User"}
            </button>
        </form>
    );
};

export default UserForm;
