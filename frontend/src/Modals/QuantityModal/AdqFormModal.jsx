// UserFormModal.js
import { useState, useEffect } from "react";
import axios from "axios";

const AdqFormModal = ({ adqId, adqToEdit, setAdqs, onClose, isEditing }) => {
    const [criteriaId, setCriteriaId] = useState("");
    const [majorId, setMajorId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error, setError] = useState("");
    const [admissionMajors, setAdmissionMajors] = useState([]);
    const [admissionCriterias, setAdmissionCriterias] = useState([]);
    const [selectedCombinationCriteria, setSelectedCombinationCriteria] = useState([]);
    const [selectedCombinationMajor, setSelectedCombinationMajor] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [criteriasResponse, majorsResponse] = await Promise.all([
                    axios.get("http://localhost:8080/api/adcs/getall"),
                    axios.get("http://localhost:8080/api/adms/getall"),
                ]);
                setAdmissionCriterias(criteriasResponse.data);
                setAdmissionMajors(majorsResponse.data);

                if (isEditing && adqToEdit) {
                    setCriteriaId(adqToEdit.criteriaId || "");
                    setMajorId(adqToEdit.majorId || "");
                    setQuantity(adqToEdit.quantity || "");
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
        if (isEditing && adqToEdit) {
            setCriteriaId(adqToEdit.criteriaId);
            setMajorId(adqToEdit.majorId);
            setQuantity(adqToEdit.quantity);
        } else {
            setCriteriaId("");
            setMajorId("");
            setQuantity("");
        }
        if (adqToEdit) {
            setSelectedCombinationCriteria(adqToEdit.criteriaId); // Gán giá trị criteriaId
            setSelectedCombinationMajor(adqToEdit.majorId); // Gán giá trị majorId
            setQuantity(adqToEdit.quantity); // Gán số lượng
        } else {
            // Reset giá trị nếu không phải chế độ chỉnh sửa
            setSelectedCombinationCriteria("");
            setSelectedCombinationMajor("");
            setQuantity("");
        }
    }, [adqToEdit, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAdq = {
            criteriaId: selectedCombinationCriteria,
            majorId: selectedCombinationMajor,
            quantity,
        };

        try {
            if (isEditing && adqId) {
                // Cập nhật user
                await axios.put(`http://localhost:8080/api/adqs/update/${adqId}`, newAdq);
            } else {
                // Thêm user mới
                await axios.post("http://localhost:8080/api/adqs/add", newAdq);
            }
            // Cập nhật danh sách người dùng sau khi thêm hoặc sửa
            const response = await axios.get("http://localhost:8080/api/adqs/getall");
            setAdqs(response.data);
            // Đóng modal sau khi submit
            onClose();
        } catch (error) {
            if (error.response && error.response.data) {
                // Kiểm tra các mã lỗi khác nhau
                if (error.status === 400) {
                    setError(error.response.data.message || "Trùng dữ liệu"); // Hiển thị thông báo lỗi "Trùng email" nếu mã lỗi là 400
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
                    {isEditing ? "Chỉnh sửa chỉ tiêu" : "Thêm chỉ tiêu"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-2">Chỉ tiêu</label>
                        <div className="max-w-md">
                            <select
                                value={selectedCombinationCriteria} // Dùng state để lưu giá trị đã chọn
                                onChange={(e) => setSelectedCombinationCriteria(e.target.value)} // Cập nhật giá trị khi thay đổi
                                className="block w-full border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>
                                    -- Chọn chỉ tiêu --
                                </option>
                                {admissionCriterias.map((criteria) => (
                                    <option key={criteria._id} value={criteria.criteriaId}>
                                        {criteria.criteriaName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Ngành</label>
                        <div className="max-w-md">
                            <select
                                value={selectedCombinationMajor} // Dùng state để lưu giá trị đã chọn
                                onChange={(e) => setSelectedCombinationMajor(e.target.value)} // Cập nhật giá trị khi thay đổi
                                className="block w-full border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>
                                    -- Chọn chuyên ngành --
                                </option>
                                {admissionMajors.map((major) => (
                                    <option key={major._id} value={major.majorId}>
                                        {major.majorName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <label className="block font-semibold mb-2">Điểm chuẩn</label>
                    <input
                        type="number"
                        placeholder="Điểm chuẩn"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
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
                            Đóng
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdqFormModal;
