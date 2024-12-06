import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
const OverviewRegisterMajor = () => {
    const [criteria, setCriteria] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
    // Fetch data from API
    useEffect(() => {
        const fetchCriteria = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adcs/getAll");
                setCriteria(response.data);
            } catch (err) {
                setError("Không thể tải dữ liệu, vui lòng thử lại sau.");
                console.error("Error fetching criteria:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCriteria();
    }, []);

    if (loading) {
        return <div className="text-center text-blue-500">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }
    const handleClick = (criteriaId) => {
        localStorage.setItem("criteriaId", criteriaId);
        localStorage.setItem("email", tokenUser.email);
        // Thực hiện hành động khác tại đây
        // alert(`Tiêu chí ${criteriaId} đã được chọn.`);
        window.location.href = "/overviewRegisterMajorsP2";
    };
    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <Header />
            <h1 className="text-3xl mt-20 font-bold text-center mb-10 text-gray-800">Danh sách tiêu chí xét tuyển</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {criteria.map((item) => (
                    <div
                        key={item._id}
                        className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                    >
                        <h2 className="text-lg font-semibold text-blue-500 mb-2 uppercase tracking-wide">
                            {item.criteriaId}
                        </h2>
                        <h3 className="text-xl font-bold text-gray-900">{item.criteriaName}</h3>
                        <p className="text-gray-600 mt-3">{item.criteriaDescription}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded shadow hover:bg-blue-600 transition duration-300"
                            onClick={() => handleClick(item.criteriaId)}
                        >
                            Đăng ký
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OverviewRegisterMajor;
