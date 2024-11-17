// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserListPage from "./pages/UserListPage"; // Import UserListPage
import { UserIcon, DocumentTextIcon, CubeIcon, FolderIcon } from "@heroicons/react/24/outline"; // Hoặc @heroicons/react/24/solid
import AdbListPage from "./pages/AdbListPage";
import AdmListPage from "./pages/AdmListPage";
function App() {
    return (
        <Router>
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/6 h-screen bg-gray-800 text-white p-4">
                    <h2 className="text-xl font-bold mb-4 text-center">
                        <span>Admin</span>
                        <span className="text-yellow-500">Panel</span>
                    </h2>
                    <ul>
                        <li>
                            <Link to="/user" className="flex items-center p-2 hover:bg-gray-700 rounded">
                                <UserIcon className="w-5 h-5 mr-2" /> {/* Icon User */}
                                Quản lý Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/term" className="flex items-center p-2 hover:bg-gray-700 rounded">
                                <FolderIcon className="w-5 h-5 mr-2" />
                                Quản lý khối xét tuyển
                            </Link>
                        </li>
                        <li>
                            <Link to="/object" className="flex items-center p-2 hover:bg-gray-700 rounded">
                                <CubeIcon className="w-5 h-5 mr-2" />
                                Quản lý ngành xét tuyển
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-6">
                    <Routes>
                        <Route path="/user" element={<UserListPage />} />
                        <Route path="/term" element={<AdbListPage />} />
                        <Route path="/object" element={<AdmListPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
