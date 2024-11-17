// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserListPage from "./pages/UserListPage"; // Import UserListPage
import PermissionListPage from "./pages/PermissionList"; // Import AdmListPage
import AdbListPage from "./pages/AdbListPage";
import AdmListPage from "./pages/AdmListPage";
import { UserIcon, DocumentTextIcon, CubeIcon, FolderIcon, UsersIcon } from "@heroicons/react/24/outline"; // Hoặc @heroicons/react/24/solid
function App() {
    return (
        <Router>
            <div className="flex">
                {/* Sidebar */}
                <div className="w-[270px] h-screen bg-gray-800 text-white p-4">
                    <h2 className="text-xl font-bold mb-4 text-center">
                        <span>Admin</span>
                        <span className="text-yellow-500">Panel</span>
                    </h2>
                    <ul>
                        <li>
                            <Link to="/user" className="flex items-center p-2 hover:bg-gray-700 rounded">
                                <UserIcon className="w-5 h-5 mr-4" /> {/* Icon User */}
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
                            <Link to="/major" className="flex items-center p-2 hover:bg-gray-700 rounded">
                                <CubeIcon className="w-5 h-5 mr-4" />
                                Quản lý ngành xét tuyển
                            </Link>
                        </li>
                        <li>
                            <Link to="/permission" className="flex items-center p-2 hover:bg-gray-700 rounded">
                                <UsersIcon className="w-5 h-5 mr-4" />
                                Quản lý phân quyền
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-4/5 p-6">
                    <Routes>
                        <Route path="/user" element={<UserListPage />} />
                        <Route path="/block" element={<AdbListPage />} />
                        <Route path="/major" element={<AdmListPage />} />
                        <Route path="/permission" element={<PermissionListPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
