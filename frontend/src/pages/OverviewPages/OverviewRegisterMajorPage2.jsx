import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
const OverviewRegisterMajorP2 = () => {
    const [priority, setPriority] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const email = localStorage.getItem("email");
    const criteriaId = localStorage.getItem("criteriaId");
    const [dropdownData, setDropdownData] = useState([]);
    const [dropdownID, setDropdownID] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false); // Quản lý việc hiển thị dropdown
    const [selectedValue, setSelectedValue] = useState(""); // Ngành đã chọn
    const [majorCombinations, setMajorCombinations] = useState([]); // Dữ liệu majorCombination
    const [showMajorCombinationDropdown, setShowMajorCombinationDropdown] = useState(false); // Quản lý việc hiển thị dropdown 2
    const [selectedCombination, setSelectedCombination] = useState(""); // Tổ hợp môn đã chọn
    const [showSaveButton, setShowSaveButton] = useState(false); // Quản lý việc hiển thị nút Lưu

    // Hàm gọi API khi nhấn nút
    useEffect(() => {
        if (showDropdown) {
            fetchDropdownData();
        }
    }, [showDropdown]);

    const fetchDropdownData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/adms/getall");
            //console.log(response.data); // In ra dữ liệu trả về từ API để kiểm tra cấu trúc
            console.log(response.data);
            if (response.data && Array.isArray(response.data)) {
                // setDropdownData(response.data.map((item) => item.majorName));
                setDropdownData(response.data);
            } else {
                setDropdownData([]);
            }
        } catch (err) {
            console.error("Lỗi khi lấy dữ liệu dropdown:", err);
        }
    };

    // Hàm gọi API để lấy majorCombination từ majorName
    const fetchMajorCombination = async (majorName) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/adms/getCombination/${majorName}`);
            if (response.data && Array.isArray(response.data.majorCombination)) {
                setMajorCombinations(response.data.majorCombination);
                setShowMajorCombinationDropdown(true); // Hiển thị dropdown 2 sau khi có dữ liệu
            } else {
                setMajorCombinations([]);
            }
        } catch (err) {
            console.error("Lỗi khi lấy dữ liệu majorCombination:", err);
            setMajorCombinations([]);
        }
    };

    const handleAddWish = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:8080/api/wish/max/${email}`);
            setPriority(response.data.data.priority || 0); // Gán giá trị priority
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setPriority(0);
            } else {
                setError("Có lỗi xảy ra khi lấy dữ liệu.");
            }
        } finally {
            setLoading(false);
            setShowDropdown(true); // Hiển thị dropdown 1 khi hoàn thành
        }
    };

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        // Gọi API lấy majorCombination khi chọn ngành
        if (value) {
            fetchMajorCombination(value);
        }
    };

    const handleMajorCombinationChange = (event) => {
        const value = event.target.value;
        setSelectedCombination(value);

        setShowSaveButton(true); // Hiển thị nút "Lưu" khi có tổ hợp môn được chọn
    };
    const safeParseFloat = (value) => (isNaN(parseFloat(value)) ? 0 : parseFloat(value));
    // Hàm lưu các thông tin đã chọn
    const handleSaveSelection = async () => {
        // Giả sử bạn muốn lưu vào localStorage
        localStorage.setItem("selectedMajor", selectedValue);
        localStorage.setItem("selectedCombination", selectedCombination);
        const combination = await axios.get(`http://localhost:8080/api/adbs/getSubjects/${selectedCombination}`);

        try {
            const score1 = await axios.get(
                `http://localhost:8080/api/transcripts/getScoreByEmailandSubject/${email}/${combination.data[0].subject1}`
            );
            // console.log(combination.data[0].subject1);

            const score2 = await axios.get(
                `http://localhost:8080/api/transcripts/getScoreByEmailandSubject/${email}/${combination.data[0].subject2}`
            );
            // console.log(combination.data[0].subject2);
            const score3 = await axios.get(
                `http://localhost:8080/api/transcripts/getScoreByEmailandSubject/${email}/${combination.data[0].subject3}`
            );
            // console.log(combination.data[0].subject3);
            const temptScore4 = await axios.get(`http://localhost:8080/api/learning/getPriorityGroup/${email}`);
            const score4 = await axios.get(
                `http://localhost:8080/api/ados/getScoreByID/${temptScore4.data.data[0].priorityGroup}`
            );
            //console.log(score4.data.score);
            // console.log(combination.data[0].subject1);
            // console.log(score1.data.data.averageScore);
            // console.log(score2.data.data.averageScore);
            // console.log(score3.data.data.averageScore);
            const finalScore =
                safeParseFloat(score1.data.data.averageScore) +
                safeParseFloat(score2.data.data.averageScore) +
                safeParseFloat(score3.data.data.averageScore) +
                safeParseFloat(score4.data.score);
            const newWish = {
                priority: priority + 1,
                criteriaId: criteriaId,
                admissionBlockId: selectedCombination,
                major: selectedValue,
                email: email,
                scores: finalScore,
            };
            console.log(newWish);
            try {
                // Cập nhật danh sách người dùng sau khi thêm hoặc sửa
                await axios.post("http://localhost:8080/api/wish/add", newWish);
            } catch (error) {
                alert("Failed to add wish. Please try again.");
            }

            // Thông báo lưu thành công
            alert("Thông tin đã được lưu!");
        } catch (error) {
            // Nếu có lỗi ở bất kỳ API nào, sẽ hiển thị thông báo lỗi
            alert("Vui lòng thiết lập hồ sơ trước");
            console.error(error); // In ra lỗi chi tiết cho dễ debug
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <div className="container mt-2 mx-auto p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Thêm Nguyện Vọng</h1>

                <div className="text-center mb-6">
                    {/* Nút thêm nguyện vọng */}
                    <button
                        onClick={handleAddWish}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                    >
                        Thêm Nguyện Vọng
                    </button>
                </div>

                {loading && <div className="text-center text-gray-600 mb-4">Đang tải...</div>}

                {error && <div className="text-center text-red-600 mb-4">{error}</div>}

                <div className="text-center mb-6">
                    {/* Hiển thị priority */}
                    <h3 className="text-xl font-semibold text-gray-700">
                        Nguyện vọng {priority !== null ? priority + 1 : ""}
                    </h3>
                </div>

                {/* Dropdown box khi nhấn vào nút "Thêm Nguyện Vọng" */}
                {showDropdown && (
                    <div className="relative inline-block text-left w-full mb-6">
                        <label htmlFor="major" className="block text-lg font-medium text-gray-700 mb-2">
                            Chọn ngành
                        </label>
                        <select
                            id="major"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedValue}
                            onChange={handleSelectChange}
                        >
                            <option value="">Chọn nguyện vọng</option>
                            {dropdownData.length > 0 ? (
                                dropdownData.map((item) => (
                                    <option key={item._id} value={item.majorId}>
                                        {item.majorName} {/* Hiển thị tên ngành */}
                                    </option>
                                ))
                            ) : (
                                <option value="">Không có dữ liệu</option>
                            )}
                        </select>
                    </div>
                )}

                {/* Dropdown thứ 2 khi chọn ngành */}
                {showMajorCombinationDropdown && (
                    <div className="relative inline-block text-left w-full mb-6">
                        <label htmlFor="majorCombination" className="block text-lg font-medium text-gray-700 mb-2">
                            Chọn tổ hợp
                        </label>
                        <select
                            id="majorCombination"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={selectedCombination}
                            onChange={handleMajorCombinationChange}
                        >
                            <option value="">Chọn tổ hợp</option>
                            {majorCombinations.length > 0 ? (
                                majorCombinations.map((combination, index) => (
                                    <option key={index} value={combination}>
                                        {combination}
                                    </option>
                                ))
                            ) : (
                                <option value="">Không có dữ liệu</option>
                            )}
                        </select>
                    </div>
                )}

                {/* Nút lưu khi người dùng chọn tổ hợp môn */}
                {showSaveButton && (
                    <div className="text-center mt-6">
                        <button
                            onClick={handleSaveSelection}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                        >
                            Lưu
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OverviewRegisterMajorP2;
