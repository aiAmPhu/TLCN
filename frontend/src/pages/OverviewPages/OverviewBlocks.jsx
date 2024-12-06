import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Header from "../../components/Header";

const OverviewBlocks = () => {
    const [admissionBlocks, setAdmissionBlocks] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adbs/getall"); // Adjust the endpoint as needed
                setAdmissionBlocks(response.data);
                setFilteredData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Không thể tải danh sách khối xét tuyển. Vui lòng thử lại sau.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePageClick = (event) => setCurrentPage(event.selected);

    const displayedData = filteredData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 flex justify-center items-center min-h-screen">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
            <Header />
            <div className="container mx-auto p-6 mt-16">
                {filteredData.length === 0 ? (
                    <p className="text-gray-600 text-center">Không tìm thấy khối xét tuyển nào phù hợp.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedData.map((item) => (
                            <div
                                key={item.admissionBlockId}
                                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
                            >
                                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                                    {item.admissionBlockName || "Chưa cập nhật"}
                                </h2>
                                <p className="text-gray-700">
                                    <strong>Mã khối:</strong> {item.admissionBlockId || "N/A"}
                                </p>
                                <p className="text-gray-700 mt-2">
                                    <strong>Môn 1:</strong> {item.admissionBlockSubject1 || "Chưa có môn"}
                                </p>
                                <p className="text-gray-700 mt-2">
                                    <strong>Môn 2:</strong> {item.admissionBlockSubject2 || "Chưa có môn"}
                                </p>
                                <p className="text-gray-700 mt-2">
                                    <strong>Môn 3:</strong> {item.admissionBlockSubject3 || "Chưa có môn"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-8 flex justify-center">
                    <ReactPaginate
                        previousLabel="&#8592;"
                        nextLabel="&#8594;"
                        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                        onPageChange={handlePageClick}
                        containerClassName="flex items-center space-x-2"
                        pageClassName="px-4 py-2 border rounded-md"
                        activeClassName="bg-blue-500 text-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default OverviewBlocks;
