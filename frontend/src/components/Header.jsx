import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Icon tìm kiếm
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Thanh thứ hai (Logo và Navigation) */}
      <div className="bg-white text-blue-800 shadow-md">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <img
            src="../../public/logohcmute.png"
            alt="UTE Logo"
            className="h-12"
          />
          {/* Navigation */}
          <nav className="flex items-center space-x-6 text-sm font-semibold uppercase">
            <Link to="/home" className="hover:text-blue-500">
              Trang chủ
            </Link>
            <Link to="/majors" className="hover:text-blue-500">
              Ngành xét tuyển
            </Link>
            <Link to="/methods" className="hover:text-blue-500">
              Diện xét tuyển
            </Link>
            <Link to="/blocks" className="hover:text-blue-500">
              Khối xét tuyển
            </Link>
            <Link to="/register" className="hover:text-blue-500">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;