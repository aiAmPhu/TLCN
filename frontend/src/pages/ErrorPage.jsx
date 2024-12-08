import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-9xl font-bold text-blue-600">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">Rất tiếc! Trang không tìm thấy</h2>
            <p className="text-gray-600 mt-2 text-center">
                Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            </p>
            <Link
                to="/"
                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Quay lại trang chủ
            </Link>
        </div>
    );
};

export default NotFoundPage;
