import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const handleLogout = () => {
        // Xóa thông tin người dùng (ví dụ xóa token)
        localStorage.removeItem("token"); // Hoặc sessionStorage.removeItem('token') nếu bạn lưu token ở đó
        window.location.href = "/login"; // Điều hướng đến trang đăng nhập (có thể thay đổi tùy vào ứng dụng)
    };
    return (
        <nav className="bg-blue-600 p-4">
            <div className="flex justify-around">
                <Link to="/infoAdmissionReviewer" className="text-white text-lg">
                    Thông tin
                </Link>
                <Link to="/learningReviewer" className="text-white text-lg">
                    Quá trình học tập
                </Link>
                <Link to="/transcriptReviewer" className="text-white text-lg">
                    Học bạ
                </Link>
                <Link to="/photoReviewer" className="text-white text-lg">
                    Ảnh hồ sơ
                </Link>

                {/* Thêm các liên kết khác nếu cần */}
                <button onClick={handleLogout} className="text-white text-lg bg-red-400 px-4  rounded-md">
                    Đăng xuất
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
