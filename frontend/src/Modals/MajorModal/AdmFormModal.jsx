// UserFormModal.js
import { useState, useEffect } from "react";
import axios from "axios";

const AdmFormModal = ({ admId, admToEdit, setAdms, onClose, isEditing }) => {
    const [majorId, setMajorId] = useState("");
    const [majorCodeName, setMajorCodeName] = useState("");
    const [majorName, setMajorName] = useState("");
    const [majorCombination, setMajorCombination] = useState("");
    const [majorDescription, setMajorDescription] = useState("");
    const [error, setError] = useState("");
    const [admissionBlocks, setAdmissionBlocks] = useState([]); // Lưu danh sách từ MongoDB
    const [selectedCombinations, setSelectedCombinations] = useState([]); // Lưu các combination được chọn

    useEffect(() => {
        const fetchAdmissionBlocks = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adbs/getall");
                setAdmissionBlocks(response.data);
            } catch (error) {
                console.error("Error fetching admission blocks", error);
            }
        };
        fetchAdmissionBlocks();

        if (admToEdit) {
            setMajorId(admToEdit.majorId);
            setMajorCodeName(admToEdit.majorCodeName);
            setMajorName(admToEdit.majorName);
            setMajorCombination(admToEdit.majorCombination);
            setMajorDescription(admToEdit.majorDescription);
            setSelectedCombinations(admToEdit.majorCombination || []);
        } else {
            setMajorId("");
            setMajorCodeName("");
            setMajorName("");
            setMajorCombination("");
            setMajorDescription("");
            setSelectedCombinations([]);
        }
    }, [admToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAdm = {
            majorId,
            majorCodeName,
            majorName,
            majorCombination: selectedCombinations,
            majorDescription: majorDescription || null,
        };

        try {
            if (isEditing && admId) {
                // Cập nhật user
                await axios.put(`http://localhost:8080/api/adms/update/${admId}`, newAdm);
            } else {
                // Thêm user mới
                await axios.post("http://localhost:8080/api/adms/add", newAdm);
            }

            // Cập nhật danh sách người dùng sau khi thêm hoặc sửa
            const response = await axios.get("http://localhost:8080/api/adms/getall");
            setAdms(response.data);
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
                    {isEditing ? "Edit Admission Major" : "Add Admission Major"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="ID"
                        value={majorId}
                        onChange={(e) => setMajorId(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Code Name"
                        value={majorCodeName}
                        onChange={(e) => setMajorCodeName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={majorName}
                        onChange={(e) => setMajorName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <div>
                        {/* <label className="block font-semibold mb-2">Combination</label> */}
                        <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded p-2 place-items-center">
                            {admissionBlocks.map((block) => (
                                <label key={block._id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value={block.admissionBlockId}
                                        checked={selectedCombinations.includes(block.admissionBlockId)}
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
                                    <span>{block.admissionBlockId}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <textarea
                        type="text"
                        placeholder="Description"
                        value={majorDescription}
                        onChange={(e) => setMajorDescription(e.target.value || null)}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded resize-none"
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

export default AdmFormModal;
