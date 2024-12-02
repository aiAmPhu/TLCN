// UserFormModal.js
import { useState, useEffect } from "react";
import axios from "axios";
import { EyeIcon, EyeSlashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const UserFormModal = ({ userId, userToEdit, setUsers, onClose, isEditing }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("1");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [image, setImage] = useState(null);
    let [pic, setPic] = useState(null);
    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
            setPassword(userToEdit.password);
            setRole(userToEdit.role);
            setPic(userToEdit.pic);
        } else {
            setName("");
            setEmail("");
            setPassword("");
            setRole("admin");
            setPic("");
        }
    }, [userToEdit]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Đổi trạng thái mở/đóng dropdown
    };

    const handleSubmit = async (e) => {
        // Kiểm tra nếu pic là null, gán giá trị mặc định
        if (!pic) {
            setPic("https://res.cloudinary.com/dlum0st9k/image/upload/v1731705123/pngwing.com_1_x0zbek.png");
        }
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
            role,
            pic: pic || "https://res.cloudinary.com/dlum0st9k/image/upload/v1731705123/pngwing.com_1_x0zbek.png", // Sử dụng giá trị mớ
        };

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
            if (error.response && error.response.data) {
                // Kiểm tra mã lỗi trong dữ liệu phản hồi
                const { errorCode, message } = error.response.data;
                // Kiểm tra các mã lỗi khác nhau
                if (error.status === 400) {
                    setError(message || "Trùng email"); // Hiển thị thông báo lỗi "Trùng email" nếu mã lỗi là 400
                } else if (error.status === 500) {
                    setError("Vui lòng điền đầy đủ thông tin"); // Hiển thị thông báo lỗi nếu mã lỗi là 1
                } else {
                    setError("Đã xảy ra lỗi, vui lòng thử lại."); // Hiển thị thông báo lỗi chung
                }
            } else {
                // Hiển thị lỗi mặc định nếu không có lỗi phản hồi từ backend
                setError("Đã xảy ra lỗi, vui lòng thử lại nè.");
            }
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("image", image); // Gửi file trong formData

        try {
            const res = await axios.post("http://localhost:8080/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setPic(res.data.imageUrl);
            console.log("Image uploaded successfully:", res.data.imageUrl);
        } catch (err) {
            console.log("Error uploading image:", err);
        }
    };

    const handleImageChange = async (e) => {
        setImage(e.target.files[0]); // Lấy file từ input
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
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} // Điều chỉnh type để hiển thị/ẩn mật khẩu
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                    </div>
                    <div>
                        <label htmlFor="role" className="block mb-2">
                            Role
                        </label>
                        <div className="relative">
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                onClick={toggleDropdown}
                                className="w-full p-2 border border-gray-300 rounded appearance-none pr-8"
                            >
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
                    </div>
                    <div className="flex items-center">
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        <button
                            type="button"
                            onClick={handleUpload}
                            className="bg-orange-300 text-black py-1 px-4 rounded hover:bg-orange-400 ml-auto"
                        >
                            Upload
                        </button>
                    </div>
                    {pic && (
                        <div>
                            <img src={pic} className="ml-[100px]" width="200" height="200" />
                        </div>
                    )}

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
