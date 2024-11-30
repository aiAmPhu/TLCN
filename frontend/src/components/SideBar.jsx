// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import {
    UserIcon,
    FolderIcon,
    CubeIcon,
    UsersIcon,
    AcademicCapIcon,
    MapPinIcon,
    IdentificationIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Sidebar = () => {
    const [isGraduateOpen, setGraduateOpen] = useState(false); // State để mở/đóng dropdown Tuyển sinh
    const [activeOption, setActiveOption] = useState(null); // State để lưu lựa chọn hiện tại trong dropdown

    // Hàm để thay đổi nội dung hiển thị khi nhấn vào option
    const handleOptionClick = (option) => {
        setActiveOption(option);
    };

    return (
        <div className="w-[270px] h-screen bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-4 text-center">
                <span>Admin</span>
                <span className="text-yellow-500">Panel</span>
            </h2>
            <ul>
                <li>
                    <Link to="/user" className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <UserIcon className="w-5 h-5 mr-4" />
                        Quản lý Users
                    </Link>
                </li>
                <li>
                    <Link to="/block" className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <FolderIcon className="w-5 h-5 mr-4" />
                        Quản lý khối xét tuyển
                    </Link>
                </li>
                <li>
                    <Link to="/criteria" className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <AcademicCapIcon className="w-5 h-5 mr-4" />
                        Quản lý diện xét tuyển
                    </Link>
                </li>
                <li>
                    <Link to="/major" className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <CubeIcon className="w-5 h-5 mr-4" />
                        Quản lý ngành xét tuyển
                    </Link>
                </li>
                <li>
                    <Link to="/region" className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <MapPinIcon className="w-5 h-5 mr-4" />
                        Quản lý khu vực ưu tiên
                    </Link>
                </li>
                <li>
                    <Link to="/object" className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <IdentificationIcon className="w-5 h-5 mr-4" />
                        Quản lý đối tượng ưu tiên
                    </Link>
                </li>
                <li>
                    <Link to="/permission" className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <UsersIcon className="w-5 h-5 mr-4" />
                        Quản lý phân quyền
                    </Link>
                </li>

                {/* Quản lý Tuyển Sinh (Dropdown) */}
                <li>
                    <button
                        className={`flex items-center p-2 w-full hover:bg-gray-700 rounded ${
                            isGraduateOpen ? "bg-gray-700" : ""
                        }`}
                        onClick={() => setGraduateOpen(!isGraduateOpen)} // Toggle dropdown
                    >
                        <AcademicCapIcon className="w-5 h-5 mr-4" />
                        Quản lý tuyển sinh
                    </button>
                    {/* Dropdown Menu */}
                    {isGraduateOpen && (
                        <div className="mt-2 p-4 border-l-4 bg-gray-700 rounded">
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/option1"
                                        className={`p-2 rounded block ${
                                            activeOption === "Option 1" ? "bg-gray-600" : "hover:bg-gray-600"
                                        }`}
                                        onClick={() => handleOptionClick("Option 1")}
                                    >
                                        Quản lý cổng tuyển sinh
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/option2"
                                        className={`p-2 rounded block ${
                                            activeOption === "Option 2" ? "bg-gray-600" : "hover:bg-gray-600"
                                        }`}
                                        onClick={() => handleOptionClick("Option 2")}
                                    >
                                        Quản lý ngành tuyển sinh
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/option3"
                                        className={`p-2 rounded block ${
                                            activeOption === "Option 3" ? "bg-gray-600" : "hover:bg-gray-600"
                                        }`}
                                        onClick={() => handleOptionClick("Option 3")}
                                    >
                                        Thống kê
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
