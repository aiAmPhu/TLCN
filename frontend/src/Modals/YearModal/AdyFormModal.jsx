// UserFormModal.js
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { endOfYear, addDays } from "date-fns"; // Import hàm endOfYear từ date-fns
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
const AdyFormModal = ({ adyId, adyToEdit, setAdys, onClose, isEditing }) => {
    const [yearId, setYearId] = useState("");
    const [yearName, setYearName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [yearMajors, setYearMajors] = useState("");

    const [error, setError] = useState("");
    const [admissionMajors, setAdmissionMajors] = useState([]); // Lưu danh sách từ MongoDB
    const [selectedCombinations, setSelectedCombinations] = useState([]); // Lưu các combination được chọn
    const maxDate = startDate ? endOfYear(startDate) : null;
    useEffect(() => {
        const fetchAdmissionMajors = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adms/getall");
                setAdmissionMajors(response.data);
                console.log(admissionMajors);
            } catch (error) {
                console.error("Error fetching admission majors", error);
            }
        };
        fetchAdmissionMajors();

        if (adyToEdit) {
            setYearId(adyToEdit.yearId);
            setYearName(adyToEdit.yearName);
            setStartDate(adyToEdit.startDate);
            setEndDate(adyToEdit.endDate);
            setYearMajors(adyToEdit.yearMajors);
            setSelectedCombinations(adyToEdit.yearMajors || []);
        } else {
            setYearId("");
            setYearName("");
            setStartDate("");
            setEndDate("");
            setYearMajors("");
            setSelectedCombinations([]);
        }
    }, [adyToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(admissionMajors);

        const newAdy = {
            yearId,
            yearName,
            startDate,
            endDate,
            yearMajors: selectedCombinations,
        };
        console.log("Payload to Submit:", newAdy);
        try {
            if (isEditing && adyId) {
                // Cập nhật user
                await axios.put(`http://localhost:8080/api/adys/update/${adyId}`, newAdy);
            } else {
                // Thêm user mới
                await axios.post("http://localhost:8080/api/adys/add", newAdy);
            }

            // Cập nhật danh sách người dùng sau khi thêm hoặc sửa
            const response = await axios.get("http://localhost:8080/api/adys/getall");
            setAdys(response.data);
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
                            Đóng
                        </button>
                    </div>
                </div>
            )}
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">{isEditing ? "Cập nhật cổng tuyển sinh" : "Thêm cổng tuyển sinh"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="ID"
                        value={yearId}
                        onChange={(e) => setYearId(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={yearName}
                        onChange={(e) => setYearName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {/* Chọn ngày bắt đầu */}
                    <div className="flex space-x-4 items-center justify-center">
                        <div className="relative">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                    setEndDate(null); // Reset endDate khi startDate thay đổi
                                }}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Start date"
                                className="w-[150px] p-2 border border-gray-300 rounded pr-10"
                                onKeyDown={(e) => e.preventDefault()}
                            />
                            <CalendarDaysIcon className="absolute left-28 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                        </div>
                        <div className="relative">
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd-MM-yyyy"
                                minDate={addDays(startDate, 1)} // Ngày nhỏ nhất là startDate
                                maxDate={maxDate} // Ngày lớn nhất là ngày cuối năm của startDate
                                placeholderText="End date"
                                className="w-[150px] p-2 border border-gray-300 rounded pr-10"
                                disabled={!startDate} // Vô hiệu hóa nếu chưa chọn startDate
                                onKeyDown={(e) => e.preventDefault()}
                            />
                            {/* Icon từ Heroicons */}
                            <CalendarDaysIcon className="absolute left-28 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                        </div>
                    </div>
                    {/* Chọn ngày kết thúc */}

                    <div>
                        {/* <label className="block font-semibold mb-2">Combination</label> */}
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
                            {isEditing ? "Cập nhật" : "Thêm"}
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

export default AdyFormModal;
