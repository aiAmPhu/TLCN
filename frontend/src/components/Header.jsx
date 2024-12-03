import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi"; // Icon tìm kiếm
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import axios from "axios";
const Header = () => {
    const token = localStorage.getItem("token");
    const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const [showSearch, setShowSearch] = useState(false);
    const [user, setUser] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    // Hàm để đóng menu khi nhấn ngoài
    const handleClickOutside = (e) => {
        if (menuOpen && !e.target.closest(".user-menu")) {
            setMenuOpen(false); // Đóng menu khi nhấn ra ngoài
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("token"); // Xóa token khi đăng xuất
        window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
    };
    useEffect(() => {
        if (tokenUser?.role === "admin") {
            // Nếu không có token hoặc vai trò là "user", chuyển hướng về trang Home
            window.location.href = "/sidebar";
            return; // Dừng việc gọi API nếu điều kiện đúng
        }

        if (tokenUser?.role === "reviewer") {
            // Nếu vai trò không phải là "user", chuyển hướng về trang Login
            window.location.href = "/reviewer";
            return; // Dừng việc gọi API nếu điều kiện đúng
        }
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/getall`);
                setUser(response.data.find((user) => user.email === tokenUser.email));
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu", error);
            }
        };

        fetchUser();
        // console.log(user);\
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            {/* Thanh thứ hai (Logo và Navigation) */}
            <div className="bg-white text-blue-800 shadow-md">
                <div className="flex justify-between items-center px-4 py-3">
                    {/* Logo */}
                    <img src="../../public/logohcmute.png" alt="UTE Logo" className="h-12" />
                    {/* Navigation */}
                    <nav className="flex items-center space-x-6 text-sm font-semibold uppercase">
                        <Link to="/home" className="hover:text-blue-500">
                            Trang chủ
                        </Link>
                        <Link to="/overviewMajors" className="hover:text-blue-500">
                            Ngành xét tuyển
                        </Link>
                        <Link to="/overviewMethods" className="hover:text-blue-500">
                            Diện xét tuyển
                        </Link>
                        <Link to="/overviewBlocks" className="hover:text-blue-500">
                            Khối xét tuyển
                        </Link>
                        <Link to="/overviewRegisterMajors" className="hover:text-blue-500">
                            Đăng ký xét tuyển
                        </Link>
                        <Link to="/results" className="hover:text-blue-500">
                            Kết quả xét tuyển
                        </Link>
                        <Link to="/profile" className="hover:text-blue-500">
                            Hồ sơ của tôi
                        </Link>
                    </nav>
                    {/* Search Icon */}
                    <div className="relative">
                        <FiSearch
                            className="text-xl cursor-pointer hover:text-blue-500 ml-4"
                            onClick={() => setShowSearch(!showSearch)}
                        />
                        {showSearch && (
                            <div className="absolute top-10 right-0 bg-white text-black rounded shadow-lg p-2">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="w-64 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </div>
                    {/* Buttons */}
                    <div className="flex items-center space-x-4">
                        {token ? (
                            <div className="relative user-menu">
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    <img
                                        src={user?.pic || "/default-avatar.png"} // Sử dụng ảnh từ token hoặc ảnh mặc định
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="ml-2 text-white">{user?.name || "User"}</span>
                                    {menuOpen && (
                                        <div className="absolute right-0 mt-40 w-48 bg-white text-black rounded-md shadow-lg z-10">
                                            <ul>
                                                <li>
                                                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200">
                                                        Cài đặt
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/changepassword"
                                                        className="block px-4 py-2 hover:bg-gray-200"
                                                    >
                                                        Đổi mật khẩu
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                                                    >
                                                        Đăng xuất
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // Nếu không có token, hiển thị nút Đăng nhập và Đăng ký
                            <>
                                <Link to="/login">
                                    <button className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600">
                                        Đăng nhập
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">
                                        Đăng ký
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
