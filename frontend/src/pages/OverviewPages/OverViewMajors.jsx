import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Header from "../../components/Header";

const OverViewMajors = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedMajor, setSelectedMajor] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/adms/getall");
                setData(response.data);
                setFilteredData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Không thể tải danh sách ngành. Vui lòng thử lại sau.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePageClick = (event) => setCurrentPage(event.selected);

    const handleShowDetail = (major) => setSelectedMajor(major);

    const handleClosePopup = () => {
        setSelectedMajor(null);
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearchQuery(keyword);
        setFilteredData(
            keyword
                ? data.filter(
                      (item) =>
                          (item.majorName || "").toLowerCase().includes(keyword) ||
                          (item.majorCodeName || "").toLowerCase().includes(keyword)
                  )
                : data
        );
        setCurrentPage(0);
    };

    const displayedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 flex justify-center items-center min-h-screen">{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
            <Header />
            <div className="container mx-auto p-6 mt-16">
                <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Danh sách ngành học</h1>
                <div className="flex justify-between items-center mb-8">
                    <input
                        type="text"
                        placeholder="Tìm kiếm ngành học hoặc mã ngành..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {filteredData.length === 0 ? (
                    <p className="text-gray-600 text-center">Không tìm thấy ngành học nào phù hợp.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedData.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
                            >
                                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                                    {item.majorName || "Chưa cập nhật"}
                                </h2>
                                <p className="text-gray-700">
                                    <strong>Mã ngành:</strong> {item.majorCodeName || "N/A"}
                                </p>
                                <button
                                    onClick={() => handleShowDetail(item)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Xem chi tiết
                                </button>
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

            {selectedMajor && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
                    onClick={handleClosePopup}
                >
                    <div
                        className="bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-2xl relative w-11/12 max-w-lg p-8 transform transition-all duration-500 scale-100 opacity-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition transform hover:scale-125"
                            onClick={handleClosePopup}
                        >
                            ✖
                        </button>
                        <div className="flex flex-col items-center">
                            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-6 text-center">
                                {selectedMajor.majorName}
                            </h2>
                            <div className="text-left w-full space-y-4">
                                <p className="text-lg font-semibold text-blue-900">
                                    <span className="text-gray-700">Mã ngành:</span> {selectedMajor.majorCodeName}
                                </p>
                                <p className="text-lg font-semibold text-blue-900">
                                    <span className="text-gray-700">Mã tổ hợp:</span>{" "}
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                                        {selectedMajor.majorCombination.join(", ")}
                                    </span>
                                </p>
                                <p className="text-lg text-gray-800 leading-relaxed">
                                    <span className="font-semibold text-blue-900">Mô tả:</span>{" "}
                                    {selectedMajor.majorDescription || "Chưa có thông tin mô tả"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OverViewMajors;
