// UserFormModal.js
import { useState, useEffect } from "react";
import axios from "axios";

const AdcFormModal = ({ adcId, adcToEdit, setAdcs, onClose, isEditing }) => {
    const [criteriaId, setCriteriaId] = useState("");
    const [criteriaName, setCriteriaName] = useState("");
    const [criteriaDescription, setCriteriaDescription] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        if (adcToEdit) {
            setCriteriaId(adcToEdit.criteriaId);
            setCriteriaName(adcToEdit.criteriaName);
            setCriteriaDescription(adcToEdit.criteriaDescription);
        } else {
            setCriteriaId("");
            setCriteriaName("");
            setCriteriaDescription("");
        }
    }, [adcToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAdc = {
            criteriaId,
            criteriaName,
            criteriaDescription,
        };

        try {
            if (isEditing && adcId) {
                // Cập nhật user
                await axios.put(`http://localhost:8080/api/adcs/update/${adcId}`, newAdc);
            } else {
                // Thêm user mới
                await axios.post("http://localhost:8080/api/adcs/add", newAdc);
            }
            // Cập nhật danh sách người dùng sau khi thêm hoặc sửa
            const response = await axios.get("http://localhost:8080/api/adcs/getall");
            setAdcs(response.data);
            // Đóng modal sau khi submit
            onClose();
        } catch (error) {
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
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isEditing ? "Edit Admission Block" : "Add Admission Block"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="ID"
                        value={criteriaId}
                        onChange={(e) => setCriteriaId(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={criteriaName}
                        onChange={(e) => setCriteriaName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <textarea
                        type="text"
                        placeholder="Description"
                        value={criteriaDescription}
                        onChange={(e) => setCriteriaDescription(e.target.value)}
                        rows={4}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <div className="flex justify-between mt-4">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            {isEditing ? "Update" : "Add"}
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

export default AdcFormModal;
