// UserFormModal.js
import { useState, useEffect } from "react";
import axios from "axios";

const PermissionFormModal = ({ userId, userToEdit, setUsers, onClose, isEditing }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [admissionMajors, setAdmissionMajors] = useState([]); // Lưu danh sách từ MongoDB
    const [selectedCombinations, setSelectedCombinations] = useState([]); // Lưu các combination được chọn

    useEffect(() => {
        const fetchAdmissionMajors = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adms/getall");
                setAdmissionMajors(response.data);
            } catch (error) {
                console.error("Error fetching admission majors", error);
            }
        };
        fetchAdmissionMajors();

        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
            setSelectedCombinations(userToEdit.majorGroup || []);
        } else {
            setSelectedCombinations([]);
        }
    }, [userToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("Selected Combinations:", selectedCombinations);
        console.log("Submitting data:", { name, email, majorCombination: selectedCombinations });
        const newUser = {
            majorGroup: selectedCombinations,
        };

        try {
            await axios.put(`http://localhost:8080/api/permissions/update/${userId}`, newUser);
            // Cập nhật danh sách người dùng sau khi thêm hoặc sửa
            const response = await axios.get("http://localhost:8080/api/users/getall");
            setUsers(response.data);
            // Đóng modal sau khi submit
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error.response || error);
            if (error.response && error.response.data) {
                // Kiểm tra các mã lỗi khác nhau
                if (error.status === 400) {
                    setError(error.response.data.message || "Trùng email"); // Hiển thị thông báo lỗi "Trùng email" nếu mã lỗi là 400
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

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            {/* Hiển thị cửa sổ lỗi nếu có */}
            {error && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-red-500 text-white p-6 rounded-md shadow-lg max-w-xs w-full text-center">
                        <p>{error}</p>
                        <button onClick={() => setError("")} className="mt-4 bg-white text-red-500 px-4 py-2 rounded">
                            Đóng
                        </button>
                    </div>
                </div>
            )}
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {/* {isEditing ? "Edit Admission Major" : "Add Admission Major"} */}
                    Cập nhật phân quyền
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        disabled
                    />
                    <input
                        type="text"
                        value={email}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        disabled
                    />

                    <div>
                        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded p-2 place-items-center">
                            {admissionMajors.map((major) => (
                                <label key={major._id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value={major.majorId}
                                        checked={selectedCombinations.includes(major.majorId)}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSelectedCombinations(
                                                (prev) =>
                                                    prev.includes(value)
                                                        ? prev.filter((item) => item !== value) // Bỏ chọn
                                                        : [...prev, value] // Thêm vào mảng
                                            );
                                        }}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span>{major.majorId}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            {/* {isEditing ? "Update" : "Add"} */}
                            Cập nhật
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                           Đóng
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PermissionFormModal;
