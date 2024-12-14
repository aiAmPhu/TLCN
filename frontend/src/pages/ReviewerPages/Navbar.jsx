import { Link } from "react-router-dom";

const Navbar = () => {
    const handleLogout = () => {
        // Xóa thông tin người dùng (ví dụ xóa token)
        // localStorage.removeItem("token"); // Hoặc sessionStorage.removeItem('token') nếu bạn lưu token ở đó
        window.location.href = "/reviewer"; // Điều hướng đến trang đăng nhập
    };

    return (
        <nav className="bg-[#222d32] shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <span className="inline-block">
                    <img src="../../../public/myUTE_Reviewer.png" alt="Logo" className="w-full h-auto object-contain" />
                </span>

                {/* Links */}
                <div className="flex space-x-6">
                    <Link
                        to="/infoAdmissionReviewer"
                        className="text-white text-lg hover:text-gray-300 transition-colors"
                    >
                        Thông tin
                    </Link>
                    <Link
                        to="/learningReviewer"
                        className="text-white text-lg hover:text-gray-300 transition-colors"
                    >
                        Quá trình học tập
                    </Link>
                    <Link
                        to="/transcriptReviewer"
                        className="text-white text-lg hover:text-gray-300 transition-colors"
                    >
                        Học bạ
                    </Link>
                    <Link
                        to="/photoReviewer"
                        className="text-white text-lg hover:text-gray-300 transition-colors"
                    >
                        Ảnh hồ sơ
                    </Link>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white text-lg px-4 py-2 rounded-lg shadow-md transition-all"
                >
                    Về trang chủ
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

