import { Link } from "react-router-dom";
import {
    UserIcon,
    FolderIcon,
    CubeIcon,
    UsersIcon,
    AcademicCapIcon,
    MapPinIcon,
    IdentificationIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const Sidebar = () => {
    const [isGraduateOpen, setGraduateOpen] = useState(false); // State to toggle dropdown
    const [activeOption, setActiveOption] = useState(null); // State to store the active option
    const token = localStorage.getItem("token");
    const tokenUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const [user, setUser] = useState([]);

    // Function to handle option click and keep it active
    const handleOptionClick = (option) => {
        setActiveOption(option); // Set the clicked option as active
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token on logout
        window.location.href = "/home"; // Redirect to login page
    };

    useEffect(() => {
        if (!token || tokenUser?.role !== "admin") {
            // If no token or role is not admin, redirect to login
            window.location.href = "/404";
        }
    }, [token, tokenUser]);

    return (
        <div className="w-[270px] h-screen bg-gray-800 text-white p-4">
            <span className="inline-block w-full">
                <img src="../../public/myUTE_Admin.png" alt="Logo" className="w-full h-auto object-contain" />
            </span>

            <ul>
                <li>
                    <Link
                        to="user"
                        className={`flex items-center p-2 hover:bg-gray-700 rounded ${
                            activeOption === "user" ? "bg-gray-600" : ""
                        }`}
                        onClick={() => handleOptionClick("user")}
                    >
                        <UserIcon className="w-5 h-5 mr-4" />
                        Quản lý Users
                    </Link>
                </li>
                <li>
                    <Link
                        to="block"
                        className={`flex items-center p-2 hover:bg-gray-700 rounded ${
                            activeOption === "block" ? "bg-gray-600" : ""
                        }`}
                        onClick={() => handleOptionClick("block")}
                    >
                        <FolderIcon className="w-5 h-5 mr-4" />
                        Quản lý khối xét tuyển
                    </Link>
                </li>
                <li>
                    <Link
                        to="criteria"
                        className={`flex items-center p-2 hover:bg-gray-700 rounded ${
                            activeOption === "criteria" ? "bg-gray-600" : ""
                        }`}
                        onClick={() => handleOptionClick("criteria")}
                    >
                        <AcademicCapIcon className="w-5 h-5 mr-4" />
                        Quản lý diện xét tuyển
                    </Link>
                </li>
                <li>
                    <Link
                        to="major"
                        className={`flex items-center p-2 hover:bg-gray-700 rounded ${
                            activeOption === "major" ? "bg-gray-600" : ""
                        }`}
                        onClick={() => handleOptionClick("major")}
                    >
                        <CubeIcon className="w-5 h-5 mr-4" />
                        Quản lý ngành xét tuyển
                    </Link>
                </li>
                <li>
                    <Link
                        to="region"
                        className={`flex items-center p-2 hover:bg-gray-700 rounded ${
                            activeOption === "region" ? "bg-gray-600" : ""
                        }`}
                        onClick={() => handleOptionClick("region")}
                    >
                        <MapPinIcon className="w-5 h-5 mr-4" />
                        Quản lý khu vực ưu tiên
                    </Link>
                </li>
                <li>
                    <Link
                        to="quantity"
                        className={`flex items-center p-2 hover:bg-gray-700 rounded ${
                            activeOption === "quantity" ? "bg-gray-600" : ""
                        }`}
                        onClick={() => handleOptionClick("quantity")}
                    >
                        <PencilSquareIcon className="w-5 h-5 mr-4" />
                        Quản lý chỉ tiêu
                    </Link>
                </li>
                <li>
                    <Link
                        to="object"
                        className={`flex items-center p-2 hover:bg-gray-700 rounded ${
                            activeOption === "object" ? "bg-gray-600" : ""
                        }`}
                        onClick={() => handleOptionClick("object")}
                    >
                        <IdentificationIcon className="w-5 h-5 mr-4" />
                        Quản lý đối tượng ưu tiên
                    </Link>
                </li>
                <li>
                    <Link
                        to="permission"
                        className={`flex items-center p-2 hover:bg-gray-700 rounded ${
                            activeOption === "permission" ? "bg-gray-600" : ""
                        }`}
                        onClick={() => handleOptionClick("permission")}
                    >
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
                                        to="option2"
                                        className={`p-2 rounded block ${
                                            activeOption === "option2" ? "bg-gray-600" : "hover:bg-gray-600"
                                        }`}
                                        onClick={() => handleOptionClick("option2")}
                                    >
                                        Lọc hồ sơ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="option1"
                                        className={`p-2 rounded block ${
                                            activeOption === "option1" ? "bg-gray-600" : "hover:bg-gray-600"
                                        }`}
                                        onClick={() => handleOptionClick("option1")}
                                    >
                                        Quản lý cổng tuyển sinh
                                    </Link>
                                </li>

                                {/* <li>
                                    <Link
                                        to="option3"
                                        className={`p-2 rounded block ${
                                            activeOption === "option3" ? "bg-gray-600" : "hover:bg-gray-600"
                                        }`}
                                        onClick={() => handleOptionClick("option3")}
                                    >
                                        Thống kê
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    )}
                </li>
            </ul>

            {/* Logout Button */}
            <button
                onClick={handleLogout} // Logout
                className="px-8 py-2 mt-4 bg-red-600 text-white rounded hover:bg-red-500 mx-auto block"
            >
                Đăng xuất
            </button>
        </div>
    );
};

export default Sidebar;
